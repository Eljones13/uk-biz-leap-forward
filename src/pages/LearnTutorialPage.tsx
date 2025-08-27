
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Clock, User, ArrowLeft, BookOpen } from "lucide-react";

// Mock tutorial data - in a real app, this would come from MDX files
const getTutorial = (category: string, slug: string) => {
  const tutorials = {
    "company-formation": {
      "choosing-company-type": {
        slug: "choosing-company-type",
        title: "Choosing the Right Company Type",
        description: "Understanding the differences between Limited Companies, LLPs, and Community Interest Companies.",
        category: "company-formation",
        categoryName: "Company Formation",
        date: "2024-01-15",
        author: "Legal Team",
        tags: ["Company Types", "Legal Structure"],
        duration: "5 min read",
        content: `
          <p>Choosing the right company structure is one of the most important decisions you'll make when starting your business. This guide will help you understand the different options available in the UK.</p>
          
          <h2>Private Limited Company (Ltd)</h2>
          <p>A private limited company is the most popular business structure for small to medium-sized businesses in the UK. Key features include:</p>
          <ul>
            <li>Limited liability protection for shareholders</li>
            <li>Separate legal entity from its owners</li>
            <li>Corporation tax rates (19-25% depending on profits)</li>
            <li>Ability to retain profits in the company</li>
            <li>Professional credibility with customers and suppliers</li>
          </ul>
          
          <h2>Limited Liability Partnership (LLP)</h2>
          <p>An LLP combines elements of partnerships and companies. It's suitable for professional services and businesses with multiple partners:</p>
          <ul>
            <li>Limited liability for partners</li>
            <li>Flexible profit sharing arrangements</li>
            <li>Partners taxed individually on their share of profits</li>
            <li>Less administrative burden than a limited company</li>
          </ul>
          
          <h2>Community Interest Company (CIC)</h2>
          <p>A CIC is designed for social enterprises that want to use their profits for public good:</p>
          <ul>
            <li>Asset lock prevents assets being distributed for private gain</li>
            <li>Limited dividend payments to investors</li>
            <li>Must demonstrate community benefit</li>
            <li>Regulated by the CIC Regulator</li>
          </ul>
          
          <h2>Which Structure is Right for You?</h2>
          <p>Consider these factors when choosing your company structure:</p>
          <ul>
            <li><strong>Liability:</strong> Do you need limited liability protection?</li>
            <li><strong>Tax efficiency:</strong> What's the most tax-efficient structure for your situation?</li>
            <li><strong>Investment:</strong> Do you plan to raise external investment?</li>
            <li><strong>Purpose:</strong> Is your business for-profit or social enterprise?</li>
            <li><strong>Compliance:</strong> How much administrative burden can you handle?</li>
          </ul>
          
          <p>For most businesses, a private limited company offers the best balance of protection, flexibility, and credibility.</p>
        `
      }
    }
  };
  
  return tutorials[category as keyof typeof tutorials]?.[slug as keyof any] || null;
};

const categoryNames = {
  "company-formation": "Company Formation",
  "banking": "Banking",
  "credit-funding": "Credit & Funding",
  "legal-compliance": "Legal Documents & Compliance",
  "general-support": "General & Support"
};

const LearnTutorialPage = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const tutorial = getTutorial(category || "", slug || "");

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Tutorial Not Found</h1>
          <p className="text-muted-foreground mb-6">The tutorial you're looking for doesn't exist.</p>
          <Link to="/learn">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Learn Hub
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
                <BreadcrumbLink href="/learn">Learn</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/learn#${category}`}>
                  {categoryNames[category as keyof typeof categoryNames]}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{tutorial.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Tutorial Header */}
      <article className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Link to="/learn">
              <Button variant="outline" size="sm" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Learn Hub
              </Button>
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">{tutorial.categoryName}</Badge>
              {tutorial.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tutorial.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{tutorial.description}</p>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{tutorial.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{tutorial.author}</span>
              </div>
              <span>Updated {formatDate(tutorial.date)}</span>
            </div>
          </div>

          {/* Tutorial Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: tutorial.content }}
          />

          {/* CTA Section */}
          <div className="mt-12 p-6 bg-muted/50 rounded-2xl text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to Put This Into Practice?</h3>
            <p className="text-muted-foreground mb-4">
              Start your company formation journey with BusinessBuilder Pro's step-by-step guidance.
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

export default LearnTutorialPage;
