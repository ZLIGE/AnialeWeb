# Ashen ✨

一个 **梦幻紫二次元风格** 的 Astro 个人博客：顶部毛玻璃导航 + 三栏圆角卡片布局
（设计语言参考 [Shirone](https://shirone.mysqil.com/) /
[Firefly](https://firefly.cuteleaf.cn/) / [Fuwari](https://github.com/saicaca/fuwari)），
全部代码从零手写。

![Tech](https://img.shields.io/badge/Astro-7-8b5cf6)
![Tech](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4)
![Tech](https://img.shields.io/badge/TypeScript-strict-3178c6)

## ✨ 特性

- 🖼️ **全站壁纸系统**：首页 / 文章页 / 各板块页共享同一组壁纸轮播，跨页导航时
  **壁纸延续不闪烁**（`transition:persist` 持久层）；四种展示模式
  （**横幅 / 全屏 / 覆盖 / 隐藏**）一键切换，覆盖模式下导航栏变为悬浮毛玻璃卡片
- 🌊 **多层水波纹**：三层波浪漂移 + 纵向起伏（WAAPI 驱动，跨页搬移动画相位连续不抽搐）
- 🎨 **外观面板**：色相滑条全站换色（OKLCH 色彩系统）、壁纸模式、横幅标题与水波纹
  开关、列表 / 网格双布局，每项设置都可一键恢复默认，全部记忆
- 🌗 **明暗双主题**：默认明亮模式，手动切换后记忆选择，换页无闪烁
- 📌 **文章置顶**：frontmatter 一行置顶，列表优先展示并带徽标
- 🔒 **文章加密**：构建期以密码派生密钥（PBKDF2 → AES-GCM）加密整篇正文，
  页面源码与搜索索引均无明文；访客输入密码解锁，支持密码提示与错误反馈
- 🧭 **板块页横幅**：点击导航 / 侧栏分类 / 标签后壁纸延续，中央标题交叉淡入淡出
  为对应板块
- 📝 **完整博客能力**：全文搜索、文章目录（递进包裹高亮）、代码双主题高亮、
  标签、分类、分页、相邻文章导航
- 🌸 **樱花飘落** + 👧 **看板娘双形态**（单图活立绘 / Live2D / 关闭，config 一键切换）
- ✍️ **萌系字体**：霞鹜文楷（中文）+ Baloo 2（西文），npm 自托管无 CDN 依赖
- 📡 **RSS / Sitemap / Open Graph** 全套 SEO 基建

## 🚀 快速开始

```bash
pnpm install      # 安装依赖
pnpm dev          # 开发服务器 → http://localhost:4321
pnpm build        # 构建到 dist/
pnpm preview      # 本地预览构建结果
```

> 需要 Node.js ≥ 20 与 pnpm ≥ 9。

## 🗂️ 目录速览

```
src/
├── config.ts          ★ 全站配置（站名/社交/导航/壁纸/特效开关）
├── content.config.ts  文章字段定义（含置顶与加密字段）
├── content/posts/     ★ 你的文章（.md）
├── data/              ★ 追番录 / 作品集 / 友链数据
├── styles/global.css  主题色、设计令牌与各壁纸模式样式
├── components/        HeroBackdrop（跨页持久壁纸层）/ 外观面板 / 各横幅等
├── layouts/  pages/  utils/
public/images/hero/    ★ 壁纸图（轮播池）
public/images/         头像、favicon 等
```

## ✏️ 常用定制

### 1. 改成你的信息

编辑 `src/config.ts`：站名、签名、作者、头像、社交链接、导航、壁纸轮播池、
特效开关（樱花 / 看板娘）都在这里。

### 2. 写新文章

在 `src/content/posts/` 新建 `.md`（文件名即链接），frontmatter 模板：

```yaml
---
title: 文章标题
published: 2026-09-26
description: 摘要（列表页展示）
image: /images/cover.jpg    # 可选封面
tags: [标签1, 标签2]
category: 分类
pinned: true                # 可选：置顶显示
draft: false                # true 为草稿，不会发布
---
```

### 3. 文章加密

给文章加一个 `password`，正文会在**构建时整篇加密**（AES-GCM，页面源码与
搜索索引中无明文），访客需输入密码解锁，样式参考主题的解锁卡片：

```yaml
---
title: 加密文章演示
password: 你的密码
passwordHint: 提示文案（可选，展示在解锁卡片上）
---
```

> 密码写在文章源码中，适合「防随手围观」而非对抗拿到源码的人。

### 4. 更换壁纸

- 壁纸图放 `public/images/hero/`（建议 1920 宽横图），在 `src/config.ts` →
  `hero.images` 里增删路径即可；首页 / 文章页 / 板块页共用这一组轮播
- 轮播间隔改 `hero.interval`（毫秒）；`hero.taglines` 是首页标题下方的
  打字机标语池
- 覆盖图片文件（同名覆盖）则刷新浏览器即可生效

### 5. 更新追番录 / 作品集 / 友链

分别编辑 `src/data/anime.ts`、`src/data/projects.ts`、`src/data/friends.ts`，
每个字段都有中文注释，增删条目即可。

### 6. 看板娘

看板娘形态在 `src/config.ts` → `effects.companion` 切换：

- **`'elaina'`**（默认）：单图活立绘，图为 `public/images/elaina.webp`。
  替换成任意透明底全身立绘即可；点击有台词气泡，长按可拖动并记忆位置。
- **`'live2d'`**：Live2D 模型（oh-my-live2d 驱动），`live2d.models` 里把 `path`
  换成任意 Cubism 2/5 模型的 json 地址。
- **`'none'`**：关闭看板娘。

### 7. 调整主题色

右上角调色板 →「主题色」滑条可实时全站换色（记忆选择）；要改默认色相，编辑
`src/styles/global.css` 顶部 `:root` 中的 `--hue` / `--hue2`。

## 🌐 部署

1. 把 `astro.config.mjs` 中的 `site` 换成你的正式域名
2. 静态构建输出在 `dist/`，常见平台一键部署：
   - **Vercel / Netlify**：导入仓库即可，自动识别 Astro
   - **GitHub Pages**：参考官方 [guide](https://docs.astro.build/en/guides/deploy/github/)

## 📄 许可

站点代码 MIT。示例模型与第三方模型资源版权归其作者所有，仅供学习交流。
