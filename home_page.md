// ============================================
// 🎮 Zalith Launcher 2 - 全自动更新主页
// 生成时间：2026/5/10 07:18:42
// 数据来源：Bing | 一言 | MC百科 | Mojang | CurseForge | Modrinth | 和风天气
// ============================================

// --- Bing 每日壁纸横幅 ---
...image url="https://cn.bing.com/th?id=OHR.MotherCub_ZH-CN0999123163_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp" width=100% shape=0dp

// --- 每日一言 ---
...card-start title="📜 每日一言" shape=large contentPadding=(16, 12)
    ...column-start vertical=spacedBy(8) horizontal=Center
> *"即使认真做 有些事还是做不到啊"*

—— 原创

        ...row-start horizontal=spacedBy(12)
            ...button-filled-tonal text="🔄 刷新" event="url {https://v1.hitokoto.cn/}" width=100dp
            ...button-text text="📋 复制" event="copy {即使认真做 有些事还是做不到啊}"
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
**最新正式版**: 26.1.2
**最新快照**: 26.2-snapshot-6

近期版本：
        - **26.1.2** (2026-04-09)
        - **26.1.1** (2026-04-01)
        - **26.1** (2026-03-24)

        ...row-start horizontal=spacedBy(8)
            ...button text="📥 官方下载" event="url {https://www.minecraft.net/zh-hans/download}" weight=(1)
            ...button text="📋 复制版本号" event="copy {26.1.2}" weight=(1)
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
        - [GeckoLib](https://www.curseforge.com/minecraft/mc-mods/geckolib) - A 3D animation library for entities ()
        - [Just Enough Items (JEI)](https://www.curseforge.com/minecraft/mc-mods/jei) - View Items and Recipes ()
        - [Cloth Config API (Fabric/Forge/NeoForge)](https://www.curseforge.com/minecraft/mc-mods/cloth-config) - Config Screen API for Minecraft ()
        - [Architectury API](https://www.curseforge.com/minecraft/mc-mods/architectury-api) - An intermediary api aimed to ease d ()
        - [Mouse Tweaks](https://www.curseforge.com/minecraft/mc-mods/mouse-tweaks) - Enhances inventory management by ad ()

        ...row-start horizontal=spacedBy(8)
            ...button text="📥 访问 CurseForge" event="url {https://www.curseforge.com/minecraft/mcmods}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🧩 Modrinth 热门 ---
...card-start title="🧩 Modrinth 热门" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(6) horizontal=Start
        - [Sodium](https://modrinth.com/mod/sodium) - The fastest and most compatible renderin (151.5M)
        - [Fabric API](https://modrinth.com/mod/fabric-api) - Lightweight and modular API providing co (167.3M)
        - [Iris Shaders](https://modrinth.com/mod/iris) - A modern shader pack loader for Minecraf (118.3M)
        - [Mod Menu](https://modrinth.com/mod/modmenu) - Adds a mod menu to view the list of mods (100.7M)
        - [Lithium](https://modrinth.com/mod/lithium) - No-compromises game logic optimization m (91.0M)

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

🖼️ 壁纸：一份经久不衰的羁绊
        © 北极熊妈妈和幼崽在瓦普斯克国家公园玩耍, 马尼托巴省, 加拿大 (© Hao Jiang/Getty Images)

⏰ 更新时间：2026/5/10 07:18:42

        ...row-start horizontal=spacedBy(12)
            ...button-text text="📖 Markdown教程" event="url {https://www.runoob.com/markdown/md-tutorial.html}"
            ...button-text text="🐙 项目源码" event="url {https://github.com/}"
        ...row-end
    ...column-end
...card-end
