
import matter from "gray-matter";

export async function loadContentIndex() {
  try {
    const mod = await import("../content-index.json");
    return (mod.default ?? []) as any[];
  } catch {
    return [];
  }
}

export async function loadBlogListFallback() {
  const rawMap = import.meta.glob("/src/content/blog/**/*.mdx", { as: "raw" });
  const list: any[] = [];
  
  console.log('Blog files found:', Object.keys(rawMap));
  
  for (const path in rawMap) {
    try {
      const raw = await rawMap[path]();
      const { data } = matter(raw);
      const slug = path.split("/src/content/blog/")[1].replace(/\.mdx$/, "");
      
      // Ensure required fields exist
      if (data.title && data.date) {
        list.push({ 
          type: "blog", 
          slug, 
          title: data.title,
          description: data.description || data.title,
          date: data.date,
          author: data.author || 'BusinessBuilder Pro',
          tags: data.tags || [],
          category: data.category || null,
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
  const rawMap = import.meta.glob("/src/content/learn/**/*.mdx", { as: "raw" });
  const list: any[] = [];
  
  console.log('Learn files found:', Object.keys(rawMap));
  
  for (const path in rawMap) {
    try {
      const raw = await rawMap[path]();
      const { data } = matter(raw);
      const rest = path.split("/src/content/learn/")[1].replace(/\.mdx$/, "");
      const [category, ...slugParts] = rest.split("/");
      const slug = slugParts.join("/");
      
      // Ensure required fields exist
      if (data.title && data.date) {
        list.push({ 
          type: "learn", 
          category, 
          slug, 
          title: data.title,
          description: data.description || data.title,
          date: data.date,
          lastUpdated: data.lastUpdated || data.date,
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
