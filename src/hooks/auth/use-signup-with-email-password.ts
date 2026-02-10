import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { type SignUpWithPasswordCredentials } from '@supabase/supabase-js';

export function useSignUpWithEmail({ onError }: { onError?: (error: Error) => void } = {}) {
  const client = useSupabase();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: SignUpWithPasswordCredentials) => {
      const res = await client.auth.signUp(credentials);
      if (res.error) throw res.error;
      return res.data;
    },
    mutationKey: ['auth', 'sign-up-with-email-password'],
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['supabase', 'user'] });
    },
    onError,
  });
}
