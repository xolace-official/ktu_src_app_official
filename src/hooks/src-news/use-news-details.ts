import { useSupabase } from '@/lib/supabase/use-supabase';
import type { NewsArticle } from '@/types/news';
import { useQuery } from '@tanstack/react-query';
import { STALE_TIME_1_HOUR } from '@/constants/query';


/**
 * Fetches a single news article by ID, including its author's name and avatar.
 *
 * @param newsId - The ID of the news article to fetch; the query is disabled when falsy.
 * @returns The React Query result for the news article; `data` contains the fetched `NewsArticle` when available, and `error` contains an `Error` if the fetch fails.
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