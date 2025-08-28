
export const normalize = (s: string) =>
  s.toLowerCase().trim().replace(/\.(mdx|md)$/, '').replace(/\\/g, '/').replace(/[_\s]+/g, '-');

export const blogPathToSlug = (path: string) =>
  path.split('/src/content/blog/')[1].replace(/\.mdx$/, '');

export const learnPathToSlug = (path: string) =>
  path.split('/src/content/learn/')[1].replace(/\.mdx$/, '');
