// ============================================
// 🎮 Zalith Launcher 2 - 全自动更新主页
// 生成时间：2026-05-11 21:59:12
// 数据来源：Bing | 一言 | Mojang | Modrinth | Minecraft Wiki
// ============================================

// --- Bing 每日壁纸横幅 ---
...image url="https://cn.bing.com/th?id=OHR.Fratercula_ZH-CN1239275412_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp" width=100% shape=0dp

// --- 每日一言 ---
...card-start title="📜 每日一言" shape=large contentPadding=(16,12)
    ...column-start vertical=spacedBy(8) horizontal=Center
> *"Per aspera ad astra."*

        ...row-start horizontal=spacedBy(12)
            ...button-text text="📋 复制" event="copy{Per aspera ad astra.}"
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
            ...button-filled-tonal text="📖 Minecraft Wiki" event="url{https://minecraft.wiki/Debug}" weight=(1)
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
            ...image url="https://cdn.modrinth.com/data/bh0iBZld/dd5e29208efbed612f74fef6e13e0e0d797b9907_96.webp" width=32dp shape=4dp
            ...column-start
                ...button-text text="Slot Jam" event="url{https://modrinth.com/mod/slot-jam}"
                <span style="font-size:12px; color:#94a3b8;">📥 0.0M | 👤 Neiliv | 📅 2026-05-11</span>
                <span style="font-size:12px;">At a configurable interval, some slots become unusable.</span>
            ...column-end
        ...row-end

        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/eGy4o2qu/5b3241cceb584962c118d89bb9c159ebee3aa1db.png" width=32dp shape=4dp
            ...column-start
                ...button-text text="Rotten Flesh into Leather" event="url{https://modrinth.com/mod/rotten-flesh-into-leather}"
                <span style="font-size:12px; color:#94a3b8;">📥 0.0M | 👤 badcakee | 📅 2026-05-11</span>
                <span style="font-size:12px;">This project adds a useful use for Rotten Flesh</span>
            ...column-end
        ...row-end

        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/5ECg8hJg/ae61020f77abe8fdb76b71c7e2996040c411512a_96.webp" width=32dp shape=4dp
            ...column-start
                ...button-text text="Polymer Patch for Sooty Chimneys" event="url{https://modrinth.com/mod/sooty-chimneys-polymer}"
                <span style="font-size:12px; color:#94a3b8;">📥 0.0M | 👤 Sun_Phoen1x | 📅 2026-05-11</span>
                <span style="font-size:12px;">A Polymer Patch mod for Sooty Chimneys, allowing it to work fully server side!</span>
            ...column-end
        ...row-end

        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/etWyo7w3/ca6357c337a91b6ad70d5fc0eb2ce45fb19653dc_96.webp" width=32dp shape=4dp
            ...column-start
                ...button-text text="StaticSky" event="url{https://modrinth.com/mod/staticsky}"
                <span style="font-size:12px; color:#94a3b8;">📥 0.0M | 👤 ZeeGood | 📅 2026-05-11</span>
                <span style="font-size:12px;">Changes the default Minecraft sky gradient to a single, solid color for a cleane</span>
            ...column-end
        ...row-end

        ...row-start horizontal=spacedBy(8) vertical=Center
            ...image url="https://cdn.modrinth.com/data/iqG99Iwy/c5e34d9b22ee7453f78b84aee9f4f7e40934571d.png" width=32dp shape=4dp
            ...column-start
                ...button-text text="CoolGUI" event="url{https://modrinth.com/mod/fifou_coolgui}"
                <span style="font-size:12px; color:#94a3b8;">📥 0.0M | 👤 joris.brischetto | 📅 2026-05-11</span>
                <span style="font-size:12px;">ADD A COOLGUI whit many possibilities like teleport, walkspeed overide and more.</span>
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

🖼️ 壁纸：振翅, 潜水, 生存
        © 北极海鹦, 威尔士 (© FLPA/Alamy)

👤 **作者**：[ssbtt114514](https://ssbtt114514.github.io/)

📖 **Wiki 推荐**：[Debug](https://minecraft.wiki/Debug)

⏰ 更新时间：2026-05-11 21:59:12

        ...row-start horizontal=spacedBy(12)
            ...button-text text="📖 Markdown教程" event="url{https://www.runoob.com/markdown/md-tutorial.html}"
            ...button-text text="🐙 项目源码" event="url{https://github.com/}"
        ...row-end
    ...column-end
...card-end
