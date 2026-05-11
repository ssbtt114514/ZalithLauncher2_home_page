let pendingComponent = null;

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function openComponentModal(type) {
    const tmpl = ComponentTemplates[type];
    if (!tmpl) return;
    
    pendingComponent = type;
    document.getElementById('modalTitle').textContent = `添加 ${tmpl.name}`;
    
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
    pendingComponent = null;
}

function insertComponent() {
    if (!pendingComponent) return;
    const tmpl = ComponentTemplates[pendingComponent];
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
        currentMarkdown = editor.value;
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

function bindTopButtons() {
    document.getElementById('newBtn').onclick = newFile;
    document.getElementById('uploadBtn').onclick = uploadFile;
    document.getElementById('downloadBtn').onclick = downloadFile;
    document.getElementById('refreshBtn').onclick = () => {
        if (currentMarkdown) renderPreview(currentMarkdown);
        else forceRefresh();
    };
    document.getElementById('authorBtn').onclick = openAuthor;
}

function bindSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    if (toggleBtn) {
        toggleBtn.onclick = () => {
            sidebar.classList.toggle('collapsed');
            toggleBtn.textContent = sidebar.classList.contains('collapsed') ? '▶' : '◀';
        };
    }
}

function bindCodeToggle() {
    const codeBody = document.getElementById('codeBody');
    const toggleBtn = document.getElementById('toggleCode');
    if (toggleBtn) {
        toggleBtn.onclick = () => {
            codeBody.classList.toggle('collapsed');
            toggleBtn.textContent = codeBody.classList.contains('collapsed') ? '▼' : '▲';
        };
    }
}

function closePropertyPanel() {
    const panel = document.getElementById('propertyPanel');
    panel.classList.remove('open');
    setTimeout(() => { panel.style.display = 'none'; }, 300);
}

window.showToast = showToast;
window.bindComponentButtons = bindComponentButtons;
window.bindTopButtons = bindTopButtons;
window.bindSidebarToggle = bindSidebarToggle;
window.bindCodeToggle = bindCodeToggle;
window.bindModalEvents = bindModalEvents;
window.closePropertyPanel = closePropertyPanel;