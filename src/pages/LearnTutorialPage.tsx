
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Clock, User, ArrowLeft, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { SEO } from "@/components/seo/SEO";
import { SecureMDXProvider } from "@/components/mdx/SecureMDXProvider";
// @ts-ignore
import contentIndex from "@/content-index.json";
// @ts-ignore
import { modules } from "@/content-modules.mjs";

const categoryNames = {
  "company-formation": "Company Formation",
  "banking": "Banking", 
  "credit-funding": "Credit & Funding",
  "legal-compliance": "Legal Documents & Compliance",
  "general-support": "General & Support"
};

const LearnTutorialPage = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [tutorial, setTutorial] = useState<any>(null);
  const [MDXContent, setMDXContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTutorial = async () => {
      if (!category || !slug) return;
      
      try {
        const tutorialData = contentIndex.find((item: any) => 
          item.type === 'learn' && item.category === category && item.slug === slug
        );
        
        if (!tutorialData) {
          setError('Tutorial not found');
          setLoading(false);
          return;
        }

        // Validate required frontmatter
        if (!tutorialData.title || !tutorialData.date) {
          setError('Invalid tutorial data');
          setLoading(false);
          return;
        }

        // Load MDX module with error handling
        const moduleLoader = modules[`learn/${category}/${slug}`];
        if (moduleLoader) {
          try {
            const module = await moduleLoader();
            setMDXContent(() => module.default);
          } catch (moduleError) {
            console.error('Error loading MDX module:', moduleError);
            setError('Failed to load tutorial content');
            setLoading(false);
            return;
          }
        }
        
        setTutorial({
          ...tutorialData,
          author: tutorialData.author || 'BusinessBuilder Pro'
        });
      } catch (error) {
        console.error('Error loading tutorial:', error);
        setError('Failed to load tutorial');
      }
      
      setLoading(false);
    };

    loadTutorial();
  }, [category, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !tutorial) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Tutorial Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "The tutorial you're looking for doesn't exist."}
          </p>
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": tutorial.title,
    "description": tutorial.description,
    "author": {
      "@type": "Person",
      "name": tutorial.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "BusinessBuilder Pro"
    },
    "datePublished": tutorial.date,
    "dateModified": tutorial.lastUpdated || tutorial.date,
    "url": `https://businessbuilder.pro/learn/${tutorial.category}/${tutorial.slug}`
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
        "name": "Learn",
        "item": "https://businessbuilder.pro/learn"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryNames[category as keyof typeof categoryNames],
        "item": `https://businessbuilder.pro/learn#${category}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": tutorial.title,
        "item": `https://businessbuilder.pro/learn/${tutorial.category}/${tutorial.slug}`
      }
    ]
  };

  return (
    <>
      <SEO 
        title={tutorial.title}
        description={tutorial.description}
        type="article"
        url={`/learn/${tutorial.category}/${tutorial.slug}`}
        date={tutorial.date}
        author={tutorial.author}
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
                <Badge variant="outline">
                  {categoryNames[category as keyof typeof categoryNames]}
                </Badge>
                {tutorial.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{tutorial.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{tutorial.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{tutorial.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Last updated {formatDate(tutorial.lastUpdated || tutorial.date)}</span>
                </div>
              </div>
            </div>

            {/* Tutorial Content */}
            <div className="prose prose-lg max-w-none">
              {MDXContent && (
                <SecureMDXProvider>
                  <MDXContent />
                </SecureMDXProvider>
              )}
            </div>

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
    </>
  );
};

export default LearnTutorialPage;
