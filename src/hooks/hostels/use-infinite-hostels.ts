import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { HostelCard, HostelRow } from '@/types/hostels';
import { STALE_TIME_1_HOUR } from '@/constants/query';

const PAGE_SIZE = 15;

/**
 * Infinite query hook for fetching hostels with pagination and search
 * @param search - Optional search term to filter by name or address
 */
export function useInfiniteHostels(search: string = '') {
  const client = useSupabase();
  const normalizedSearch = search.trim();

  return useInfiniteQuery({
    queryKey: ['hostels', 'all', normalizedSearch],
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const currentPage = pageParam as number;
      const from = currentPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = client
        .from('hostels')
        .select('id, hero_image_url, rating, name, address, price', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (normalizedSearch) {
        query = query.or(
          `name.ilike.%${normalizedSearch}%,address.ilike.%${normalizedSearch}%`
        );
      }

      const { data, error, count } = await query;
      if (error) throw error;

      const rows = (data ?? []) as HostelRow[];

      const items: HostelCard[] = rows.map((row) => ({
        id: row.id,
        image: row.hero_image_url,
        rating: row.rating,
        name: row.name,
        address: row.address,
        price: Number(row.price),
      }));

      return { items, count };
    },

    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (!lastPage || lastPage.items.length < PAGE_SIZE) return undefined;
      return (lastPageParam as number) + 1;
    },
  });
}
