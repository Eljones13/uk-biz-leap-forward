
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
  const rawMap = import.meta.glob("/content/blog/**/*.mdx", { as: "raw" });
  const list: any[] = [];
  for (const path in rawMap) {
    try {
      const raw = await rawMap[path]();
      const { data } = matter(raw);
      const slug = path.split("/content/blog/")[1].replace(/\.mdx$/, "");
      list.push({ type: "blog", slug, ...data });
    } catch {}
  }
  return list;
}

export async function loadLearnListFallback() {
  const rawMap = import.meta.glob("/content/learn/**/*.mdx", { as: "raw" });
  const list: any[] = [];
  for (const path in rawMap) {
    try {
      const raw = await rawMap[path]();
      const { data } = matter(raw);
      const rest = path.split("/content/learn/")[1].replace(/\.mdx$/, "");
      const [category, ...slugParts] = rest.split("/");
      const slug = slugParts.join("/");
      list.push({ type: "learn", category, slug, ...data });
    } catch {}
  }
  return list;
}
