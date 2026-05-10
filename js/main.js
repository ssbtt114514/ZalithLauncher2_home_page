/**
 * 主入口 - 初始化应用
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有模块
    bindToolbarButtons();
    bindComponentButtons();
    bindModalEvents();
    
    // 尝试加载默认文件
    loadFromUrl('home_page.md').catch(() => {
        loadFromUrl('sample.md').catch(() => {
            newFile();
        });
    });
});