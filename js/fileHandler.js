/**
 * 文件处理 - 加载、保存、下载、上传
 */

// 网络时间获取（使用 GMT-8 时区）
let cachedTime = null;

async function fetchBeijingTime() {
    // 如果已有缓存（5分钟内），直接返回
    if (cachedTime && (Date.now() - cachedTime.timestamp) < 300000) {
        return cachedTime.data;
    }
    
    try {
        // 使用 Etc/GMT-8 时区（北京时间 UTC+8）
        const res = await fetch('http://worldtimeapi.org/api/timezone/Etc/GMT-8', {
            signal: AbortSignal.timeout(5000)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        const date = new Date(data.unixtime * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        const result = {
            full: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
            date: `${year}-${month}-${day}`,
            time: `${hours}:${minutes}:${seconds}`
        };
        
        cachedTime = { data: result, timestamp: Date.now() };
        return result;
    } catch (e) {
        console.warn('网络时间获取失败，使用本地时间:', e.message);
        const localNow = new Date();
        const year = localNow.getFullYear();
        const month = String(localNow.getMonth() + 1).padStart(2, '0');
        const day = String(localNow.getDate()).padStart(2, '0');
        const hours = String(localNow.getHours()).padStart(2, '0');
        const minutes = String(localNow.getMinutes()).padStart(2, '0');
        const seconds = String(localNow.getSeconds()).padStart(2, '0');
        return {
            full: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
            date: `${year}-${month}-${day}`,
            time: `${hours}:${minutes}:${seconds}`
        };
    }
}

// 加载内容
function loadContent(content, filename) {
    window.currentMarkdown = content;
    window.currentFileName = filename;
    renderPreview(content);
    document.getElementById('fileName').textContent = filename;
    
    const editor = document.getElementById('editor');
    if (editor) editor.value = content;
    
    showToast(`已加载: ${filename}`);
}

// 显示加载状态
function showLoading() {
    const previewDiv = document.getElementById('preview');
    previewDiv.innerHTML = '<div class="loading">⏳ 加载中...</div>';
}

// 文件缓存
let fileCache = new Map();

async function loadFromUrl(url, forceRefresh = false) {
    showLoading();
    
    const cacheKey = url;
    const cached = fileCache.get(cacheKey);
    if (!forceRefresh && cached && (Date.now() - cached.time) < 5 * 60 * 1000) {
        console.log('使用缓存:', url);
        loadContent(cached.content, url.split('/').pop());
        return;
    }
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const res = await fetch(url, {
            signal: controller.signal,
            cache: 'force-cache'
        });
        clearTimeout(timeoutId);
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const content = await res.text();
        
        fileCache.set(cacheKey, {
            content: content,
            time: Date.now()
        });
        
        loadContent(content, url.split('/').pop());
    } catch (e) {
        console.error('加载失败:', e);
        document.getElementById('preview').innerHTML = `<div class="error">加载失败: ${e.message}<br>请使用"上传"按钮选择文件</div>`;
        showToast('加载失败');
    }
}

function downloadFile() {
    if (!window.currentMarkdown) {
        showToast('没有内容可下载');
        return;
    }
    const blob = new Blob([window.currentMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = window.currentFileName;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`已下载: ${window.currentFileName}`);
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
    const defaultContent = `// Zalith Launcher2 自定义主页
// 欢迎使用可视化编辑器！

# 🎮 我的游戏中心

...card-start title="📜 每日一言" shape=large contentPadding=(16,12)
    ...column-start vertical=spacedBy(8) horizontal=Center
> *"星光不问赶路人，时光不负有心人。"*

        ...row-start horizontal=spacedBy(12)
            ...button-text text="📋 复制" event="copy{星光不问赶路人，时光不负有心人。}"
        ...row-end
    ...column-end
...card-end

...card-start title="🚀 快捷操作" shape=medium contentPadding=(12)
    ...row-start horizontal=spacedBy(12) vertical=Center
        ...button text="▶️ 启动游戏" event="launch_game" weight=(1)
        ...button-outlined text="🔄 检查更新" event="check_update" weight=(1)
    ...row-end
...card-end

---

### 试试看

点击底部 **编辑模式**，然后：
- 点击组件按钮快速添加内容
- 在预览区拖拽调整元素顺序
- 点击元素修改属性（宽度、圆角等）
`;
    loadContent(defaultContent, '我的主页.md');
    showToast('已创建新文件');
}

function saveFromEditor() {
    const editor = document.getElementById('editor');
    if (editor) {
        window.currentMarkdown = editor.value;
        renderPreview(window.currentMarkdown);
        showToast('已保存并刷新预览');
        
        // 重新初始化拖拽功能
        setTimeout(() => {
            if (window.isEditMode) {
                setDragMode(true);
            }
        }, 100);
    }
}

function forceRefresh() {
    const url = window.currentFileName;
    if (url && url !== '我的主页.md') {
        fileCache.delete(url);
        loadFromUrl(url, true);
    } else {
        showToast('当前是新建文件，无需刷新');
    }
}

// 导出到全局
window.fetchBeijingTime = fetchBeijingTime;
window.loadContent = loadContent;
window.loadFromUrl = loadFromUrl;
window.downloadFile = downloadFile;
window.uploadFile = uploadFile;
window.newFile = newFile;
window.saveFromEditor = saveFromEditor;
window.forceRefresh = forceRefresh;
window.showLoading = showLoading;