// ============================================
// 🎮 Zalith Launcher 2 - 全自动更新主页
// 生成时间：2026-05-10 14:53:20
// 数据来源：Bing | 一言 | MC百科 | Mojang | CurseForge | Modrinth | 和风天气
// ============================================

// --- Bing 每日壁纸横幅 ---
...image url="https://cn.bing.com/th?id=OHR.SpringDay_ZH-CN1234567890_1920x1080.jpg" width=100% shape=0dp

// --- 每日一言 ---
...card-start title="📜 每日一言" shape=large contentPadding=(16, 12)
    ...column-start vertical=spacedBy(8) horizontal=Center
        > *"星光不问赶路人，时光不负有心人。"*

        —— 网络

        ...row-start horizontal=spacedBy(12)
            ...button-filled-tonal text="🔄 刷新" event="url {https://v1.hitokoto.cn/}" width=100dp
            ...button-text text="📋 复制" event="copy {星光不问赶路人，时光不负有心人。}"
        ...row-end
    ...column-end
...card-end

// --- 🌤️ 天气信息 ---
...card-start title="🌤️ 北京天气" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(4) horizontal=Center
        **22°C** | 晴

        体感 24°C | 东南风3级 | 湿度45%
    ...column-end
...card-end

// --- 🎮 服务器状态 ---
...card-start title="🎮 我的服务器" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(4) horizontal=Start
        🟢 **在线** | play.mcmod.cn:25565

        版本: 1.20.4 | 在线玩家: 12/50

        > 欢迎来到服务器！

        ...row-start horizontal=spacedBy(8)
            ...button text="📋 复制IP" event="copy {play.mcmod.cn:25565}" weight=(1)
            ...button-outlined text="🔄 刷新" event="url {https://api.mcstatus.io/v2/status/java/play.mcmod.cn}" weight=(1)
        ...row-end
    ...column-end
...card-end

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
        **最新正式版**: 1.20.4
        **最新快照**: 24w14a

        近期版本：
        - **1.20.4** (2023-12-07)
        - **1.20.3** (2023-12-05)
        - **1.20.2** (2023-09-21)

        ...row-start horizontal=spacedBy(8)
            ...button text="📥 官方下载" event="url {https://www.minecraft.net/zh-hans/download}" weight=(1)
            ...button text="📋 复制版本号" event="copy {1.20.4}" weight=(1)
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
        - [工业2](https://www.mcmod.cn/class/2.html) - 经典科技模组，工业时代的开端
        - [暮色森林](https://www.mcmod.cn/class/19.html) - 冒险维度模组，探索神秘森林
        - [应用能源2](https://www.mcmod.cn/class/184.html) - 存储网络模组，智能物品管理
        - [热力膨胀](https://www.mcmod.cn/class/31.html) - 科技模组，能源与机械
        - [神秘时代6](https://www.mcmod.cn/class/463.html) - 魔法模组，研究神秘学
        - [匠魂](https://www.mcmod.cn/class/36.html) - 工具模组，自定义打造装备

        ...row-start horizontal=spacedBy(8)
            ...button text="🔥 查看更多" event="url {https://www.mcmod.cn/modlist.html?sort=view}" weight=(1)
            ...button text="🆕 最新收录" event="url {https://www.mcmod.cn/modlist.html?sort=createtime}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🌐 CurseForge 热门 ---
...card-start title="🌐 CurseForge 热门" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(6) horizontal=Start
        - [Just Enough Items (JEI)](https://www.curseforge.com/minecraft/mcmods/jei) - 物品管理器，查看合成配方 (3亿+)
        - [JourneyMap](https://www.curseforge.com/minecraft/mcmods/journeymap) - 实时地图模组 (1.5亿+)
        - [Iron Chests](https://www.curseforge.com/minecraft/mcmods/iron-chests) - 更多箱子类型 (1亿+)
        - [Biomes O' Plenty](https://www.curseforge.com/minecraft/mcmods/biomes-o-plenty) - 更多生物群系 (9000万+)
        - [Tinkers' Construct](https://www.curseforge.com/minecraft/mcmods/tinkers-construct) - 匠魂工具打造 (8000万+)

        ...row-start horizontal=spacedBy(8)
            ...button text="📥 访问 CurseForge" event="url {https://www.curseforge.com/minecraft/mcmods}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🧩 Modrinth 热门 ---
...card-start title="🧩 Modrinth 热门" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(6) horizontal=Start
        - [Sodium](https://modrinth.com/mod/sodium) - 高性能渲染引擎，大幅提升FPS (15M+)
        - [Iris](https://modrinth.com/mod/iris) - 现代光影加载器 (8M+)
        - [Fabric API](https://modrinth.com/mod/fabric-api) - Fabric 核心 API (20M+)
        - [Lithium](https://modrinth.com/mod/lithium) - 游戏逻辑优化 (10M+)
        - [Phosphor](https://modrinth.com/mod/phosphor) - 光照引擎优化 (5M+)

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

        🖼️ 壁纸：Bing 每日壁纸
        © Microsoft

        ⏰ 更新时间：2026-05-10 14:53:20

        ...row-start horizontal=spacedBy(12)
            ...button-text text="📖 Markdown教程" event="url {https://www.runoob.com/markdown/md-tutorial.html}"
            ...button-text text="🐙 项目源码" event="url {https://github.com/}"
        ...row-end
    ...column-end
...card-end
