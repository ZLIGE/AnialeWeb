import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 博客文章集合
 * 在 src/content/posts/ 下新建 .md 文件即可发布文章（文件名即链接 slug）
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string().default(''),
    /** 封面图（相对 public/ 的路径，如 /images/cover.jpg） */
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('未分类'),
    /** 草稿：true 时不会出现在列表 / RSS 中 */
    draft: z.boolean().default(false),
    /** 置顶：true 时在文章列表最顶部显示 */
    pinned: z.boolean().default(false),
    /** 加密密码：设置后正文构建期 AES-GCM 加密，页面输入密码解锁 */
    password: z.string().optional(),
    /** 密码提示：显示在解锁卡片上 */
    passwordHint: z.string().optional(),
  }),
});

export const collections = { posts };
