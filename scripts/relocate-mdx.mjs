
import fs from 'fs-extra';
import path from 'path';
import glob from 'fast-glob';

async function relocateMDX() {
  console.log('🔄 Relocating MDX files to correct folders...');
  
  // Ensure target directories exist
  await fs.ensureDir('src/content/blog');
  await fs.ensureDir('src/content/learn/company-formation');
  await fs.ensureDir('src/content/learn/banking');
  await fs.ensureDir('src/content/learn/credit-funding');
  await fs.ensureDir('src/content/learn/legal-compliance');
  await fs.ensureDir('src/content/learn/general-support');

  let movedCount = 0;
  
  try {
    // Find MDX files in wrong locations
    const wrongLocations = [
      'content/**/*.mdx',
      'public/content/**/*.mdx',
      '*.mdx',
      'docs/**/*.mdx'
    ];
    
    for (const pattern of wrongLocations) {
      const files = await glob(pattern);
      
      for (const file of files) {
        const filename = path.basename(file);
        const content = await fs.readFile(file, 'utf8');
        
        // Determine if it's blog or learn content based on path or content
        let targetPath;
        if (file.includes('/blog/') || file.includes('blog-') || content.includes('type: blog')) {
          targetPath = `src/content/blog/${filename}`;
        } else if (file.includes('/learn/')) {
          // Try to preserve category structure
          const pathParts = file.split('/');
          const learnIndex = pathParts.findIndex(part => part === 'learn');
          if (learnIndex >= 0 && pathParts[learnIndex + 1]) {
            const category = pathParts[learnIndex + 1];
            targetPath = `src/content/learn/${category}/${filename}`;
          } else {
            targetPath = `src/content/learn/general-support/${filename}`;
          }
        } else {
          // Default to blog for unknown content
          targetPath = `src/content/blog/${filename}`;
        }
        
        // Check if target already exists
        if (await fs.pathExists(targetPath)) {
          console.log(`⚠️  Skipping ${file} -> ${targetPath} (already exists)`);
          continue;
        }
        
        // Move the file
        await fs.copy(file, targetPath);
        await fs.remove(file);
        console.log(`✅ Moved ${file} -> ${targetPath}`);
        movedCount++;
      }
    }
  } catch (error) {
    console.warn('Warning during MDX relocation:', error.message);
  }
  
  console.log(`📦 Moved ${movedCount} MDX files`);
  return movedCount;
}

relocateMDX().catch(console.error);
