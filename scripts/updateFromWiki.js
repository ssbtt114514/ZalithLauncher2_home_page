/**
 * 从 Minecraft Wiki 获取最新内容并更新主页
 * 使用 MediaWiki API: https://zh.minecraft.wiki/api.php
 * 输出文件: /home.md
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// ============ 配置 ============
const WIKI_API = 'https://zh.minecraft.wiki/api.php';
const OUTPUT_PATH = path.join(__dirname, '..', 'home.md');  // 输出到根目录的 home.md

// 需要获取的页面
const WIKI_PAGE = '小鬼当家';

// ============ Minecraft Wiki API 调用 ============

/**
 * 获取页面 HTML 内容
 */
async function getPageHTML(pageTitle) {
    try {
        const url = `${WIKI_API}?action=parse&page=${encodeURIComponent(pageTitle)}&format=json`;
        console.log('📡 请求:', url);
        const response = await axios.get(url, { timeout: 15000 });
        
        if (response.data && response.data.parse) {
            return {
                title: response.data.parse.title,
                text: response.data.parse.text['*'],
                pageId: response.data.parse.pageid
            };
        }
        return null;
    } catch (error) {
        console.error(`❌ 获取页面 "${pageTitle}" 失败:`, error.message);
        return null;
    }
}

/**
 * 获取页面 Wiki 源代码
 */
async function getPageRaw(pageTitle) {
    try {
        const url = `${WIKI_API}?action=raw&title=${encodeURIComponent(pageTitle)}`;
        const response = await axios.get(url, { timeout: 10000 });
        return response.data;
    } catch (error) {
        console.error(`❌ 获取源码失败:`, error.message);
        return null;
    }
}

/**
 * 获取页面中的所有图片
 */
async function getPageImages(pageTitle) {
    try {
        const url = `${WIKI_API}?action=query&titles=${encodeURIComponent(pageTitle)}&generator=images&prop=imageinfo&iiprop=url&format=json`;
        const response = await axios.get(url, { timeout: 10000 });
        
        const images = [];
        if (response.data && response.data.query && response.data.query.pages) {
            for (const [id, page] of Object.entries(response.data.query.pages)) {
                if (page.imageinfo && page.imageinfo[0]) {
                    images.push({
                        title: page.title,
                        url: page.imageinfo[0].url
                    });
                }
            }
        }
        return images;
    } catch (error) {
        console.error(`❌ 获取图片列表失败:`, error.message);
        return [];
    }
}

/**
 * 从 HTML 中提取纯文本内容
 */
function extractTextFromHTML(html) {
    let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    text = text.replace(/<[^>]+>/g, ' ');
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');
    text = text.replace(/\s+/g, ' ').trim();
    return text;
}

/**
 * 从 HTML 中提取第一段描述
 */
function extractDescription(html, maxLength = 250) {
    const text = extractTextFromHTML(html);
    // 尝试截取到句号
    let desc = text;
    if (desc.length > maxLength) {
        const cutIndex = desc.lastIndexOf('。', maxLength);
        if (cutIndex > 0) {
            desc = desc.substring(0, cutIndex + 1);
        } else {
            desc = desc.substring(0, maxLength) + '...';
        }
    }
    return desc;
}

/**
 * 从 HTML 中提取主视觉图
 */
function extractMainImage(html) {
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
    const matches = [...html.matchAll(imgRegex)];
    
    // 优先匹配关键词
    const keywords = ['Key_Art', 'keyart', 'banner', 'main', 'hero', 'logo'];
    for (const match of matches) {
        const url = match[1];
        const lowerUrl = url.toLowerCase();
        for (const keyword of keywords) {
            if (lowerUrl.includes(keyword.toLowerCase())) {
                return url;
            }
        }
    }
    
    // 返回第一张图片
    if (matches.length > 0) {
        return matches[0][1];
    }
    return null;
}

/**
 * 从 Wiki 源码中提取特性列表
 */
