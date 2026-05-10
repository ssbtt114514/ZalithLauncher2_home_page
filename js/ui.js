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

// 按分类组织组件按钮
const COMPONENT_CATEGORIES = [
    {
        name: '容器',
        items: ['card']
    },
    {
        name: '按钮',
        items: ['button_filled', 'button_outlined', 'button_tonal', 'button_text']
    },
    {
        name: '布局',
        items: ['row', 'column']
    },
    {
        name: '媒体',
        items: ['image']
    },
    {
        name: '排版',
        items: ['divider', 'heading', 'quote', 'list']
    },
    {
        name: '高级',
        items: ['button_weighted']
    }
];

// 获取组件显示名称
function getComponentDisplay(type) {
    const names = {
        card: '📦 卡片',
        button_filled: '🔵 填充按钮',
        button_outlined: '🔲 边框按钮',
        button_tonal: '🎨 柔和按钮',
        button_text: '📝 文字按钮',
        button_weighted: '⚖️ 权重按钮',
        row: '↔️ 横向布局',
        column: '↕️ 纵向布局',
        image: '🖼️ 图片',
        divider: '➖ 分割线',
        heading: '📌 标题',
        quote: '💬 引用块',
        list: '📋 列表'
    };
    return names[type] || type;
}

// 渲染组件工具栏（按分类）
function renderComponentBar() {
    const container = document.querySelector('.component-list');
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
                btn.textContent = getComponentDisplay(type);
                btn.title = ComponentTemplates[type].name;
                container.appendChild(btn);
            }
        }
    }
}

// 绑定组件按钮事件
function bindComponentButtons() {
    // 重新渲染工具栏
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

// 导出全局函数
window.showToast = showToast;
window.toggleEditMode = toggleEditMode;
window.bindComponentButtons = bindComponentButtons;
window.bindModalEvents = bindModalEvents;
window.bindToolbarButtons = bindToolbarButtons;