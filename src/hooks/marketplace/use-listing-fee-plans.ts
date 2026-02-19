import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { ListingFeePlan } from '@/types/marketplace';

const STALE_TIME_10_MIN = 10 * 60 * 1000;

/**
 * Fetches the active listing fee plan from Supabase.
 *
 * Returns the first active fee plan (there should only be one at a time).
 * Used to display listing fees in the submission form before the student submits.
 *
 * @returns The active `ListingFeePlan` or `null` if none is found.
 */
export function useListingFeePlans() {
  const client = useSupabase();

  return useQuery<ListingFeePlan | null>({
    queryKey: ['listing-fee-plans'],
    queryFn: async () => {
      const { data, error } = await client
        .from('listing_fee_plans')
        .select('id, name, currency, normal_fee, featured_fee, active, created_at')
        .eq('active', true)
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as ListingFeePlan | null;
    },
    staleTime: STALE_TIME_10_MIN,
    gcTime: STALE_TIME_10_MIN,
  });
}
