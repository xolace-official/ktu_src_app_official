import { useSupabase } from '@/lib/supabase/use-supabase';
import type { NewsArticle } from '@/types/home';
import { useQuery } from '@tanstack/react-query';

const STALE_TIME_1_HOUR = 1000 * 60 * 60;
const GC_TIME_2_HOURS = 2 * STALE_TIME_1_HOUR;

export function useCampusNews(limit = 3) {
  const client = useSupabase();
  const safeLimit = Math.max(1, Math.floor(limit));

  return useQuery({
    queryKey: ['campus-news', safeLimit],
    staleTime: STALE_TIME_1_HOUR,
    gcTime: GC_TIME_2_HOURS,
    queryFn: async (): Promise<NewsArticle[]> => {
      const { data, error } = await client
        .from('news')
        .select('id, title, excerpt, published_at')
        .eq('is_draft', false)
        .order('published_at', { ascending: false })
        .limit(safeLimit);

      if (error) throw new Error(error.message);

      return (data ?? []).map((row) => ({
        id: row.id,
        title: row.title,
        description: row.excerpt ?? '',
        createdAt: row.published_at,
      }));
    },
  });
}
