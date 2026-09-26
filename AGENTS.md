# AGENTS.md · 星梦小筑（hoshimeno-uptown）

Astro 7 + Tailwind CSS 4 + TypeScript 的梦幻紫二次元个人博客，布局参考 Fuwari（全手写实现）。构建产物为纯静态站点。

## 常用命令

```bash
pnpm dev        # 开发服务器 http://localhost:4321
pnpm build      # 静态构建到 dist/（约 17 个页面）
pnpm preview    # 预览构建结果
```

## 关键文件

| 位置 | 作用 |
| --- | --- |
| `src/config.ts` | ★ 全站一站式配置：站点信息、社交、导航、`effects.sakura`、`effects.companion`（看板娘形态） |
| `src/data/*.ts` | 追番录 / 作品集 / 友链数据（增删条目即生效） |
| `src/content/posts/` | 博客文章（.md，文件名即链接 slug） |
| `public/images/` | 头像（avatar.jpg）、Banner（banner.svg）、看板娘立绘（elaina.webp） |
| `src/styles/global.css` | OKLCH 主题变量（`--pr` 紫 / `--accent` 粉）、明暗双主题 |

## 已知坑位（改代码前先看）

1. **pnpm 12 构建脚本审批**在 `pnpm-workspace.yaml` 的 `allowBuilds`（写在 package.json 的 `pnpm.onlyBuiltDependencies` 不生效）。
2. **Astro 7 空白规则**：模板中内联元素之间的换行不再渲染空格，跨行拼接文字必须显式 `{' '}`（页脚曾因此粘连）。
3. **内容集合中文参数**：`getStaticPaths` 的 params 用原始中文（如 `公告`），不要预 `encodeURIComponent`；链接处再用 `tagSlug()` 编码。
4. **看板娘双形态**（`effects.companion`）：`'elaina'` 单图活立绘（ElainaWidget.astro，长按拖动 + localStorage `elaina-drag-pos`）；`'live2d'` oh-my-live2d 模型（Live2DWidget.astro，位置存 `oml2d-drag-pos`）。oh-my-live2d 在模型加载/切换时会调 `reloadStyle()` 重写停靠样式，必须用 MutationObserver 在覆盖后恢复记忆位置。
5. **域名警示**：`model.oml2d.com` 与 `oml2d.com` 已于 2026-09 易主为垃圾站，禁止作为模型源/外链；Live2D 模型与外链资源一律优先 `fastly.jsdelivr.net` 镜像（当前模型：pixi-live2d-display 仓库的 shizuku 测试模型）。
6. **樱花特效必须按时间增量（dt）驱动**：用户屏幕为 241Hz 高刷新率，按帧步进会 4 倍速且左右摆动变成高频抖动（Sakura.astro）。
7. Live2D 模型如需自制：psd2live（github.com/tsunehimatoi/psd2live）是 Java 桌面工具，输入须为分层 PSD，输出 `.moc3` 后接入 `'live2d'` 形态；它不能处理单张扁平图。
