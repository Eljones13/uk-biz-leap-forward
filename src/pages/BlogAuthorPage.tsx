
import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { useAuthor } from "@/hooks/useAuthors";
// @ts-ignore
import contentIndex from "@/content-index.json";

interface BlogPost {
  type: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
}

const BlogAuthorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: author, isLoading } = useAuthor(slug || '');

  const blogPosts = contentIndex.filter((item: any) => item.type === 'blog') as BlogPost[];

  const authorPosts = useMemo(() => {
    if (!author) return [];
    return blogPosts.filter(post => 
      post.author === author.name
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [author, blogPosts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Author Not Found</h1>
          <p className="text-muted-foreground mb-6">The author you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${author.name} - Author`}
        description={author.bio || `Articles by ${author.name} on BusinessBuilder Pro.`}
        url={`/blog/author/${author.slug}`}
      />
      
      <div className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <div className="bg-muted/30 py-4 px-4">
          <div className="container mx-auto max-w-6xl">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{author.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Author Header */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link to="/blog">
              <Button variant="outline" size="sm" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            
            <AuthorCard author={author} variant="full" />
            
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Articles by {author.name}</h2>
              <p className="text-muted-foreground">
                {authorPosts.length} article{authorPosts.length !== 1 ? 's' : ''} published
              </p>
            </div>
          </div>
        </section>

        {/* Author Posts */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            {authorPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No articles found by this author.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {authorPosts.map((post) => (
                  <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags?.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            <Link to={`/blog/tag/${encodeURIComponent(tag)}`}>
                              {tag}
                            </Link>
                          </Badge>
                        ))}
                      </div>
                      <Link to={`/blog/${post.slug}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogAuthorPage;
