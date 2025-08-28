
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked for safe HTML output
marked.setOptions({
  breaks: true,
  gfm: true
});

export const markdownToHtml = async (markdown: string): Promise<string> => {
  const html = await marked(markdown);
  return DOMPurify.sanitize(html);
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

export const generateExcerpt = (content: string, maxLength: number = 160): string => {
  // Strip HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '');
  if (plainText.length <= maxLength) return plainText;
  
  return plainText.slice(0, maxLength).trim() + '...';
};
