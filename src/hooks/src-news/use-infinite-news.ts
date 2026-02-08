import { useSupabase } from '@/lib/supabase/use-supabase';
import type { NewsCardItem } from '@/types/news';
import { useInfiniteQuery } from '@tanstack/react-query';

const PAGE_SIZE = 10;
const STALE_TIME_1_HOUR = 1000 * 60 * 60;

/**
 * Infinite query hook for fetching news articles with pagination.
 * Filters out drafts and orders by published_at DESC.
 * Optionally filters by category.
 */
export function useInfiniteNews(category?: string) {
  const client = useSupabase();

  return useInfiniteQuery({
    queryKey: ['news', category],
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const currentPage = pageParam as number;
      const from = currentPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = client
        .from('news')
        .select(
          'id, title, excerpt, category, publisher, publisher_image, published_at, cover_image',
          { count: 'exact' }
        )
        .eq('is_draft', false)
        .order('published_at', { ascending: false })
        .range(from, to);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error, count } = await query;

      if (error) throw new Error(error.message);

      const items: NewsCardItem[] = (data ?? []).map((row) => ({
        id: row.id,
        title: row.title,
        excerpt: row.excerpt,
        category: row.category,
        publisher: row.publisher,
        publisher_image: row.publisher_image,
        published_at: row.published_at,
        cover_image: row.cover_image,
      }));

      return { items, count };
    },

    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (!lastPage || lastPage.items.length < PAGE_SIZE) return undefined;
      return (lastPageParam as number) + 1;
    },
  });
}
