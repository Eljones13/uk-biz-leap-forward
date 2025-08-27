
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, User, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock blog posts data - in a real app, this would come from MDX files
const blogPosts = [
  {
    slug: "uk-company-formation-guide",
    title: "Complete Guide to UK Company Formation in 2024",
    description: "Everything you need to know about forming a limited company in the UK, from choosing a company name to filing with Companies House.",
    date: "2024-01-15",
    author: "Sarah Mitchell",
    tags: ["Company Formation", "Legal", "Guide"],
    excerpt: "Starting a business in the UK? Our comprehensive guide covers all the essential steps for company formation, including legal requirements, documentation, and best practices."
  },
  {
    slug: "business-banking-comparison",
    title: "Best Business Bank Accounts for UK Startups",
    description: "Compare the top business banking options for new UK companies, including fees, features, and application requirements.",
    date: "2024-01-10",
    author: "James Wilson",
    tags: ["Banking", "Comparison", "Startups"],
    excerpt: "Choosing the right business bank account is crucial for your startup's success. We've compared the leading UK business banks to help you make an informed decision."
  },
  {
    slug: "building-business-credit",
    title: "How to Build Business Credit Score in the UK",
    description: "Learn the essential strategies for building and maintaining a strong business credit profile in the UK market.",
    date: "2024-01-05",
    author: "Emma Thompson",
    tags: ["Credit", "Finance", "Business Growth"],
    excerpt: "A strong business credit score opens doors to better financing options. Discover proven strategies to build and maintain excellent business credit in the UK."
  },
  {
    slug: "vat-registration-threshold",
    title: "UK VAT Registration: When and How to Register",
    description: "Understanding VAT registration thresholds, requirements, and the registration process for UK businesses.",
    date: "2023-12-20",
    author: "David Chen",
    tags: ["VAT", "Compliance", "Tax"],
    excerpt: "Navigate the complexities of VAT registration with our detailed guide covering thresholds, timing, and step-by-step registration process."
  }
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchTerm === "" || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">BusinessBuilder Pro Blog</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Expert insights, guides, and updates on UK business formation, compliance, and growth strategies.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2 rounded-md border border-input bg-background text-foreground"
            >
              <option value="">All Categories</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
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
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => setSelectedTag(tag)}
                        >
                          {tag}
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

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest insights on UK business formation and growth strategies delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" type="email" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
