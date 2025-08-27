
import fs from 'fs-extra';
import glob from 'fast-glob';
import matter from 'gray-matter';
import path from 'path';
import { compareDesc, parseISO } from 'date-fns';

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
      try {
        const content = await fs.readFile(file, 'utf8');
        const { data: frontmatter, excerpt } = matter(content, {
          excerpt: true,
          excerpt_separator: '\n\n'
        });
        
        // Skip drafts
        if (frontmatter.draft === true) continue;
        
        // Validate required fields
        if (!frontmatter.title || !frontmatter.date) {
          console.warn(`Skipping ${file}: missing title or date`);
          continue;
        }
        
        const slug = path.basename(file, '.mdx');
        const author = frontmatter.author || 'BusinessBuilder Pro';
        const description = frontmatter.description || excerpt || frontmatter.title;
        
        contentIndex.push({
          type: 'blog',
          slug,
          category: null,
          path: `/blog/${slug}`,
          filePath: file,
          title: frontmatter.title,
          description,
          date: frontmatter.date,
          author,
          tags: frontmatter.tags || [],
          excerpt: excerpt || description.substring(0, 160) + '...'
        });

        modules[`blog/${slug}`] = `() => import("../${file}")`;
      } catch (error) {
        console.warn(`Error processing blog file ${file}:`, error.message);
      }
    }

    // Process learn tutorials
    const learnFiles = await glob('content/learn/**/*.mdx');
    for (const file of learnFiles) {
      try {
        const content = await fs.readFile(file, 'utf8');
        const { data: frontmatter, excerpt } = matter(content, {
          excerpt: true,
          excerpt_separator: '\n\n'
        });
        
        // Skip drafts
        if (frontmatter.draft === true) continue;
        
        // Validate required fields
        if (!frontmatter.title || !frontmatter.date) {
          console.warn(`Skipping ${file}: missing title or date`);
          continue;
        }
        
        const slug = path.basename(file, '.mdx');
        const category = path.dirname(file).split('/').pop();
        const author = frontmatter.author || 'BusinessBuilder Pro';
        const description = frontmatter.description || excerpt || frontmatter.title;
        
        // Get file modification time for lastUpdated
        const stats = await fs.stat(file);
        const lastUpdated = frontmatter.lastUpdated || stats.mtime.toISOString();
        
        contentIndex.push({
          type: 'learn',
          slug,
          category,
          path: `/learn/${category}/${slug}`,
          filePath: file,
          title: frontmatter.title,
          description,
          date: frontmatter.date,
          lastUpdated,
          author,
          tags: frontmatter.tags || [],
          excerpt: excerpt || description.substring(0, 160) + '...'
        });

        modules[`learn/${category}/${slug}`] = `() => import("../${file}")`;
      } catch (error) {
        console.warn(`Error processing learn file ${file}:`, error.message);
      }
    }
  } catch (error) {
    console.warn('Warning: Error processing content files:', error.message);
    console.log('Continuing with empty content index...');
  }

  // Sort content by date (most recent first)
  contentIndex.sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));

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
