
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { routes, getRoutesByCategory } from "@/config/routes";

const SitemapPage = () => {
  const productRoutes = getRoutesByCategory("Product");
  const resourceRoutes = getRoutesByCategory("Resources");
  const companyRoutes = getRoutesByCategory("Company");
  const legalRoutes = getRoutesByCategory("Legal");

  // Mock blog posts for sitemap
  const blogPosts = [
    { slug: "uk-company-formation-guide", title: "Complete Guide to UK Company Formation in 2024", date: "2024-01-15" },
    { slug: "business-banking-comparison", title: "Best Business Bank Accounts for UK Startups", date: "2024-01-10" },
    { slug: "building-business-credit", title: "How to Build Business Credit Score in the UK", date: "2024-01-05" },
    { slug: "vat-registration-threshold", title: "UK VAT Registration: When and How to Register", date: "2023-12-20" }
  ];

  // Mock learn tutorials for sitemap
  const learnTutorials = [
    { category: "company-formation", slug: "choosing-company-type", title: "Choosing the Right Company Type", date: "2024-01-15" },
    { category: "company-formation", slug: "company-name-requirements", title: "Company Name Requirements and Restrictions", date: "2024-01-12" },
    { category: "banking", slug: "business-bank-account-setup", title: "Setting Up Your Business Bank Account", date: "2024-01-08" },
    { category: "credit-funding", slug: "understanding-business-credit", title: "Understanding Business Credit Scores", date: "2024-01-03" },
    { category: "legal-compliance", slug: "articles-of-association", title: "Understanding Articles of Association", date: "2023-12-25" }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Complete overview of all pages and content on BusinessBuilder Pro
            </p>
            <Button variant="outline" className="mb-8">
              <Download className="mr-2 h-4 w-4" />
              Download XML Sitemap
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Main Navigation Pages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Product</CardTitle>
                <CardDescription>Core product features and services</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {productRoutes.map((route) => (
                    <li key={route.path}>
                      <Link
                        to={route.path}
                        className="text-primary hover:underline flex items-center justify-between group"
                      >
                        <span>{route.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(route.lastUpdated || "2024-01-01")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Resources Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
                <CardDescription>Learning materials and support</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {resourceRoutes.map((route) => (
                    <li key={route.path}>
                      <Link
                        to={route.path}
                        className="text-primary hover:underline flex items-center justify-between group"
                      >
                        <span>{route.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(route.lastUpdated || "2024-01-01")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Company Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Company</CardTitle>
                <CardDescription>About us and corporate information</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {companyRoutes.map((route) => (
                    <li key={route.path}>
                      <Link
                        to={route.path}
                        className="text-primary hover:underline flex items-center justify-between group"
                      >
                        <span>{route.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(route.lastUpdated || "2024-01-01")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Legal Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Legal</CardTitle>
                <CardDescription>Terms, privacy, and legal information</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {legalRoutes.map((route) => (
                    <li key={route.path}>
                      <Link
                        to={route.path}
                        className="text-primary hover:underline flex items-center justify-between group"
                      >
                        <span>{route.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(route.lastUpdated || "2024-01-01")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Blog Posts */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Latest articles and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {blogPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-primary hover:underline flex items-center justify-between group"
                    >
                      <span>{post.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(post.date)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Learn Tutorials */}
          <Card>
            <CardHeader>
              <CardTitle>Learn Hub Tutorials</CardTitle>
              <CardDescription>Educational content and guides</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {learnTutorials.map((tutorial) => (
                  <li key={`${tutorial.category}-${tutorial.slug}`}>
                    <Link
                      to={`/learn/${tutorial.category}/${tutorial.slug}`}
                      className="text-primary hover:underline flex items-center justify-between group"
                    >
                      <span>{tutorial.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(tutorial.date)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-12 text-sm text-muted-foreground">
            <p>Last updated: {formatDate(new Date().toISOString())}</p>
            <p className="mt-2">
              For technical issues with this sitemap, please{" "}
              <Link to="/contact" className="text-primary hover:underline">
                contact our support team
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
