
import fs from 'fs-extra';
import glob from 'fast-glob';
import matter from 'gray-matter';
import path from 'path';
import { compareDesc, parseISO } from 'date-fns';

async function buildContentIndex() {
  const contentIndex = [];
  const modules = {};

  // Ensure content directories exist
  await fs.ensureDir('src/content/blog');
  await fs.ensureDir('src/content/learn/company-formation');
  await fs.ensureDir('src/content/learn/banking');
  await fs.ensureDir('src/content/learn/credit-funding');
  await fs.ensureDir('src/content/learn/legal-compliance');
  await fs.ensureDir('src/content/learn/general-support');

  try {
    // Process blog posts
    const blogFiles = await glob('src/content/blog/**/*.mdx');
    console.log(`Found ${blogFiles.length} blog files`);
    
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
          category: frontmatter.category || null,
          path: `/blog/${slug}`,
          filePath: file,
          title: frontmatter.title,
          description,
          date: frontmatter.date,
          author,
          tags: frontmatter.tags || [],
          excerpt: excerpt || description.substring(0, 160) + '...'
        });

        modules[`blog/${slug}`] = `() => import("../content/blog/${slug}.mdx")`;
        console.log(`✓ Processed blog: ${slug}`);
      } catch (error) {
        console.warn(`Error processing blog file ${file}:`, error.message);
      }
    }

    // Process learn tutorials
    const learnFiles = await glob('src/content/learn/**/*.mdx');
    console.log(`Found ${learnFiles.length} learn files`);
    
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
        const relativePath = path.relative('src/content/learn', file);
        const category = path.dirname(relativePath);
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

        modules[`learn/${category}/${slug}`] = `() => import("../content/learn/${category}/${slug}.mdx")`;
        console.log(`✓ Processed learn: ${category}/${slug}`);
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

  // Ensure placeholders exist
  await fs.ensureDir('src');
  
  // Write content index
  await fs.writeFile(
    'src/content-index.json',
    JSON.stringify(contentIndex, null, 2)
  );

  // Write modules map
  const moduleExports = Object.entries(modules)
    .map(([key, importFn]) => `  "${key}": ${importFn}`)
    .join(',\n');

  const moduleContent = moduleExports 
    ? `\nexport const modules = {\n${moduleExports}\n};\n`
    : `\nexport const modules = {};\n`;
    
  await fs.writeFile('src/content-modules.mjs', moduleContent);

  console.log(`✅ Built content index: ${contentIndex.length} items`);
  console.log(`   - Blog posts: ${contentIndex.filter(i => i.type === 'blog').length}`);
  console.log(`   - Learn tutorials: ${contentIndex.filter(i => i.type === 'learn').length}`);
  
  return {
    total: contentIndex.length,
    blog: contentIndex.filter(i => i.type === 'blog').length,
    learn: contentIndex.filter(i => i.type === 'learn').length
  };
}

buildContentIndex().catch(console.error);
