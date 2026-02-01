import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { MarketCategory } from '@/types/marketplace';

const STALE_TIME = 10 * 60 * 1000; /**
 * Fetches marketplace categories from Supabase and exposes them via React Query.
 *
 * @returns The React Query result whose `data` is an array of market categories ordered by name; `data` is an empty array when no categories are found.
 */

export function useMarketCategories() {
  const client = useSupabase();

  return useQuery({
    queryKey: ['market-categories'],
    queryFn: async (): Promise<MarketCategory[]> => {
      const { data, error } = await client
        .from('market_categories')
        .select('id, name, color, icon, created_at')
        .order('name', { ascending: true });

      if (error) {
        throw error;
      }

      return data ?? [];
    },
    staleTime: STALE_TIME,
  });
}