
import matter from "gray-matter";

export async function loadContentIndex() {
  try {
    const mod = await import("../content-index.json");
    return (mod.default ?? []) as any[];
  } catch {
    console.warn('Content index not found, falling back to direct scan');
    return [];
  }
}

export async function loadBlogListFallback() {
  const blogRaw = import.meta.glob("/src/content/blog/**/*.mdx", { as: "raw" });
  const list: any[] = [];
  
  console.log('Blog files found:', Object.keys(blogRaw));
  
  for (const path in blogRaw) {
    try {
      const raw = await blogRaw[path]();
      const { data } = matter(raw);
      const slug = path.split("/src/content/blog/")[1].replace(/\.mdx$/, "");
      
      // Ensure required fields exist
      if (data.title) {
        list.push({ 
          type: "blog", 
          slug, 
          title: data.title,
          description: data.description || data.title,
          date: data.date || new Date().toISOString(),
          author: data.author || 'BusinessBuilder Pro',
          tags: data.tags || [],
          category: data.category || 'Uncategorised',
          ...data 
        });
        console.log('Added blog post:', slug, data.title);
      }
    } catch (error) {
      console.error('Error processing blog file:', path, error);
    }
  }
  
  console.log('Total blog posts loaded:', list.length);
  return list;
}

export async function loadLearnListFallback() {
  const learnRaw = import.meta.glob("/src/content/learn/**/*.mdx", { as: "raw" });
  const list: any[] = [];
  
  console.log('Learn files found:', Object.keys(learnRaw));
  
  for (const path in learnRaw) {
    try {
      const raw = await learnRaw[path]();
      const { data } = matter(raw);
      const rest = path.split("/src/content/learn/")[1].replace(/\.mdx$/, "");
      const [category, ...slugParts] = rest.split("/");
      const slug = slugParts.join("/");
      
      // Ensure required fields exist
      if (data.title) {
        list.push({ 
          type: "learn", 
          category, 
          slug, 
          title: data.title,
          description: data.description || data.title,
          date: data.date || new Date().toISOString(),
          lastUpdated: data.lastUpdated || data.date || new Date().toISOString(),
          author: data.author || 'BusinessBuilder Pro',
          tags: data.tags || [],
          ...data 
        });
        console.log('Added learn tutorial:', `${category}/${slug}`, data.title);
      }
    } catch (error) {
      console.error('Error processing learn file:', path, error);
    }
  }
  
  console.log('Total learn tutorials loaded:', list.length);
  return list;
}

export async function getDiagnosticsData() {
  const blogRaw = import.meta.glob('/src/content/blog/**/*.mdx', { as: 'raw' });
  const learnRaw = import.meta.glob('/src/content/learn/**/*.mdx', { as: 'raw' });
  
  const blogPaths = Object.keys(blogRaw);
  const learnPaths = Object.keys(learnRaw);
  
  const indexContent = await loadContentIndex();
  const blogContent = await loadBlogListFallback();
  const learnContent = await loadLearnListFallback();
  
  return {
    glob: {
      blog: blogPaths.length,
      learn: learnPaths.length,
      paths: [...blogPaths, ...learnPaths]
    },
    index: {
      total: indexContent.length,
      blog: indexContent.filter(item => item.type === 'blog').length,
      learn: indexContent.filter(item => item.type === 'learn').length
    },
    fallback: {
      blog: blogContent.length,
      learn: learnContent.length
    }
  };
}
