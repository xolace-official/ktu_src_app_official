import { useSupabase } from '@/lib/supabase/use-supabase';
import { useAppStore } from '@/store/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Mutation hook to mark a notification as read.
 * Invalidates both the notifications list and unread count queries.
 */
export function useMarkNotificationRead() {
  const client = useSupabase();
  const userId = useAppStore((s) => s.userId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const { error } = await client
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw new Error(error.message);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
      queryClient.invalidateQueries({ queryKey: ['unread-notification-count', userId] });
    },
  });
}
