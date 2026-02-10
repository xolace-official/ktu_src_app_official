import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useSupabase } from '@/lib/supabase/use-supabase';

type Credentials = {
  email: string;
  password: string;
};

export function useSignInWithEmailPassword() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const signIn = async (credentials: Credentials) => {
    const response = await client.auth.signInWithPassword(credentials);

    if (response.error) {
      throw response.error;
    }

    return response.data;
  };

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['supabase', 'user'],
      });
    },
  });
}
