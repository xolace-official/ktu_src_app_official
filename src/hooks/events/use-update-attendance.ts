import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { useAppStore } from '@/store/store';
import { Toast, useToast } from 'heroui-native';
import type { EventAttendanceStatus } from '@/types/events';

interface UpdateAttendanceParams {
  eventId: string;
  status: EventAttendanceStatus;
}

/**
 * Mutation hook to update user attendance status for an event
 */
export function useUpdateAttendance() {
  const { toast } = useToast();
  const client = useSupabase();
  const queryClient = useQueryClient();
  const userId = useAppStore((s) => s.userId);

  return useMutation({
    mutationFn: async ({ eventId, status }: UpdateAttendanceParams) => {
      if (!userId) {
        throw new Error('User not authenticated');
      }

      // If status is null or not_going, delete the attendance record
      if (status === null || status === 'not_going') {
        const { error } = await client
          .from('event_attendance')
          .delete()
          .eq('event_id', eventId)
          .eq('profile_id', userId);

        if (error) {
          throw error;
        }

        return { status: null };
      }

      // Otherwise, upsert the attendance record
      const { data, error } = await client
        .from('event_attendance')
        .upsert(
          {
            event_id: eventId,
            profile_id: userId,
            status: status,
          },
          {
            onConflict: 'event_id,profile_id',
          }
        )
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },

    onSuccess: (_, variables) => {
      toast.show({
            variant: 'success',
            label: 'Attendance status updated',
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })

      // Invalidate the event details query to refetch with updated counts
      queryClient.invalidateQueries({ queryKey: ['event', variables.eventId] });

      // Also invalidate the events list to update counts there
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },

    onError: (error: Error) => {
      toast.show({
            variant: 'danger',
            label: 'Failed to update attendance status',
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })
    },
  });
}
