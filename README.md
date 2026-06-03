# Personel

> 极简黑白风格的个人主页，基于 Astro + Tailwind CSS v4 构建。

## 🚀 项目结构

```text
/
├── public/            # 静态资源（favicon、OG 图片等）
├── scripts/           # 构建辅助脚本
│   └── generate-og-image.mjs  # OG 图片生成
├── src/
│   ├── components/    # 可复用组件
│   │   ├── Hero.astro
│   │   ├── ProjectGrid.astro
│   │   └── Timeline.astro
│   ├── data/          # 数据层
│   │   ├── experience.ts
│   │   └── projects.ts
│   ├── layouts/       # 页面布局
│   │   └── Layout.astro
│   ├── pages/         # 路由页面
│   │   └── index.astro
│   └── styles/        # 全局样式
│       └── global.css
├── astro.config.mjs   # Astro 配置
├── vercel.json        # Vercel 部署配置
└── package.json
```

## 🧞 命令

| 命令                     | 说明                         |
| :----------------------- | :--------------------------- |
| `pnpm install`           | 安装依赖                     |
| `pnpm dev`               | 启动开发服务器 (localhost:4321) |
| `pnpm build`             | 构建生产站点到 `./dist/`     |
| `pnpm preview`           | 本地预览构建结果             |
| `pnpm generate-og`       | 手动生成 OG 社交分享图片     |

> **注意**：首次安装后需运行 `pnpm approve-builds esbuild sharp` 以允许原生模块编译。

---

## 🌐 Vercel 部署指南

### 一键部署（推荐）

1. 点击下方按钮，自动克隆并部署到 Vercel：

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_GITHUB_USERNAME/personel)

2. 按提示完成部署，Vercel 会自动识别 Astro 框架并使用项目中的 `vercel.json` 配置。

### 手动部署

#### 1. 推送代码到 GitHub

```bash
# 初始化（如果还没有）
git init
git add .
git commit -m "feat: personal homepage ready for deployment"

# 添加远程仓库并推送
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/personel.git
git branch -M main
git push -u origin main
```

#### 2. 在 Vercel 导入项目

1. 访问 [vercel.com](https://vercel.com)，使用 **GitHub 账号** 登录/注册
2. 点击 **「New Project」** → 选择刚刚创建的 GitHub 仓库 `personel`
3. Vercel 会自动检测到 Astro 框架，构建配置已内置在 `vercel.json`：
   - **Framework**: Astro
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`
4. 点击 **「Deploy」**，等待构建完成
5. 部署成功后，Vercel 会生成一个 `*.vercel.app` 域名（如 `personel-xxx.vercel.app`）

#### 3. 自定义域名（可选）

1. 在 Vercel 项目面板 → **Settings** → **Domains**
2. 添加你的域名，按提示配置 DNS（CNAME 指向 `cname.vercel-dns.com`）
3. Vercel 会自动配置 SSL 证书（Let's Encrypt）

### 自动部署（Git Push）

完成首次部署后，每次 `git push` 到 `main` 分支都会触发 Vercel 自动重新部署：

```bash
# 修改内容后
git add .
git commit -m "feat: 更新XXX"
git push
# → Vercel 自动构建并部署（约 30 秒）
```

---

## ✅ 部署验证清单

| 检查项           | 验证方法                                     |
| :--------------- | :------------------------------------------- |
| 🔒 HTTPS 正常工作 | 浏览器访问 `https://<domain>` 无安全警告     |
| 📄 所有路由正常   | 访问首页，确认页面内容完整                     |
| 🌓 主题切换正常   | 点击右上角太阳/月亮图标，确认亮色/暗色切换    |
| 📱 移动端响应式   | Chrome DevTools 模拟移动设备，布局正常        |
| 🖼️ Open Graph     | [opengraph.xyz](https://www.opengraph.xyz) 检查社交预览 |

---

## 🔧 后续更新流程

1. **本地开发**：`pnpm dev` 启动热重载开发服务器
2. **修改内容**：编辑 `src/data/` 下的数据文件更新个人信息
3. **本地验证**：`pnpm build && pnpm preview` 确认构建无错
4. **提交推送**：`git add . && git commit -m "描述" && git push`
5. **等待部署**：Vercel Dashboard 或 GitHub Actions 可查看部署状态

### 数据文件说明

- `src/data/experience.ts` → 修改工作/教育经历
- `src/data/projects.ts` → 修改项目展示
- `src/layouts/Layout.astro` → 修改 SEO 元数据（title、description、name 等）
- `scripts/generate-og-image.mjs` → 修改 OG 社交分享图片样式

---

## 📄 License

MIT
