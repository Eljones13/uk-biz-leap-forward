
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search, BookOpen, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock learn content data - in a real app, this would come from MDX files
const learnContent = [
  {
    slug: "choosing-company-type",
    title: "Choosing the Right Company Type",
    description: "Understanding the differences between Limited Companies, LLPs, and Community Interest Companies.",
    category: "company-formation",
    categoryName: "Company Formation",
    date: "2024-01-15",
    author: "Legal Team",
    tags: ["Company Types", "Legal Structure"],
    duration: "5 min read",
    excerpt: "Learn about the different types of companies you can form in the UK and which one is right for your business."
  },
  {
    slug: "company-name-requirements",
    title: "Company Name Requirements and Restrictions",
    description: "What you need to know about choosing a compliant company name in the UK.",
    category: "company-formation",
    categoryName: "Company Formation",
    date: "2024-01-12",
    author: "Legal Team",
    tags: ["Company Name", "Compliance"],
    duration: "3 min read",
    excerpt: "Understand the rules and restrictions for company names to ensure your chosen name is acceptable to Companies House."
  },
  {
    slug: "directors-responsibilities",
    title: "Understanding Directors' Responsibilities",
    description: "Key duties and legal responsibilities of company directors in the UK.",
    category: "company-formation",
    categoryName: "Company Formation",
    date: "2024-01-10",
    author: "Legal Team",
    tags: ["Directors", "Legal Responsibilities"],
    duration: "7 min read",
    excerpt: "Learn about the fiduciary duties, statutory responsibilities, and potential liabilities of UK company directors."
  },
  {
    slug: "business-bank-account-setup",
    title: "Setting Up Your Business Bank Account",
    description: "Step-by-step guide to opening a business bank account for your UK company.",
    category: "banking",
    categoryName: "Banking",
    date: "2024-01-08",
    author: "Banking Team",
    tags: ["Banking", "Setup", "Documentation"],
    duration: "6 min read",
    excerpt: "Everything you need to know about opening a business bank account, including required documents and application process."
  },
  {
    slug: "comparing-business-accounts",
    title: "Comparing Business Bank Accounts",
    description: "How to evaluate and choose the best business banking option for your needs.",
    category: "banking",
    categoryName: "Banking",
    date: "2024-01-05",
    author: "Banking Team",
    tags: ["Banking", "Comparison", "Features"],
    duration: "8 min read",
    excerpt: "Compare features, fees, and benefits of different business bank accounts to make the right choice for your company."
  },
  {
    slug: "understanding-business-credit",
    title: "Understanding Business Credit Scores",
    description: "How business credit works in the UK and why it matters for your company.",
    category: "credit-funding",
    categoryName: "Credit & Funding",
    date: "2024-01-03",
    author: "Credit Team",
    tags: ["Credit Score", "Business Finance"],
    duration: "5 min read",
    excerpt: "Learn how business credit scoring works in the UK and how it affects your ability to secure financing."
  },
  {
    slug: "building-credit-history",
    title: "Building Your Business Credit History",
    description: "Practical steps to establish and improve your business credit profile.",
    category: "credit-funding",
    categoryName: "Credit & Funding",
    date: "2023-12-28",
    author: "Credit Team",
    tags: ["Credit Building", "Business Growth"],
    duration: "6 min read",
    excerpt: "Discover proven strategies to build a strong business credit history that opens doors to better financing options."
  },
  {
    slug: "articles-of-association",
    title: "Understanding Articles of Association",
    description: "What are Articles of Association and how they govern your company.",
    category: "legal-compliance",
    categoryName: "Legal Documents & Compliance",
    date: "2023-12-25",
    author: "Legal Team",
    tags: ["Legal Documents", "Governance"],
    duration: "4 min read",
    excerpt: "Learn about Articles of Association, their purpose, and how they define your company's internal governance."
  },
  {
    slug: "annual-filing-requirements",
    title: "Annual Filing Requirements",
    description: "Understanding your ongoing compliance obligations with Companies House and HMRC.",
    category: "legal-compliance",
    categoryName: "Legal Documents & Compliance",
    date: "2023-12-20",
    author: "Compliance Team",
    tags: ["Compliance", "Annual Returns", "Filing"],
    duration: "7 min read",
    excerpt: "Stay compliant with your annual filing obligations including confirmation statements and annual accounts."
  },
  {
    slug: "getting-started-guide",
    title: "Getting Started with BusinessBuilder Pro",
    description: "A comprehensive guide to using our platform for your business formation journey.",
    category: "general-support",
    categoryName: "General & Support",
    date: "2023-12-15",
    author: "Support Team",
    tags: ["Getting Started", "Platform Guide"],
    duration: "10 min read",
    excerpt: "Learn how to navigate and make the most of BusinessBuilder Pro's features and tools."
  }
];

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

  const filteredContent = useMemo(() => {
    return learnContent.filter(item => {
      const matchesSearch = searchTerm === "" || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === "" || item.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

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
                            <Badge variant="outline">{item.categoryName}</Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{item.duration}</span>
                            </div>
                          </div>
                          <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                            <Link to={`/learn/${item.category}/${item.slug}`}>
                              {item.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {item.excerpt}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {formatDate(item.date)}
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
  );
};

export default LearnPage;
