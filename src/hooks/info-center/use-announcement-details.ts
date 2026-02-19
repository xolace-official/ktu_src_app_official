import { useSupabase } from '@/lib/supabase/use-supabase';
import type { AnnouncementDetails, Attachment, QuickFact } from '@/types/info-center';
import { useQuery } from '@tanstack/react-query';
import { STALE_TIME_1_HOUR } from '@/constants/query';


/**
 * Hook to fetch a single announcement with author relation
 */
export function useAnnouncementDetails(announcementId: string) {
  const client = useSupabase();

  return useQuery({
    queryKey: ['announcement', announcementId],
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
    enabled: !!announcementId,

    queryFn: async () => {
      const { data, error } = await client
        .from('announcements')
        .select(
          `
          *,
          author:profiles(full_name, avatar_url)
        `
        )
        .eq('id', announcementId)
        .single();

      if (error) throw new Error(error.message);

      return {
        ...data,
        quick_facts: Array.isArray(data.quick_facts)
          ? (data.quick_facts as unknown as QuickFact[])
          : [],
        attachments: Array.isArray(data.attachments)
          ? (data.attachments as unknown as Attachment[])
          : [],
      } as AnnouncementDetails;
    },
  });
}
