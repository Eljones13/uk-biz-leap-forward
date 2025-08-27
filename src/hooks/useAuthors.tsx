
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Author {
  id: string;
  slug: string;
  name: string;
  role?: string;
  bio?: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export const useAuthors = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Author[];
    },
  });
};

export const useAuthor = (slug: string) => {
  return useQuery({
    queryKey: ['author', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as Author;
    },
    enabled: !!slug,
  });
};