function extractFeatures(rawWiki) {
    const features = [];
    const lines = rawWiki.split('\n');
    
    for (const line of lines) {
        // 匹配列表项
        if (line.match(/^\*+\s+/) && !line.includes('File:') && !line.includes('{{')) {
            let feature = line.replace(/^\*+\s+/, '').trim();
            if (feature.length > 10 && feature.length < 200) {
                features.push(feature);
            }
        }
    }
    
    return features.slice(0, 5); // 最多5条
}

// ============ 获取 Minecraft 最新版本信息 ============
async function fetchMinecraftVersions() {
    try {
        const res = await axios.get('https://piston-meta.mojang.com/mc/game/version_manifest_v2.json', { timeout: 10000 });
        const { latest, versions } = res.data;
        const recentReleases = versions.filter(v => v.type === 'release').slice(0, 3);
        const latestSnapshot = versions.find(v => v.type === 'snapshot');
        return {
            latestRelease: latest.release,
            latestSnapshot: latest.snapshot,
            recentReleases: recentReleases.map(v => ({ id: v.id, date: v.releaseTime.split('T')[0] }))
        };
    } catch (e) {
        console.error('❌ MC版本获取失败:', e.message);
        return {
            latestRelease: '1.21.5',
            latestSnapshot: '25w19a',
            recentReleases: [
                { id: '1.21.5', date: '2025-04-23' },
                { id: '1.21.4', date: '2025-03-13' },
                { id: '1.21.3', date: '2024-12-10' }
            ]
        };
    }
}

