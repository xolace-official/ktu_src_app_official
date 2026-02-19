import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { useAppStore } from '@/store/store';
import type { EventDetails } from '@/types/events';
import { STALE_TIME_1_HOUR } from '@/constants/query';


/**
 * Hook to fetch event details with user attendance status
 */
export function useEventDetails(eventId: string) {
  const client = useSupabase();
  const userId = useAppStore((s) => s.userId);

  return useQuery({
    queryKey: ['event', eventId, userId],
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
    enabled: !!eventId,

    queryFn: async () => {
      // Fetch the event details with organizer info
      const { data: eventData, error: eventError } = await client
        .from('events')
        .select(
          `
          *,
          organizer:profiles(full_name, avatar_url)
        `
        )
        .eq('id', eventId)
        .single();

      if (eventError) {
        throw new Error(eventError.message);
      }

      // If user is logged in, fetch their attendance status
      let userAttendanceStatus = null;
      if (userId) {
        const { data: attendanceData, error: attendanceError } = await client
          .from('event_attendance')
          .select('status')
          .eq('event_id', eventId)
          .eq('profile_id', userId)
          .maybeSingle();

        if (!attendanceError && attendanceData) {
          userAttendanceStatus = attendanceData.status;
        }
      }

      return {
        ...eventData,
        user_attendance_status: userAttendanceStatus,
      } as EventDetails;
    },
  });
}
