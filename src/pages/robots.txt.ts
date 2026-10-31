import type { APIContext } from 'astro';

/**
 * robots.txt：构建期生成，Sitemap 地址自动跟随 astro.config 的 site 域名。
 */
export async function GET(context: APIContext) {
  const sitemap = new URL('sitemap-index.xml', context.site).href;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
