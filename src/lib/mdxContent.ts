
// Minimal YAML frontmatter parser (handles strings, arrays, booleans, dates)
function parseFrontmatter(raw: string) {
  const m = raw.match(/^---\s*?\n([\s\S]*?)\n---/);
  if (!m) return {};
  const block = m[1];
  const out: any = {};
  for (const line of block.split('\n')) {
    const l = line.trim();
    if (!l || l.startsWith('#')) continue;
    const idx = l.indexOf(':');
    if (idx === -1) continue;
    const key = l.slice(0, idx).trim();
    let val = l.slice(idx + 1).trim();
    // arrays like: [a, b, c]
    if (/^\[.*\]$/.test(val)) {
      out[key] = val
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1'))
        .filter(Boolean);
    } else {
      // strip quotes
      val = val.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
      if (val === 'true' || val === 'false') out[key] = val === 'true';
      else out[key] = val;
    }
  }
  return out;
}

const toTime = (d?: string) => (d && !isNaN(Date.parse(d)) ? Date.parse(d) : 0);

export function loadBlogPosts() {
  // Vite requires a **string literal** and we use eager so this runs at render time without async
  const files = import.meta.glob('/src/content/blog/**/*.mdx', { as: 'raw', eager: true }) as Record<string, string>;
  const items = Object.entries(files).map(([path, raw]) => {
    const fm = parseFrontmatter(raw) as any;
    const slug = path.split('/src/content/blog/')[1].replace(/\.mdx$/, '');
    // safe fallbacks if frontmatter is missing
    const fallbackTitle = slug.split('/').pop()!.replace(/[-_]/g, ' ');
    return {
      type: 'blog' as const,
      slug,
      title: fm.title || fallbackTitle,
      description: fm.description || '',
      date: fm.date || '',
      author: fm.author || 'BusinessBuilder Pro',
      category: fm.category || fm.categories || 'Uncategorised',
      tags: fm.tags || [],
      path: `/blog/${slug}`,
      filePath: path,
      excerpt: fm.description || ''
    };
  });
  items.sort((a,b) => toTime(b.date) - toTime(a.date));
  return items;
}

export function loadLearnTutorials() {
  const files = import.meta.glob('/src/content/learn/**/*.mdx', { as: 'raw', eager: true }) as Record<string, string>;
  const items = Object.entries(files).map(([path, raw]) => {
    const rel = path.split('/src/content/learn/')[1];
    const fm = parseFrontmatter(raw) as any;
    const slug = rel.replace(/\.mdx$/, '');
    const [category, ...rest] = slug.split('/');
    const leaf = (rest.length ? rest.join('/') : category).split('/').pop()!;
    const fallbackTitle = leaf.replace(/[-_]/g, ' ');
    return {
      type: 'learn' as const,
      category: category || 'general-support',
      slug,
      title: fm.title || fallbackTitle,
      description: fm.description || '',
      date: fm.date || '',
      tags: fm.tags || [],
      path: `/learn/${category}/${slug}`,
      filePath: path,
      excerpt: fm.description || '',
      lastUpdated: fm.lastUpdated || fm.date || '',
      author: fm.author || 'BusinessBuilder Pro'
    };
  });
  items.sort((a,b) => toTime(b.date) - toTime(a.date));
  return items;
}
