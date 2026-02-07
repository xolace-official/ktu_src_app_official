import { useSupabase } from '@/lib/supabase/use-supabase';
import { useAppStore } from '@/store/store';
import { useQuery } from '@tanstack/react-query';

const STALE_TIME_1_MIN = 1000 * 60;

/**
 * Hook that returns the count of unread notifications for the current user.
 * Used by the bell icon badge on the home header.
 */
export function useUnreadNotificationCount() {
  const client = useSupabase();
  //const userId = useAppStore((s) => s.userId);
  const userId = "b25d86b8-29a1-4f18-9c69-b3d9c047265e";

  return useQuery({
    queryKey: ['unread-notification-count', userId],
    staleTime: STALE_TIME_1_MIN,
    gcTime: STALE_TIME_1_MIN,
    enabled: !!userId,

    queryFn: async () => {
      const { count, error } = await client
        .from('notifications')
        .select('id', { count: 'exact', head: true })
        .eq('recipient_id', userId!)
        .eq('read', false);

      if (error) throw new Error(error.message);

      return count ?? 0;
    },
  });
}
