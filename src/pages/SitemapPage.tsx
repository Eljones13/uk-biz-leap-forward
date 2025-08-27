
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { Link } from "react-router-dom";

const SitemapPage = () => {
  const routesByCategory = routes.reduce((acc, route) => {
    if (!route.category) return acc;
    if (!acc[route.category]) acc[route.category] = [];
    acc[route.category].push(route);
    return acc;
  }, {} as Record<string, typeof routes>);

  const publicRoutes = routes.filter(route => route.showInNav || route.showInFooter);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Navigate through all pages and resources on BusinessBuilder Pro
          </p>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download XML Sitemap
          </Button>
        </div>

        {/* All Routes by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {Object.entries(routesByCategory).map(([category, categoryRoutes]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {categoryRoutes.map((route) => (
                    <li key={route.path} className="flex items-center justify-between">
                      <Link
                        to={route.path}
                        className="text-primary hover:underline font-medium"
                      >
                        {route.name}
                      </Link>
                      {route.lastUpdated && (
                        <span className="text-sm text-muted-foreground">
                          {route.lastUpdated}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Utility Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Utility Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {routes
                .filter(route => !route.category && !route.showInNav)
                .map((route) => (
                  <li key={route.path} className="flex items-center justify-between">
                    <Link
                      to={route.path}
                      className="text-primary hover:underline font-medium"
                    >
                      {route.name}
                    </Link>
                    {route.lastUpdated && (
                      <span className="text-sm text-muted-foreground">
                        {route.lastUpdated}
                      </span>
                    )}
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        {/* SEO Note */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            This sitemap contains {publicRoutes.length} public pages. 
            For search engines, please use our{" "}
            <a href="/sitemap.xml" className="text-primary hover:underline">
              XML sitemap
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
