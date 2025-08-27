
# Content Management System

This document explains how to manage blog posts and learn tutorials in BusinessBuilder Pro.

## Content Structure

Content is organized in two main directories:

```
/content/
├── blog/
│   └── [slug].mdx
└── learn/
    ├── company-formation/
    ├── banking/
    ├── credit-funding/
    ├── legal-compliance/
    └── general-support/
        └── [slug].mdx
```

## Frontmatter Format

All MDX files must include YAML frontmatter with the following fields:

```yaml
---
title: "Your Article Title"
description: "Brief description for SEO and previews"
date: "YYYY-MM-DD"
author: "Author Name"
tags: ["tag1", "tag2", "tag3"]
---
```

## Adding New Content

### Blog Posts

1. Create a new file in `/content/blog/` with the format `[slug].mdx`
2. Add proper frontmatter (see format above)
3. Write your content in MDX format
4. Run the build scripts to update the content index

### Learn Tutorials

1. Create a new file in the appropriate category folder under `/content/learn/`
2. Categories are: `company-formation`, `banking`, `credit-funding`, `legal-compliance`, `general-support`
3. Add proper frontmatter
4. Write your content in MDX format
5. Run the build scripts to update the content index

## Build Scripts

Add these scripts to your package.json:

```json
{
  "scripts": {
    "prebuild": "node scripts/build-content-index.mjs",
    "build": "vite build",
    "postbuild": "node scripts/build-rss.mjs && node scripts/build-sitemap.mjs"
  }
}
```

## Content Index

The build system automatically generates:

- `src/content-index.json` - Metadata for all content
- `src/content-modules.mjs` - Dynamic imports for MDX files
- `public/blog/rss.xml` - RSS feed for blog posts
- `public/sitemap.xml` - Sitemap including all content

## SEO Features

- Automatic meta tags from frontmatter
- Open Graph and Twitter Card support
- RSS feed generation
- Sitemap generation
- Structured data for articles

## Content Guidelines

### Writing Style
- Use clear, actionable headings
- Include practical examples
- Link to relevant internal pages
- Keep paragraphs concise

### SEO Best Practices
- Use descriptive, keyword-rich titles
- Write compelling meta descriptions (under 160 characters)
- Include relevant tags
- Use proper heading hierarchy (h1 → h2 → h3)

### Accessibility
- Include alt text for images
- Use semantic HTML
- Ensure good color contrast
- Test with keyboard navigation

## Troubleshooting

### Content not appearing
1. Check frontmatter format
2. Ensure file is in correct directory
3. Run build scripts to regenerate index
4. Check console for import errors

### SEO issues
1. Verify frontmatter includes title and description
2. Check that URLs are correct
3. Validate generated sitemap and RSS feed

## Development Workflow

1. Create/edit MDX files
2. Run `npm run prebuild` to update content index
3. Test locally with `npm run dev`
4. Build and deploy with `npm run build`

The content system automatically handles routing, SEO, and navigation based on your MDX files and frontmatter.
