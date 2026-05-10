const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

// ============ 配置 ============
const CONFIG = {
    // 和风天气 API Key（可选，从环境变量读取）
    weatherApiKey: process.env.WEATHER_API_KEY || '',
    // 默认城市：北京
    weatherCity: '北京',
    // MC服务器地址（可选，从环境变量读取）
    serverIp: process.env.SERVER_IP || '',
    // 备用壁纸
    fallbackWallpaper: 'https://api.bimg.cc/random?resolution=1920x1080'
};

// ============ 工具函数 ============
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const res = await axios({
            ...options,
            url,
            signal: controller.signal,
            timeout
        });
        clearTimeout(id);
        return res;
    } catch (e) {
        clearTimeout(id);
        throw e;
    }
}

// ============ 1. Bing 每日壁纸 ============
async function fetchBingWallpaper() {
    try {
        const res = await fetchWithTimeout(
            'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN'
        );
        const data = res.data.images[0];
        return {
            url: `https://cn.bing.com${data.url}`,
            title: data.title || 'Bing 每日壁纸',
            copyright: data.copyright || ''
        };
    } catch (e) {
        console.error('❌ Bing 壁纸获取失败:', e.message);
        return {
            url: CONFIG.fallbackWallpaper,
            title: '随机壁纸',
            copyright: ''
        };
    }
}

// ============ 2. 每日一言 ============
async function fetchHitokoto() {
    const categories = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
    const randomCat = categories[Math.floor(Math.random() * categories.length)];

    try {
        const res = await fetchWithTimeout(
            `https://v1.hitokoto.cn/?c=${randomCat}&encode=json`,
            {}, 5000
        );
        return {
            text: res.data.hitokoto,
            from: res.data.from || '未知',
            from_who: res.data.from_who || ''
        };
    } catch (e) {
        console.error('❌ 一言获取失败:', e.message);
        return {
            text: '星光不问赶路人，时光不负有心人。',
            from: '网络',
            from_who: ''
        };
    }
}

// ============ 3. MC百科热门模组 ============
async function fetchMcmodHot() {
    try {
        const res = await fetchWithTimeout(
            'https://www.mcmod.cn/modlist.html?sort=view',
            { headers: { 'User-Agent': 'Mozilla/5.0' } },
            15000
        );
        const $ = cheerio.load(res.data);
        const mods = [];

        $('.mod-list-item, .common-item').slice(0, 6).each((i, el) => {
            const nameEl = $(el).find('.mod-name, .title, h3');
            const linkEl = $(el).find('a').first();
            const descEl = $(el).find('.mod-desc, .description, p');

            const name = nameEl.text().trim() || linkEl.text().trim();
            let url = linkEl.attr('href') || '';
            if (url && !url.startsWith('http')) url = 'https://www.mcmod.cn' + url;
            const desc = descEl.text().trim().substring(0, 40) || '热门模组';

            if (name && url) {
                mods.push({ name, url, desc });
            }
        });

        if (mods.length === 0) throw new Error('未解析到模组数据');
        return mods;
    } catch (e) {
        console.error('❌ MC百科获取失败:', e.message);
        return [
            { name: '工业2', url: 'https://www.mcmod.cn/class/2.html', desc: '经典科技模组，工业时代的开端' },
            { name: '暮色森林', url: 'https://www.mcmod.cn/class/19.html', desc: '冒险维度模组，探索神秘森林' },
            { name: '应用能源2', url: 'https://www.mcmod.cn/class/184.html', desc: '存储网络模组，智能物品管理' },
            { name: '热力膨胀', url: 'https://www.mcmod.cn/class/31.html', desc: '科技模组，能源与机械' },
            { name: '神秘时代6', url: 'https://www.mcmod.cn/class/463.html', desc: '魔法模组，研究神秘学' },
            { name: '匠魂', url: 'https://www.mcmod.cn/class/36.html', desc: '工具模组，自定义打造装备' }
        ];
    }
}

