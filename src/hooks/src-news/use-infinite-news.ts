import { useSupabase } from '@/lib/supabase/use-supabase';
import type { NewsCardItem } from '@/types/news';
import { useInfiniteQuery } from '@tanstack/react-query';
import { STALE_TIME_1_HOUR } from '@/constants/query';

const PAGE_SIZE = 10;

/**
 * Provides an infinite React Query for paginated news items.
 *
 * Each page contains an array of `NewsCardItem` objects and the total `count` of matching rows.
 * Results exclude drafts and are ordered by `published_at` descending; when `category` is provided,
 * results are restricted to that category.
 *
 * @param category - Optional category slug to filter news items
 * @returns An infinite query result that yields pages of `{ items: NewsCardItem[]; count: number }`
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