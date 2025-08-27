
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { loadContentIndex, loadBlogListFallback, loadLearnListFallback } from "@/lib/content";

const ContentCheck = () => {
  const [indexData, setIndexData] = useState<any[]>([]);
  const [globData, setGlobData] = useState({ blog: 0, learn: 0, files: [] as string[] });
  const [loading, setLoading] = useState(true);

  const loadDiagnostics = async () => {
    setLoading(true);
    try {
      // Load from index
      const indexContent = await loadContentIndex();
      setIndexData(indexContent);

      // Load from globs (fallback method)
      const blogGlob = await loadBlogListFallback();
      const learnGlob = await loadLearnListFallback();
      
      // Get file paths using import.meta.glob
      const blogRaw = import.meta.glob('/src/content/blog/**/*.mdx', { as: 'raw' });
      const learnRaw = import.meta.glob('/src/content/learn/**/*.mdx', { as: 'raw' });
      
      const allFiles = [
        ...Object.keys(blogRaw).map(path => path.replace('/src/content/', '')),
        ...Object.keys(learnRaw).map(path => path.replace('/src/content/', ''))
      ];

      setGlobData({
        blog: Object.keys(blogRaw).length,
        learn: Object.keys(learnRaw).length,
        files: allFiles
      });
    } catch (error) {
      console.error('Diagnostics error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiagnostics();
  }, []);

  const blogIndexCount = indexData.filter(item => item.type === 'blog').length;
  const learnIndexCount = indexData.filter(item => item.type === 'learn').length;

  const needsReindex = globData.blog > blogIndexCount || globData.learn > learnIndexCount;
  const hasNoContent = globData.blog === 0 && globData.learn === 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-6">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Running content diagnostics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Content Diagnostics</h1>
          <p className="text-muted-foreground">
            Checking MDX content discovery and indexing status
          </p>
        </div>

        {/* Status Banners */}
        {hasNoContent && (
          <Card className="mb-6 border-destructive">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <CardTitle className="text-destructive">No Content Found</CardTitle>
              </div>
              <CardDescription>
                No MDX files found under /src/content. Seed content should be created.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {needsReindex && (
          <Card className="mb-6 border-yellow-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-yellow-700">Index Out of Date</CardTitle>
              </div>
              <CardDescription>
                More files found via glob than in index. Re-run prebuild to regenerate index.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {!hasNoContent && !needsReindex && (
          <Card className="mb-6 border-green-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <CardTitle className="text-green-700">Content Status: Good</CardTitle>
              </div>
              <CardDescription>
                Content files are properly indexed and should be visible.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Content Counts */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Blog Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Files found (glob):</span>
                  <Badge variant="outline">{globData.blog}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Posts indexed:</span>
                  <Badge variant="outline">{blogIndexCount}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learn Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Files found (glob):</span>
                  <Badge variant="outline">{globData.learn}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Tutorials indexed:</span>
                  <Badge variant="outline">{learnIndexCount}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File List */}
        <Card>
          <CardHeader>
            <CardTitle>Discovered Files</CardTitle>
            <CardDescription>
              MDX files found via import.meta.glob
            </CardDescription>
          </CardHeader>
          <CardContent>
            {globData.files.length === 0 ? (
              <p className="text-muted-foreground">No files found</p>
            ) : (
              <ul className="space-y-1">
                {globData.files.map((file, index) => (
                  <li key={index} className="font-mono text-sm">
                    {file}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4">
          <Button onClick={loadDiagnostics}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Diagnostics
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/blog'}>
            View Blog
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/learn'}>
            View Learn Hub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentCheck;
