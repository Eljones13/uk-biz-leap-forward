
import fs from 'fs-extra';
import contentIndex from '../src/content-index.json' assert { type: 'json' };

async function buildSitemap() {
  const staticRoutes = [
    { path: '/', priority: '1.0' },
    { path: '/blog', priority: '0.9' },
    { path: '/learn', priority: '0.9' },
    { path: '/pricing', priority: '0.8' },
    { path: '/banking', priority: '0.8' },
    { path: '/credit-funding', priority: '0.8' },
    { path: '/documents', priority: '0.7' },
    { path: '/compliance', priority: '0.7' },
    { path: '/contact', priority: '0.6' }
  ];

  const contentRoutes = contentIndex.map(item => ({
    path: item.path,
    lastmod: item.date,
    priority: item.type === 'blog' ? '0.7' : '0.6'
  }));

  const allRoutes = [...staticRoutes, ...contentRoutes];

  const urlElements = allRoutes.map(route => `
    <url>
      <loc>https://businessbuilder.pro${route.path}</loc>
      ${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : ''}
      <priority>${route.priority}</priority>
    </url>
  `).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlElements}
</urlset>`;

  await fs.writeFile('public/sitemap.xml', sitemap);
  console.log(`Built sitemap with ${allRoutes.length} routes`);
}

buildSitemap().catch(console.error);
