/**
 * 友情链接数据 —— 想被收录的朋友可以这样提交：
 * name   站点名称
 * avatar 头像图片地址（不填则显示首字母占位头像）
 * link   站点地址
 * description 一句话简介
 */
export interface Friend {
  name: string;
  avatar?: string;
  link: string;
  description: string;
}

export const friends: Friend[] = [
  {
    name: 'Fuwari',
    link: 'https://fuwari.vercel.app/',
    description: '布局参考的绵绵 Astro 博客主题，像云朵一样柔软。',
  },
  {
    name: 'Astro 官方博客',
    link: 'https://astro.build/blog/',
    description: '本站的心脏，前端宇宙最会做静态站点的框架。',
  },
  {
    name: '示例的小站',
    link: 'https://example.com',
    description: '这里是友链描述的示例，替换成你朋友们的站点吧！',
  },
];
