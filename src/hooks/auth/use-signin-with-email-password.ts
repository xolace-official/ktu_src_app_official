import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type SignInWithPasswordCredentials } from '@supabase/supabase-js';

import { useSupabase } from '@/lib/supabase/use-supabase';

export function useSignInWithEmailPassword() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const signIn = async (credentials: SignInWithPasswordCredentials) => {
    const response = await client.auth.signInWithPassword(credentials);

    if (response.error) {
      throw response.error;
    }

    return response.data;
  };

  return useMutation({
    mutationFn: signIn,
    mutationKey: ['auth', 'signin', 'email'],
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['supabase', 'user'],
      });
    },
  });
}
