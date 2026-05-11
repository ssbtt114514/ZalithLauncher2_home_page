let currentMarkdown = '';
let currentFileName = 'home_page.md';
let fileCache = new Map();

function loadContent(content, filename) {
    currentMarkdown = content;
    currentFileName = filename;
    renderPreview(content);
    document.getElementById('fileName').textContent = filename;
    const editor = document.getElementById('editor');
    if (editor) editor.value = content;
    showToast(`已加载: ${filename}`);
}

function showLoading() {
    document.getElementById('preview').innerHTML = '<div class="loading">⏳ 加载中...</div>';
}

async function loadFromUrl(url, forceRefresh = false) {
    showLoading();
    const cached = fileCache.get(url);
    if (!forceRefresh && cached && (Date.now() - cached.time) < 300000) {
        loadContent(cached.content, url.split('/').pop());
        return;
    }
    try {
        const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const content = await res.text();
        fileCache.set(url, { content, time: Date.now() });
        loadContent(content, url.split('/').pop());
    } catch (e) {
        document.getElementById('preview').innerHTML = `<div class="error">加载失败: ${e.message}</div>`;
        showToast('加载失败');
    }
}

function downloadFile() {
    if (!currentMarkdown) { showToast('无内容'); return; }
    const blob = new Blob([currentMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFileName;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`已下载: ${currentFileName}`);
}

function uploadFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md,.markdown,.txt';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => loadContent(ev.target.result, file.name);
        reader.readAsText(file, 'UTF-8');
    };
    input.click();
}

function newFile() {
    const defaultContent = `// ============================================
// 🎮 Zalith Launcher 2 - 自定义主页
// 生成时间：${new Date().toLocaleString()}
// ============================================

// --- Bing 每日壁纸 ---
...image url="https://cn.bing.com/th?id=OHR.SpringCove_ZH-CN1234567890_1920x1080.jpg" width=100% shape=0dp

// --- 每日一言 ---
...card-start title="📜 每日一言" shape=large contentPadding=(16,12)
    ...column-start vertical=spacedBy(8) horizontal=Center
> *"星光不问赶路人，时光不负有心人。"*
        ...button-text text="📋 复制" event="copy{星光不问赶路人，时光不负有心人。}"
    ...column-end
...card-end

// --- 快捷操作 ---
...card-start title="🚀 快捷操作" shape=medium
    ...row-start horizontal=spacedBy(12)
        ...button text="▶️ 启动游戏" event="launch_game" weight=(1)
        ...button-outlined text="🔄 检查更新" event="check_update" weight=(1)
    ...row-end
...card-end

// --- Modrinth 最新模组 ---
...card-start title="🧩 最新模组"
...modrinth-list
...card-end
`;
    loadContent(defaultContent, '我的主页.md');
}

function saveFromEditor() {
    const editor = document.getElementById('editor');
    if (editor) {
        currentMarkdown = editor.value;
        renderPreview(editor.value);
        showToast('已保存');
    }
}

function openAuthor() {
    window.open('https://ssbtt114514.github.io/', '_blank');
}

window.currentMarkdown = currentMarkdown;
window.loadContent = loadContent;
window.loadFromUrl = loadFromUrl;
window.downloadFile = downloadFile;
window.uploadFile = uploadFile;
window.newFile = newFile;
window.saveFromEditor = saveFromEditor;
window.openAuthor = openAuthor;