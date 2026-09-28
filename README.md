# 星梦小筑 🌸

一个 **梦幻紫二次元风格** 的 Astro 个人网站：左侧个人卡片侧栏 + 圆角卡片布局（参考
[Fuwari](https://github.com/saicaca/fuwari)），全部代码从零手写。

![Tech](https://img.shields.io/badge/Astro-7-8b5cf6)
![Tech](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4)
![Tech](https://img.shields.io/badge/TypeScript-strict-3178c6)

## ✨ 特性

- 🌙 **明暗双主题**：OKLCH 梦幻紫配色，默认暗黑主题，手动切换后记忆选择，无刷新闪烁
- 🎨 **主题调色板**：6 套预设色板（梦幻紫 / 樱花粉 / 天空蓝 / 薄荷绿 / 落日橙 / 翡翠青）一键全站换色，选择记忆
- 🌸 **樱花飘落**：Canvas 手绘花瓣特效（尊重系统「减少动态效果」设置）
- 👧 **看板娘双形态**：`elaina` 单图活立绘（呼吸动画 / 视线视差 / 点击台词 / 长按拖动）或 `live2d` 模型（oh-my-live2d 驱动），config 一键切换
- 🖼️ **原创 Banner 插图**：梦幻星空 SVG（无版权烦恼，随时可换自己的图）
- ✍️ **萌系字体**：霞鹜文楷（中文）+ Baloo 2（西文），npm 自托管无 CDN 依赖
- 📝 **完整博客能力**：内容集合类型校验、文章目录（TOC）、代码双主题高亮、标签、分页
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
├── config.ts          ★ 全站配置（名字/社交/导航/特效开关）
├── content.config.ts  文章字段定义
├── content/posts/     ★ 你的文章（.md）
├── data/              ★ 追番录 / 作品集 / 友链数据
├── styles/global.css  主题色与设计令牌
├── layouts/  components/  pages/  utils/
public/images/         头像、Banner、favicon
```

## ✏️ 常用定制

### 1. 改成你的信息

编辑 `src/config.ts`：站点名、签名、作者、头像、社交链接、导航都在这里；
特效开关（樱花 / 看板娘）也在其中。

### 2. 写新文章

在 `src/content/posts/` 新建 `.md`（文件名即链接），frontmatter 模板：

```yaml
---
title: 文章标题
published: 2026-09-26
description: 摘要（列表页展示）
image: /images/cover.jpg   # 可选封面
tags: [标签1, 标签2]
category: 分类
draft: false               # true 为草稿，不会发布
---
```

### 3. 更新追番录 / 作品集 / 友链

分别编辑 `src/data/anime.ts`、`src/data/projects.ts`、`src/data/friends.ts`，
每个字段都有中文注释，增删条目即可。

### 4. 换首页 Hero 轮播图 / 头像

- **Hero 轮播**：图片放 `public/images/hero/`（建议 1920 宽 WebP），在
  `src/config.ts` → `hero.images` 里增删路径即可；每次打开网站随机从其中
  一张开始，之后自动轮播，底部渐变遮罩保证标题可读
- **头像**：替换 `public/images/avatar.jpg`，或改 `avatar` 路径

### 5. 看板娘

看板娘形态在 `src/config.ts` → `effects.companion` 切换：

- **`'elaina'`**（默认）：单图活立绘，图为 `public/images/elaina.webp`（已去水印）。
  替换成任意透明底全身立绘即可；点击有台词气泡，长按可拖动并记忆位置。
- **`'live2d'`**：Live2D 模型（oh-my-live2d 驱动），`live2d.models` 里把 `path`
  换成任意 Cubism 2/5 模型的 json 地址。想自制模型可用
  [psd2live](https://github.com/tsunehimatoi/psd2live)（桌面工具）从**分层 PSD**
  自动绑骨导出 `.moc3`，再配置到本站。
- **`'none'`**：关闭看板娘。

### 6. 调整主题色

`src/styles/global.css` 顶部 `:root` / `[data-theme='dark']` 中的
`--pr`（主色）与 `--accent`（点缀色），全站自动跟随。

## 🌐 部署

1. 把 `astro.config.mjs` 中的 `site` 换成你的正式域名
2. 静态构建输出在 `dist/`，常见平台一键部署：
   - **Vercel / Netlify**：导入仓库即可，自动识别 Astro
   - **GitHub Pages**：参考官方 [guide](https://docs.astro.build/en/guides/deploy/github/)

## 📄 许可

站点代码 MIT。示例模型与第三方模型资源版权归其作者所有，仅供学习交流。
