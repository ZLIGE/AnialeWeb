import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// 读取文章原始 Markdown，用于正文全文搜索
const raw = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** 去掉 frontmatter 与 Markdown 语法，保留纯文本 */
function plain(md: string): string {
  return md
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`\n]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const GET: APIRoute = async () => {
  const posts = (
    await getCollection('posts', ({ data }) => !data.draft)
  ).sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());

  const items = posts.map((p) => {
    const body = (raw as Record<string, string>)[`../content/posts/${p.id}.md`];
    return {
      title: p.data.title,
      description: p.data.description,
      category: p.data.category,
      tags: p.data.tags,
      url: `/posts/${p.id}/`,
      // 加密文章不写入正文全文（防止搜索索引泄露内容）
      text: p.data.password ? '' : body ? plain(body).slice(0, 5000) : '',
    };
  });

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
