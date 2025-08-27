
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface BlogPost {
  type: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
}

interface BlogSearchProps {
  posts: BlogPost[];
  onResults: (filteredPosts: BlogPost[]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const BlogSearch = ({ posts, onResults, searchTerm, onSearchChange }: BlogSearchProps) => {
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;
    
    const term = searchTerm.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(term) ||
      post.description.toLowerCase().includes(term) ||
      post.tags?.some(tag => tag.toLowerCase().includes(term))
    );
  }, [posts, searchTerm]);

  // Update parent with filtered results
  useMemo(() => {
    onResults(filteredPosts);
  }, [filteredPosts, onResults]);

  return (
    <div className="relative max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
