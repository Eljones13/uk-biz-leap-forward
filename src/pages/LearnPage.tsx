
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search, BookOpen, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
import { loadLearnTutorials } from "@/lib/mdxContent";

const categories = [
  { id: "all", name: "All" },
  { id: "company-formation", name: "Company Formation" },
  { id: "banking", name: "Banking" },
  { id: "credit-funding", name: "Credit & Funding" },
  { id: "legal-compliance", name: "Legal Documents & Compliance" },
  { id: "general-support", name: "General & Support" }
];

const LearnPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("");

  // Load tutorials directly from raw MDX
  const learnContent = loadLearnTutorials();

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    learnContent.forEach(item => item.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [learnContent]);

  const filteredContent = useMemo(() => {
    return learnContent.filter(item => {
      const matchesSearch = searchTerm === "" || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesTag = selectedTag === "" || item.tags?.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    }).sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
    });
  }, [searchTerm, activeCategory, selectedTag, learnContent]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';
    return date.toLocaleDateString('en-GB', {
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
        <section className="py-12 sm:py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Learn Hub</h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Comprehensive guides and tutorials to help you navigate UK business formation, compliance, and growth.
            </p>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search tutorials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 min-h-[44px] text-base"
                />
              </div>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-4 py-2 rounded-md border border-input bg-background text-foreground min-h-[44px]"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            
            {(searchTerm || selectedTag) && (
              <p className="text-sm text-muted-foreground">
                Showing {filteredContent.length} result{filteredContent.length !== 1 ? 's' : ''}
                {searchTerm && ` for "${searchTerm}"`}
                {selectedTag && ` tagged "${selectedTag}"`}
              </p>
            )}
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-6 sm:py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6 sm:mb-8">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs sm:text-sm">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => {
                const categoryContent = category.id === "all" 
                  ? filteredContent 
                  : filteredContent.filter(item => item.category === category.id);
                
                return (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="mb-6">
                      <h2 className="text-xl sm:text-2xl font-bold mb-2">{category.name}</h2>
                      <p className="text-muted-foreground">
                        {categoryContent.length} tutorial{categoryContent.length !== 1 ? 's' : ''} available
                      </p>
                    </div>

                    {categoryContent.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">
                          {learnContent.length === 0 
                            ? "No tutorials available yet. Check back soon!"
                            : "No tutorials found matching your criteria."
                          }
                        </p>
                        {process.env.NODE_ENV === 'development' && (
                          <Link to="/content-check" className="text-primary hover:underline mt-4 inline-block">
                            → Check Content Diagnostics
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryContent.map((item) => {
                          // Extract the slug part after category for URL
                          const slugPart = item.slug.includes('/') ? item.slug.split('/').slice(1).join('/') : item.slug;
                          
                          return (
                            <Card key={`${item.category}-${item.slug}`} className="hover:shadow-lg transition-shadow">
                              <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                  <Badge variant="outline" className="capitalize">{item.category.replace('-', ' ')}</Badge>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span className="hidden sm:inline">Updated </span>
                                    <span>{formatDate(item.date)}</span>
                                  </div>
                                </div>
                                <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                                  <Link to={`/learn/${item.category}/${slugPart}`}>
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
                                    <Badge 
                                      key={tag} 
                                      variant="secondary" 
                                      className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                                      onClick={() => setSelectedTag(tag)}
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">
                                    By BusinessBuilder Pro
                                  </span>
                                  <Link to={`/learn/${item.category}/${slugPart}`}>
                                    <ArrowRight className="h-4 w-4 text-primary hover:translate-x-1 transition-transform" />
                                  </Link>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>
      </div>
    </>
  );
};

export default LearnPage;
