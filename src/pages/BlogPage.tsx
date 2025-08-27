import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Rss, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { loadContentIndex, loadBlogListFallback } from "@/lib/content";

interface BlogPost {
  type: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category?: string;
}

const POSTS_PER_PAGE = 10;
const ALL = 'all';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let posts = await loadContentIndex();
        posts = posts.filter((item: any) => item.type === 'blog');
        
        if (posts.length === 0) {
          console.log('No posts in index, trying fallback...');
          posts = await loadBlogListFallback();
        }
        
        console.log(`Loaded ${posts.length} blog posts`);
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        // Force fallback on error
        const fallbackPosts = await loadBlogListFallback();
        setBlogPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const getCategory = (post: BlogPost) => {
    const c = post.category ?? 'Uncategorised';
    return (Array.isArray(c) ? c[0] : c).toString().trim();
  };

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    blogPosts.forEach(post => {
      categories.add(getCategory(post));
    });
    const sortedCategories = Array.from(categories).sort();
    return [ALL, ...sortedCategories];
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    let posts = searchTerm ? searchResults : blogPosts;
    
    const selected = selectedCategory.toString().trim().toLowerCase();
    
    // Category filtering - "all" shows everything
    if (selected !== ALL) {
      posts = posts.filter(post => {
        return getCategory(post).toLowerCase() === selected;
      });
    }
    
    return posts.sort((a, b) => {
      // Safe date parsing
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
    });
  }, [searchTerm, searchResults, selectedCategory, blogPosts]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Reset pagination when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "BusinessBuilder Pro Blog",
    "description": "Expert insights, guides, and updates on UK business formation, compliance, and growth strategies.",
    "url": "https://businessbuilder.pro/blog",
    "publisher": {
      "@type": "Organization",
      "name": "BusinessBuilder Pro"
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-6 sm:py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Blog"
        description="Expert insights, guides, and updates on UK business formation, compliance, and growth strategies."
        url="/blog"
        jsonLd={jsonLd}
      />
      
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="py-12 sm:py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">BusinessBuilder Pro Blog</h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Expert insights, guides, and updates on UK business formation, compliance, and growth strategies.
            </p>
            
            {/* Debug info in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
                Debug: Found {blogPosts.length} posts, filtered to {filteredPosts.length}
              </div>
            )}
            
            {/* RSS Link */}
            <Link to="/blog/rss.xml" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 sm:mb-8">
              <Rss className="h-4 w-4" />
              Subscribe to RSS Feed
            </Link>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-4">
              <BlogSearch 
                posts={blogPosts}
                onResults={setSearchResults}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-md border border-input bg-background text-foreground min-h-[44px] capitalize"
              >
                {allCategories.map(category => (
                  <option key={category} value={category} className="capitalize">
                    {category === ALL ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            {(searchTerm || selectedCategory !== ALL) && (
              <p className="text-sm text-muted-foreground">
                Showing {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''}
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== ALL && ` in "${selectedCategory}"`}
              </p>
            )}
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12 sm:py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            {paginatedPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  {blogPosts.length === 0 
                    ? "No blog posts available yet. Check back soon!"
                    : "No articles found matching your criteria."
                  }
                </p>
                {process.env.NODE_ENV === 'development' && (
                  <Link to="/content-check" className="text-primary hover:underline">
                    → Check Content Diagnostics
                  </Link>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {paginatedPosts.map((post) => (
                    <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.date)}</span>
                          <span>•</span>
                          <User className="h-4 w-4" />
                          <Link to={`/blog/author/businessbuilder-pro`} className="hover:text-primary">
                            {post.author}
                          </Link>
                        </div>
                        {post.category && (
                          <div className="mb-2">
                            <Badge variant="secondary" className="text-xs capitalize">
                              {getCategory(post)}
                            </Badge>
                          </div>
                        )}
                        <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags?.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                            >
                              <Link to={`/blog/tag/${encodeURIComponent(tag)}`}>
                                {tag}
                              </Link>
                            </Badge>
                          ))}
                        </div>
                        <Link to={`/blog/${post.slug}`}>
                          <Button variant="outline" size="sm" className="w-full min-h-[44px] sm:min-h-auto">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="min-h-[44px]"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let page;
                        if (totalPages <= 5) {
                          page = i + 1;
                        } else if (currentPage <= 3) {
                          page = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i;
                        } else {
                          page = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-10 min-h-[44px]"
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="min-h-[44px]"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <section className="py-12 sm:py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Get the latest insights on UK business formation and growth strategies delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 rounded-md border border-input bg-background text-foreground flex-1 min-h-[44px] text-base"
              />
              <Button className="w-full sm:w-auto min-h-[44px]">Subscribe</Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;
