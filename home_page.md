// ============================================
// 🎮 Zalith Launcher 2 自定义主页
// 预设版本（静态数据 + 作者链接）
// 最后更新：2026-05-10
// ============================================

// --- Bing 每日壁纸横幅（可自行替换图片链接）---
...image url="https://cn.bing.com/th?id=OHR.SpringCove_ZH-CN1234567890_1920x1080.jpg" width=100% shape=0dp

// --- 每日一言 ---
...card-start title="📜 每日一言" shape=large contentPadding=(16, 12)
    ...column-start vertical=spacedBy(8) horizontal=Center
> *"星光不问赶路人，时光不负有心人。"*

—— 网络

        ...row-start horizontal=spacedBy(12)
            ...button-filled-tonal text="🔄 刷新" event="copy{https://v1.hitokoto.cn/?c=a}" width=100dp
            ...button-text text="📋 复制" event="copy{星光不问赶路人，时光不负有心人。}"
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
**最新正式版**: 1.20.6
**最新快照**: 24w18a

近期版本：
        - **1.20.6** (2024-05-03)
        - **1.20.5** (2024-04-23)
        - **1.20.4** (2023-12-07)

        ...row-start horizontal=spacedBy(8)
            ...button text="📥 官方下载" event="url{https://www.minecraft.net/zh-hans/download}" weight=(1)
            ...button text="📋 复制版本号" event="copy{1.20.6}" weight=(1)
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

// --- 🧩 Modrinth 热门（含模组图标）---
...card-start title="🧩 Modrinth 热门" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(10) horizontal=Start
        // Sodium
        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/AANobbMI/icon.png" width=24dp shape=4dp
            ...button-text text="[Sodium](https://modrinth.com/mod/sodium) - 高性能渲染引擎 (15M+)"
        ...row-end
        // Iris
        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/YL57xq9U/icon.png" width=24dp shape=4dp
            ...button-text text="[Iris](https://modrinth.com/mod/iris) - 现代光影加载器 (8M+)"
        ...row-end
        // Fabric API
        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/P7dR8mSH/icon.png" width=24dp shape=4dp
            ...button-text text="[Fabric API](https://modrinth.com/mod/fabric-api) - Fabric 核心 API (20M+)"
        ...row-end
        // Lithium
        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/gvQqBUqZ/icon.png" width=24dp shape=4dp
            ...button-text text="[Lithium](https://modrinth.com/mod/lithium) - 游戏逻辑优化 (10M+)"
        ...row-end
        // Phosphor
        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/9pc0y4kz/icon.png" width=24dp shape=4dp
            ...button-text text="[Phosphor](https://modrinth.com/mod/phosphor) - 光照引擎优化 (5M+)"
        ...row-end

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

// --- ℹ️ 关于（含作者链接）---
...card-start title="ℹ️ 关于" shape=small contentPadding=(12)
    ...column-start vertical=spacedBy(4) horizontal=Center
**Zalith Launcher 2** 自定义主页

🖼️ 壁纸：示例 Bing 壁纸

👤 **作者**：[ssbtt114514](https://ssbtt114514.github.io/)

⏰ 更新时间：2026-05-10

        ...row-start horizontal=spacedBy(12)
            ...button-text text="📖 Markdown教程" event="url{https://www.runoob.com/markdown/md-tutorial.html}"
            ...button-text text="🐙 项目源码" event="url{https://github.com/}"
        ...row-end
    ...column-end
...card-end