// ============ 4. MC 最新版本信息 ============
async function fetchMinecraftVersions() {
    try {
        const res = await fetchWithTimeout(
            'https://piston-meta.mojang.com/mc/game/version_manifest_v2.json',
            {}, 10000
        );
        const { latest, versions } = res.data;

        // 获取最近3个正式版和1个快照
        const recentReleases = versions
            .filter(v => v.type === 'release')
            .slice(0, 3);
        const latestSnapshot = versions.find(v => v.type === 'snapshot');

        return {
            latestRelease: latest.release,
            latestSnapshot: latest.snapshot,
            recentReleases: recentReleases.map(v => ({
                id: v.id,
                date: v.releaseTime.split('T')[0]
            })),
            snapshot: latestSnapshot ? {
                id: latestSnapshot.id,
                date: latestSnapshot.releaseTime.split('T')[0]
            } : null
        };
    } catch (e) {
        console.error('❌ MC版本获取失败:', e.message);
        return {
            latestRelease: '1.20.4',
            latestSnapshot: '24w14a',
            recentReleases: [
                { id: '1.20.4', date: '2023-12-07' },
                { id: '1.20.3', date: '2023-12-05' },
                { id: '1.20.2', date: '2023-09-21' }
            ],
            snapshot: { id: '24w14a', date: '2024-04-03' }
        };
    }
}

// ============ 5. CurseForge 热门模组 ============
async function fetchCurseForgeHot() {
    try {
        // CurseForge 官方 API 需要 API Key，这里使用网页抓取或备用方案
        // 实际使用时建议申请 CurseForge API Key
        const res = await fetchWithTimeout(
            'https://www.curseforge.com/minecraft/mcmods',
            { headers: { 'User-Agent': 'Mozilla/5.0' } },
            15000
        );
        const $ = cheerio.load(res.data);
        const mods = [];

        $('.project-card, .listing-project').slice(0, 5).each((i, el) => {
            const name = $(el).find('.name, .project-name, h3').text().trim();
            const url = 'https://www.curseforge.com' + ($(el).find('a').attr('href') || '');
            const desc = $(el).find('.description, p').text().trim().substring(0, 35);
            const downloads = $(el).find('.downloads, .stat-downloads').text().trim();

            if (name) {
                mods.push({ name, url, desc: desc || 'CurseForge 热门模组', downloads });
            }
        });

        if (mods.length === 0) throw new Error('未解析到数据');
        return mods;
    } catch (e) {
        console.error('❌ CurseForge 获取失败:', e.message);
        // 返回一些知名的 CurseForge 模组作为备用
        return [
            { name: 'Just Enough Items (JEI)', url: 'https://www.curseforge.com/minecraft/mcmods/jei', desc: '物品管理器，查看合成配方', downloads: '3亿+' },
            { name: 'JourneyMap', url: 'https://www.curseforge.com/minecraft/mcmods/journeymap', desc: '实时地图模组', downloads: '1.5亿+' },
            { name: 'Iron Chests', url: 'https://www.curseforge.com/minecraft/mcmods/iron-chests', desc: '更多箱子类型', downloads: '1亿+' },
            { name: "Biomes O' Plenty", url: "https://www.curseforge.com/minecraft/mcmods/biomes-o-plenty", desc: "更多生物群系", downloads: "9000万+" },
        { name: "Tinkers' Construct", url: "https://www.curseforge.com/minecraft/mcmods/tinkers-construct", desc: "匠魂工具打造", downloads: "8000万+" },
        ];
    }
}

// ============ 6. Modrinth 热门模组 ============
async function fetchModrinthHot() {
    try {
        // Modrinth API 是公开的，不需要 Key
        const res = await fetchWithTimeout(
            'https://api.modrinth.com/v2/search?limit=5&index=follows',
            { headers: { 'User-Agent': 'ZalithHomepage/1.0' } },
            10000
        );

        return res.data.hits.map(hit => ({
            name: hit.title,
            url: `https://modrinth.com/mod/${hit.slug}`,
            desc: hit.description.substring(0, 40),
            downloads: hit.downloads ? `${(hit.downloads / 1000000).toFixed(1)}M` : 'N/A',
            icon: hit.icon_url
        }));
    } catch (e) {
        console.error('❌ Modrinth 获取失败:', e.message);
        return [
            { name: 'Sodium', url: 'https://modrinth.com/mod/sodium', desc: '高性能渲染引擎，大幅提升FPS', downloads: '15M+', icon: '' },
            { name: 'Iris', url: 'https://modrinth.com/mod/iris', desc: '现代光影加载器', downloads: '8M+', icon: '' },
            { name: 'Fabric API', url: 'https://modrinth.com/mod/fabric-api', desc: 'Fabric 核心 API', downloads: '20M+', icon: '' },
            { name: 'Lithium', url: 'https://modrinth.com/mod/lithium', desc: '游戏逻辑优化', downloads: '10M+', icon: '' },
            { name: 'Phosphor', url: 'https://modrinth.com/mod/phosphor', desc: '光照引擎优化', downloads: '5M+', icon: '' }
        ];
    }
}

