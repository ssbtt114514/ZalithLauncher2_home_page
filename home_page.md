// ============================================
// 🎮 Zalith Launcher 2 - 全自动更新主页
// 生成时间：2026-05-10 08:04:30
// 数据来源：Bing | 一言 | Mojang | Modrinth | Minecraft Wiki
// ============================================

// --- Bing 每日壁纸横幅 ---
...image url="https://cn.bing.com/th?id=OHR.MotherCub_ZH-CN0999123163_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp" width=100% shape=0dp

// --- 每日一言 ---
...card-start title="📜 每日一言" shape=large contentPadding=(16, 12)
    ...column-start vertical=spacedBy(8) horizontal=Center
> *"意志是一个强壮的盲人，倚靠在明眼的跛子肩上。"*

        ...row-start horizontal=spacedBy(12)
            ...button-filled-tonal text="🔄 刷新" event="copy{https://v1.hitokoto.cn/?c=a}" width=100dp
            ...button-text text="📋 复制" event="copy{意志是一个强壮的盲人，倚靠在明眼的跛子肩上。}"
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
            ...button-filled-tonal text="💬 MCBBS" event="url{https://www.mcbbs.net/}" weight=(1)
            ...button-filled-tonal text="📖 Minecraft Wiki" event="url{https://minecraft.wiki/Blast_Furnace}" weight=(1)
        ...row-end
        ...row-start horizontal=spacedBy(8)
            ...button text="🌐 CurseForge" event="url{https://www.curseforge.com/minecraft/mcmods}" weight=(1)
            ...button text="🌐 Modrinth" event="url{https://modrinth.com/mods}" weight=(1)
        ...row-end
    ...column-end
...card-end

// --- 🧩 Modrinth 最新模组（按更新时间排序）---
...card-start title="🧩 Modrinth 最新模组" shape=medium contentPadding=(12)
    ...column-start vertical=spacedBy(10) horizontal=Start
        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/t4M26zkN/c2fcfbeb2209bfed46f9714cf6be77871065b4db_96.webp" width=24dp shape=4dp
            ...button-text text="Immersive Chests - This project adds a configurable camera  (0.0M)" event="url{https://modrinth.com/mod/immersivechests}"
        ...row-end

        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/eDSgW1zD/2f522f27776e6d91ece38dfba5575adc4d9fee8e_96.webp" width=24dp shape=4dp
            ...button-text text="BL Inventory Peek - This mod adds a small preview of your in (0.0M)" event="url{https://modrinth.com/mod/bl-inventory-peek}"
        ...row-end

        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/ULzrAD1U/5b220eabadd9031e6851ce803a62c961db96f118_96.webp" width=24dp shape=4dp
            ...button-text text="Create: SchematicChecker - A mod for fix all schematic problem from (0.1M)" event="url{https://modrinth.com/mod/createschematicchecker}"
        ...row-end

        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/bra6fsBj/e6b81eaa153612d4c0b2d6d135839d479bcca1fc_96.webp" width=24dp shape=4dp
            ...button-text text="Starter pack - Adds starter pack to your game (0.0M)" event="url{https://modrinth.com/mod/starter-pack-mod}"
        ...row-end

        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/LdhhdMPS/c1e0c5a6ad17df204ca0681cd06ef06df4dc6878_96.webp" width=24dp shape=4dp
            ...button-text text="Lyro PvP ULTIMATE - The ULTIMATE PvP Texture Pack you'll eve (0.0M)" event="url{https://modrinth.com/mod/lyro-ultimate}"
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

🖼️ 壁纸：一份经久不衰的羁绊
        © 北极熊妈妈和幼崽在瓦普斯克国家公园玩耍, 马尼托巴省, 加拿大 (© Hao Jiang/Getty Images)

👤 **作者**：[ssbtt114514](https://ssbtt114514.github.io/)

📖 **Wiki 推荐**：[Blast Furnace](https://minecraft.wiki/Blast_Furnace)

⏰ 更新时间：2026-05-10 08:04:30

        ...row-start horizontal=spacedBy(12)
            ...button-text text="📖 Markdown教程" event="url{https://www.runoob.com/markdown/md-tutorial.html}"
            ...button-text text="🐙 项目源码" event="url{https://github.com/}"
        ...row-end
    ...column-end
...card-end
