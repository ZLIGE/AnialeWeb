# AGENTS.md · Ashen 个人博客（AI 协作手册）

> 本文件供 AI 编码助手（Claude / DeepSeek / Cursor 等）快速上手。**改代码前必读第六、七节**——
> 本项目大量机制依赖非显而易见的约定，下面每一条坑位都对应一次真实的回归事故。

Astro 7 + Tailwind CSS 4 + TypeScript 的梦幻紫二次元静态博客（布局参考 Fuwari / Shirone，全手写）。

## 一、常用命令

```bash
pnpm dev        # 开发服务器 http://localhost:4321（单实例锁，第二个会报
                # "Another astro dev server is already running"；网络抖动时 git push 重试即可）
pnpm build      # 静态构建到 dist/（当前约 25 个页面，构建失败 = 有问题）
pnpm preview    # 预览构建结果
```

## 二、架构速览（数据流）

- **配置唯一入口 `src/config.ts`**：站点信息、导航、社交、壁纸、特效开关、评论（giscus）。几乎所有功能开关都在这里，组件只读配置不写死。
- **布局链**：页面 → `BaseLayout`（挂 `ClientRouter` 视图过渡 + 头部「设置首帧恢复」脚本）→ 内容区。
- **样式体系**：`src/styles/global.css` 持有 OKLCH 设计令牌（`--hue`/`--hue2` 派生全站色、`--pr` 主色等），组件内为 Astro scoped style。改主题色/壁纸模式样式在 global.css，改单个组件外观在其 scoped `<style>`。
- **外观设置流**：控件（PaletteSwitcher）→ localStorage → `<html>` 的 `data-*` 属性 → global.css 属性选择器消费；`BaseLayout` 头部脚本在首帧前恢复（防闪烁），`site:settings` 事件同步多实例。
- **视图过渡（ClientRouter）**：`transition:persist` 持久元素跨页存活——樱花画布、看板娘宿主 `#l2d-host`、搜索弹窗 `#search-modal`、Hero 壁纸层；页级内联交互脚本一律加 `data-astro-rerun` 每次换页重跑，全局监听用事件委托。
- **内容**：`src/content/posts/*.md`（文件名即链接），`getSortedPosts()` 置顶优先排序。

## 三、关键文件

| 位置 | 作用 |
| --- | --- |
| `src/config.ts` | ★ 全站一站式配置（含 `comments` giscus 段，repoId/categoryId 已填好） |
| `src/styles/global.css` | 设计令牌、明暗双主题、壁纸四模式（`html[data-hero-mode]`）、覆盖模式导航栏样式 |
| `src/components/PaletteSwitcher.astro` | 外观面板：色相滑条（JS 驱动拖拽）/ 壁纸四模式 / 横幅选项 / 布局切换 |
| `src/components/Comment.astro` | giscus 评论区（懒加载 + 明暗主题联动），配置经 data-* 传入 |
| `src/components/SearchModal.astro` | 全文搜索弹窗（懒加载 /search-index.json，持久化弹窗） |
| `src/components/HeroBackdrop.astro` | 跨页持久壁纸层（`transition:persist="hero-backdrop"`，壁纸不闪烁的关键） |
| `src/components/Live2DWidget.astro` / `ElainaWidget.astro` | 看板娘两形态（直接拖拽 + 位置记忆） |
| `src/layouts/BaseLayout.astro` | 布局 + 设置恢复脚本 + 右侧信息栏（SiteStats/CalendarCard） |
| `src/utils/posts.ts` | 文章排序/字数统计/slug 工具 |
| `src/data/*.ts` | 追番录 / 作品集 / 友链数据 |

## 四、常见改动的标准路径

1. **新增外观设置项**：PaletteSwitcher 加控件 → 读写 localStorage → `applyAttrs()` 挂 `<html>` data 属性 → global.css 属性选择器消费 → BaseLayout 头部脚本恢复 + `paintAll()` 同步（含「恢复默认」按钮 `data-reset`）。
2. **新增页面**：`src/pages/*.astro` 套 BaseLayout；`getStaticPaths` 的中文 params 用原始字符串（见坑位 3）。
3. **新增文章**：`src/content/posts/` 建 .md；frontmatter 支持 `pinned`（置顶）、`password`/`passwordHint`（构建期 AES-GCM 加密，页面无明文）。
4. **新增带交互的组件**：交互脚本用事件委托（换页后仍生效）或 `is:inline data-astro-rerun`；如需跨页保留 DOM 才用 `transition:persist`，并遵守红线 1。

## 五、红线（违反 = 破坏既有功能）

1. **不删任何 `transition:persist`**；持久化弹窗必须在「点击跳转」时主动关闭，并挂 `astro:after-swap` 兜底（否则换页实际发生但弹窗盖住新页，看起来像点击无效）。
2. **不删 PaletteSwitcher 的 `activeSlider` 回写守卫与 JS 驱动拖拽**：色相滑条在 pointerdown→up 期间禁止回写自身值（Chromium 会取消原生拖拽），且内嵌 WebView 的原生 range 拖拽管线已实测失效，JS 按指针坐标换算是唯一可靠路径。
3. **壁纸层与横幅标题层的指针穿透不可移除**：`.hero-backdrop` 与 `[data-hero-caption]` 必须 `pointer-events: none`（标题层内 a/button 单独恢复），否则全屏/覆盖模式下挡住调色板。
4. **看板娘拖拽定位目标是 stage 容器**（`canvas.parentElement`，canvas 是 static）：left/top 设在 canvas 上是空转；状态条隐藏方向镜像机制（坑位 4）不可移除。
5. **外观设置「首帧前恢复」脚本模式不可绕过**：否则明暗/色相/壁纸模式换页与刷新时闪烁。

