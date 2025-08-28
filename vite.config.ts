
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeSanitize from 'rehype-sanitize';
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    mdx({ 
      include: ['**/*.mdx', '**/*.md'],
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
        remarkGfm
      ], 
      rehypePlugins: [rehypeSanitize] 
    }),
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
