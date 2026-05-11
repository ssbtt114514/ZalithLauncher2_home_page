document.addEventListener('DOMContentLoaded', () => {
    bindComponentButtons();
    bindTopButtons();
    bindModalEvents();
    
    // 编辑器实时同步到预览
    const editor = document.getElementById('editor');
    if (editor) {
        editor.oninput = () => {
            currentMarkdown = editor.value;
            renderPreview(editor.value);
        };
    }
    
    loadFromUrl('home_page.md').catch(() => {
        loadFromUrl('sample.md').catch(() => newFile());
    });
});

window.currentMarkdown = '';
window.currentFileName = 'home_page.md';