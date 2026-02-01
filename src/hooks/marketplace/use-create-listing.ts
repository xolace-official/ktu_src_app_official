import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { MarketListingInsert, MarketListing } from '@/types/marketplace';

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
