
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Upload, Save, Eye, Send } from 'lucide-react';
import { Article, useCreateArticle, useUpdateArticle } from '@/hooks/useArticles';
import { markdownToHtml, generateSlug, generateExcerpt } from '@/utils/markdown';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ArticleEditorProps {
  article?: Article;
  type: 'blog' | 'learn';
  onSave?: (article: Article) => void;
  onCancel?: () => void;
}

const categories = {
  blog: ['News', 'Guides', 'Tips', 'Case Studies'],
  learn: ['Company Formation', 'Banking', 'Credit & Funding', 'Legal & Compliance', 'General & Support']
};

export const ArticleEditor = ({ article, type, onSave, onCancel }: ArticleEditorProps) => {
  const [title, setTitle] = useState(article?.title || '');
  const [slug, setSlug] = useState(article?.slug || '');
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');
  const [contentMd, setContentMd] = useState(article?.content_md || '');
  const [contentHtml, setContentHtml] = useState(article?.content_html || '');
  const [category, setCategory] = useState(article?.category || '');
  const [tags, setTags] = useState<string[]>(article?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [coverUrl, setCoverUrl] = useState(article?.cover_url || '');
  const [uploading, setUploading] = useState(false);

  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const { toast } = useToast();

  // Convert markdown to HTML whenever contentMd changes
  useEffect(() => {
    const convertMarkdown = async () => {
      if (contentMd) {
        const html = await markdownToHtml(contentMd);
        setContentHtml(html);
      } else {
        setContentHtml('');
      }
    };
    convertMarkdown();
  }, [contentMd]);

  useEffect(() => {
    if (title && !article) {
      setSlug(generateSlug(title));
    }
  }, [title, article]);

  useEffect(() => {
    if (contentMd && !excerpt) {
      setExcerpt(generateExcerpt(contentMd));
    }
  }, [contentMd, excerpt]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setCoverUrl(data.publicUrl);
      toast({
        title: "Image uploaded successfully",
        description: "Cover image has been set"
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async (status: 'draft' | 'published' = 'draft') => {
    try {
      const articleData = {
        type,
        title,
        slug,
        excerpt,
        content_md: contentMd,
        content_html: contentHtml,
        category,
        tags,
        cover_url: coverUrl,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null
      };

      let savedArticle: Article;

      if (article) {
        savedArticle = await updateArticle.mutateAsync({
          id: article.id,
          ...articleData
        });
      } else {
        savedArticle = await createArticle.mutateAsync(articleData);
      }

      toast({
        title: status === 'published' ? "Article published!" : "Article saved!",
        description: `Your ${type} article has been ${status === 'published' ? 'published' : 'saved as draft'}`
      });

      onSave?.(savedArticle);
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Save failed",
        description: "Failed to save article",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {article ? 'Edit' : 'Create'} {type === 'blog' ? 'Blog Post' : 'Tutorial'}
        </h1>
        <div className="flex gap-2">
          <Button onClick={() => handleSave('draft')} disabled={createArticle.isPending || updateArticle.isPending}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave('published')} disabled={createArticle.isPending || updateArticle.isPending}>
            <Send className="w-4 h-4 mr-2" />
            Publish
          </Button>
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title..."
                />
              </div>

              <div>
                <label className="text-sm font-medium">Slug</label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="article-url-slug"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Excerpt</label>
                <Textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description..."
                  rows={3}
                />
              </div>

              <Tabs defaultValue="edit" className="w-full">
                <TabsList>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                  <Textarea
                    value={contentMd}
                    onChange={(e) => setContentMd(e.target.value)}
                    placeholder="Write your content in Markdown..."
                    rows={20}
                    className="font-mono"
                  />
                </TabsContent>
                <TabsContent value="preview">
                  <div 
                    className="prose max-w-none dark:prose-invert p-4 border rounded-md min-h-[500px]"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories[type].map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Tags</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Enter tag..."
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button size="sm" onClick={addTag}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Cover Image</label>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {coverUrl && (
                    <img
                      src={coverUrl}
                      alt="Cover"
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
