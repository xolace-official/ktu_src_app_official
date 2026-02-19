import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { HostelCard, HostelRow } from '@/types/hostels';
import { STALE_TIME_1_HOUR } from '@/constants/query';


export function useFeaturedHostels() {
  const client = useSupabase();
  const queryKey = ['hostels', 'featured'];

  const queryFn = async (): Promise<HostelCard[]> => {
    const { data, error } = await client
      .from('hostels')
      .select('id, hero_image_url, rating, name, address, price')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const rows = (data ?? []) as HostelRow[];

    console.log("Featured hostels ", rows);

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
