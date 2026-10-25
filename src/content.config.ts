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

/**
 * 板块数据集合（src/data/*.yaml）：单文件单条目，data.items 为列表。
 * YAML 可在 PagesCMS 后台直接编辑，order 字段决定显示顺序。
 */
const anime = defineCollection({
  loader: glob({ pattern: 'anime.yaml', base: './src/data' }),
  schema: z.object({
    items: z.array(
      z.object({
        order: z.number(),
        title: z.string(),
        /** 播出季度，如 2026 夏 */
        year: z.string(),
        /** 观看进度 */
        progress: z.string(),
        /** 评分 1~5 */
        rating: z.number().min(1).max(5),
        /** 一句话感想 */
        comment: z.string(),
        /** 相关链接（如 Bangumi 条目） */
        link: z.string().optional(),
        /** 封面占位 emoji */
        emoji: z.string().optional(),
      }),
    ),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: 'projects.yaml', base: './src/data' }),
  schema: z.object({
    items: z.array(
      z.object({
        order: z.number(),
        name: z.string(),
        /** 卡片图标 emoji */
        icon: z.string(),
        description: z.string(),
        tags: z.array(z.string()).default([]),
        link: z.string().optional(),
        repo: z.string().optional(),
      }),
    ),
  }),
});

const friends = defineCollection({
  loader: glob({ pattern: 'friends.yaml', base: './src/data' }),
  schema: z.object({
    items: z.array(
      z.object({
        order: z.number(),
        name: z.string(),
        /** 头像图片地址（不填显示首字母占位头像） */
        avatar: z.string().optional(),
        link: z.string(),
        description: z.string(),
        /** 关闭状态：对方站点关站/失联时置 closed——卡片置灰、链接不可点、显示「已熄灭」标记 */
        status: z.literal('closed').optional(),
      }),
    ),
  }),
});

export const collections = { posts, anime, projects, friends };
