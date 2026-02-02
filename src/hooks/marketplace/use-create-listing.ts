import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { MarketListingInsert, MarketListing } from '@/types/marketplace';

/**
 * Create a React Query mutation for inserting a marketplace listing associated with the current user.
 *
 * The mutation sets `seller_id` to the authenticated user's id, marks the listing active, requires admin approval,
 * and applies default flags (`is_featured = false`, `placement_type = 'normal'`). On success it invalidates the
 * `featured-listings` and `market-listings` queries to trigger refetch.
 *
 * @returns A mutation object that accepts a `MarketListingInsert` payload and resolves to the inserted `MarketListing`.
 *          The mutation will throw if there is no authenticated user or if the insert operation fails.
 */
export function useCreateListing() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (listing: MarketListingInsert): Promise<MarketListing> => {
      // Get current user for seller_id
      const { data: userData, error: userError } = await client.auth.getUser();
      if (userError) throw userError;
      if (!userData.user) throw new Error('User not authenticated');

      const { data, error } = await client
        .from('market_listings')
        .insert({
          ...listing,
          seller_id: userData.user.id,
          is_active: true,
          is_approved: false, // Requires admin approval
          is_featured: false,
          placement_type: 'normal',
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate listings queries to refetch
      queryClient.invalidateQueries({ queryKey: ['featured-listings'] });
      queryClient.invalidateQueries({ queryKey: ['market-listings'] });
    },
  });
}