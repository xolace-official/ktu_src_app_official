import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { Event } from '@/types/events';

const STALE_TIME_1_HOUR = 1000 * 60 * 60;

/**
 * Hook to fetch the next featured event for the header display
 */
export function useFeaturedEvent() {
  const client = useSupabase();

  return useQuery({
    queryKey: ['events', 'featured-hero'],
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,

    queryFn: async () => {
      const now = new Date().toISOString();

      const { data, error } = await client
        .from('events')
        .select(
          'id, title, description, starts_at, ends_at, location, hero_image_url, organizer_name, organizer_avatar, is_featured, attendees_count, category'
        )
        .eq('is_featured', true)
        .gte('starts_at', now)
        .order('starts_at', { ascending: true })
        .limit(1)
        .single();

      if (error) {
        // If no featured event found, return null instead of throwing
        if (error.code === 'PGRST116') {
          return null;
        }
        throw new Error(error.message);
      }

      return data as Event;
    },
  });
}
