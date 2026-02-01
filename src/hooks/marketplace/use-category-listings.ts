import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { FeaturedListing } from '@/types/marketplace';

const PAGE_SIZE = 12;
const STALE_TIME = 5 * 60 * 1000; // 5 minutes

interface CategoryListingsPage {
  items: FeaturedListing[];
  totalCount: number | null;
}

/**
 * Fetches paginated listings for a category with optional search.
 * Uses infinite query for seamless pagination.
 */
export function useCategoryListings(categoryId: string, search: string = '') {
  const client = useSupabase();
  const normalizedSearch = search.trim().toLowerCase();

  return useInfiniteQuery({
    queryKey: ['category-listings', categoryId, normalizedSearch],
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }): Promise<CategoryListingsPage> => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = client
        .from('market_listings')
        .select('id, title, price, hero_image_url, rating', { count: 'exact' })
        .eq('is_active', true)
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .range(from, to);

      // Filter by category if not "all"
      if (categoryId && categoryId !== 'all') {
        query = query.eq('category_id', categoryId);
      }

      // Apply search filter
      if (normalizedSearch) {
        query = query.or(
          `title.ilike.%${normalizedSearch}%,description.ilike.%${normalizedSearch}%`
        );
      }

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      return {
        items: data ?? [],
        totalCount: count,
      };
    },

    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage || lastPage.items.length < PAGE_SIZE) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
}
