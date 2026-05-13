// ============================================
// 🎮 Zalith Launcher 2 - 全自动更新主页
// 生成时间：2026-05-13 14:52:02
// 数据来源：Bing | 一言 | Mojang | Modrinth | Minecraft Wiki
// ============================================

// --- Bing 每日壁纸横幅 ---
...image url="https://cn.bing.com/th?id=OHR.AlabamaHills_ZH-CN1387018045_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp" width=100% shape=0dp

// --- 每日一言 ---
...card-start title="📜 每日一言" shape=large contentPadding=(16,12)
    ...column-start vertical=spacedBy(8) horizontal=Center
> *"黑，真他妈黑啊"*

        ...row-start horizontal=spacedBy(12)
            ...button-text text="📋 复制" event="copy{黑，真他妈黑啊}"
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
**最新快照**: 26.2-snapshot-7

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
            ...button-filled-tonal text="📖 Minecraft Wiki" event="url{https://minecraft.wiki/Music_Disc_Tears}" weight=(1)
            ...button text="🌐 CurseForge" event="url{https://www.curseforge.com/minecraft/mcmods}" weight=(1)
        ...row-end
        ...row-start horizontal=spacedBy(8)
            ...button text="🌐 Modrinth" event="url{https://modrinth.com/mods}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🧩 Modrinth 最新模组 ---
...card-start title="🧩 Modrinth 最新模组" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(12) horizontal=Start
        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/qThzG03Y/82a04ec534a60e93032df62fd50ab878b79a5591_96.webp" width=32dp shape=4dp
            ...column-start
                ...button-text text="Day Counter by Niruki" event="url{https://modrinth.com/mod/day-counter-by-niruki}"
                <span style="font-size:12px; color:#94a3b8;">📥 0.0M | 👤 niruki | 📅 2026-05-13</span>
                <span style="font-size:12px;">Adds a small pixel-art calendar at the top-left of your screen showing the curre</span>
            ...column-end
        ...row-end

        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/hNGFhUh9/fe251ab3acd38325976be289262536b7de63ab31_96.webp" width=32dp shape=4dp
            ...column-start
                ...button-text text="blaze skeleton" event="url{https://modrinth.com/mod/blaze-skeleton}"
                <span style="font-size:12px; color:#94a3b8;">📥 0.0M | 👤 wardenbabapiro31 | 📅 2026-05-13</span>
                <span style="font-size:12px;">Added Blaze Skeleton with unique abilities:

Immune to fire and lava.

Can spawn</span>
            ...column-end
        ...row-end

        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/kAynBp83/d173dea5453c1ad23a7adef34914c12a923e8e45_96.webp" width=32dp shape=4dp
            ...column-start
                ...button-text text="Create: Solar Punk" event="url{https://modrinth.com/mod/create-solar-punk}"
                <span style="font-size:12px; color:#94a3b8;">📥 0.0M | 👤 IsuckAtEverything | 📅 2026-05-13</span>
                <span style="font-size:12px;">An addon for create that adds green energy to minecraft. (Solar panels, etc.)</span>
            ...column-end
        ...row-end

        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/vsv72IJr/7c01abbee7770b9774f516898994d82164480a7e_96.webp" width=32dp shape=4dp
            ...column-start
                ...button-text text="Unlocked Void Sea  - Aeronautics Addon" event="url{https://modrinth.com/mod/unlocked-void-sea}"
                <span style="font-size:12px; color:#94a3b8;">📥 0.0M | 👤 Tyrthurey | 📅 2026-05-13</span>
                <span style="font-size:12px;">A simple utility mod that lets you use the "End Sea" physics from Create: Aerona</span>
            ...column-end
        ...row-end

        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/LSu2JE8E/43d4ffc24b09c22056f9fb987eb88c1cbc258d14_96.webp" width=32dp shape=4dp
            ...column-start
                ...button-text text="Cobalt Material Mod" event="url{https://modrinth.com/mod/cobalt-material-mod}"
                <span style="font-size:12px; color:#94a3b8;">📥 0.0M | 👤 KingGeo_11 | 📅 2026-05-13</span>
                <span style="font-size:12px;">This project adds Cobalt as a material used in the game. It is intended to be be</span>
            ...column-end
        ...row-end

        ...row-start horizontal=spacedBy(8)
            ...button text="📥 访问 Modrinth" event="url{https://modrinth.com/mods}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🛠️ 实用工具 ---
...card-start title="🧰 实用工具" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(8) horizontal=Center
        ...button-outlined text="📋 复制QQ群" event="copy{123456789}" width=50%
    ...column-end
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

🖼️ 壁纸：银河系，摇滚吧！
        © 拱门与银河, 阿拉巴马山, 内华达山脉, 加利福尼亚州, 美国 (© Tim Fitzharris/Minden Pictures)

👤 **作者**：[ssbtt114514](https://ssbtt114514.github.io/)

📖 **Wiki 推荐**：[Music Disc Tears](https://minecraft.wiki/Music_Disc_Tears)

⏰ 更新时间：2026-05-13 14:52:02

        ...row-start horizontal=spacedBy(12)
            ...button-text text="📖 Markdown教程" event="url{https://www.runoob.com/markdown/md-tutorial.html}"
            ...button-text text="🐙 项目源码" event="url{https://github.com/}"
        ...row-end
    ...column-end
...card-end
