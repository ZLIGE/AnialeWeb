/**
 * 作品集数据 —— 在这里增删你的项目/作品，页面自动更新
 * icon 用 emoji 即可；link 是在线地址，repo 是仓库地址
 */
export interface Project {
  name: string;
  icon: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    name: '星梦小筑',
    icon: '🌸',
    description:
      '你正在看的这个网站！Astro + Tailwind 打造的梦幻紫二次元博客，自带樱花飘落与看板娘。',
    tags: ['Astro', 'Tailwind', 'TypeScript'],
    repo: 'https://github.com/ZLIGE/AnialeWeb',
    link: '/',
  },
  {
    name: 'Sakura Player',
    icon: '🎬',
    description:
      '一个简洁的弹幕视频播放器，支持弹幕发送与快捷键操作，界面风格和本站一致。',
    tags: ['Vue', 'TypeScript'],
    link: 'https://example.com',
  },
  {
    name: '像素小画家',
    icon: '🎨',
    description:
      '浏览器里的像素画工具，支持调色板、逐帧动画和一键导出 GIF，用来给头像加像素风特效。',
    tags: ['Canvas', 'Web Components'],
    link: 'https://example.com',
  },
  {
    name: '追番提醒 Bot',
    icon: '📺',
    description:
      '订阅番剧更新时间，到点自动推送提醒的小机器人，再也不怕错过首播。',
    tags: ['Node.js', 'WebSocket'],
    repo: 'https://github.com/yourname/anime-bot',
  },
  {
    name: '梦话翻译机',
    icon: '🌙',
    description:
      '一个纯属娱乐的「梦话生成器」，输入关键词输出奇幻梦境短文，练手 NLP 的小项目。',
    tags: ['Python', 'NLP'],
    repo: 'https://github.com/yourname/dream-translator',
  },
  {
    name: '更多作品施工中…',
    icon: '🚧',
    description: '工房里还有几个小东西正在打磨，敬请期待喵～',
    tags: ['TODO'],
  },
];
