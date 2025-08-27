
import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Calendar, User, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
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

const BlogTagPage = () => {
  const { tag } = useParams<{ tag: string }>();

  const blogPosts = contentIndex.filter((item: any) => item.type === 'blog') as BlogPost[];

  const filteredPosts = useMemo(() => {
    if (!tag) return [];
    return blogPosts.filter(post => 
      post.tags?.includes(decodeURIComponent(tag))
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [tag, blogPosts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!tag) {
    return <div>Tag not found</div>;
  }

  const decodedTag = decodeURIComponent(tag);

  return (
    <>
      <SEO 
        title={`${decodedTag} Articles`}
        description={`All articles tagged with "${decodedTag}" on BusinessBuilder Pro blog.`}
        url={`/blog/tag/${tag}`}
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
                  <BreadcrumbPage>Tag: {decodedTag}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Header Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link to="/blog">
              <Button variant="outline" size="sm" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            
            <div className="text-center">
              <Tag className="h-12 w-12 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Articles tagged "{decodedTag}"</h1>
              <p className="text-xl text-muted-foreground mb-8">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No articles found with this tag.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.date)}</span>
                        <span>•</span>
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
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
                        {post.tags?.map((postTag) => (
                          <Badge
                            key={postTag}
                            variant={postTag === decodedTag ? "default" : "secondary"}
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Link to={`/blog/tag/${encodeURIComponent(postTag)}`}>
                              {postTag}
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

export default BlogTagPage;
