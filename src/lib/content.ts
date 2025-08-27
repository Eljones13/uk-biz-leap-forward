
import matter from "gray-matter";
import { BLOG_GLOB, LEARN_GLOB } from "./contentPaths";

export async function loadContentIndex() {
  try {
    const mod = await import("../content-index.json");
    return (mod.default ?? []) as any[];
  } catch {
    return [];
  }
}

export async function loadBlogListFallback() {
  const rawMap = import.meta.glob(BLOG_GLOB, { as: "raw" });
  const list: any[] = [];
  for (const path in rawMap) {
    try {
      const raw = await rawMap[path]();
      const { data } = matter(raw);
      const slug = path.split("/src/content/blog/")[1].replace(/\.mdx$/, "");
      list.push({ type: "blog", slug, ...data });
    } catch {}
  }
  return list;
}

export async function loadLearnListFallback() {
  const rawMap = import.meta.glob(LEARN_GLOB, { as: "raw" });
  const list: any[] = [];
  for (const path in rawMap) {
    try {
      const raw = await rawMap[path]();
      const { data } = matter(raw);
      const rest = path.split("/src/content/learn/")[1].replace(/\.mdx$/, "");
      const [category, ...slugParts] = rest.split("/");
      const slug = slugParts.join("/");
      list.push({ type: "learn", category, slug, ...data });
    } catch {}
  }
  return list;
}
