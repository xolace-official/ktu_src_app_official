import { useSupabase } from '@/lib/supabase/use-supabase';
import type { HomeEvent } from '@/types/home';
import { useQuery } from '@tanstack/react-query';

const STALE_TIME_1_HOUR = 1000 * 60 * 60;
const GC_TIME_2_HOURS = 2 * STALE_TIME_1_HOUR;

export function useUpcomingEvents(limit = 3) {
  const client = useSupabase();
  const safeLimit = Math.max(1, Math.floor(limit));

  return useQuery({
    queryKey: ['upcoming-events', safeLimit],
    staleTime: STALE_TIME_1_HOUR,
    gcTime: GC_TIME_2_HOURS,
    queryFn: async (): Promise<HomeEvent[]> => {
      const now = new Date().toISOString();

      const { data, error } = await client
        .from('events')
        .select('id, title, starts_at, location, category')
        .gte('starts_at', now)
        .order('starts_at', { ascending: true })
        .limit(safeLimit);

      if (error) throw new Error(error.message);

      return (data ?? []).map((row) => ({
        id: row.id,
        title: row.title,
        startsAt: row.starts_at,
        location: row.location,
        category: row.category,
      }));
    },
  });
}
