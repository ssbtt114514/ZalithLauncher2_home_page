/**
 * 组件模板库 - 支持所有 Zalith Launcher2 扩展组件
 */

// 圆角选项（通用）
const SHAPE_OPTIONS = ['small', 'medium', 'large', 'extraSmall', 'extraLarge', '12dp', '20%', '50%'];

// 事件选项（通用）
const EVENT_OPTIONS = [
    'url{https://}',
    'copy{文本}', 
    'launch_game',
    'check_update',
    'open_folder{saves}',
    'open_folder{resourcepacks}',
    'open_folder{shaderpacks}',
    'open_folder{mods}'
];

// 所有组件模板
const ComponentTemplates = {
    // ==================== 容器组件 ====================
    
    // 卡片
    card: {
        name: '卡片容器',
        icon: '📦',
        category: '容器',
        fields: [
            { name: 'title', label: '卡片标题', type: 'text', placeholder: '例如：我的卡片', hint: '可选，留空则不显示标题栏' },
            { name: 'shape', label: '圆角大小', type: 'select', options: SHAPE_OPTIONS, default: 'medium' },
            { name: 'padding', label: '内边距', type: 'text', placeholder: '(16, 12)', hint: '格式：(全部) 或 (左右, 上下) 或 (左,上,右,下)' }
        ],
        template: (data) => {
            let attrs = '';
            if (data.title) attrs += ` title="${data.title}"`;
            if (data.shape && data.shape !== 'medium') attrs += ` shape=${data.shape}`;
            if (data.padding) attrs += ` contentPadding=${data.padding}`;
            return `...card-start${attrs}\n\n  这里写卡片内容\n\n...card-end`;
        }
    },

    // ==================== 按钮组件（4种样式） ====================
    
    // 填充按钮（实心）
    button_filled: {
        name: '填充按钮',
        icon: '🔵',
        category: '按钮',
        fields: [
            { name: 'text', label: '按钮文字', type: 'text', required: true, placeholder: '例如：点击我' },
            { name: 'event', label: '点击事件', type: 'select', options: EVENT_OPTIONS, default: 'copy{文本}' },
            { name: 'width', label: '宽度', type: 'text', placeholder: '留空为自动', hint: '例如：50% 或 120dp' },
            { name: 'shape', label: '圆角', type: 'select', options: SHAPE_OPTIONS, placeholder: '留空为默认' }
        ],
        template: (data) => {
            let ev = data.event;
            if (ev === 'url{https://}') ev = 'url{https://example.com}';
            if (ev === 'copy{文本}') ev = 'copy{要复制的文字}';
            let attrs = `text="${data.text}" event="${ev}"`;
            if (data.width && data.width.trim()) attrs += ` width=${data.width}`;
            if (data.shape && data.shape.trim()) attrs += ` shape=${data.shape}`;
            return `...button ${attrs}`;
        }
    },
    
    // 边框按钮
    button_outlined: {
        name: '边框按钮',
        icon: '🔲',
        category: '按钮',
        fields: [
            { name: 'text', label: '按钮文字', type: 'text', required: true, placeholder: '例如：了解更多' },
            { name: 'event', label: '点击事件', type: 'select', options: EVENT_OPTIONS, default: 'url{https://}' },
            { name: 'width', label: '宽度', type: 'text', placeholder: '留空为自动', hint: '例如：50% 或 120dp' },
            { name: 'shape', label: '圆角', type: 'select', options: SHAPE_OPTIONS, placeholder: '留空为默认' }
        ],
        template: (data) => {
            let ev = data.event;
            if (ev === 'url{https://}') ev = 'url{https://example.com}';
            if (ev === 'copy{文本}') ev = 'copy{要复制的文字}';
            let attrs = `text="${data.text}" event="${ev}"`;
            if (data.width && data.width.trim()) attrs += ` width=${data.width}`;
            if (data.shape && data.shape.trim()) attrs += ` shape=${data.shape}`;
            return `...button-outlined ${attrs}`;
        }
    },
    
    // 色调填充按钮
    button_tonal: {
        name: '柔和按钮',
        icon: '🎨',
        category: '按钮',
        fields: [
            { name: 'text', label: '按钮文字', type: 'text', required: true, placeholder: '例如：确认' },
            { name: 'event', label: '点击事件', type: 'select', options: EVENT_OPTIONS, default: 'launch_game' },
            { name: 'width', label: '宽度', type: 'text', placeholder: '留空为自动' },
            { name: 'shape', label: '圆角', type: 'select', options: SHAPE_OPTIONS, placeholder: '留空为默认' }
        ],
        template: (data) => {
            let ev = data.event;
            if (ev === 'url{https://}') ev = 'url{https://example.com}';
            if (ev === 'copy{文本}') ev = 'copy{要复制的文字}';
            let attrs = `text="${data.text}" event="${ev}"`;
            if (data.width && data.width.trim()) attrs += ` width=${data.width}`;
            if (data.shape && data.shape.trim()) attrs += ` shape=${data.shape}`;
            return `...button-filled-tonal ${attrs}`;
        }
    },
    
    // 纯文字按钮
    button_text: {
        name: '文字按钮',
        icon: '📝',
        category: '按钮',
        fields: [
            { name: 'text', label: '按钮文字', type: 'text', required: true, placeholder: '例如：查看详情' },
            { name: 'event', label: '点击事件', type: 'select', options: EVENT_OPTIONS, default: 'url{https://}' },
            { name: 'width', label: '宽度', type: 'text', placeholder: '留空为自动' }
        ],
        template: (data) => {
            let ev = data.event;
            if (ev === 'url{https://}') ev = 'url{https://example.com}';
            if (ev === 'copy{文本}') ev = 'copy{要复制的文字}';
            let attrs = `text="${data.text}" event="${ev}"`;
            if (data.width && data.width.trim()) attrs += ` width=${data.width}`;
            return `...button-text ${attrs}`;
        }
    },

    // ==================== 布局组件 ====================
    
    // 横向布局
    row: {
        name: '横向布局',
        icon: '↔️',
        category: '布局',
        fields: [
            { name: 'spacing', label: '子元素间距', type: 'text', placeholder: '8', hint: '单位 dp，例如：8 或 12' },
            { name: 'horizontalArr', label: '水平排列方式', type: 'select', options: ['Start', 'Center', 'End', 'SpaceEvenly', 'SpaceBetween', 'SpaceAround'], default: 'Start' },
            { name: 'verticalAlign', label: '垂直对齐方式', type: 'select', options: ['Top', 'Center', 'Bottom'], default: 'Top' }
        ],
        template: (data) => {
            let attrs = '';
            if (data.spacing && data.horizontalArr !== 'Start') {
                attrs = ` horizontal=spacedBy(${data.spacing}, ${data.horizontalArr})`;
            } else if (data.spacing) {
                attrs = ` horizontal=spacedBy(${data.spacing})`;
            } else if (data.horizontalArr && data.horizontalArr !== 'Start') {
                attrs = ` horizontal=${data.horizontalArr}`;
            }
            if (data.verticalAlign && data.verticalAlign !== 'Top') {
                attrs += ` vertical=${data.verticalAlign}`;
            }
            return `...row-start${attrs}\n    ...button text="按钮1" weight=(1)\n    ...button text="按钮2" weight=(1)\n...row-end`;
        }
    },
    
    // 纵向布局
    column: {
        name: '纵向布局',
        icon: '↕️',
        category: '布局',
        fields: [
            { name: 'spacing', label: '子元素间距', type: 'text', placeholder: '8', hint: '单位 dp，例如：8 或 12' },
            { name: 'verticalArr', label: '垂直排列方式', type: 'select', options: ['Top', 'Center', 'Bottom', 'SpaceEvenly', 'SpaceBetween', 'SpaceAround'], default: 'Top' },
            { name: 'horizontalAlign', label: '水平对齐方式', type: 'select', options: ['Start', 'Center', 'End'], default: 'Start' }
        ],
        template: (data) => {
            let attrs = '';
            if (data.spacing && data.verticalArr !== 'Top') {
                attrs = ` vertical=spacedBy(${data.spacing}, ${data.verticalArr})`;
            } else if (data.spacing) {
                attrs = ` vertical=spacedBy(${data.spacing})`;
            } else if (data.verticalArr && data.verticalArr !== 'Top') {
                attrs = ` vertical=${data.verticalArr}`;
            }
            if (data.horizontalAlign && data.horizontalAlign !== 'Start') {
                attrs += ` horizontal=${data.horizontalAlign}`;
            }
            return `...column-start${attrs}\n    ...button text="按钮1"\n    ...button text="按钮2"\n...column-end`;
        }
    },

    // ==================== 媒体组件 ====================
    
    // 图片
    image: {
        name: '图片',
        icon: '🖼️',
        category: '媒体',
        fields: [
            { name: 'url', label: '图片链接', type: 'text', required: true, placeholder: 'https://example.com/image.jpg', hint: '必填，支持网络图片' },
            { name: 'width', label: '宽度', type: 'text', placeholder: '100%', hint: '例如：50% 或 200dp' },
            { name: 'shape', label: '圆角', type: 'select', options: SHAPE_OPTIONS, placeholder: '留空为默认' }
        ],
        template: (data) => {
            let attrs = `url="${data.url}"`;
            if (data.width && data.width.trim()) attrs += ` width=${data.width}`;
            if (data.shape && data.shape.trim()) attrs += ` shape=${data.shape}`;
            return `...image ${attrs}`;
        }
    },

    // ==================== 排版组件 ====================
    
    // 分割线
    divider: {
        name: '分割线',
        icon: '➖',
        category: '排版',
        fields: [],
        template: () => '\n---\n'
    },
    
    // 标题（H1-H6）
    heading: {
        name: '标题',
        icon: '📌',
        category: '排版',
        fields: [
            { name: 'level', label: '标题级别', type: 'select', options: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'], default: 'H2' },
            { name: 'text', label: '标题文字', type: 'text', required: true, placeholder: '例如：章节标题' }
        ],
        template: (data) => {
            const level = parseInt(data.level.replace('H', '')) || 2;
            return `${'#'.repeat(level)} ${data.text}`;
        }
    },
    
    // 引用块
    quote: {
        name: '引用块',
        icon: '💬',
        category: '排版',
        fields: [
            { name: 'text', label: '引用内容', type: 'textarea', required: true, placeholder: '这是引用内容...', hint: '支持 Markdown 语法' }
        ],
        template: (data) => {
            return `> ${data.text}`;
        }
    },
    
    // 列表
    list: {
        name: '列表',
        icon: '📋',
        category: '排版',
        fields: [
            { name: 'type', label: '列表类型', type: 'select', options: ['无序列表', '有序列表'], default: '无序列表' },
            { name: 'items', label: '列表项', type: 'textarea', required: true, placeholder: '项目1\n项目2\n项目3', hint: '每行一个项目' }
        ],
        template: (data) => {
            const items = data.items.split('\n').filter(item => item.trim());
            const marker = data.type === '有序列表' ? '1. ' : '- ';
            return items.map(item => `${marker}${item.trim()}`).join('\n');
        }
    },

    // ==================== 高级组件（带权重） ====================
    
    // 带权重的按钮（用于 Row 内部）
    button_weighted: {
        name: '权重按钮',
        icon: '⚖️',
        category: '高级',
        fields: [
            { name: 'text', label: '按钮文字', type: 'text', required: true, placeholder: '例如：按钮' },
            { name: 'weight', label: '权重值', type: 'number', required: true, placeholder: '1', hint: '数值越大占空间越大，如 1, 2, 3' },
            { name: 'event', label: '点击事件', type: 'select', options: EVENT_OPTIONS, default: 'copy{文本}' }
        ],
        template: (data) => {
            let ev = data.event;
            if (ev === 'url{https://}') ev = 'url{https://example.com}';
            if (ev === 'copy{文本}') ev = 'copy{要复制的文字}';
            return `...button text="${data.text}" event="${ev}" weight=(${data.weight})`;
        }
    }

    // 注：权重属性仅支持在 Row 内部使用
};

// 帮助内容（完整版）
const HelpContent = `
<h3>📦 容器组件</h3>
<pre><code>...card-start title="卡片标题" shape=medium contentPadding=(16,12)
卡片内容（支持 Markdown）
...card-end</code></pre>

<h3>🔘 按钮组件（4种样式）</h3>
<pre><code>...button text="填充按钮" event="url{https://example.com}"
...button-outlined text="边框按钮" event="copy{文本}"
...button-filled-tonal text="柔和按钮" event="launch_game"
...button-text text="文字按钮" event="check_update"</code></pre>

<h3>↔️ 布局组件</h3>
<pre><code>...row-start horizontal=spacedBy(8) vertical=Center
    ...button text="按钮1" weight=(1)
    ...button text="按钮2" weight=(1)
...row-end

...column-start vertical=spacedBy(8) horizontal=Center
    ...button text="按钮1"
    ...button text="按钮2"
...column-end</code></pre>

<h3>🖼️ 媒体组件</h3>
<pre><code>...image url="https://example.com/image.jpg" width=50% shape=12dp</code></pre>

<h3>📝 排版组件</h3>
<pre><code># 一级标题
## 二级标题

> 引用内容

- 列表项1
- 列表项2

---  (分割线)</code></pre>

<h3>📋 支持的事件类型</h3>
<ul>
<li><code>url{https://...}</code> - 在浏览器中打开链接</li>
<li><code>copy{文本}</code> - 复制文本到剪贴板</li>
<li><code>launch_game</code> - 启动当前选中的游戏版本</li>
<li><code>check_update</code> - 检查启动器更新</li>
<li><code>open_folder{saves}</code> - 打开存档文件夹</li>
<li><code>open_folder{mods}</code> - 打开模组文件夹</li>
<li><code>open_folder{resourcepacks}</code> - 打开资源包文件夹</li>
<li><code>open_folder{shaderpacks}</code> - 打开光影包文件夹</li>
</ul>

<h3>⚖️ 权重属性（仅在 Row 内有效）</h3>
<pre><code>...row-start
    ...button text="占1份" weight=(1)
    ...button text="占2份" weight=(2)
...row-end</code></pre>

<h3>🎨 圆角大小选项</h3>
<ul>
<li>预设：<code>extraSmall</code> (4px), <code>small</code> (8px), <code>medium</code> (12px), <code>large</code> (16px), <code>extraLarge</code> (24px)</li>
<li>自定义：<code>12dp</code> (固定像素), <code>20%</code> (百分比)</li>
</ul>
`;

// 导出到全局
window.ComponentTemplates = ComponentTemplates;
window.HelpContent = HelpContent;