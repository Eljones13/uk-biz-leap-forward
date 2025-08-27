
import fs from 'fs-extra';
import glob from 'fast-glob';
import matter from 'gray-matter';
import path from 'path';

async function buildContentIndex() {
  const contentIndex = [];
  const modules = {};

  // Ensure content directories exist
  await fs.ensureDir('content/blog');
  await fs.ensureDir('content/learn');

  try {
    // Process blog posts
    const blogFiles = await glob('content/blog/**/*.mdx');
    for (const file of blogFiles) {
      const content = await fs.readFile(file, 'utf8');
      const { data: frontmatter } = matter(content);
      const slug = path.basename(file, '.mdx');
      
      contentIndex.push({
        type: 'blog',
        slug,
        category: null,
        path: `/blog/${slug}`,
        filePath: file,
        ...frontmatter
      });

      modules[`blog/${slug}`] = `() => import("../${file}")`;
    }

    // Process learn tutorials
    const learnFiles = await glob('content/learn/**/*.mdx');
    for (const file of learnFiles) {
      const content = await fs.readFile(file, 'utf8');
      const { data: frontmatter } = matter(content);
      const slug = path.basename(file, '.mdx');
      const category = path.dirname(file).split('/').pop();
      
      contentIndex.push({
        type: 'learn',
        slug,
        category,
        path: `/learn/${category}/${slug}`,
        filePath: file,
        ...frontmatter
      });

      modules[`learn/${category}/${slug}`] = `() => import("../${file}")`;
    }
  } catch (error) {
    console.warn('Warning: Error processing content files:', error.message);
    console.log('Continuing with empty content index...');
  }

  // Write content index
  await fs.ensureDir('src');
  await fs.writeFile(
    'src/content-index.json',
    JSON.stringify(contentIndex, null, 2)
  );

  // Write modules map
  const moduleExports = Object.entries(modules)
    .map(([key, importFn]) => `  "${key}": ${importFn}`)
    .join(',\n');

  const moduleContent = moduleExports 
    ? `export const modules = {\n${moduleExports}\n};\n`
    : `export const modules = {};\n`;
    
  await fs.writeFile('src/content-modules.mjs', moduleContent);

  console.log(`Built content index: ${contentIndex.length} items`);
}

buildContentIndex().catch(console.error);
