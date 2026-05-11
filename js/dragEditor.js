/**
 * 拖拽编辑器 - 支持元素拖动、属性调整
 */

let selectedElement = null;
let isDragMode = false;

// 初始化拖拽功能
function initDragAndDrop() {
    const previewDiv = document.getElementById('preview');
    
    // 使用 SortableJS 实现拖拽排序
    new Sortable(previewDiv, {
        animation: 300,
        handle: '.draggable-element',
        draggable: '.draggable-element',
        onEnd: function() {
            // 拖拽结束后更新源码
            updateSourceFromDOM();
        }
    });
    
    // 添加点击选中事件
    previewDiv.addEventListener('click', (e) => {
        if (!isDragMode) return;
        
        // 查找被点击的元素是否是可拖拽元素
        let target = e.target;
        while (target && target !== previewDiv) {
            if (target.classList && target.classList.contains('draggable-element')) {
                selectElement(target);
                break;
            }
            target = target.parentElement;
        }
    });
}

// 选中元素
function selectElement(element) {
    // 移除之前的选中样式
    if (selectedElement) {
        selectedElement.classList.remove('selected');
    }
    
    selectedElement = element;
    selectedElement.classList.add('selected');
    
    // 显示属性面板
    showPropertyPanel(element);
}

// 显示属性面板
function showPropertyPanel(element) {
    const panel = document.getElementById('propertyPanel');
    const content = document.getElementById('propertyContent');
    
    // 获取元素类型和当前属性
    const elementInfo = getElementInfo(element);
    
    let html = `
        <div class="prop-group">
            <label>元素类型</label>
            <input type="text" class="prop-input" value="${elementInfo.type}" disabled>
        </div>
        <div class="prop-group">
            <label>显示文字</label>
            <input type="text" id="prop_text" class="prop-input" value="${elementInfo.text || ''}" placeholder="按钮文字">
        </div>
        <div class="prop-group">
            <label>宽度</label>
            <div class="prop-slider-row">
                <input type="range" id="prop_width_slider" class="prop-slider" min="0" max="100" step="1" value="${parseInt(elementInfo.width) || 0}">
                <input type="text" id="prop_width" class="prop-slider-value" value="${elementInfo.width || 'auto'}">
            </div>
        </div>
        <div class="prop-group">
            <label>圆角大小</label>
            <div class="prop-slider-row">
                <input type="range" id="prop_radius_slider" class="prop-slider" min="0" max="32" step="1" value="${parseInt(elementInfo.radius) || 8}">
                <input type="text" id="prop_radius" class="prop-slider-value" value="${elementInfo.radius || '8px'}">
            </div>
        </div>
    `;
    
    // 如果是按钮，添加事件选项
    if (elementInfo.type === '按钮') {
        html += `
        <div class="prop-group">
            <label>点击事件</label>
            <select id="prop_event" class="prop-input">
                <option value="url {https://}" ${elementInfo.event === 'url {https://}' ? 'selected' : ''}>打开链接 (url)</option>
                <option value="copy {}" ${elementInfo.event === 'copy {}' ? 'selected' : ''}>复制文本 (copy)</option>
                <option value="launch_game" ${elementInfo.event === 'launch_game' ? 'selected' : ''}>启动游戏</option>
                <option value="check_update" ${elementInfo.event === 'check_update' ? 'selected' : ''}>检查更新</option>
            </select>
        </div>
        `;
    }
    
    // 如果是图片，添加图片URL
    if (elementInfo.type === '图片') {
        html += `
        <div class="prop-group">
            <label>图片链接</label>
            <input type="text" id="prop_url" class="prop-input" value="${elementInfo.url || ''}" placeholder="https://...">
        </div>
        `;
    }
    
    html += `
        <div class="prop-group">
            <button id="applyChangesBtn" class="btn-primary" style="width:100%">应用更改</button>
        </div>
        <div class="prop-group">
            <button id="deleteElementBtn" class="btn-secondary" style="width:100%; background:#7f1a1a;">删除元素</button>
        </div>
    `;
    
    content.innerHTML = html;
    panel.style.display = 'flex';
    
    // 绑定事件
    document.getElementById('applyChangesBtn').onclick = () => applyChanges(element);
    document.getElementById('deleteElementBtn').onclick = () => deleteElement(element);
    
    // 绑定滑块同步
    const widthSlider = document.getElementById('prop_width_slider');
    const widthInput = document.getElementById('prop_width');
    if (widthSlider && widthInput) {
        widthSlider.oninput = () => {
            widthInput.value = widthSlider.value + '%';
        };
        widthInput.onchange = () => {
            let val = widthInput.value;
            if (val.endsWith('%')) {
                widthSlider.value = parseInt(val);
            } else if (val.endsWith('px')) {
                widthSlider.value = parseInt(val);
            } else if (!isNaN(val)) {
                widthSlider.value = parseInt(val);
            }
        };
    }
    
    const radiusSlider = document.getElementById('prop_radius_slider');
    const radiusInput = document.getElementById('prop_radius');
    if (radiusSlider && radiusInput) {
        radiusSlider.oninput = () => {
            radiusInput.value = radiusSlider.value + 'px';
        };
        radiusInput.onchange = () => {
            let val = radiusInput.value;
            if (val.endsWith('px')) {
                radiusSlider.value = parseInt(val);
            } else if (!isNaN(val)) {
                radiusSlider.value = parseInt(val);
            }
        };
    }
}

