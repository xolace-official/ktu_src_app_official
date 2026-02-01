import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { HostelDetails, HostelGalleryItem } from '@/types/hostels';

const STALE_TIME_1_HOUR = 1000 * 60 * 60;

export function useHostelDetails(hostelId?: string) {
  const client = useSupabase();

  return useQuery<HostelDetails | null>({
    queryKey: ['hostel', hostelId],
    enabled: !!hostelId,
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
    queryFn: async () => {
      if (!hostelId) return null;

      const { data, error } = await client
        .from('hostels')
        .select(
          `
          id,
          name,
          description,
          address,
          contact,
          bedrooms,
          bathrooms,
          campus,
          price,
          rating,
          type,
          payment_term,
          facilities,
          hero_image_url,
          agent_name,
          agent_email,
          agent_avatar_url,
          hostel_photos (
            id,
            storage_path,
            caption,
            position
          )
        `
        )
        .eq('id', hostelId)
        .order('position', { referencedTable: 'hostel_photos', ascending: true })
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      const gallery: HostelGalleryItem[] =
        (data.hostel_photos ?? []).map((p: Record<string, unknown>) => ({
          id: p.id as string,
          image: p.storage_path as string,
          caption: (p.caption as string) ?? null,
          position: (p.position as number) ?? 0,
        })) ?? [];

      const facilities = (data.facilities ?? []) as string[];

      const details: HostelDetails = {
        id: data.id,
        image: data.hero_image_url ?? gallery[0]?.image ?? null,
        rating: data.rating,
        name: data.name,
        address: data.address,
        price: Number(data.price),
        description: data.description,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        facilities,
        type: data.type,
        campus: data.campus,
        contact: data.contact,
        paymentTerm: data.payment_term,
        agent: {
          name: data.agent_name,
          email: data.agent_email,
          avatar: data.agent_avatar_url,
        },
        gallery,
      };

      return details;
    },
  });
}
