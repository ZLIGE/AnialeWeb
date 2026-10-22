# AGENTS.md · Ashen 个人博客

Astro 7 + Tailwind CSS 4 + TypeScript 的梦幻紫二次元个人博客，布局参考 Fuwari / Shirone（全手写实现）。构建产物为纯静态站点。

## 常用命令

```bash
pnpm dev        # 开发服务器 http://localhost:4321（同时只能起一个实例，
                # 第二个会报 "Another astro dev server is already running"）
pnpm build      # 静态构建到 dist/（约 25 个页面）
pnpm preview    # 预览构建结果
```

## 关键文件

| 位置 | 作用 |
| --- | --- |
| `src/config.ts` | ★ 全站一站式配置：站点信息、社交、导航、壁纸（`hero`）、特效（`effects`）、评论（`comments`，giscus） |
| `src/data/*.ts` | 追番录 / 作品集 / 友链数据（增删条目即生效） |
| `src/content/posts/` | 博客文章（.md，文件名即链接 slug；frontmatter 支持 `pinned` 置顶、`password`/`passwordHint` 加密） |
| `src/components/PaletteSwitcher.astro` | 外观面板：色相滑条（OKLCH）/ 壁纸四模式 / 横幅选项 / 列表网格布局，全量记忆 |
| `src/components/Comment.astro` | giscus 评论区（懒加载 + 明暗主题联动），配置经 `data-*` 从 config 传入 |
| `src/components/HeroBackdrop.astro` | 跨页持久壁纸层（`transition:persist="hero-backdrop"`，壁纸不闪烁的关键） |
| `public/images/` | 头像（avatar.jpg）、Banner（banner.svg）、看板娘立绘（elaina.webp）、壁纸（hero/） |
| `src/styles/global.css` | OKLCH 主题变量、明暗双主题、各壁纸模式（`html[data-hero-mode]`）与覆盖模式导航栏样式 |

## 已知坑位（改代码前先看）

1. **pnpm 12 构建脚本审批**在 `pnpm-workspace.yaml` 的 `allowBuilds`（写在 package.json 的 `pnpm.onlyBuiltDependencies` 不生效）。
2. **Astro 7 空白规则**：模板中内联元素之间的换行不再渲染空格，跨行拼接文字必须显式 `{' '}`（页脚曾因此粘连）。
3. **内容集合中文参数**：`getStaticPaths` 的 params 用原始中文（如 `公告`），不要预 `encodeURIComponent`；链接处再用 `tagSlug()` 编码。
4. **看板娘双形态**（`effects.companion`）：`'elaina'` 单图活立绘（ElainaWidget.astro，直接拖拽 + localStorage `elaina-drag-pos`）；`'live2d'` l2d-widget 模型（Live2DWidget.astro，直接拖拽 + localStorage `l2d-widget-drag-pos`）。两者均为「按下后移动超 8px 即拖拽、轻点仍是互动」的阈值设计（非长按）。**拖拽定位目标是 stage 容器**：l2d-widget 的 canvas 本身是 `position: static`，真正 fixed 定位的是其父元素——left/top 必须设在 `canvas.parentElement` 上，设在 canvas 上是无效果空转。l2d-widget 在模型加载/切换时可能重写停靠样式，初始化后强制归零 wrapper transform 保证可见。
5. **域名警示**：`model.oml2d.com` 与 `oml2d.com` 已于 2026-09 易主为垃圾站，禁止作为模型源/外链；Live2D 模型与外链资源一律优先 `fastly.jsdelivr.net` 镜像（当前模型：pixi-live2d-display 仓库的 shizuku 测试模型）。
6. **樱花特效必须按时间增量（dt）驱动**：用户屏幕为 241Hz 高刷新率，按帧步进会 4 倍速且左右摆动变成高频抖动（Sakura.astro）。
7. Live2D 模型如需自制：psd2live（github.com/tsunehimatoi/psd2live）是 Java 桌面工具，输入须为分层 PSD，输出 `.moc3` 后接入 `'live2d'` 形态；它不能处理单张扁平图。
8. **色相滑条必须 JS 驱动拖拽**：两重原因。①Chromium 在原生拖拽中收到程序化 `value` 赋值会终止手势——PaletteSwitcher 用 `activeSlider`（pointerdown → pointerup 窗口期）跳过 `applyHue`/`paintAll` 对该滑条的回写；②**ZCode 内嵌浏览器（IAB WebView）的原生 range 拖拽管线失效**——实测 pointerdown 捕获成功、buttons=1 的 move 全部到达滑条、无任何 preventDefault，但值始终不更新（裸滑条对照实验同样失败），用户真实鼠标也复现。因此滑条在 pointerdown 时手动 `setPointerCapture` 并按指针坐标换算色相（pointermove 中 `e.buttons & 1` 判定按住），正常浏览器原生拖拽照常、两者按同一指针位置计算结果一致。滑条 CSS 已加 `touch-action: none`（触屏同理）。改动时不要退回依赖原生拖拽。
9. **壁纸层与横幅标题层必须指针穿透**：`HeroBackdrop` 与 `[data-hero-caption]` 整层 `pointer-events: none`（全屏/覆盖模式下它们盖住导航栏下拉面板，否则调色板滑条/按钮点不到）；标题层内的 `a`/`button` 单独恢复 `auto`。
10. **giscus 评论前置条件**：仓库公开 + 已开 Discussions + 安装 giscus App，缺一评论区就报 "giscus is not installed"。`repoId`/`categoryId` 换仓库后要到 giscus.app 重新生成；加密文章（`password`）页面侧跳过评论。
11. **外观设置存 localStorage、BaseLayout 头部脚本首帧前恢复**（无闪烁）：`palette`（色相）、`hero-mode`、`hero-title`、`hero-ripple`、`home-layout`、`theme`（明暗，`<html data-theme>`）。同步入口是 `<html>` 的 data 属性 + `site:settings` 事件，新增设置项照此模式接。
12. **文章导航语义**：「上一篇」= 列表中更新一篇（更上方），「下一篇」= 更早一篇（更下方），与首页列表顺序一致（[id].astro 中 `newer`/`older` 的取名即此含义，勿再对调）。
13. **`transition:persist` 弹窗跨页存活**：SearchModal 等持久化弹窗在视图过渡换页后会原样带到新页面——点击结果跳转类交互必须在导航前主动 `close()`，并挂 `astro:after-swap` 兜底关闭，否则换页实际发生了但弹窗盖在新页上，看起来像「点了没反应」（用户曾因此以为搜索跳转失效）。