// 获取元素信息
function getElementInfo(element) {
    let type = '未知';
    let text = '';
    let width = '';
    let radius = '';
    let event = '';
    let url = '';
    
    if (element.classList.contains('btn')) {
        type = '按钮';
        text = element.textContent;
        width = element.style.width || 'auto';
        radius = element.style.borderRadius || '8px';
        // 从 onclick 属性提取事件
        const onclick = element.getAttribute('onclick');
        if (onclick) {
            const match = onclick.match(/handleEvent\('(.+?)'\)/);
            if (match) event = match[1];
        }
    } else if (element.classList.contains('custom-image')) {
        type = '图片';
        width = element.style.width || '100%';
        radius = element.style.borderRadius || '8px';
        url = element.src;
    } else if (element.classList.contains('custom-card')) {
        type = '卡片';
        radius = element.style.borderRadius || '12px';
        const titleEl = element.querySelector('.card-title');
        if (titleEl) text = titleEl.textContent;
    }
    
    return { type, text, width, radius, event, url };
}

// 应用更改
function applyChanges(element) {
    const info = getElementInfo(element);
    
    if (info.type === '按钮') {
        const newText = document.getElementById('prop_text')?.value || element.textContent;
        const newWidth = document.getElementById('prop_width')?.value || info.width;
        const newRadius = document.getElementById('prop_radius')?.value || info.radius;
        const newEvent = document.getElementById('prop_event')?.value || info.event;
        
        element.textContent = newText;
        element.style.width = newWidth;
        element.style.borderRadius = newRadius;
        
        // 更新 onclick 事件
        if (newEvent) {
            element.setAttribute('onclick', `window.handleEvent('${newEvent}')`);
        }
    } else if (info.type === '图片') {
        const newWidth = document.getElementById('prop_width')?.value || info.width;
        const newRadius = document.getElementById('prop_radius')?.value || info.radius;
        const newUrl = document.getElementById('prop_url')?.value || info.url;
        
        element.style.width = newWidth;
        element.style.borderRadius = newRadius;
        if (newUrl) element.src = newUrl;
    } else if (info.type === '卡片') {
        const newRadius = document.getElementById('prop_radius')?.value || info.radius;
        element.style.borderRadius = newRadius;
    }
    
    // 更新源码
    updateSourceFromDOM();
    showToast('已应用更改');
}

// 删除元素
function deleteElement(element) {
    element.remove();
    updateSourceFromDOM();
    document.getElementById('propertyPanel').style.display = 'none';
    selectedElement = null;
    showToast('已删除元素');
}

// 根据 DOM 更新源码
function updateSourceFromDOM() {
    // 这个方法需要将当前的 DOM 结构转换回 Markdown
    // 这里简化处理：提示用户需要手动保存
    showToast('请在编辑模式中查看源码变化');
}

// 切换拖拽模式
function setDragMode(enabled) {
    isDragMode = enabled;
    const previewDiv = document.getElementById('preview');
    
    if (enabled) {
        previewDiv.classList.add('drag-mode');
        // 为所有可拖拽元素添加类
        document.querySelectorAll('.btn, .custom-card, .custom-image').forEach(el => {
            el.classList.add('draggable-element');
        });
        showToast('拖拽模式已开启，可拖动元素调整顺序，点击元素修改属性');
    } else {
        previewDiv.classList.remove('drag-mode');
        document.querySelectorAll('.draggable-element').forEach(el => {
            el.classList.remove('draggable-element');
        });
        if (selectedElement) {
            selectedElement.classList.remove('selected');
            selectedElement = null;
        }
        document.getElementById('propertyPanel').style.display = 'none';
    }
}

// 关闭属性面板
function closePropertyPanel() {
    document.getElementById('propertyPanel').style.display = 'none';
    if (selectedElement) {
        selectedElement.classList.remove('selected');
        selectedElement = null;
    }
}