// ============ 7. 天气信息 ============
async function fetchWeather() {
    if (!CONFIG.weatherApiKey) {
        console.log('⚠️ 未配置天气 API Key，跳过天气获取');
        return null;
    }

    try {
        // 和风天气 API
        const res = await fetchWithTimeout(
            `https://devapi.qweather.com/v7/weather/now?location=101010100&key=${CONFIG.weatherApiKey}`,
            {}, 10000
        );
        const data = res.data.now;

        return {
            city: CONFIG.weatherCity,
            temp: data.temp,
            feelsLike: data.feelsLike,
            text: data.text,
            windDir: data.windDir,
            windScale: data.windScale,
            humidity: data.humidity,
            icon: data.icon
        };
    } catch (e) {
        console.error('❌ 天气获取失败:', e.message);
        return null;
    }
}

// ============ 8. MC 服务器状态 ============
async function fetchServerStatus() {
    if (!CONFIG.serverIp) {
        console.log('⚠️ 未配置服务器 IP，跳过状态查询');
        return null;
    }

    try {
        // 使用 mcstatus.io API
        const res = await fetchWithTimeout(
            `https://api.mcstatus.io/v2/status/java/${CONFIG.serverIp}`,
            {}, 10000
        );
        const data = res.data;

        return {
            online: data.online,
            ip: data.ip,
            port: data.port,
            players: data.players?.online || 0,
            maxPlayers: data.players?.max || 0,
            version: data.version?.name_clean || '未知',
            motd: data.motd?.clean || '',
            icon: data.icon
        };
    } catch (e) {
        console.error('❌ 服务器状态获取失败:', e.message);
        return null;
    }
}

