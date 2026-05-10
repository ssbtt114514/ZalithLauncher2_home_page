// ============================================
// 🎮 Zalith Launcher 2 - 全自动更新主页
// 生成时间：2026/5/10 07:23:31
// 数据来源：Bing | 一言 | Mojang | Modrinth | 静态配置
// ============================================

// --- Bing 每日壁纸横幅 ---
...image url="https://cn.bing.com/th?id=OHR.MotherCub_ZH-CN0999123163_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp" width=100% shape=0dp

// --- 每日一言 ---
...card-start title="📜 每日一言" shape=large contentPadding=(16, 12)
    ...column-start vertical=spacedBy(8) horizontal=Center
> *"当你为错过太阳而哭泣的时候，你也要再错过群星了。"*

—— 飞鸟集 · 泰戈尔

        ...row-start horizontal=spacedBy(12)
            ...button-filled-tonal text="🔄 刷新" event="copy{https://v1.hitokoto.cn/?c=a}" width=100dp
            ...button-text text="📋 复制" event="copy{当你为错过太阳而哭泣的时候，你也要再错过群星了。}"
        ...row-end
    ...column-end
...card-end


// --- 🎮 服务器状态 ---
...card-start title="🎮 我的服务器" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(4) horizontal=Start
        🔴 **离线** | undefined:25565

        版本: 未知 | 在线玩家: N/A

        > 欢迎来到服务器！

        ...row-start horizontal=spacedBy(8)
            ...button text="📋 复制IP" event="copy{undefined:25565}" weight=(1)
            ...button-outlined text="🔄 刷新" event="url{https://api.mcstatus.io/v2/status/java/play.mcmod.cn}" weight=(1)
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
            ...button text="📥 官方下载" event="url{https://www.minecraft.net/zh-hans/download}" weight=(1)
            ...button text="📋 复制版本号" event="copy{26.1.2}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🌐 MC 资源中心 ---
...card-start title="📚 MC 资源中心" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(8) horizontal=Center
        ...row-start horizontal=spacedBy(8)
            ...button-filled-tonal text="📖 MC百科" event="url{https://www.mcmod.cn/}" weight=(1)
            ...button-filled-tonal text="🔍 模组列表" event="url{https://www.mcmod.cn/modlist.html}" weight=(1)
        ...row-end
        ...row-start horizontal=spacedBy(8)
            ...button-filled-tonal text="⬇️ 下载站" event="url{https://www.mcmod.cn/download.html}" weight=(1)
            ...button-filled-tonal text="💬 论坛" event="url{https://bbs.mcmod.cn/}" weight=(1)
        ...row-end
        ...row-start horizontal=spacedBy(8)
            ...button text="🌐 CurseForge" event="url{https://www.curseforge.com/minecraft/mcmods}" weight=(1)
            ...button text="🌐 Modrinth" event="url{https://modrinth.com/mods}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🧩 Modrinth 热门（实时API）---
...card-start title="🧩 Modrinth 热门" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(6) horizontal=Start
        - [Sodium](https://modrinth.com/mod/sodium) - The fastest and most compatible renderin (151.5M)
        - [Fabric API](https://modrinth.com/mod/fabric-api) - Lightweight and modular API providing co (167.3M)
        - [Iris Shaders](https://modrinth.com/mod/iris) - A modern shader pack loader for Minecraf (118.3M)
        - [Mod Menu](https://modrinth.com/mod/modmenu) - Adds a mod menu to view the list of mods (100.7M)
        - [Lithium](https://modrinth.com/mod/lithium) - No-compromises game logic optimization m (91.0M)

        ...row-start horizontal=spacedBy(8)
            ...button text="📥 访问 Modrinth" event="url{https://modrinth.com/mods}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🛠️ 实用工具 ---
...card-start title="🧰 实用工具" shape=medium contentPadding=(12)
    ...row-start horizontal=spacedBy(8) vertical=Top
        ...column-start weight=(1) vertical=spacedBy(8) horizontal=Center
            ...button-outlined text="📋 复制服务器IP" event="copy{play.mcmod.cn}" width=100%
            ...button-outlined text="📋 复制QQ群" event="copy{123456789}" width=100%
            ...button-outlined text="📋 复制 Discord" event="copy{discord.gg/xxxx}" width=100%
        ...column-end
        ...column-start weight=(1) vertical=spacedBy(8) horizontal=Center
            ...button-outlined text="🌙 夜间模式" event="copy{夜间模式功能暂未接入}" width=100%
            ...button-outlined text="⚙️ 游戏设置" event="copy{请前往启动器设置}" width=100%
            ...button-outlined text="📁 存档目录" event="copy{请手动打开 .minecraft/saves}" width=100%
        ...row-end
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

⏰ 更新时间：2026/5/10 07:23:31

        ...row-start horizontal=spacedBy(12)
            ...button-text text="📖 Markdown教程" event="url{https://www.runoob.com/markdown/md-tutorial.html}"
            ...button-text text="🐙 项目源码" event="url{https://github.com/}"
        ...row-end
    ...column-end
...card-end
