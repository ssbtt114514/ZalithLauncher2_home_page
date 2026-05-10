/**
 * UI 控制 - 弹窗、提示、模式切换
 */

// 显示提示
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// 编辑模式切换
let isEditMode = false;

function toggleEditMode() {
    const editPanel = document.getElementById('editPanel');
    const editBtn = document.getElementById('editBtn');
    
    if (isEditMode) {
        editPanel.style.display = 'none';
        editBtn.textContent = '✏️ 编辑';
        isEditMode = false;
        showToast('已退出编辑模式');
    } else {
        editPanel.style.display = 'flex';
        document.getElementById('editor').value = window.currentMarkdown || '';
        editBtn.textContent = '👁️ 预览';
        isEditMode = true;
        showToast('进入编辑模式，点击组件按钮快速插入');
    }
}

// 渲染组件工具栏（按分类）
function renderComponentBar() {
    const container = document.getElementById('componentList');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (const category of COMPONENT_CATEGORIES) {
        // 添加分类标题
        const catTitle = document.createElement('div');
        catTitle.className = 'category-title';
        catTitle.textContent = category.name;
        container.appendChild(catTitle);
        
        // 添加分类下的组件按钮
        for (const type of category.items) {
            if (ComponentTemplates[type]) {
                const btn = document.createElement('button');
                btn.className = 'comp-btn';
                btn.dataset.type = type;
                btn.textContent = getComponentDisplayName(type);
                btn.title = ComponentTemplates[type].name + (ComponentTemplates[type].note ? ' ' + ComponentTemplates[type].note : '');
                container.appendChild(btn);
            }
        }
    }
}

// 绑定组件按钮事件
function bindComponentButtons() {
    // 渲染工具栏
    renderComponentBar();
    
    // 绑定事件
    const btns = document.querySelectorAll('.comp-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            if (!isEditMode) {
                showToast('请先点击"编辑"按钮进入编辑模式');
                return;
            }
            if (type === 'help') {
                openHelpModal();
            } else if (ComponentTemplates[type]) {
                openComponentModal(type);
            } else {
                showToast('组件开发中');
            }
        });
    });
}

// 打开组件配置弹窗
function openComponentModal(type) {
    const template = ComponentTemplates[type];
    if (!template) return;
    
    window.pendingComponent = type;
    document.getElementById('modalTitle').textContent = `添加 ${template.name}`;
    
    let html = '';
    if (template.note) {
        html += `<div style="background:#1e2440; padding:8px 12px; border-radius:8px; margin-bottom:16px; font-size:12px; color:#fbbf24;">💡 ${template.note}</div>`;
    }
    for (const field of template.fields) {
        html += `<div class="form-group">`;
        html += `<label class="form-label">${field.label}${field.required ? ' <span style="color:#ef4444;">*</span>' : ''}</label>`;
        
        if (field.type === 'select') {
            html += `<select class="form-select" id="field_${field.name}">`;
            for (const opt of field.options) {
                const selected = (field.default && opt === field.default) ? ' selected' : '';
                html += `<option value="${opt}"${selected}>${opt}</option>`;
            }
            html += `</select>`;
        } else if (field.type === 'textarea') {
            html += `<textarea class="form-textarea" id="field_${field.name}" placeholder="${field.placeholder || ''}" rows="4"></textarea>`;
        } else {
            html += `<input type="text" class="form-input" id="field_${field.name}" placeholder="${field.placeholder || ''}" value="${field.default || ''}">`;
        }
        
        if (field.hint) html += `<div class="form-hint">${field.hint}</div>`;
        html += `</div>`;
    }
    
    if (template.fields.length === 0) {
        html = '<div style="color:#7f8ea3;">点击插入即可添加组件</div>';
    }
    
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('modal').style.display = 'flex';
}

// 关闭弹窗
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    window.pendingComponent = null;
}

// 插入组件到编辑器
function insertComponent() {
    if (!window.pendingComponent) return;
    
    const template = ComponentTemplates[window.pendingComponent];
    if (!template) return;
    
    const data = {};
    for (const field of template.fields) {
        const input = document.getElementById(`field_${field.name}`);
        if (input) data[field.name] = input.value;
    }
    
    // 检查必填
    for (const field of template.fields) {
        if (field.required && !data[field.name]) {
            showToast(`请填写 ${field.label}`);
            return;
        }
    }
    
    const code = template.template(data);
    insertAtCursor(code);
    closeModal();
    showToast(`已添加 ${template.name}`);
}

// 在光标位置插入代码
function insertAtCursor(code) {
    const textarea = document.getElementById('editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    let prefix = '';
    let suffix = '';
    if (start > 0 && text[start - 1] !== '\n') prefix = '\n';
    if (end < text.length && text[end] !== '\n') suffix = '\n';
    
    const newText = text.substring(0, start) + prefix + code + suffix + text.substring(end);
    textarea.value = newText;
    
    // 更新全局内容并刷新预览
    window.currentMarkdown = newText;
    renderPreview(newText);
}

// 打开帮助
function openHelpModal() {
    document.getElementById('helpBody').innerHTML = `<div class="help-body">${HelpContent}</div>`;
    document.getElementById('helpModal').style.display = 'flex';
}

function closeHelpModal() {
    document.getElementById('helpModal').style.display = 'none';
}

// 绑定弹窗关闭
function bindModalEvents() {
    document.getElementById('modalClose').onclick = closeModal;
    document.getElementById('modalCancel').onclick = closeModal;
    document.getElementById('modalConfirm').onclick = insertComponent;
    document.getElementById('helpClose').onclick = closeHelpModal;
    document.getElementById('helpConfirm').onclick = closeHelpModal;
    
    document.getElementById('modal').onclick = (e) => {
        if (e.target === document.getElementById('modal')) closeModal();
    };
    document.getElementById('helpModal').onclick = (e) => {
        if (e.target === document.getElementById('helpModal')) closeHelpModal();
    };
}

// 绑定工具栏按钮
function bindToolbarButtons() {
    document.getElementById('editBtn').onclick = toggleEditMode;
    document.getElementById('downloadBtn').onclick = downloadFile;
    document.getElementById('uploadBtn').onclick = uploadFile;
    document.getElementById('newBtn').onclick = newFile;
    document.getElementById('refreshBtn').onclick = () => {
        if (window.currentMarkdown) {
            renderPreview(window.currentMarkdown);
            showToast('已刷新预览');
        }
    };
    document.getElementById('saveBtn').onclick = saveFromEditor;
    document.getElementById('cancelBtn').onclick = () => {
        const editor = document.getElementById('editor');
        if (editor && window.currentMarkdown) {
            editor.value = window.currentMarkdown;
            showToast('已取消修改');
        }
    };
}

// 导出到全局
window.showToast = showToast;
window.toggleEditMode = toggleEditMode;
window.bindComponentButtons = bindComponentButtons;
window.bindModalEvents = bindModalEvents;
window.bindToolbarButtons = bindToolbarButtons;
window.openComponentModal = openComponentModal;
window.closeModal = closeModal;
window.insertComponent = insertComponent;
window.openHelpModal = openHelpModal;
window.closeHelpModal = closeHelpModal;