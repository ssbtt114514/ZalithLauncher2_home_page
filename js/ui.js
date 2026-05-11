let isEditMode = false;

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function setPreviewMode() {
    const editPanel = document.getElementById('editPanel');
    const previewBtn = document.getElementById('previewModeBtn');
    const editBtn = document.getElementById('editModeBtn');
    
    if (editPanel) editPanel.remove();
    previewBtn.classList.add('active');
    editBtn.classList.remove('active');
    setDragMode(false);
    isEditMode = false;
    showToast('预览模式');
}

function setEditMode() {
    const mainArea = document.querySelector('.main-editor-area');
    const previewPanel = document.querySelector('.preview-panel');
    const previewBtn = document.getElementById('previewModeBtn');
    const editBtn = document.getElementById('editModeBtn');
    
    if (!isEditMode) {
        const editPanel = document.createElement('div');
        editPanel.id = 'editPanel';
        editPanel.className = 'edit-panel';
        editPanel.style.flex = '1';
        editPanel.style.display = 'flex';
        editPanel.style.flexDirection = 'column';
        editPanel.style.background = '#0f1322';
        editPanel.style.borderRadius = '16px';
        editPanel.style.border = '1px solid #1e2440';
        editPanel.style.overflow = 'hidden';
        
        editPanel.innerHTML = `
            <div class="preview-header">
                <span>✏️ 源码</span>
                <button id="saveBtn" class="bar-btn" style="padding:4px 12px">保存</button>
            </div>
            <div class="component-bar">
                <div class="component-list" id="componentList"></div>
            </div>
            <textarea id="editor" class="editor" placeholder="Markdown 源码..."></textarea>
            <div class="editor-hint">💡 点击按钮插入 | 预览区长按拖拽排序 | 点击修改属性</div>
        `;
        
        mainArea.insertBefore(editPanel, previewPanel.nextSibling);
        
        renderComponentBar();
        bindComponentButtons();
        
        const editor = document.getElementById('editor');
        if (editor) {
            editor.value = window.currentMarkdown || '';
            editor.oninput = () => {
                window.currentMarkdown = editor.value;
                renderPreview(editor.value);
            };
        }
        
        document.getElementById('saveBtn').onclick = () => {
            const editor = document.getElementById('editor');
            if (editor) {
                window.currentMarkdown = editor.value;
                renderPreview(editor.value);
                showToast('已保存');
            }
        };
        
        previewBtn.classList.remove('active');
        editBtn.classList.add('active');
        setDragMode(true);
        isEditMode = true;
        showToast('编辑模式 - 长按元素可拖拽');
    }
}

function renderComponentBar() {
    const container = document.getElementById('componentList');
    if (!container) return;
    container.innerHTML = '';
    
    for (const cat of COMPONENT_CATEGORIES) {
        const title = document.createElement('div');
        title.className = 'category-title';
        title.textContent = cat.name;
        container.appendChild(title);
        
        for (const type of cat.items) {
            if (ComponentTemplates[type]) {
                const btn = document.createElement('button');
                btn.className = 'comp-btn';
                btn.dataset.type = type;
                btn.textContent = getComponentDisplayName(type);
                container.appendChild(btn);
            }
        }
    }
}

function bindComponentButtons() {
    document.querySelectorAll('.comp-btn').forEach(btn => {
        btn.onclick = () => {
            const type = btn.dataset.type;
            if (type === 'help') openHelpModal();
            else if (ComponentTemplates[type]) openComponentModal(type);
            else showToast('开发中');
        };
    });
}

function openComponentModal(type) {
    const tmpl = ComponentTemplates[type];
    if (!tmpl) return;
    
    window.pendingComponent = type;
    document.getElementById('modalTitle').textContent = tmpl.name;
    
    let html = '';
    for (const f of tmpl.fields) {
        html += `<div class="form-group">
            <label class="form-label">${f.label}${f.required ? ' *' : ''}</label>`;
        if (f.type === 'select') {
            html += `<select class="form-select" id="field_${f.name}">`;
            for (const opt of f.options) html += `<option value="${opt}">${opt}</option>`;
            html += `</select>`;
        } else if (f.type === 'textarea') {
            html += `<textarea class="form-textarea" id="field_${f.name}" placeholder="${f.placeholder || ''}"></textarea>`;
        } else {
            html += `<input class="form-input" id="field_${f.name}" placeholder="${f.placeholder || ''}">`;
        }
        if (f.hint) html += `<div class="form-hint">${f.hint}</div>`;
        html += `</div>`;
    }
    if (tmpl.fields.length === 0) html = '<div style="color:#7f8ea3;">点击插入即可</div>';
    
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    window.pendingComponent = null;
}

function insertComponent() {
    if (!window.pendingComponent) return;
    const tmpl = ComponentTemplates[window.pendingComponent];
    if (!tmpl) return;
    
    const data = {};
    for (const f of tmpl.fields) {
        const el = document.getElementById(`field_${f.name}`);
        if (el) data[f.name] = el.value;
    }
    for (const f of tmpl.fields) {
        if (f.required && !data[f.name]) {
            showToast(`请填写 ${f.label}`);
            return;
        }
    }
    
    const code = tmpl.template(data);
    const editor = document.getElementById('editor');
    if (editor) {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const text = editor.value;
        const prefix = (start > 0 && text[start-1] !== '\n') ? '\n' : '';
        const suffix = (end < text.length && text[end] !== '\n') ? '\n' : '';
        editor.value = text.substring(0, start) + prefix + code + suffix + text.substring(end);
        window.currentMarkdown = editor.value;
        renderPreview(editor.value);
        closeModal();
        showToast(`已添加 ${tmpl.name}`);
    }
}

function openHelpModal() {
    document.getElementById('helpBody').innerHTML = `<div class="help-body">${HelpContent}</div>`;
    document.getElementById('helpModal').style.display = 'flex';
}

function closeHelpModal() {
    document.getElementById('helpModal').style.display = 'none';
}

function bindModalEvents() {
    document.getElementById('modalClose').onclick = closeModal;
    document.getElementById('modalCancel').onclick = closeModal;
    document.getElementById('modalConfirm').onclick = insertComponent;
    document.getElementById('helpClose').onclick = closeHelpModal;
    document.getElementById('helpConfirm').onclick = closeHelpModal;
}

function openAuthor() {
    window.open('https://ssbtt114514.github.io/', '_blank');
}

function bindMenuButtons() {
    document.getElementById('previewModeBtn').onclick = setPreviewMode;
    document.getElementById('editModeBtn').onclick = setEditMode;
    document.getElementById('newFileBtn').onclick = newFile;
    document.getElementById('uploadBtn').onclick = uploadFile;
    document.getElementById('downloadBtn').onclick = downloadFile;
    document.getElementById('authorBtn').onclick = openAuthor;
    document.getElementById('closePropertyBtn').onclick = closePropertyPanel;
}

window.showToast = showToast;
window.bindModalEvents = bindModalEvents;
window.bindMenuButtons = bindMenuButtons;
window.openComponentModal = openComponentModal;
window.closeModal = closeModal;
window.insertComponent = insertComponent;
window.openHelpModal = openHelpModal;
window.closeHelpModal = closeHelpModal;