
import { normalize, blogPathToSlug, learnPathToSlug } from './slug';

// Preload ALL blog MDX modules (as components) and RAW text for frontmatter if needed
const BLOG_MODULES = import.meta.glob('/src/content/blog/**/*.mdx', { eager: true });
const BLOG_RAW     = import.meta.glob('/src/content/blog/**/*.mdx', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

const LEARN_MODULES = import.meta.glob('/src/content/learn/**/*.mdx', { eager: true });
const LEARN_RAW     = import.meta.glob('/src/content/learn/**/*.mdx', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

function parseFrontmatter(raw: string) {
  const m = raw.match(/^---\s*?\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out: any = {};
  for (const line of m[1].split('\n')) {
    const l = line.trim(); if (!l || l.startsWith('#')) continue;
    const i = l.indexOf(':'); if (i < 0) continue;
    const k = l.slice(0, i).trim(); let v = l.slice(i + 1).trim();
    if (/^\[.*\]$/.test(v)) out[k] = v.slice(1,-1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g,'')).filter(Boolean);
    else out[k] = v.replace(/^['"]|['"]$/g,'');
  }
  return out;
}

export function getBlogPostBySlug(slugParam: string) {
  const want = normalize(slugParam);
  // Build lookup map once
  const entries = Object.keys(BLOG_MODULES).map((path) => {
    const slug = blogPathToSlug(path);
    return { path, slug, key: normalize(slug) };
  });
  // 1) exact normalized match
  let hit = entries.find(e => e.key === want);
  // 2) fallback: endsWith (handles nested folders)
  if (!hit) hit = entries.find(e => e.slug.toLowerCase().endsWith(slugParam.toLowerCase()));
  if (!hit) return null;
  const mod: any = (BLOG_MODULES as any)[hit.path];
  const raw = BLOG_RAW[hit.path] || '';
  const fm = parseFrontmatter(raw);
  return { Component: mod.default, frontmatter: fm, slug: hit.slug };
}

export function getLearnTutorialBySlug(category: string, slugParam: string) {
  const want = normalize(`${category}/${slugParam}`);
  const entries = Object.keys(LEARN_MODULES).map((path) => {
    const slug = learnPathToSlug(path); // e.g., "banking/open-business-account"
    return { path, slug, key: normalize(slug) };
  });
  let hit = entries.find(e => e.key === want);
  if (!hit) {
    // fallback: try last segment match within category
    hit = entries.find(e =>
      e.slug.toLowerCase().startsWith(category.toLowerCase()+"/") &&
      e.slug.toLowerCase().endsWith(slugParam.toLowerCase())
    );
  }
  if (!hit) return null;
  const mod: any = (LEARN_MODULES as any)[hit.path];
  const raw = LEARN_RAW[hit.path] || '';
  const fm = parseFrontmatter(raw);
  return { Component: mod.default, frontmatter: fm, slug: hit.slug };
}
