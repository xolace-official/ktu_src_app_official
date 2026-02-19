import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { Representative } from '@/types/home';

const STALE_TIME_1_HOUR = 1000 * 60 * 60;

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
