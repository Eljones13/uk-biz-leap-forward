
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search, BookOpen, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
// @ts-ignore
import contentIndex from "@/content-index.json";

interface LearnContent {
  type: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
}

const categories = [
  { id: "company-formation", name: "Company Formation" },
  { id: "banking", name: "Banking" },
  { id: "credit-funding", name: "Credit & Funding" },
  { id: "legal-compliance", name: "Legal Documents & Compliance" },
  { id: "general-support", name: "General & Support" }
];

const LearnPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("company-formation");

  const learnContent = contentIndex.filter((item: any) => item.type === 'learn') as LearnContent[];

  const filteredContent = useMemo(() => {
    return learnContent.filter(item => {
      const matchesSearch = searchTerm === "" || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === "" || item.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchTerm, activeCategory, learnContent]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <SEO 
        title="Learn Hub"
        description="Comprehensive guides and tutorials to help you navigate UK business formation, compliance, and growth."
        url="/learn"
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
                  <BreadcrumbPage>Learn</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Header Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Learn Hub</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comprehensive guides and tutorials to help you navigate UK business formation, compliance, and growth.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs sm:text-sm">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                    <p className="text-muted-foreground">
                      {filteredContent.length} tutorial{filteredContent.length !== 1 ? 's' : ''} available
                    </p>
                  </div>

                  {filteredContent.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg">No tutorials found matching your search.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredContent.map((item) => (
                        <Card key={item.slug} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline">{category.name}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(item.date)}
                              </span>
                            </div>
                            <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                              <Link to={`/learn/${item.category}/${item.slug}`}>
                                {item.title}
                              </Link>
                            </CardTitle>
                            <CardDescription className="line-clamp-3">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {item.tags?.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                By {item.author}
                              </span>
                              <Link to={`/learn/${item.category}/${item.slug}`}>
                                <ArrowRight className="h-4 w-4 text-primary hover:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </div>
    </>
  );
};

export default LearnPage;
