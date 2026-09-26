// ╭─────────────────────────────────────────────────────────╮
// │  站点一站式配置 · 改这里就能换掉全站的名字、社交、特效  │
// ╰─────────────────────────────────────────────────────────╯

export interface NavItem {
  text: string;
  link: string;
  icon: string; // 对应 Icon.astro 中的图标名
}

export interface SocialItem {
  name: string;
  icon: string;
  url: string;
}

export const siteConfig = {
  /** 站点名称（浏览器标题、侧栏、页脚都会用到） */
  title: '星梦小筑',
  /** 副标题 / 一句话签名，展示在 Banner 与侧栏 */
  subtitle: '记录代码、动画与梦境的小站 ✨',
  /** 你的名字 */
  author: '星梦',
  /** 站点描述（SEO / RSS 用） */
  description: '一个梦幻紫风格的二次元个人小站，写写代码、看看番、发发呆。',
  /** 站点语言 */
  locale: 'zh-CN',
  /** 头像图片，放在 public/ 下（可替换为自己的图片） */
  avatar: '/images/avatar.jpg',

  /** 首页 Banner：替换 image 为自己的图片即可（建议 1600×640 以上） */
  banner: {
    image: '/images/banner.svg',
    /** 图片上的遮罩透明度 0~1，图片太亮时可调大 */
    overlay: 0.45,
  },

  /** 导航栏（顺序即显示顺序） */
  nav: [
    { text: '首页', link: '/', icon: 'home' },
    { text: '关于我', link: '/about', icon: 'user' },
    { text: '作品集', link: '/projects', icon: 'code' },
    { text: '追番录', link: '/anime', icon: 'tv' },
    { text: '友链', link: '/friends', icon: 'users' },
    { text: '标签', link: '/tags', icon: 'tag' },
  ] as NavItem[],

  /** 社交链接（icon 取自 Icon.astro 图标库） */
  social: [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/ZLIGE/AnialeWeb' },
    { name: '邮箱', icon: 'mail', url: 'mailto:hi@example.com' },
    { name: 'RSS 订阅', icon: 'rss', url: '/rss.xml' },
  ] as SocialItem[],

  /** 页脚起始年份 */
  since: 2026,

  // ── 装饰特效开关 ──────────────────────────────────────────
  effects: {
    /** 全站樱花飘落（自动尊重系统「减少动态效果」设置） */
    sakura: true,
    /** 看板娘形态：'elaina' 单图活立绘 ｜ 'live2d' Live2D 模型 ｜ 'none' 关闭 */
    companion: 'elaina' as 'elaina' | 'live2d' | 'none',
  },

  /**
   * Live2D 看板娘设置（effects.companion 为 'live2d' 时生效，oh-my-live2d 驱动）。
   * 可用 psd2live 等工具从分层 PSD 生成 .moc3 模型后接入，或换任意
   * Cubism 2/5 模型的 json 地址。
   */
  live2d: {
    /** 停靠位置：left | right */
    dockedPosition: 'right' as 'left' | 'right',
    /** 状态条 / 菜单的主题色（梦幻紫） */
    primaryColor: '#8b5cf6',
    /** 模型列表（可在菜单中依次切换） */
    models: [
      {
        // shizuku：Live2D 官方示例萌系模型（fastly.jsdelivr 镜像，稳定可达）
        path: 'https://fastly.jsdelivr.net/gh/guansss/pixi-live2d-display@master/test/assets/shizuku/shizuku.model.json',
        scale: 0.1,
        position: [0, 60] as [number, number],
        stageStyle: { height: 450 },
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
