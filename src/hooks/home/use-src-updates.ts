import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { SRCUpdate } from '@/types/home';

const STALE_TIME_1_HOUR = 1000 * 60 * 60;

/**
 * Provides a React Query hook that fetches recent spotlight updates from Supabase.
 *
 * Fetches up to 10 most-recent records from the `spotlights` table and maps them to `SRCUpdate` objects.
 *
 * @returns A React Query result whose `data` is an array of `SRCUpdate` objects representing the most recent spotlight records (up to 10)
 */
export function useSRCUpdates() {
  const client = useSupabase();

  return useQuery({
    queryKey: ['spotlights'],
    staleTime: STALE_TIME_1_HOUR,
    queryFn: async (): Promise<SRCUpdate[]> => {
      const { data, error } = await client
        .from('spotlights')
        .select(
          'id, title, description, type, submitter_name, submitter_avatar_url, submitter_initials, link_url, gradient_colors'
        )
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw new Error(error.message);

      return (data ?? []).map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        timestamp: row.submitter_name ?? '',
        avatarUrl: row.submitter_avatar_url ?? undefined,
        avatarFallback: row.submitter_initials,
        readMoreLink: row.link_url ?? undefined,
        linkUrl: row.link_url ?? undefined,
        gradientColors: (row.gradient_colors as [string, string]) ?? ['#3c87f7', '#6366f1'],
      }));
    },
  });
}