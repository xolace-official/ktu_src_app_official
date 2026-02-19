import type { FeedbackTypeKind } from '@/features/settings/components/feedback/feedback-data';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { useMutation } from '@tanstack/react-query';

export interface SubmitFeedbackInput {
  type: FeedbackTypeKind;
  category: string;
  rating: number | null;
  message: string;
  isAnonymous: boolean;
}

export function useSubmitFeedback() {
  const client = useSupabase();

  return useMutation({
    mutationFn: async (input: SubmitFeedbackInput): Promise<void> => {
      const { data: userData, error: userError } = await client.auth.getUser();
      if (userError) throw userError;
      if (!userData.user) throw new Error('User not authenticated');

      const { error } = await client.from('feedback').insert({
        type: input.type,
        category: input.category,
        rating: input.rating ?? null,
        message: input.message,
        is_anonymous: input.isAnonymous,
        profile_id: input.isAnonymous ? null : userData.user.id,
      });

      if (error) throw new Error(error.message);
    },
  });
}
