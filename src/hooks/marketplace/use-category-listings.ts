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
 * Provide an infinite query that loads marketplace listings for a category with optional text search.
 *
 * The hook fetches pages of active, approved listings ordered by newest first, supports optional category filtering
 * (omit or pass `"all"` to disable category restriction) and a case-insensitive trimmed search applied to title and description.
 *
 * @param categoryId - Category identifier to filter listings; use `"all"` to include every category
 * @param search - Optional search string (trimmed and lowercased before querying)
 * @returns The TanStack Query infinite query result for pages of listings (`CategoryListingsPage`) including pagination helpers and status fields
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