import { useSupabase } from '@/lib/supabase/use-supabase';
import type { EventCard, TabKeys } from '@/types/events';
import { useInfiniteQuery } from '@tanstack/react-query';

const PAGE_SIZE = 10;
const STALE_TIME_1_HOUR = 1000 * 60 * 60;

/**
 * Infinite query hook for fetching events with pagination and tab filtering
 * @param filter - The tab filter (featured, popular, upcoming)
 */
export function useInfiniteEvents(filter: TabKeys) {
  const client = useSupabase();

  return useInfiniteQuery({
    queryKey: ['events', filter],
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const currentPage = pageParam as number;
      const from = currentPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const now = new Date().toISOString();

      let query = client
        .from('events')
        .select('id, title, starts_at, cover_image, location, category, going_count', {
          count: 'exact',
        })
        .range(from, to);

      switch (filter) {
        case 'featured':
          query = query
            .eq('is_featured', true)
            .gte('starts_at', now)
            .order('starts_at', { ascending: true });
          break;

        case 'popular': {
          // Popular events: most attendees_count in the next 7 days
          const nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);
          query = query
            .gte('starts_at', now)
            .lte('starts_at', nextWeek.toISOString())
            .order('going_count', { ascending: false });
          break;
        }

        case 'upcoming':
          query = query.gte('starts_at', now).order('starts_at', { ascending: true });
          break;
      }

      const { data, error, count } = await query;

      if (error) {
        throw new Error(error.message);
      }

      const items: EventCard[] = (data ?? []).map((row) => ({
        id: row.id,
        title: row.title,
        starts_at: row.starts_at,
        location: row.location,
        hero_image_url: row.cover_image,
        category: row.category,
        attendees_count: row.going_count ?? 0,
      }));

      return { items, count };
    },

    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (!lastPage || lastPage.items.length < PAGE_SIZE) return undefined;
      return (lastPageParam as number) + 1;
    },
  });
}
