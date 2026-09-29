---
title: 加密文章演示
published: 2026-09-28
description: 一篇需要密码才能查看内容的加密文章演示，顺便演示置顶功能。
category: 随笔
tags: [加密, 演示]
pinned: true
password: ashen-demo
passwordHint: 演示密码是 ashen-demo
---

## 这是一篇加密文章 🔒

输入正确密码后就能看到这段内容——构建时整篇正文已经用 AES-GCM 加密，
页面源码里不存在任何明文，搜索索引里也不会收录正文。

## 解锁后可以正常排版

- 支持 **Markdown** 全部语法
- 列表、引用、代码块一应俱全

> 密码提示会显示在解锁卡片上，方便访客输入。

```js
// 解锁后代码块也能正常展示
console.log('Hello, Ashen!');
```

## 如何给自己的文章加密

在文章的 frontmatter 里加上 `password`（可选加 `passwordHint`）即可：

```md
---
password: 你的密码
passwordHint: 提示文案
---
```

把 `pinned` 改为 `true` 就能让文章在列表置顶。
