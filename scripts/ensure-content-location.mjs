
import fs from 'fs-extra';
import glob from 'fast-glob';
import path from 'path';

async function ensureContentLocation() {
  console.log('🔍 Checking content locations...');
  
  try {
    // Ensure src/content directory structure exists
    await fs.ensureDir('src/content/blog');
    await fs.ensureDir('src/content/learn/general-support');
    await fs.ensureDir('src/content/learn/company-formation');
    await fs.ensureDir('src/content/learn/banking');
    await fs.ensureDir('src/content/learn/credit-funding');
    await fs.ensureDir('src/content/learn/legal-compliance');
    
    // Look for MDX files in both locations
    const oldContentFiles = await glob('content/**/*.mdx');
    const srcContentFiles = await glob('src/content/**/*.mdx');
    
    console.log(`Found ${oldContentFiles.length} files in /content/`);
    console.log(`Found ${srcContentFiles.length} files in /src/content/`);
    
    let movedCount = 0;
    
    // Move files from /content to /src/content if they don't already exist
    for (const oldFile of oldContentFiles) {
      const relativePath = path.relative('content', oldFile);
      const newFile = path.join('src/content', relativePath);
      
      if (!await fs.pathExists(newFile)) {
        await fs.ensureDir(path.dirname(newFile));
        await fs.copy(oldFile, newFile);
        console.log(`📁 Moved: ${oldFile} → ${newFile}`);
        movedCount++;
      } else {
        console.log(`⏭️  Skipped: ${newFile} already exists`);
      }
    }
    
    // Seed minimum content if missing
    const blogFiles = await glob('src/content/blog/*.mdx');
    if (blogFiles.length === 0) {
      console.log('📝 Creating seed blog post...');
      const seedBlog = `---
title: "Hello World — Welcome to the Blog"
description: "Seed post to verify MDX and routing."
date: "2025-08-27"
author: "BusinessBuilder Pro"
tags: ["announcement"]
---

# Hello World — Welcome to the Blog

This is a seed post. Replace me with real content.

## Getting Started

This post confirms that our MDX pipeline is working correctly with the new content structure under \`src/content\`.

Welcome to BusinessBuilder Pro's blog where we'll share insights about UK business formation, compliance, and growth strategies.
`;
      await fs.writeFile('src/content/blog/hello-world.mdx', seedBlog);
    }
    
    const learnFiles = await glob('src/content/learn/general-support/*.mdx');
    if (learnFiles.length === 0) {
      console.log('📚 Creating seed learn tutorial...');
      const seedLearn = `---
title: "Welcome to the Learn Hub"
description: "Seed tutorial to verify MDX and routing."
date: "2025-08-27"
author: "BusinessBuilder Pro"
tags: ["getting-started"]
---

# Welcome to the Learn Hub

Start here to learn how to navigate tutorials and find answers quickly.

## How to Use This Section

The Learn Hub is organized into categories to help you find exactly what you need:

- **Company Formation**: Step-by-step guides for registering your business
- **Banking**: Setting up business accounts and financial management
- **Credit & Funding**: Building business credit and accessing funding
- **Legal Documents & Compliance**: Templates and compliance guidance
- **General & Support**: Getting started and troubleshooting

## Getting Started

Choose the category that matches your current business needs from the tabs above, then follow our step-by-step guides to implement what you've learned.
`;
      await fs.writeFile('src/content/learn/general-support/welcome.mdx', seedLearn);
    }
    
    console.log(`✅ Content location check complete. Moved ${movedCount} files.`);
    return movedCount;
    
  } catch (error) {
    console.error('❌ Error ensuring content location:', error);
    throw error;
  }
}

ensureContentLocation().catch(console.error);
