import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { siteConfig } from '../config';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
  );
  const container = await AstroContainer.create();

  const items = [];
  for (const post of posts) {
    // 加密文章只输出摘要：正文若渲染进 RSS 明文外泄，加密就形同虚设
    let contentHtml = '';
    if (!post.data.password) {
      const { Content } = await render(post);
      contentHtml = await container.renderToString(Content);
    }
    items.push({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: `/posts/${post.id}/`,
      // 首位为分类，其余为标签（美化订阅页按此区分展示）
      categories: [post.data.category, ...post.data.tags],
      author: siteConfig.author,
      customData: contentHtml
        ? `<content:encoded><![CDATA[${contentHtml.replaceAll(']]>', ']]]]><![CDATA[>')}]]></content:encoded>`
        : undefined,
    });
  }

  const lastBuildDate = posts.reduce((latest, p) => {
    const t = (p.data.updated ?? p.data.published).valueOf();
    return t > latest ? t : latest;
  }, 0);
  const feedUrl = new URL('rss.xml', context.site).href;

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items,
    // 浏览器直接打开 /rss.xml 时渲染为美化订阅页（阅读器不受影响）
    stylesheet: '/rss.xsl',
    xmlns: {
      content: 'http://purl.org/rss/1.0/modules/content/',
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData:
      '<language>zh-cn</language>' +
      `<lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>` +
      // RSS 规范建议的自引用，便于阅读器与校验器识别订阅源
      `<atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>`,
  });
}
