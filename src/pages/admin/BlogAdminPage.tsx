
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { ArticleEditor } from '@/components/admin/ArticleEditor';
import { useArticles, useDeleteArticle, Article } from '@/hooks/useArticles';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export const BlogAdminPage = () => {
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  
  const { data: articles, isLoading } = useArticles('blog');
  const deleteArticle = useDeleteArticle();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle.mutateAsync(id);
        toast({
          title: "Article deleted",
          description: "The article has been successfully deleted"
        });
      } catch (error) {
        toast({
          title: "Delete failed",
          description: "Failed to delete article",
          variant: "destructive"
        });
      }
    }
  };

  const handleSave = () => {
    setShowEditor(false);
    setEditingArticle(null);
  };

  if (showEditor) {
    return (
      <ArticleEditor
        article={editingArticle || undefined}
        type="blog"
        onSave={handleSave}
        onCancel={() => {
          setShowEditor(false);
          setEditingArticle(null);
        }}
      />
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Blog Administration</h1>
        <Button onClick={() => setShowEditor(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Blog Post
        </Button>
      </div>

      {isLoading ? (
        <div>Loading articles...</div>
      ) : (
        <div className="grid gap-4">
          {articles?.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <p className="text-muted-foreground text-sm mt-1">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                      {article.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Link to={`/blog/${article.slug}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingArticle(article);
                          setShowEditor(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(article.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    {article.category && <span>Category: {article.category}</span>}
                    <span>Created: {format(new Date(article.created_at), 'PPP')}</span>
                  </div>
                  <div className="flex gap-1">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogAdminPage;