## 六、已知坑位（历史事故清单）

1. **pnpm 12 构建脚本审批**在 `pnpm-workspace.yaml` 的 `allowBuilds`（package.json 的 `pnpm.onlyBuiltDependencies` 不生效）。
2. **Astro 7 空白规则**：模板中内联元素之间的换行不再渲染空格，跨行拼接文字必须显式 `{' '}`。
3. **内容集合中文参数**：`getStaticPaths` 的 params 用原始中文（如 `公告`），不要预 `encodeURIComponent`；链接处再用 `tagSlug()` 编码。
4. **看板娘双形态**（`effects.companion`）：`'elaina'` 单图活立绘（ElainaWidget.astro，直接拖拽 + localStorage `elaina-drag-pos`）；`'live2d'` l2d-widget 模型（Live2DWidget.astro，直接拖拽 + localStorage `l2d-widget-drag-pos`）。均为「按下移动超 8px 即拖拽、轻点仍是互动」阈值设计（非长按）。**拖拽定位目标是 stage 容器**（canvas 是 `position: static`，真正 fixed 的是其父元素）。**位置记忆为距右/下边缘距离（{fromRight,fromBottom}）**——绝对坐标跨窗口尺寸会落到错误位置；读到旧格式 {left,top} 时一次性清除重置回默认右下角。**状态条（正在加载/正在休息）是 host 下独立 fixed 元素**，须随模型同步贴同一侧屏幕边缘；库用 `transform: translateX(100%)` 向右滑出隐藏——左锚定时必须 MutationObserver 镜像为 `translateX(-100%)`，否则状态条常驻屏幕内。库的入场动画对 stage 做 `translateY(520px)→0` 过渡：后台标签页 rAF 暂停会让过渡冻结在中间帧（rect 偏移 520px 属测试假象，前台正常滑入）。
5. **域名警示**：`model.oml2d.com` 与 `oml2d.com` 已于 2026-09 易主为垃圾站，禁止作为模型源/外链；Live2D 模型与外链资源一律优先 `fastly.jsdelivr.net` 镜像（当前模型：pixi-live2d-display 仓库的 shizuku 测试模型）。
6. **樱花特效必须按时间增量（dt）驱动**：用户屏幕为 241Hz 高刷新率，按帧步进会 4 倍速且摆动变高频抖动（Sakura.astro）。
7. Live2D 模型如需自制：psd2live（github.com/tsunehimatoi/psd2live）是 Java 桌面工具，输入须为分层 PSD，输出 `.moc3` 后接入 `'live2d'` 形态；它不能处理单张扁平图。
8. **色相滑条禁止在拖动期间回写自身值**：Chromium 收到程序化 `value` 赋值会终止原生拖拽（「滑块抓不住」）。配合红线 2 的 JS 驱动拖拽与 `touch-action: none`。
9. **壁纸层与横幅标题层必须指针穿透**：详见红线 3。
10. **giscus 评论前置条件**：仓库公开 + 已开 Discussions + 安装 giscus App，缺一评论区报 "giscus is not installed"。换仓库后 repoId/categoryId 到 giscus.app 重新生成；加密文章页面侧跳过评论。
11. **外观设置存 localStorage、BaseLayout 头部脚本首帧前恢复**：`palette`（色相）、`hero-mode`、`hero-title`、`hero-ripple`、`home-layout`、`theme`（明暗，`<html data-theme>`）。新增设置项照此模式接。
12. **文章导航语义**：「上一篇」= 列表中更新一篇（更上方），「下一篇」= 更早一篇（更下方），与首页列表顺序一致（[id].astro 中 `newer`/`older` 命名即此含义，勿对调）。
13. **`transition:persist` 弹窗跨页存活**：详见红线 1。
14. **长 HMR 会话后内嵌 WebView 可能整体卡死**（点击/按键/拖拽全部被吞、程序化滚动失效）：这不是站点 bug，开新标签页 fresh load 即恢复；自动化测试同理。

## 七、验证清单（改完必做）

1. `pnpm build` 通过（25 页）。
2. dev 下逐项核对涉及的功能：调色板滑条拖动换色 / 壁纸四模式切换 / 明暗切换与评论主题联动 / 搜索跳转（弹窗要关闭）/ 看板娘拖动 + 状态条贴边 + 休息图标不残留 / 加密文章解锁。
3. **视图过渡换页后再核对一遍**（持久元素与 data-astro-rerun 相关的 bug 只在换页后出现）。
4. 构建产物的 scoped 样式要 grep `dist/index.html`（组件样式会内联进各页 HTML，别只查 `dist/_astro/*.css`）。

## 八、提交规范

- Conventional Commits + 中文描述：`feat: / fix: / docs:`，正文说明根因与修复方式（历史提交即范例）。
- 远程为 https://github.com/ZLIGE/AnialeWeb.git，push 偶遇 TLS 抖动重试即可。
