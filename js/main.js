document.addEventListener('DOMContentLoaded', () => {
    bindComponentButtons();
    bindTopButtons();
    bindSidebarToggle();
    bindCodeToggle();
    bindModalEvents();
    
    // 编辑器实时同步
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