// ============ 生成主页 ============
async function generateHomePage() {
    console.log('🚀 开始从 Minecraft Wiki 获取内容...');
    console.log('⏰', new Date().toLocaleString('zh-CN'));
    console.log('📁 输出路径:', OUTPUT_PATH);
    
    // 获取 Wiki 页面内容
    console.log(`\n📖 正在获取页面: ${WIKI_PAGE}`);
    const wikiPage = await getPageHTML(WIKI_PAGE);
    const wikiRaw = await getPageRaw(WIKI_PAGE);
    
    let wikiDescription = '';
    let wikiImage = '';
    let wikiFeatures = [];
    
    if (wikiPage) {
        wikiDescription = extractDescription(wikiPage.text, 300);
        wikiImage = extractMainImage(wikiPage.text);
        console.log('✅ 成功获取页面:', wikiPage.title);
        if (wikiImage) console.log('🖼️ 主视觉图:', wikiImage);
    } else {
        wikiDescription = 'Tiny Takeover 活动现已上线！体验全新的幼年生物和特色内容。';
        wikiImage = 'https://zh.minecraft.wiki/images/Tiny_Takeover_Key_Art.png';
    }
    
    if (wikiRaw) {
        wikiFeatures = extractFeatures(wikiRaw);
        console.log(`📋 提取到 ${wikiFeatures.length} 条特性`);
    }
    
    // 获取版本信息
    const mcVersions = await fetchMinecraftVersions();
    
    // 生成版本列表
    const versionInfo = mcVersions.recentReleases.map(v => `- **${v.id}** (${v.date})`).join('\n        ');
    
    // 生成特性列表 HTML
    let featuresHtml = '';
    if (wikiFeatures.length > 0) {
        featuresHtml = wikiFeatures.map(f => `- ${f}`).join('\n        ');
    } else {
        featuresHtml = '- 全新的幼年生物登场\n- 特色游戏内容\n- 限时活动奖励';
    }
    
    // 生成 Markdown
    const md = `// ============================================
// 🎮 Minecraft 自定义主页
// 生成时间：${new Date().toLocaleString('zh-CN')}
// 数据来源：Minecraft Wiki | Mojang API
// ============================================

// --- 主视觉卡片 ---
...card-start title="" shape=large contentPadding=(0,0)
...image url="${wikiImage}" width=100% shape=0dp
...card-end

// --- 活动介绍卡片 ---
...card-start title="📢 ${wikiPage ? wikiPage.title : 'Tiny Takeover 小鬼当家'}" shape=medium contentPadding=(16,12)
    ...column-start vertical=spacedBy(8) horizontal=Center

${wikiDescription}

**活动特色：**
        ${featuresHtml}

无论你准备好了没有，[**《Tiny Takeover》**](https://www.minecraft.net/zh-hans/updates/tiny-takeover-drop) 现已上市！  
[**下载 Minecraft**](https://www.minecraft.net/choose-your-game) 现在就去玩新版本吧！

    ...column-end
...card-end

// --- 最新版本信息 ---
...card-start title="📦 Minecraft 版本" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(6) horizontal=Start
**最新正式版**: ${mcVersions.latestRelease}
**最新快照**: ${mcVersions.latestSnapshot}

近期版本：
        ${versionInfo}

        ...row-start horizontal=spacedBy(8)
            ...button text="📥 官方下载" event="url{https://www.minecraft.net/zh-hans/download}" weight=(1)
            ...button text="📋 复制版本号" event="copy{${mcVersions.latestRelease}}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 最新资讯 ---
...card-start title="📰 最新资讯" shape=medium
    ...row-start horizontal=spacedBy(12) vertical=Top

        ...column-start vertical=spacedBy(4) weight=(1)
            ...image url="https://img2.nloln.de/file/BQACAgUAAyEGAASLVN5eAAIijGoQR2nWBHMgcYLjwzO-6Yfw-MOBAAKNIAACNXqAVKrVwhyqcQU3OwQ.jpg" width=100% shape=8dp
            [**我的世界在TwitchCon的现场**](https://www.minecraft.net/zh-hans/article/minecraft-live-twitchcon)  
            看《我的世界》现场直播的额外节目吧...  
            **2026/5/12**
        ...column-end

        ...column-start vertical=spacedBy(4) weight=(1)
            ...image url="https://img2.nloln.de/file/BQACAgUAAyEGAASLVN5eAAIiiWoQR2N2lFbUJNnmQypUbNO9-n-HAAKKIAACNXqAVDr0MCnqKmgLOwQ.jpg" width=100% shape=8dp
            [**Minecraft 26.2 快照 1**](https://www.minecraft.net/zh-hans/article/minecraft-26-2-snapshot-1)  
            这个快照的默认选项将是使用 Vulkan...  
            **2026/4/7**
        ...column-end

        ...column-start vertical=spacedBy(4) weight=(1)
            ...image url="https://img2.nloln.de/file/BQACAgUAAyEGAASLVN5eAAIii2oQR2f4iJKSW4N7uyWrxEifEEqDAAKMIAACNXqAVCcHTIHHEJwEOwQ.jpg" width=100% shape=8dp
            [**Java 版好友列表**](https://www.minecraft.net/zh-hans/article/friends-list-for-java-edition)  
            有时候，你不想一个人面对生存的第一个夜晚...  
            **2026/5/12**
        ...column-end

    ...row-end
...card-end

// --- 实用网站推荐 ---
...card-start title="🔗 实用网站" shape=medium contentPadding=(16, 16)

    ...column-start vertical=spacedBy(12)

        // 第一行
        ...row-start horizontal=spacedBy(8)
            ...column-start weight=(1)
                ...row-start vertical=Center horizontal=spacedBy(6)
                    ...image url="https://www.mcnav.net/wp-content/uploads/2021/07/1696391166-Wiki.webp" width=30dp shape=4dp
                    [**Minecraft Wiki**](https://zh.minecraft.wiki/)
                ...row-end
            ...column-end
            ...column-start weight=(1)
                ...row-start vertical=Center horizontal=spacedBy(6)
                    ...image url="https://www.mcnav.net/wp-content/uploads/2021/07/1627474337-namemc.png" width=30dp shape=4dp
                    [**玩家皮肤查询**](https://namemc.com/)
                ...row-end
            ...column-end
            ...column-start weight=(1)
                ...row-start vertical=Center horizontal=spacedBy(6)
                    ...image url="https://favicon.im/mcseedmap.net" width=30dp shape=4dp
                    [**种子查找器**](https://www.chunkbase.com/apps/)
                ...row-end
            ...column-end
        ...row-end

        // 第二行
        ...row-start horizontal=spacedBy(8)
            ...column-start weight=(1)
                ...row-start vertical=Center horizontal=spacedBy(6)
                    ...image url="https://www.mcnav.net/wp-content/uploads/2021/07/1627523378-novaskin.png" width=30dp shape=4dp
                    [**皮肤生成壁纸**](http://minecraft.novaskin.me/wallpapers)
                ...row-end
            ...column-end
            ...column-start weight=(1)
                ...row-start vertical=Center horizontal=spacedBy(6)
                    ...image url="https://www.mcnav.net/wp-content/uploads/2024/02/20240222194052_1e1b4780.png" width=30dp shape=4dp
                    [**MC服务器查询网**](https://list.mczfw.cn/)
                ...row-end
            ...column-end
            ...column-start weight=(1)
                ...row-start vertical=Center horizontal=spacedBy(6)
                    ...image url="https://www.mcnav.net/wp-content/uploads/2024/07/20240723110209_b0932058.png" width=30dp shape=4dp
                    [**好用的MC地图站**](https://pixelmap.minegraph.cn/)
                ...row-end
            ...column-end
        ...row-end

        // 第三行
        ...row-start horizontal=spacedBy(8)
            ...column-start weight=(1)
                ...row-start vertical=Center horizontal=spacedBy(6)
                    ...image url="https://www.mcnav.net/wp-content/uploads/2025/08/1756123474-logo.png" width=30dp shape=4dp
                    [**MC日志分析工具**](https://mclo.gs/)
                ...row-end
            ...column-end
            ...column-start weight=(1)
                ...row-start vertical=Center horizontal=spacedBy(6)
                    ...image url="https://www.mcnav.net/wp-content/uploads/2021/07/1627485777-littleskine.png" width=30dp shape=4dp
                    [**LittleSkin皮肤站**](https://littleskin.cn/)
                ...row-end
            ...column-end
            ...column-start weight=(1)
                ...row-start vertical=Center horizontal=spacedBy(6)
                    ...image url="https://www.mcnav.net/wp-content/uploads/2021/08/1628139624-sakurafrp.png" width=30dp shape=4dp
                    [**内网穿透工具**](https://www.mcnav.net/sites/229.html)
                ...row-end
            ...column-end
        ...row-end

    ...column-end

...card-end

// --- 关于 ---
...card-start title="ℹ️ 关于" shape=small contentPadding=(12)
    ...column-start vertical=spacedBy(4) horizontal=Center
**Minecraft 自定义主页**

🖼️ 内容来源：Minecraft Wiki
📅 更新时间：${new Date().toLocaleString('zh-CN')}

        ...row-start horizontal=spacedBy(12)
            ...button-text text="📖 关注作者" event="url{https://space.bilibili.com/3546377567078479}"
            ...button-text text="🐙 项目源码" event="url{https://github.com/}"
        ...row-end
    ...column-end
...card-end

---
__更新日志__  

**1.2**：使用 Minecraft Wiki API 自动获取最新内容  
**1.1**：新增了一些实用网站并微改界面布局  
**1.0**：更新了 MC 官网新闻

支持下，给作者 [**不爱吃辣椒lz**](https://space.bilibili.com/3546377567078479) 一个关注吧！
`;

    fs.writeFileSync(OUTPUT_PATH, md, 'utf8');
    console.log('\n✅ 主页生成完成！');
    console.log('📁 文件:', OUTPUT_PATH);
    console.log(`📅 生成时间: ${new Date().toLocaleString('zh-CN')}`);
    console.log(`📦 MC版本: ${mcVersions.latestRelease} / ${mcVersions.latestSnapshot}`);
    if (wikiPage) console.log(`📖 Wiki页面: ${wikiPage.title}`);
    console.log(`📋 特性数量: ${wikiFeatures.length}`);
}

// 运行
generateHomePage().catch(err => {
    console.error('❌ 生成失败:', err);
    process.exit(1);
});