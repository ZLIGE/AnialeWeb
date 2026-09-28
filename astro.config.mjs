// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 部署时把 site 换成你的正式域名（影响 sitemap / RSS / OG 链接）
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
  // 关闭开发模式的底部调试工具条（Astro Dev Toolbar）
  devToolbar: {
    enabled: false,
  },
  markdown: {
    shikiConfig: {
      // 代码块双主题：亮色拿铁 / 暗色摩卡，随站点明暗模式切换
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      defaultColor: false,
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
