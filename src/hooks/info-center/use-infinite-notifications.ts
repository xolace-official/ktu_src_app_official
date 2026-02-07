import { useSupabase } from '@/lib/supabase/use-supabase';
import { useAppStore } from '@/store/store';
import type { NotificationItem } from '@/types/info-center';
import { useInfiniteQuery } from '@tanstack/react-query';

const PAGE_SIZE = 10;
const STALE_TIME_5_MIN = 1000 * 60 * 5;

/**
 * Infinite query hook for fetching notifications for the current user.
 * Includes actor relation for avatar/name display.
 */
export function useInfiniteNotifications() {
  const client = useSupabase();
  //const userId = useAppStore((s) => s.userId);
  const userId = "b25d86b8-29a1-4f18-9c69-b3d9c047265e";
  return useInfiniteQuery({
    queryKey: ['notifications', userId],
    staleTime: STALE_TIME_5_MIN,
    gcTime: STALE_TIME_5_MIN,
    enabled: !!userId,
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const currentPage = pageParam as number;
      const from = currentPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error, count } = await client
        .from('notifications')
        .select(
          `
          id, title, body, type, read, link_id, link_type, data, created_at,
          actor:profiles!notifications_actor_id_fkey(full_name, avatar_url)
        `,
          { count: 'exact' }
        )
        .eq('recipient_id', userId!)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw new Error(error.message);

      const items: NotificationItem[] = (data ?? []).map((row) => ({
        id: row.id,
        title: row.title,
        body: row.body,
        type: row.type,
        read: row.read,
        link_id: row.link_id,
        link_type: row.link_type,
        data: row.data,
        created_at: row.created_at,
        actor: row.actor as NotificationItem['actor'],
      }));

      return { items, count };
    },

    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (!lastPage || lastPage.items.length < PAGE_SIZE) return undefined;
      return (lastPageParam as number) + 1;
    },
  });
}
