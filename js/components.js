/**
 * 组件模板 - 严格按照官方教程
 */

const SHAPE_OPTIONS = ['extraSmall', 'small', 'medium', 'large', 'extraLarge', '12dp', '20%', '50%'];
const EVENT_OPTIONS = ['url {https://}', 'copy {}', 'launch_game', 'check_update'];

const ComponentTemplates = {
    card: {
        name: '卡片',
        fields: [
            { name: 'title', label: '卡片标题', type: 'text', placeholder: '我的卡片', hint: '可选，留空则不显示标题' },
            { name: 'shape', label: '圆角大小', type: 'select', options: SHAPE_OPTIONS, default: 'medium' },
            { name: 'padding', label: '内边距', type: 'text', placeholder: '(16, 12)', hint: '格式：(all) 或 (左右, 上下) 或 (左,上,右,下)' }
        ],
        template: (data) => {
            let attrs = '';
            if (data.title) attrs += ` title="${data.title}"`;
            if (data.shape && data.shape !== 'medium') attrs += ` shape=${data.shape}`;
            if (data.padding) attrs += ` contentPadding=${data.padding}`;
            return `...card-start${attrs}\n\n  这里写卡片内容\n\n...card-end`;
        }
    },
    button_filled: {
        name: '填充按钮',
        fields: [
            { name: 'text', label: '按钮文字', type: 'text', required: true, placeholder: '点击我' },
            { name: 'event', label: '点击事件', type: 'select', options: EVENT_OPTIONS, default: 'url {https://}' },
            { name: 'width', label: '宽度', type: 'text', placeholder: 'auto', hint: '例如：50% 或 120dp' }
        ],
        template: (data) => {
            let ev = data.event || 'url {https://}';
            if (ev === 'url {https://}') ev = 'url {https://example.com}';
            if (ev === 'copy {}') ev = 'copy {要复制的文字}';
            let attrs = `text="${data.text}" event="${ev}"`;
            if (data.width && data.width !== 'auto') attrs += ` width=${data.width}`;
            return `...button ${attrs}`;
        }
    },
    button_outlined: {
        name: '边框按钮',
        fields: [
            { name: 'text', label: '按钮文字', type: 'text', required: true, placeholder: '了解更多' },
            { name: 'event', label: '点击事件', type: 'select', options: EVENT_OPTIONS, default: 'check_update' }
        ],
        template: (data) => {
            let ev = data.event || 'check_update';
            return `...button-outlined text="${data.text}" event="${ev}"`;
        }
    },
    button_tonal: {
        name: '色调按钮',
        fields: [
            { name: 'text', label: '按钮文字', type: 'text', required: true, placeholder: '确认' }
        ],
        template: (data) => {
            return `...button-filled-tonal text="${data.text}"`;
        }
    },
    button_text: {
        name: '文字按钮',
        fields: [
            { name: 'text', label: '按钮文字', type: 'text', required: true, placeholder: '查看详情' }
        ],
        template: (data) => {
            return `...button-text text="${data.text}"`;
        }
    },
    row: {
        name: '横向布局',
        fields: [
            { name: 'spacing', label: '间距', type: 'text', placeholder: '8', hint: '子元素间距(dp)' },
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
            { name: 'spacing', label: '间距', type: 'text', placeholder: '8', hint: '子元素间距(dp)' },
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
            { name: 'width', label: '宽度', type: 'text', placeholder: '100%', hint: '例如：50% 或 200dp' },
            { name: 'shape', label: '圆角', type: 'select', options: SHAPE_OPTIONS, placeholder: '默认' }
        ],
        template: (data) => {
            let attrs = `url="${data.url}"`;
            if (data.width) attrs += ` width=${data.width}`;
            if (data.shape) attrs += ` shape=${data.shape}`;
            return `...image ${attrs}`;
        }
    },
    divider: {
        name: '分割线',
        fields: [],
        template: () => '\n---\n'
    },
    heading: {
        name: '标题',
        fields: [
            { name: 'level', label: '级别', type: 'select', options: ['#', '##', '###', '####', '#####', '######'], default: '##' },
            { name: 'text', label: '标题文字', type: 'text', required: true }
        ],
        template: (data) => `${data.level} ${data.text}`
    },
    quote: {
        name: '引用',
        fields: [
            { name: 'text', label: '引用内容', type: 'textarea', required: true }
        ],
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
<h3>📦 卡片组件</h3>
<pre><code>...card-start title="我的卡片" shape=medium contentPadding=(16,12)
卡片内容
...card-end</code></pre>

<h3>🔘 按钮组件</h3>
<pre><code>...button text="填充" event="url {https://}"
...button-outlined text="边框" event="check_update"
...button-filled-tonal text="色调"
...button-text text="文字"</code></pre>

<h3>📐 布局组件</h3>
<pre><code>...row-start horizontal=spacedBy(8) vertical=Center
    ...button text="按钮1" weight=(1)
    ...button text="按钮2" weight=(1)
...row-end

...column-start vertical=spacedBy(8) horizontal=Center
    ...button text="按钮1"
    ...button text="按钮2"
...column-end</code></pre>

<h3>🖼️ 图片组件</h3>
<pre><code>...image url="https://picsum.photos/400" width=50% shape=12dp</code></pre>

<h3>⚠️ 注意事项</h3>
<ul>
<li>卡片<strong>不能</strong>放在 Row/Column 内部</li>
<li>标签必须成对出现</li>
<li>注释以 // 开头</li>
<li>扩展组件以 ... 开头</li>
</ul>
`;

const COMPONENT_CATEGORIES = [
    { name: '📦 容器', items: ['card'] },
    { name: '🔘 按钮', items: ['button_filled', 'button_outlined', 'button_tonal', 'button_text'] },
    { name: '📐 布局', items: ['row', 'column'] },
    { name: '🖼️ 媒体', items: ['image'] },
    { name: '📝 排版', items: ['divider', 'heading', 'quote', 'list'] }
];

function getComponentDisplayName(type) {
    const names = {
        card: '卡片', button_filled: '填充按钮', button_outlined: '边框按钮',
        button_tonal: '色调按钮', button_text: '文字按钮', row: '横向布局',
        column: '纵向布局', image: '图片', divider: '分割线',
        heading: '标题', quote: '引用', list: '列表'
    };
    return names[type] || type;
}

window.ComponentTemplates = ComponentTemplates;
window.HelpContent = HelpContent;
window.COMPONENT_CATEGORIES = COMPONENT_CATEGORIES;
window.getComponentDisplayName = getComponentDisplayName;