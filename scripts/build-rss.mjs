
import fs from 'fs-extra';
import contentIndex from '../src/content-index.json' assert { type: 'json' };

async function buildRSS() {
  const blogPosts = contentIndex
    .filter(item => item.type === 'blog')
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const rssItems = blogPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>https://businessbuilder.pro/blog/${post.slug}</link>
      <guid>https://businessbuilder.pro/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>BusinessBuilder Pro</author>
    </item>
  `).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BusinessBuilder Pro Blog</title>
    <description>Expert insights on UK business formation, compliance, and growth</description>
    <link>https://businessbuilder.pro/blog</link>
    <atom:link href="https://businessbuilder.pro/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-gb</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`;

  await fs.ensureDir('public/blog');
  await fs.writeFile('public/blog/rss.xml', rss);
  console.log(`Built RSS feed with ${blogPosts.length} posts`);
}

buildRSS().catch(console.error);
