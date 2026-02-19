import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { HostelCard, HostelRow } from '@/types/hostels';
import { STALE_TIME_1_HOUR } from '@/constants/query';


export function useRecommendedHostels(limit = 15) {
  const client = useSupabase();
  const queryKey = ['hostels', 'recommended', limit];

  const queryFn = async (): Promise<HostelCard[]> => {
    const { data, error } = await client
      .from('hostels')
      .select('id, hero_image_url, rating, name, address, price')
      .eq('is_featured', false)
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) throw error;

    const rows = (data ?? []) as HostelRow[];

    return rows.map((row) => ({
      id: row.id,
      image: row.hero_image_url,
      rating: row.rating,
      name: row.name,
      address: row.address,
      price: Number(row.price),
    }));
  };

  return useQuery({
    queryKey,
    queryFn,
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
  });
}
