
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

// Mock blog post data - in a real app, this would come from MDX files
const getBlogPost = (slug: string) => {
  const posts = {
    "uk-company-formation-guide": {
      slug: "uk-company-formation-guide",
      title: "Complete Guide to UK Company Formation in 2024",
      description: "Everything you need to know about forming a limited company in the UK, from choosing a company name to filing with Companies House.",
      date: "2024-01-15",
      author: "Sarah Mitchell",
      tags: ["Company Formation", "Legal", "Guide"],
      content: `
        <p>Starting a business in the UK requires careful planning and adherence to legal requirements. This comprehensive guide will walk you through every step of the company formation process.</p>
        
        <h2>1. Choosing Your Company Type</h2>
        <p>The most common business structure in the UK is the private limited company (Ltd). This structure offers several advantages including limited liability protection and tax efficiency.</p>
        
        <h2>2. Selecting a Company Name</h2>
        <p>Your company name must be unique and comply with Companies House naming rules. It cannot be the same as an existing company or contain restricted words without permission.</p>
        
        <h2>3. Required Information</h2>
        <p>To register your company, you'll need:</p>
        <ul>
          <li>Company name and registered office address</li>
          <li>At least one director (aged 16 or over)</li>
          <li>At least one shareholder</li>
          <li>Articles of Association</li>
          <li>Memorandum of Association</li>
        </ul>
        
        <h2>4. Filing with Companies House</h2>
        <p>Once you have all the required information, you can file your application with Companies House online. The standard service costs £12 and takes 24 hours.</p>
        
        <h2>5. Post-Registration Steps</h2>
        <p>After your company is registered, you'll need to:</p>
        <ul>
          <li>Register for Corporation Tax with HMRC</li>
          <li>Set up PAYE if you have employees</li>
          <li>Consider VAT registration if applicable</li>
          <li>Open a business bank account</li>
        </ul>
        
        <p>Need help with your company formation? BusinessBuilder Pro can guide you through every step of the process.</p>
      `
    }
  };
  
  return posts[slug as keyof typeof posts] || null;
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug || "");

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
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

  return (
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
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
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
                <span>{post.author}</span>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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
  );
};

export default BlogPostPage;
