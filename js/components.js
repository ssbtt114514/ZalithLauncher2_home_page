const SHAPE_OPTIONS = ['extraSmall', 'small', 'medium', 'large', 'extraLarge', '12dp', '20%', '50%'];
const EVENT_OPTIONS = ['url {https://}', 'copy {}', 'launch_game', 'check_update'];

const ComponentTemplates = {
    card: {
        name: '卡片',
        fields: [
            { name: 'title', label: '卡片标题', type: 'text', placeholder: '我的卡片', hint: '可选' },
            { name: 'shape', label: '圆角', type: 'select', options: SHAPE_OPTIONS, default: 'medium' },
            { name: 'padding', label: '内边距', type: 'text', placeholder: '(16, 12)' }
        ],
        template: (data) => {
            let attrs = '';
            if (data.title) attrs += ` title="${data.title}"`;
            if (data.shape && data.shape !== 'medium') attrs += ` shape=${data.shape}`;
            if (data.padding) attrs += ` contentPadding=${data.padding}`;
            return `...card-start${attrs}\n\n  卡片内容\n\n...card-end`;
        }
    },
    button_filled: {
        name: '填充按钮',
        fields: [
            { name: 'text', label: '文字', type: 'text', required: true, placeholder: '点击我' },
            { name: 'event', label: '事件', type: 'select', options: EVENT_OPTIONS, default: 'url {https://}' },
            { name: 'width', label: '宽度', type: 'text', placeholder: 'auto', hint: '50% 或 120dp' }
        ],
        template: (data) => {
            let ev = data.event || 'url {https://}';
            if (ev === 'url {https://}') ev = 'url {https://example.com}';
            if (ev === 'copy {}') ev = 'copy {文本}';
            let attrs = `text="${data.text}" event="${ev}"`;
            if (data.width && data.width !== 'auto') attrs += ` width=${data.width}`;
            return `...button ${attrs}`;
        }
    },
    button_outlined: {
        name: '边框按钮',
        fields: [
            { name: 'text', label: '文字', type: 'text', required: true, placeholder: '了解更多' },
            { name: 'event', label: '事件', type: 'select', options: EVENT_OPTIONS, default: 'check_update' }
        ],
        template: (data) => `...button-outlined text="${data.text}" event="${data.event || 'check_update'}"`
    },
    button_tonal: {
        name: '色调按钮',
        fields: [{ name: 'text', label: '文字', type: 'text', required: true, placeholder: '确认' }],
        template: (data) => `...button-filled-tonal text="${data.text}"`
    },
    button_text: {
        name: '文字按钮',
        fields: [{ name: 'text', label: '文字', type: 'text', required: true, placeholder: '查看详情' }],
        template: (data) => `...button-text text="${data.text}"`
    },
    row: {
        name: '横向布局',
        fields: [
            { name: 'spacing', label: '间距', type: 'text', placeholder: '8' },
            { name: 'align', label: '垂直对齐', type: 'select', options: ['Top', 'Center', 'Bottom'], default: 'Top' }
        ],
        template: (data) => {
            let attrs = '';
            if (data.spacing) attrs = ` horizontal=spacedBy(${data.spacing})`;
            if (data.align && data.align !== 'Top') attrs += ` vertical=${data.align}`;
            return `...row-start${attrs}\n    ...button text="按钮1" weight=(1)\n    ...button text="按钮2" weight=(1)\n...row-end`;
        }
    },
    column: {
        name: '纵向布局',
        fields: [
            { name: 'spacing', label: '间距', type: 'text', placeholder: '8' },
            { name: 'align', label: '水平对齐', type: 'select', options: ['Start', 'Center', 'End'], default: 'Start' }
        ],
        template: (data) => {
            let attrs = '';
            if (data.spacing) attrs = ` vertical=spacedBy(${data.spacing})`;
            if (data.align && data.align !== 'Start') attrs += ` horizontal=${data.align}`;
            return `...column-start${attrs}\n    ...button text="按钮1"\n    ...button text="按钮2"\n...column-end`;
        }
    },
    image: {
        name: '图片',
        fields: [
            { name: 'url', label: '图片链接', type: 'text', required: true, placeholder: 'https://picsum.photos/400' },
            { name: 'width', label: '宽度', type: 'text', placeholder: '100%' },
            { name: 'shape', label: '圆角', type: 'select', options: SHAPE_OPTIONS }
        ],
        template: (data) => {
            let attrs = `url="${data.url}"`;
            if (data.width) attrs += ` width=${data.width}`;
            if (data.shape) attrs += ` shape=${data.shape}`;
            return `...image ${attrs}`;
        }
    },
    divider: { name: '分割线', fields: [], template: () => '\n---\n' },
    heading: {
        name: '标题',
        fields: [
            { name: 'level', label: '级别', type: 'select', options: ['#', '##', '###', '####'], default: '##' },
            { name: 'text', label: '文字', type: 'text', required: true }
        ],
        template: (data) => `${data.level} ${data.text}`
    },
    quote: {
        name: '引用',
        fields: [{ name: 'text', label: '内容', type: 'textarea', required: true }],
        template: (data) => `> ${data.text}`
    },
    list: {
        name: '列表',
        fields: [
            { name: 'type', label: '类型', type: 'select', options: ['无序(-)', '有序(1.)'], default: '无序(-)' },
            { name: 'items', label: '列表项', type: 'textarea', required: true, hint: '每行一项' }
        ],
        template: (data) => {
            const items = data.items.split('\n').filter(i => i.trim());
            const marker = data.type === '有序(1.)' ? '1. ' : '- ';
            return items.map(i => `${marker}${i.trim()}`).join('\n');
        }
    }
};

const HelpContent = `
<h3>📦 卡片</h3>
<pre><code>...card-start title="标题" shape=medium
内容
...card-end</code></pre>

<h3>🔘 按钮</h3>
<pre><code>...button text="填充" event="url {https://}"
...button-outlined text="边框" event="check_update"
...button-filled-tonal text="色调"
...button-text text="文字"</code></pre>

<h3>📐 布局</h3>
<pre><code>...row-start horizontal=spacedBy(8)
    ...button text="1" weight=(1)
...row-end</code></pre>

<h3>⚠️ 注意</h3>
<ul><li>卡片不能放在 Row/Column 内</li><li>组件必须成对</li></ul>
`;

function getComponentDisplayName(type) {
    const names = {
        card: '卡片', button_filled: '填充', button_outlined: '边框',
        button_tonal: '色调', button_text: '文字', row: '横向',
        column: '纵向', image: '图片', divider: '分割线',
        heading: '标题', quote: '引用', list: '列表'
    };
    return names[type] || type;
}

window.ComponentTemplates = ComponentTemplates;
window.HelpContent = HelpContent;
window.getComponentDisplayName = getComponentDisplayName;