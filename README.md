# 🎮 Zalith Launcher 2 自动更新主页

全自动生成的自定义主页，支持多种数据源实时更新。

## ✨ 功能特性

| 功能 | 数据来源 | 更新频率 |
|------|---------|---------|
| 🖼️ Bing 每日壁纸 | Bing API | 每天 |
| 💬 每日一言 | Hitokoto API | 每天 |
| 🌤️ 天气信息 | 和风天气 API | 每天 |
| 🎮 服务器状态 | mcstatus.io | 每天 |
| 📦 MC 版本信息 | Mojang 官方 API | 每天 |
| 🔥 MC百科热门 | mcmod.cn | 每天 |
| 🌐 CurseForge 热门 | curseforge.com | 每天 |
| 🧩 Modrinth 热门 | modrinth.com API | 每天 |

## 🚀 快速开始

### 1. 创建 GitHub 仓库

```bash
git clone https://github.com/你的用户名/zalith-homepage.git
cd zalith-homepage
npm install
```

### 2. 配置环境变量（可选）

在 GitHub 仓库设置中添加 Secrets：

- `WEATHER_API_KEY` - 和风天气 API Key（[申请地址](https://dev.qweather.com/)）
- `SERVER_IP` - 你的 MC 服务器 IP（如 `mc.example.com`）

### 3. 手动测试

```bash
npm run update
```

### 4. 推送到 GitHub

```bash
git add .
git commit -m "init: 自动更新主页"
git push origin main
```

### 5. 配置启动器

在 Zalith Launcher 2 的自定义主页设置中填入：

```
https://raw.githubusercontent.com/你的用户名/zalith-homepage/main/home_page.md
```

## ⚙️ GitHub Actions 配置

工作流已配置为每天北京时间 **8:00、12:00、20:00** 自动运行。

也可以手动触发：
1. 进入仓库 **Actions** 页面
2. 选择 **"更新 Zalith Launcher 主页"**
3. 点击 **"Run workflow"**

## 🔧 自定义配置

编辑 `scripts/update.js` 中的 `CONFIG` 对象：

```javascript
const CONFIG = {
    weatherApiKey: '',  // 和风天气 API Key
    weatherCity: '北京',  // 默认城市
    serverIp: ''  // MC 服务器 IP
};
```

## 📁 文件结构

```
.
├── .github/workflows/
│   └── update-homepage.yml    # GitHub Actions 工作流
├── scripts/
│   └── update.js              # 更新脚本
├── home_page.md               # 生成的自定义主页（自动更新）
├── package.json               # 项目配置
└── README.md                  # 本文件
```

## 📝 注意事项

1. **GitHub Actions 免费额度**：公共仓库无限制，私有仓库每月 2000 分钟
2. **API 限制**：
   - 和风天气：免费版 1000 次/天
   - Modrinth：无限制
   - Bing/Hitokoto：无限制
3. **备用数据**：所有 API 都配置了备用数据，获取失败时显示默认内容

## 🔗 相关链接

- [Zalith Launcher 官网](https://www.zalithlauncher.cn/)
- [Markdown 教程](https://www.runoob.com/markdown/md-tutorial.html)
- [和风天气 API](https://dev.qweather.com/)
- [Modrinth API 文档](https://docs.modrinth.com/)

## 📄 许可证

MIT License
