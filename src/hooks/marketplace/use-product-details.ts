import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { MarketListingDetails } from '@/types/marketplace';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

/**
 * Load product details for a given product ID.
 *
 * @param productId - The ID of the product to fetch; if falsy the query is disabled.
 * @returns Query result whose `data` is a `MarketListingDetails` object (with `photos` and `variants` as arrays, and `category`/`seller` possibly `null`) or `null` when the product is not found. 
 */
export function useProductDetails(productId: string) {
  const client = useSupabase();

  return useQuery({
    queryKey: ['product-details', productId],
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
    enabled: !!productId,

    queryFn: async (): Promise<MarketListingDetails | null> => {
      // Fetch listing with category and seller info
      const { data: listing, error: listingError } = await client
        .from('market_listings')
        .select(
          `
          *,
          category:market_categories(*),
          seller:profiles!seller_id(id, full_name, avatar_url, phone)
        `
        )
        .eq('id', productId)
        .single();

      if (listingError) {
        if (listingError.code === 'PGRST116') {
          // Not found
          return null;
        }
        throw listingError;
      }

      // Fetch photos
      const { data: photos, error: photosError } = await client
        .from('market_photos')
        .select('*')
        .eq('listing_id', productId)
        .order('position', { ascending: true });

      if (photosError) {
        throw photosError;
      }

      // Fetch variants
      const { data: variants, error: variantsError } = await client
        .from('market_listing_variants')
        .select('*')
        .eq('listing_id', productId)
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (variantsError) {
        throw variantsError;
      }

      return {
        ...listing,
        category: listing.category ?? null,
        seller: listing.seller ?? null,
        photos: photos ?? [],
        variants: variants ?? [],
      } as MarketListingDetails;
    },
  });
}