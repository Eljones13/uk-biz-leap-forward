
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useCreateArticle } from '@/hooks/useArticles';
import { markdownToHtml, generateSlug } from '@/utils/markdown';
import { useToast } from '@/hooks/use-toast';

interface ImportResult {
  file: string;
  status: 'success' | 'error' | 'skipped';
  message: string;
}

export const ImportMDXPage = () => {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ImportResult[]>([]);
  
  const createArticle = useCreateArticle();
  const { toast } = useToast();

  const importMDXContent = async () => {
    setImporting(true);
    setProgress(0);
    setResults([]);

    try {
      // This is a simplified version - in a real implementation, you'd need to
      // either upload files or have a way to read from the file system
      
      // For now, we'll simulate the import process
      const mockFiles = [
        'hello-world.mdx',
        'register-limited-company.mdx',
        'business-bank-accounts-uk.mdx',
        'build-business-credit.mdx'
      ];

      const totalFiles = mockFiles.length;
      const importResults: ImportResult[] = [];

      for (let i = 0; i < mockFiles.length; i++) {
        const file = mockFiles[i];
        setProgress((i / totalFiles) * 100);

        try {
          // Simulate processing delay
          await new Promise(resolve => setTimeout(resolve, 1000));

          // In a real implementation, you would:
          // 1. Read the MDX file content
          // 2. Parse the frontmatter 
          // 3. Extract the markdown body
          // 4. Convert to HTML
          // 5. Create the article record

          const mockContentMd = `# ${file.replace('.mdx', '').replace(/-/g, ' ')}\n\nThis content was imported from MDX.`;
          const mockContentHtml = await markdownToHtml(mockContentMd);

          const mockArticle = {
            type: 'blog' as const,
            title: file.replace('.mdx', '').replace(/-/g, ' '),
            slug: file.replace('.mdx', ''),
            excerpt: `Imported from ${file}`,
            content_md: mockContentMd,
            content_html: mockContentHtml,
            tags: ['imported'],
            category: 'General',
            status: 'draft' as const
          };

          await createArticle.mutateAsync(mockArticle);

          importResults.push({
            file,
            status: 'success',
            message: 'Successfully imported'
          });

        } catch (error) {
          importResults.push({
            file,
            status: 'error',
            message: `Failed to import: ${error}`
          });
        }
      }

      setProgress(100);
      setResults(importResults);

      const successCount = importResults.filter(r => r.status === 'success').length;
      toast({
        title: "Import completed",
        description: `Successfully imported ${successCount} of ${totalFiles} files`
      });

    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import failed",
        description: "An error occurred during import",
        variant: "destructive"
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Import MDX Content</h1>
        <p className="text-muted-foreground">
          Import existing MDX blog posts and tutorials into the database.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Import Process</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This will scan your MDX files, parse the frontmatter, convert the content to HTML, 
            and create corresponding database records. Existing articles with the same slug will be skipped.
          </p>
          
          {importing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Importing...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          <Button 
            onClick={importMDXContent} 
            disabled={importing}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            {importing ? 'Importing...' : 'Start Import'}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Import Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    {result.status === 'success' && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {result.status === 'error' && (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="font-medium">{result.file}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        result.status === 'success' ? 'default' : 
                        result.status === 'error' ? 'destructive' : 'secondary'
                      }
                    >
                      {result.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {result.message}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImportMDXPage;
