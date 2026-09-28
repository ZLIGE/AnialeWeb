import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** 获取全部非草稿文章，按发布时间倒序 */
export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
  );
}

/** 2026年9月26日 */
export function formatDate(d: Date): string {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

/** 统计所有标签及出现次数（按次数降序） */
export function getAllTags(posts: Post[]): [string, number][] {
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.data.tags) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

/** 统计所有分类及出现次数（按次数降序） */
export function getAllCategories(posts: Post[]): [string, number][] {
  const map = new Map<string, number>();
  for (const p of posts) {
    const c = p.data.category;
    map.set(c, (map.get(c) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

/** 通过标签路径生成 URL 编码后的 slug */
export function tagSlug(tag: string): string {
  return encodeURIComponent(tag);
}

/** 通过分类路径生成 URL 编码后的 slug */
export function categorySlug(category: string): string {
  return encodeURIComponent(category);
}
