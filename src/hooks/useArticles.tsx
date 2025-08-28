
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Article {
  id: string;
  type: 'blog' | 'learn';
  slug: string;
  title: string;
  excerpt?: string;
  content_md?: string;
  content_html?: string;
  tags: string[];
  category?: string;
  author_id?: string;
  cover_url?: string;
  status: 'draft' | 'published';
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export const useArticles = (type?: 'blog' | 'learn', status?: 'draft' | 'published') => {
  return useQuery({
    queryKey: ['articles', type, status],
    queryFn: async () => {
      let query = supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('type', type);
      }

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Article[];
    }
  });
};

export const useArticle = (slug: string) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data as Article | null;
    }
  });
};

export const useCreateArticle = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (article: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'author_id'>) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('articles')
        .insert({
          ...article,
          author_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data as Article;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Article> & { id: string }) => {
      const { data, error } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Article;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  });
};

export const useLogArticleView = () => {
  return useMutation({
    mutationFn: async (articleId: string) => {
      const { error } = await supabase
        .from('article_views')
        .insert({
          article_id: articleId,
          ip_address: null,
          user_agent: navigator.userAgent
        });

      if (error) throw error;
    }
  });
};
