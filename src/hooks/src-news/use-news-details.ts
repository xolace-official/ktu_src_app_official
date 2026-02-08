import { useSupabase } from '@/lib/supabase/use-supabase';
import type { NewsArticle } from '@/types/news';
import { useQuery } from '@tanstack/react-query';

const STALE_TIME_1_HOUR = 1000 * 60 * 60;

/**
 * Hook to fetch a single news article with author relation
 */
export function useNewsDetails(newsId: string) {
  const client = useSupabase();

  return useQuery({
    queryKey: ['news-article', newsId],
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
    enabled: !!newsId,

    queryFn: async () => {
      const { data, error } = await client
        .from('news')
        .select(
          `
          *,
          author:profiles(full_name, avatar_url)
        `
        )
        .eq('id', newsId)
        .single();

      if (error) throw new Error(error.message);

      return data as NewsArticle;
    },
  });
}
