<?xml version="1.0" encoding="UTF-8"?>
<!--
  RSS 订阅页美化样式：浏览器直接打开 /rss.xml 时渲染为友好页面（阅读器不受影响）。
  颜色令牌与站点 src/styles/global.css 保持同一套 oklch 公式；页面加载时读取
  站点 localStorage 的 palette（色相）与 theme（明暗），与网站主题颜色保持一致。
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  exclude-result-prefixes="content atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/rss">
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="channel/title"/> · RSS 订阅</title>
        <style>
          /* ── 与站点 global.css 相同的色彩令牌（默认梦幻紫 295/345） ── */
          :root {
            --hue: 295;
            --hue2: 345;
            --pr: oklch(0.58 0.19 var(--hue));
            --pr-deep: oklch(0.5 0.2 var(--hue));
            --bg: oklch(0.962 0.014 var(--hue));
            --card: oklch(0.995 0.003 var(--hue));
            --t-main: oklch(0.28 0.035 var(--hue));
            --t-muted: oklch(0.5 0.03 var(--hue));
            --line: oklch(0.89 0.025 var(--hue));
            --glow-a: oklch(0.75 0.12 var(--hue) / 0.3);
            --glow-b: oklch(0.78 0.14 var(--hue2) / 0.24);
            --shadow-card: 0 8px 30px oklch(0.55 0.15 var(--hue) / 0.1);
          }
          [data-theme='dark'] {
            --pr: oklch(0.78 0.12 var(--hue));
            --pr-deep: oklch(0.68 0.16 var(--hue));
            --bg: oklch(0.185 0.035 var(--hue));
            --card: oklch(0.243 0.04 var(--hue));
            --t-main: oklch(0.92 0.015 var(--hue));
            --t-muted: oklch(0.7 0.025 var(--hue));
            --line: oklch(0.36 0.05 var(--hue));
            --glow-a: oklch(0.55 0.12 var(--hue) / 0.22);
            --glow-b: oklch(0.55 0.14 var(--hue2) / 0.16);
            --shadow-card: 0 8px 30px oklch(0.1 0.05 var(--hue) / 0.4);
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'LXGW WenKai', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
            color: var(--t-main); min-height: 100vh; padding: 2.5rem 1rem 4rem;
            background:
              radial-gradient(60rem 30rem at 15% -5%, var(--glow-a), transparent 60%),
              radial-gradient(50rem 28rem at 110% 8%, var(--glow-b), transparent 60%),
              var(--bg);
          }
          .wrap { max-width: 44rem; margin: 0 auto; }
          .hero {
            background: var(--card);
            border: 1px solid var(--line); border-radius: 1.25rem;
            padding: 2rem 1.75rem; text-align: center;
            box-shadow: var(--shadow-card);
          }
          .hero h1 { font-size: 1.7rem; color: var(--pr); letter-spacing: .02em; }
          .hero h1::before { content: '📡 '; }
          .hero p { margin-top: .6rem; font-size: .92rem; color: var(--t-muted); line-height: 1.7; }
          .copy-btn {
            margin-top: 1.1rem; display: inline-flex; align-items: center; gap: .4rem;
            background: var(--pr); color: #fff; border: none; cursor: pointer;
            font: inherit; font-size: .88rem; font-weight: 600;
            padding: .55rem 1.15rem; border-radius: 999px;
            transition: transform .2s ease, background .2s ease;
          }
          .copy-btn:hover { background: var(--pr-deep); transform: translateY(-1px); }
          .count { margin: 1.6rem 0 .9rem; font-size: .85rem; color: var(--t-muted); }
          .item {
            background: var(--card); border: 1px solid var(--line);
            border-radius: 1rem; padding: 1.1rem 1.25rem; margin-bottom: .9rem;
            box-shadow: var(--shadow-card);
          }
          .item h2 { font-size: 1.05rem; line-height: 1.5; }
          .item h2 a { color: var(--t-main); text-decoration: none; transition: color .2s ease; }
          .item h2 a:hover { color: var(--pr); }
          .meta { margin-top: .45rem; font-size: .78rem; color: var(--t-muted);
                  display: flex; flex-wrap: wrap; gap: .35rem .9rem; align-items: center; }
          .meta .cat { color: var(--pr); font-weight: 600; }
          .tag { background: oklch(0.58 0.19 var(--hue) / 0.12); color: var(--pr);
                 border-radius: 999px; padding: .08rem .55rem; }
          .item .summary { margin-top: .55rem; font-size: .87rem; line-height: 1.75; color: var(--t-muted); }
          .foot { margin-top: 2.2rem; text-align: center; font-size: .78rem; color: var(--t-muted); }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="hero">
            <h1><xsl:value-of select="channel/title"/> 的 RSS 订阅</h1>
            <p class="desc"><xsl:value-of select="channel/description"/></p>
            <p>
              把本页地址（<xsl:value-of select="channel/atom:link[@rel='self']/@href"/>）
              添加到你的 RSS 阅读器，即可在文章发布时第一时间收到更新 ✧
            </p>
            <button class="copy-btn" type="button">
              <xsl:attribute name="onclick">
                navigator.clipboard.writeText('<xsl:value-of select="channel/atom:link[@rel='self']/@href"/>').then(() => { this.textContent = '✓ 已复制'; setTimeout(() => { this.textContent = '✦ 复制订阅链接'; }, 2000); })
              </xsl:attribute>
              ✦ 复制订阅链接
            </button>
          </div>
          <p class="count">共 <xsl:value-of select="count(channel/item)"/> 篇文章 · 最近更新：<xsl:value-of select="channel/lastBuildDate"/></p>
          <xsl:for-each select="channel/item">
            <div class="item">
              <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
              <div class="meta">
                <xsl:if test="author"><span><xsl:value-of select="author"/></span></xsl:if>
                <span>🗓 <xsl:value-of select="pubDate"/></span>
                <xsl:for-each select="category">
                  <span>
                    <xsl:choose>
                      <xsl:when test="position() = 1"><xsl:attribute name="class">cat</xsl:attribute>📂 <xsl:value-of select="."/></xsl:when>
                      <xsl:otherwise><xsl:attribute name="class">tag</xsl:attribute>#<xsl:value-of select="."/></xsl:otherwise>
                    </xsl:choose>
                  </span>
                </xsl:for-each>
              </div>
              <xsl:if test="description">
                <p class="summary"><xsl:value-of select="description"/></p>
              </xsl:if>
            </div>
          </xsl:for-each>
          <p class="foot">✧ 由 <xsl:value-of select="channel/title"/> 生成 · 使用任意 RSS 阅读器订阅本页地址 ✧</p>
        </div>
        <script>
          // 与站点同源：读取外观面板保存的主题色相与明暗模式，保持颜色一致
          (function () {
            try {
              var p = JSON.parse(localStorage.getItem('palette') || 'null');
              if (p) {
                if (typeof p.hue === 'number') {
                  document.documentElement.style.setProperty('--hue', String(Math.round(p.hue) % 360));
                }
                if (typeof p.hue2 === 'number') {
                  document.documentElement.style.setProperty('--hue2', String(Math.round(p.hue2) % 360));
                }
              }
            } catch (e) {}
            try {
              var t = localStorage.getItem('theme');
              if (t === 'dark' || t === 'light') {
                document.documentElement.setAttribute('data-theme', t);
              }
            } catch (e) {}
          })();
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