// ============ 生成主页 ============
async function generateHomePage() {
    console.log('🚀 开始生成主页...');
    console.log('⏰', new Date().toLocaleString('zh-CN'));

    // 并行获取所有数据
    const [
        bing,
        hitokoto,
        mcmodMods,
        mcVersions,
        curseForgeMods,
        modrinthMods,
        weather,
        serverStatus
    ] = await Promise.all([
        fetchBingWallpaper(),
        fetchHitokoto(),
        fetchMcmodHot(),
        fetchMinecraftVersions(),
        fetchCurseForgeHot(),
        fetchModrinthHot(),
        fetchWeather(),
        fetchServerStatus()
    ]);

    // 构建模组列表
    const mcmodList = mcmodMods.map(m => 
        `- [${m.name}](${m.url}) - ${m.desc}`
    ).join('\n        ');

    const curseForgeList = curseForgeMods.map(m => 
        `- [${m.name}](${m.url}) - ${m.desc} (${m.downloads})`
    ).join('\n        ');

    const modrinthList = modrinthMods.map(m => 
        `- [${m.name}](${m.url}) - ${m.desc} (${m.downloads})`
    ).join('\n        ');

    // 构建版本信息
    const versionInfo = mcVersions.recentReleases.map(v => 
        `- **${v.id}** (${v.date})`
    ).join('\n        ');

    // 构建天气信息
    let weatherSection = '';
    if (weather) {
        weatherSection = `
// --- 🌤️ 天气信息 ---
...card-start title="🌤️ ${weather.city}天气" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(4) horizontal=Center
        **${weather.temp}°C** | ${weather.text}

        体感 ${weather.feelsLike}°C | ${weather.windDir}${weather.windScale}级 | 湿度${weather.humidity}%
    ...column-end
...card-end`;
    }

    // 构建服务器状态
    let serverSection = '';
    if (serverStatus) {
        const statusColor = serverStatus.online ? '🟢' : '🔴';
        const statusText = serverStatus.online ? '在线' : '离线';
        const playerText = serverStatus.online ? `${serverStatus.players}/${serverStatus.maxPlayers}` : 'N/A';

        serverSection = `
// --- 🎮 服务器状态 ---
...card-start title="🎮 我的服务器" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(4) horizontal=Start
        ${statusColor} **${statusText}** | ${serverStatus.ip}:${serverStatus.port}

        版本: ${serverStatus.version} | 在线玩家: ${playerText}

        > ${serverStatus.motd || '欢迎来到服务器！'}

        ...row-start horizontal=spacedBy(8)
            ...button text="📋 复制IP" event="copy {${serverStatus.ip}:${serverStatus.port}}" weight=(1)
            ...button-outlined text="🔄 刷新" event="url {https://api.mcstatus.io/v2/status/java/${serverStatus.ip}}" weight=(1)
        ...row-end
    ...column-end
...card-end`;
    }

    // 生成完整 Markdown
    const md = `// ============================================
// 🎮 Zalith Launcher 2 - 全自动更新主页
// 生成时间：${new Date().toLocaleString('zh-CN')}
// 数据来源：Bing | 一言 | MC百科 | Mojang | CurseForge | Modrinth | 和风天气
// ============================================

// --- Bing 每日壁纸横幅 ---
...image url="${bing.url}" width=100% shape=0dp

// --- 每日一言 ---
...card-start title="📜 每日一言" shape=large contentPadding=(16, 12)
    ...column-start vertical=spacedBy(8) horizontal=Center
        > *"${hitokoto.text}"*

        —— ${hitokoto.from}${hitokoto.from_who ? ' · ' + hitokoto.from_who : ''}

        ...row-start horizontal=spacedBy(12)
            ...button-filled-tonal text="🔄 刷新" event="url {https://v1.hitokoto.cn/}" width=100dp
            ...button-text text="📋 复制" event="copy {${hitokoto.text}}"
        ...row-end
    ...column-end
...card-end

${weatherSection}

${serverSection}

// --- ⚡ 快捷操作 ---
...card-start title="🚀 快捷操作" shape=medium contentPadding=(12)
    ...row-start horizontal=spacedBy(12) vertical=Center
        ...button text="▶️ 启动游戏" event="launch_game" weight=(1)
        ...button-outlined text="🔄 检查更新" event="check_update" weight=(1)
    ...row-end
...card-end

// --- 📦 MC 版本信息 ---
...card-start title="📦 Minecraft 版本" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(6) horizontal=Start
        **最新正式版**: ${mcVersions.latestRelease}
        **最新快照**: ${mcVersions.latestSnapshot}

        近期版本：
        ${versionInfo}

        ...row-start horizontal=spacedBy(8)
            ...button text="📥 官方下载" event="url {https://www.minecraft.net/zh-hans/download}" weight=(1)
            ...button text="📋 复制版本号" event="copy {${mcVersions.latestRelease}}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🌐 MC 资源中心 ---
...card-start title="📚 MC 资源中心" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(8) horizontal=Center
        ...row-start horizontal=spacedBy(8)
            ...button-filled-tonal text="📖 MC百科" event="url {https://www.mcmod.cn/}" weight=(1)
            ...button-filled-tonal text="🔍 模组列表" event="url {https://www.mcmod.cn/modlist.html}" weight=(1)
        ...row-end
        ...row-start horizontal=spacedBy(8)
            ...button-filled-tonal text="⬇️ 下载站" event="url {https://www.mcmod.cn/download.html}" weight=(1)
            ...button-filled-tonal text="💬 论坛" event="url {https://bbs.mcmod.cn/}" weight=(1)
        ...row-end
        ...row-start horizontal=spacedBy(8)
            ...button text="🌐 CurseForge" event="url {https://www.curseforge.com/minecraft/mcmods}" weight=(1)
            ...button text="🌐 Modrinth" event="url {https://modrinth.com/mods}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🔥 MC百科热门模组 ---
...card-start title="🔥 MC百科热门（实时）" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(6) horizontal=Start
        ${mcmodList}

        ...row-start horizontal=spacedBy(8)
            ...button text="🔥 查看更多" event="url {https://www.mcmod.cn/modlist.html?sort=view}" weight=(1)
            ...button text="🆕 最新收录" event="url {https://www.mcmod.cn/modlist.html?sort=createtime}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🌐 CurseForge 热门 ---
...card-start title="🌐 CurseForge 热门" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(6) horizontal=Start
        ${curseForgeList}

        ...row-start horizontal=spacedBy(8)
            ...button text="📥 访问 CurseForge" event="url {https://www.curseforge.com/minecraft/mcmods}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🧩 Modrinth 热门 ---
...card-start title="🧩 Modrinth 热门" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(6) horizontal=Start
        ${modrinthList}

        ...row-start horizontal=spacedBy(8)
            ...button text="📥 访问 Modrinth" event="url {https://modrinth.com/mods}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🛠️ 实用工具 ---
...card-start title="🧰 实用工具" shape=medium contentPadding=(12)
    ...row-start horizontal=spacedBy(8) vertical=Top
        ...column-start weight=(1) vertical=spacedBy(8) horizontal=Center
            ...button-outlined text="📋 复制服务器IP" event="copy {play.mcmod.cn}" width=100%
            ...button-outlined text="📋 复制QQ群" event="copy {123456789}" width=100%
            ...button-outlined text="📋 复制 Discord" event="copy {discord.gg/xxxx}" width=100%
        ...column-end
        ...column-start weight=(1) vertical=spacedBy(8) horizontal=Center
            ...button-outlined text="🌙 夜间模式" width=100%
            ...button-outlined text="⚙️ 游戏设置" width=100%
            ...button-outlined text="📁 存档目录" width=100%
        ...column-end
    ...row-end
...card-end

// --- 📸 精选壁纸 ---
...card-start title="🎨 更多壁纸" shape=medium contentPadding=(12)
    ...row-start horizontal=spacedBy(8) vertical=Center
        ...image url="https://api.bimg.cc/random?resolution=1920x1080&index=1" width=30% shape=8dp weight=(1)
        ...image url="https://api.bimg.cc/random?resolution=1920x1080&index=2" width=30% shape=8dp weight=(1)
        ...image url="https://api.bimg.cc/random?resolution=1920x1080&index=3" width=30% shape=8dp weight=(1)
    ...row-end
...card-end

// --- ℹ️ 关于 ---
...card-start title="ℹ️ 关于" shape=small contentPadding=(12)
    ...column-start vertical=spacedBy(4) horizontal=Center
        **Zalith Launcher 2** 自动更新主页

        🖼️ 壁纸：${bing.title}
        ${bing.copyright ? '© ' + bing.copyright : ''}

        ⏰ 更新时间：${new Date().toLocaleString('zh-CN')}

        ...row-start horizontal=spacedBy(12)
            ...button-text text="📖 Markdown教程" event="url {https://www.runoob.com/markdown/md-tutorial.html}"
            ...button-text text="🐙 项目源码" event="url {https://github.com/}"
        ...row-end
    ...column-end
...card-end
`;

    fs.writeFileSync('home_page.md', md);
    console.log('\n✅ 主页生成完成！');
    console.log('📁 文件：home_page.md');
    console.log(`📅 时间：${new Date().toLocaleString('zh-CN')}`);
    console.log(`🖼️ 壁纸：${bing.title}`);
    console.log(`💬 一言：${hitokoto.text}`);
    console.log(`📦 MC版本：${mcVersions.latestRelease} / ${mcVersions.latestSnapshot}`);
    console.log(`🔥 MC百科：${mcmodMods.length} 个模组`);
    console.log(`🌐 CurseForge：${curseForgeMods.length} 个模组`);
    console.log(`🧩 Modrinth：${modrinthMods.length} 个模组`);
    if (weather) console.log(`🌤️ 天气：${weather.city} ${weather.temp}°C ${weather.text}`);
    if (serverStatus) console.log(`🎮 服务器：${serverStatus.online ? '在线' : '离线'} ${serverStatus.players}/${serverStatus.maxPlayers}`);
}

// 运行
generateHomePage().catch(err => {
    console.error('❌ 生成失败:', err);
    process.exit(1);
});
