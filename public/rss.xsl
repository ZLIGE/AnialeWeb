<?xml version="1.0" encoding="UTF-8"?>
<!--
  RSS 订阅页美化样式：浏览器直接打开 /rss.xml 时渲染为友好页面（阅读器不受影响）。
  站点梦幻紫风格；纯静态 XSLT，无外部依赖。
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
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'LXGW WenKai', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
            background: linear-gradient(160deg, #f3efff 0%, #faf7ff 45%, #fdeef6 100%);
            color: #3b3554; min-height: 100vh; padding: 2.5rem 1rem 4rem;
          }
          .wrap { max-width: 44rem; margin: 0 auto; }
          .hero {
            background: linear-gradient(135deg, rgba(139,92,246,.16), rgba(236,72,153,.12));
            border: 1px solid rgba(139,92,246,.22); border-radius: 1.25rem;
            padding: 2rem 1.75rem; text-align: center;
          }
          .hero h1 { font-size: 1.7rem; color: #7c3aed; letter-spacing: .02em; }
          .hero h1::before { content: '📡 '; }
          .hero p { margin-top: .6rem; font-size: .92rem; color: #6d6591; line-height: 1.7; }
          .hero .desc { color: #857ba8; }
          .copy-btn {
            margin-top: 1.1rem; display: inline-flex; align-items: center; gap: .4rem;
            background: #8b5cf6; color: #fff; border: none; cursor: pointer;
            font: inherit; font-size: .88rem; font-weight: 600;
            padding: .55rem 1.15rem; border-radius: 999px;
            transition: transform .2s ease, background .2s ease;
          }
          .copy-btn:hover { background: #7c3aed; transform: translateY(-1px); }
          .count { margin: 1.6rem 0 .9rem; font-size: .85rem; color: #857ba8; }
          .item {
            background: rgba(255,255,255,.82); border: 1px solid rgba(139,92,246,.14);
            border-radius: 1rem; padding: 1.1rem 1.25rem; margin-bottom: .9rem;
            box-shadow: 0 2px 10px rgba(124,58,237,.06);
          }
          .item h2 { font-size: 1.05rem; line-height: 1.5; }
          .item h2 a { color: #43345f; text-decoration: none; }
          .item h2 a:hover { color: #8b5cf6; }
          .meta { margin-top: .45rem; font-size: .78rem; color: #9a91b8;
                  display: flex; flex-wrap: wrap; gap: .35rem .9rem; align-items: center; }
          .meta .cat { color: #8b5cf6; font-weight: 600; }
          .tag { background: rgba(139,92,246,.12); color: #8b5cf6;
                 border-radius: 999px; padding: .08rem .55rem; }
          .item .summary { margin-top: .55rem; font-size: .87rem; line-height: 1.75; color: #6d6591; }
          .foot { margin-top: 2.2rem; text-align: center; font-size: .78rem; color: #a79dc4; }
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
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
