import { useSupabase } from '@/lib/supabase/use-supabase';
import type { AnnouncementCardItem } from '@/types/info-center';
import { useInfiniteQuery } from '@tanstack/react-query';

const PAGE_SIZE = 10;
const STALE_TIME_1_HOUR = 1000 * 60 * 60;

/**
 * Infinite query hook for fetching announcements with pagination.
 * Orders by pinned DESC, created_at DESC so pinned items appear first.
 */
export function useInfiniteAnnouncements() {
  const client = useSupabase();

  return useInfiniteQuery({
    queryKey: ['announcements'],
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const currentPage = pageParam as number;
      const from = currentPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error, count } = await client
        .from('announcements')
        .select('id, title, summary, category, pinned, is_important, created_at', {
          count: 'exact',
        })
        .eq('is_public', true)
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw new Error(error.message);

      const items: AnnouncementCardItem[] = (data ?? []).map((row) => ({
        id: row.id,
        title: row.title,
        summary: row.summary,
        category: row.category,
        pinned: row.pinned,
        is_important: row.is_important,
        created_at: row.created_at,
      }));

      return { items, count };
    },

    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (!lastPage || lastPage.items.length < PAGE_SIZE) return undefined;
      return (lastPageParam as number) + 1;
    },
  });
}
