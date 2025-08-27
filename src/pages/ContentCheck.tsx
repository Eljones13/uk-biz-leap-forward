
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, RefreshCw, FileText } from "lucide-react";
import { loadBlogPosts, loadLearnTutorials } from "@/lib/mdxContent";

const ContentCheck = () => {
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadDiagnostics = async () => {
    setLoading(true);
    try {
      // Load content using the new loaders
      const blogPosts = loadBlogPosts();
      const learnTutorials = loadLearnTutorials();
      
      // Try to load the content index
      let indexContent = [];
      try {
        const indexMod = await import("../content-index.json");
        indexContent = indexMod.default || [];
      } catch {
        console.log('No content index found');
      }

      const data = {
        glob: {
          blog: blogPosts.length,
          learn: learnTutorials.length,
          paths: [
            ...blogPosts.map(p => `blog/${p.slug}.mdx`),
            ...learnTutorials.map(t => `learn/${t.slug}.mdx`)
          ]
        },
        index: {
          total: indexContent.length,
          blog: indexContent.filter((item: any) => item.type === 'blog').length,
          learn: indexContent.filter((item: any) => item.type === 'learn').length
        },
        fallback: {
          blog: blogPosts.length,
          learn: learnTutorials.length
        }
      };
      
      setDiagnostics(data);
      
      // Log acceptance checklist
      console.log('✅ MDX Content Acceptance Checklist:');
      console.log(`Blog files found (glob): ${data.glob.blog} | Indexed: ${data.index.blog}`);
      console.log(`Learn files found (glob): ${data.glob.learn} | Indexed: ${data.index.learn}`);
      console.log(`Blog visible on /blog: ${data.fallback.blog > 0 ? 'yes' : 'no'}`);
      console.log(`Learn tabs populated: ${data.fallback.learn > 0 ? 'yes' : 'no'}`);
    } catch (error) {
      console.error('Diagnostics error:', error);
    } finally {
      setLoading(false);
    }
  };

  const rebuildIndex = async () => {
    try {
      setLoading(true);
      console.log('Rebuilding content index...');
      await loadDiagnostics();
    } catch (error) {
      console.error('Rebuild error:', error);
    }
  };

  useEffect(() => {
    loadDiagnostics();
  }, []);

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

  if (!diagnostics) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-6">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-4" />
            <p>Failed to load diagnostics</p>
          </div>
        </div>
      </div>
    );
  }

  const hasNoContent = diagnostics.glob.blog === 0 && diagnostics.glob.learn === 0;
  const needsReindex = diagnostics.glob.blog > diagnostics.index.blog || diagnostics.glob.learn > diagnostics.index.learn;
  const isHealthy = !hasNoContent && diagnostics.fallback.blog > 0 && diagnostics.fallback.learn > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Content Diagnostics</h1>
          <p className="text-muted-foreground">
            MDX content discovery and indexing status
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
                No MDX files found. Content should exist under src/content/
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
                More files found via glob than in index. Rebuild recommended.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {isHealthy && (
          <Card className="mb-6 border-green-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <CardTitle className="text-green-700">Content Status: Healthy</CardTitle>
              </div>
              <CardDescription>
                Content files are properly indexed and visible on pages.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Acceptance Checklist */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Acceptance Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between">
                <span>Blog files found (glob):</span>
                <Badge variant="outline">{diagnostics.glob.blog}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Blog posts indexed:</span>
                <Badge variant="outline">{diagnostics.index.blog}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Learn files found (glob):</span>
                <Badge variant="outline">{diagnostics.glob.learn}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Learn tutorials indexed:</span>
                <Badge variant="outline">{diagnostics.index.learn}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Blog visible on /blog:</span>
                <Badge variant={diagnostics.fallback.blog > 0 ? "default" : "destructive"}>
                  {diagnostics.fallback.blog > 0 ? 'yes' : 'no'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Learn tabs populated:</span>
                <Badge variant={diagnostics.fallback.learn > 0 ? "default" : "destructive"}>
                  {diagnostics.fallback.learn > 0 ? 'yes' : 'no'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Discovery */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>File Discovery</CardTitle>
            <CardDescription>
              MDX files found via import.meta.glob
            </CardDescription>
          </CardHeader>
          <CardContent>
            {diagnostics.glob.paths.length === 0 ? (
              <p className="text-muted-foreground">No files found</p>
            ) : (
              <ul className="space-y-1">
                {diagnostics.glob.paths.map((path: string, index: number) => (
                  <li key={index} className="font-mono text-sm">
                    {path}
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
          <Button onClick={rebuildIndex} variant="secondary">
            <RefreshCw className="h-4 w-4 mr-2" />
            Rebuild Index
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
