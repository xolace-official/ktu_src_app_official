import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { ListingSubmission } from '@/types/marketplace';

export interface CreateSubmissionInput {
  title: string;
  price: number;
  stock_qty?: number;
  category_id: string;
  condition?: string;
  description?: string;
  whatsapp_contact?: string;
  call_contact?: string;
  placement_type: 'normal' | 'featured';
  imageUris: string[];
  fee_plan_id: string | null;
}


/**
 * Uploads submission images to Supabase Storage and creates a `listing_submissions` row.
 *
 * Flow:
 * 1. Verify authenticated user
 * 2. Upload each image URI to the `market-submissions` bucket via fetch → arrayBuffer
 * 3. Insert a `listing_submissions` row with the collected storage paths
 *
 * The DB trigger `trg_listing_submissions_set_reference_code` automatically
 * populates `reference_code` (first 8 chars of UUID, uppercase) on insert.
 *
 * The submission starts with status `submitted` and awaits admin approval.
 * On success, invalidates the `my-submissions` query key.
 *
 * @returns A mutation that accepts `CreateSubmissionInput` and resolves to the created `ListingSubmission`.
 */
export function useCreateSubmission() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateSubmissionInput): Promise<ListingSubmission> => {
      const { data: userData, error: userError } = await client.auth.getUser();
      if (userError) throw userError;
      if (!userData.user) throw new Error('User not authenticated');

      const userId = userData.user.id;

      // Upload each image to Supabase Storage
      const storagePaths: string[] = [];
      for (let i = 0; i < input.imageUris.length; i++) {
        const uri = input.imageUris[i];
        const ext = uri.split('.').pop()?.toLowerCase() ?? 'jpeg';
        const contentType = ext === 'png' ? 'image/png' : ext === 'gif' ? 'image/gif' : 'image/jpeg';
        const path = `${userId}/${Date.now()}-${i}.${ext}`;

        const arrayBuffer = await fetch(uri).then((r) => r.arrayBuffer());

        const { data: uploadData, error: uploadError } = await client.storage
          .from('market-submissions')
          .upload(path, arrayBuffer, { contentType });

        if (uploadError) {
          throw new Error(`Failed to upload image ${i + 1}: ${uploadError.message}`);
        }

        storagePaths.push(uploadData.path);
      }

      // Insert listing submission — DB trigger sets reference_code automatically
      const { data, error } = await client
        .from('listing_submissions')
        .insert({
          submitter_id: userId,
          title: input.title,
          price: input.price,
          stock_qty: input.stock_qty ?? null,
          category_id: input.category_id,
          condition: input.condition ?? null,
          description: input.description ?? null,
          whatsapp_contact: input.whatsapp_contact ?? null,
          call_contact: input.call_contact ?? null,
          placement_type: input.placement_type,
          photos: storagePaths,
          fee_plan_id: input.fee_plan_id,
          currency: 'GHS',
          status: 'submitted',
        })
        .select()
        .single();

      if (error) throw error;

      return data as ListingSubmission;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-submissions'] });
    },
  });
}
