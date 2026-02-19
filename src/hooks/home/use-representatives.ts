import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { Representative } from '@/types/home';
import { STALE_TIME_1_HOUR } from '@/constants/query';


/**
 * Fetches and returns the list of representatives from the database as a React Query result.
 *
 * The returned query fetches rows from the `temp_representatives` table and maps each row to a
 * `Representative` object with properties `id`, `name`, `position`, `description` (from `bio`),
 * and `imageUrl` (empty string if `image_url` is null).
 *
 * @returns A React Query result whose `data` is an array of `Representative` objects. `data` will be an empty array when no rows are returned.
 */
export function useRepresentatives() {
  const client = useSupabase();

  return useQuery({
    queryKey: ['representatives'],
    staleTime: STALE_TIME_1_HOUR,
    queryFn: async (): Promise<Representative[]> => {
      const { data, error } = await client
        .from('temp_representatives')
        .select('id, name, position, bio, image_url')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) throw new Error(error.message);

      return (data ?? []).map((row) => ({
        id: row.id,
        name: row.name,
        position: row.position,
        description: row.bio,
        imageUrl: row.image_url ?? '',
      }));
    },
  });
}