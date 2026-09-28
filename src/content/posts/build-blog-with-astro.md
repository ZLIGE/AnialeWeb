---
title: 从零用 Astro 搭一座梦幻紫小站
published: 2026-09-05
updated: 2026-09-22
description: 本站搭建全记录：技术选型、OKLCH 主题系统、樱花特效与看板娘的实现思路。
image: /images/cover-astro.svg
tags:
  - Astro
  - 前端
  - 教程
category: 技术宅
---

把搭站过程记下来，一是备忘，二是给同样想自己动手的朋友指指路。
本站的完整配方：**Astro 7 + Tailwind CSS 4 + 一点点 Canvas 魔法**。

## 为什么选 Astro

- 默认零 JS 输出，写完 Markdown 就是静态页面，快得飞起
- 组件语法接近原生 HTML，心智负担小
- 内容集合（Content Collections）自带 frontmatter 类型校验，手滑写错字段会直接报错
- 生态里 Pagefind、RSS、Sitemap 都是开箱即用的官方包

## 初始化与 Tailwind

```bash
pnpm create astro@latest -- --template minimal
pnpm add tailwindcss @tailwindcss/vite
pnpm add @astrojs/rss @astrojs/sitemap
```

Tailwind 4 走 Vite 插件接入，`astro.config.mjs` 里挂上就好：

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

## OKLCH 主题系统

配色没有用现成色板，而是像 Fuwari 那样基于 OKLCH 变量。
它对亮度的感知更均匀，紫色不容易「脏」：

```css
:root {
  /* 紫罗兰主色 + 樱花粉点缀 */
  --pr: oklch(0.58 0.19 295);
  --accent: oklch(0.66 0.2 345);
  --bg: oklch(0.962 0.014 305);
}

[data-theme='dark'] {
  --pr: oklch(0.78 0.12 295);
  --bg: oklch(0.185 0.035 295);
}
```

再用 Tailwind 4 的 `@theme inline` 把变量映射成工具类，
`bg-card`、`text-primary` 这些类名就会自动跟随主题切换：

```css
@theme inline {
  --color-primary: var(--pr);
  --color-card: var(--card);
}
```

## 明暗切换怎么不闪

关键是在 `<head>` 里放一段**内联**脚本，渲染前就把主题写到
`data-theme` 上，否则暗色党每次刷新都会被白光闪一下眼睛：

```html
<script is:inline>
  const theme =
    localStorage.getItem('theme') ??
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
</script>
```

## 樱花飘落的小心机

全屏 `<canvas>` + `pointer-events: none`，花瓣就是一段贝塞尔曲线画的
泪滴形加顶端缺刻，旋转和左右摆动全靠 `Math.sin` 骗过眼睛。
两个不能省的细节：

1. **尊重系统偏好**：`prefers-reduced-motion` 的用户不该被花瓣糊脸
2. **标签页隐藏时暂停** `requestAnimationFrame`，不偷偷烧电

```js
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  requestAnimationFrame(step);
}
```

## 看板娘

用了 [oh-my-live2d](https://oml2d.com)，Cubism 2/5 模型都支持，
换模型只要改一个 URL。动态 `import()` 加载，就算模型 CDN 抽风，
也只会少个看板娘而不会白屏——网站的体面要紧（笑）。

## 踩坑备忘

- 中文字体选了 **霞鹜文楷**，西文配 Baloo 2，圆润感直接拉满；
  用 unicode-range 分片方案，首屏只加载用到的字
- 文章目录不用插件，`render()` 返回的 `headings` 就是现成的 TOC 数据
- 分页路由 `/page/[page]` 从第 2 页开始生成，第 1 页留给 `index`
- 图片记得 `loading="lazy"`，Banner 才用 `fetchpriority="high"`

---

搭站最大的感悟：**先跑起来，再变好看，最后才轮到完美主义**。
共勉 ✦
