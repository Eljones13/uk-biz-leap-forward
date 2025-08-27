
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
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
    react(),
    mdx({ 
      include: ['**/*.mdx', '**/*.md'],
      remarkPlugins: [remarkGfm], 
      rehypePlugins: [rehypeSanitize] 
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
