import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { FeaturedListing } from '@/types/marketplace';

const STALE_TIME = 2 * 60 * 1000; /**
 * Fetches a list of featured marketplace listings limited by the provided count.
 *
 * @param limit - Maximum number of listings to retrieve (defaults to 10)
 * @returns A React Query result whose `data` is an array of `FeaturedListing`; `data` will be an empty array if no listings are found
 */

export function useFeaturedListings(limit = 10) {
  const client = useSupabase();

  return useQuery({
    queryKey: ['featured-listings', limit],
    queryFn: async (): Promise<FeaturedListing[]> => {
      const { data, error } = await client
        .from('market_listings')
        .select('id, title, price, hero_image_url, rating')
        .eq('is_featured', true)
        .eq('is_active', true)
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      console.log("Featured Listings: ", data);
      return data ?? [];
    },
    staleTime: STALE_TIME,
  });
}