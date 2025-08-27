
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Calendar, User, ArrowLeft, Share2, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { SEO } from "@/components/seo/SEO";
import { NewsletterSignup } from "@/components/mdx/NewsletterSignup";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { SecureMDXProvider } from "@/components/mdx/SecureMDXProvider";
import { useAuthor } from "@/hooks/useAuthors";
// @ts-ignore
import contentIndex from "@/content-index.json";
// @ts-ignore
import { modules } from "@/content-modules.mjs";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [MDXContent, setMDXContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: author } = useAuthor('businessbuilder-pro');

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      try {
        const postData = contentIndex.find((item: any) => 
          item.type === 'blog' && item.slug === slug
        );
        
        if (!postData) {
          setError('Post not found');
          setLoading(false);
          return;
        }

        // Validate required frontmatter
        if (!postData.title || !postData.date) {
          setError('Invalid post data');
          setLoading(false);
          return;
        }

        // Load MDX module with error handling
        const moduleLoader = modules[`blog/${slug}`];
        if (moduleLoader) {
          try {
            const module = await moduleLoader();
            setMDXContent(() => module.default);
          } catch (moduleError) {
            console.error('Error loading MDX module:', moduleError);
            setError('Failed to load post content');
            setLoading(false);
            return;
          }
        }
        
        setPost({
          ...postData,
          author: postData.author || 'BusinessBuilder Pro'
        });
      } catch (error) {
        console.error('Error loading post:', error);
        setError('Failed to load post');
      }
      
      setLoading(false);
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "The blog post you're looking for doesn't exist."}
          </p>
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "BusinessBuilder Pro"
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "url": `https://businessbuilder.pro/blog/${post.slug}`
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://businessbuilder.pro/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://businessbuilder.pro/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://businessbuilder.pro/blog/${post.slug}`
      }
    ]
  };

  return (
    <>
      <SEO 
        title={post.title}
        description={post.description}
        type="article"
        url={`/blog/${post.slug}`}
        date={post.date}
        author={post.author}
        jsonLd={[jsonLd, breadcrumbJsonLd]}
      />
      
      <div className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <div className="bg-muted/30 py-4 px-4">
          <div className="container mx-auto max-w-4xl">
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
                  <BreadcrumbPage>{post.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Article Header */}
        <article className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-8">
              <Link to="/blog">
                <Button variant="outline" size="sm" className="mb-6">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    <Link to={`/blog/tag/${encodeURIComponent(tag)}`}>
                      {tag}
                    </Link>
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{post.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <Link to="/blog/author/businessbuilder-pro" className="hover:text-primary">
                    {post.author}
                  </Link>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {MDXContent && (
                <SecureMDXProvider>
                  <MDXContent />
                </SecureMDXProvider>
              )}
            </div>

            {/* Newsletter Signup */}
            <NewsletterSignup />

            {/* Author Card */}
            {author && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">About the Author</h3>
                <AuthorCard author={author} variant="full" />
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-12 p-6 bg-muted/50 rounded-2xl text-center">
              <h3 className="text-xl font-semibold mb-2">Ready to Start Your Company?</h3>
              <p className="text-muted-foreground mb-4">
                Let BusinessBuilder Pro guide you through the company formation process step by step.
              </p>
              <Link to="/dashboard">
                <Button size="lg">Get Started Today</Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogPostPage;
