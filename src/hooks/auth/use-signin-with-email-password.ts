import { useMutation } from '@tanstack/react-query';
import { type AuthError, type SignInWithPasswordCredentials } from '@supabase/supabase-js';

import { useSupabase } from '@/lib/supabase/use-supabase';

export function useSignInWithEmailPassword() {
  const client = useSupabase();

  const signIn = async (credentials: SignInWithPasswordCredentials) => {
    const response = await client.auth.signInWithPassword(credentials);

    if (response.error) {
      console.log("Error signing in: ", response.error);
      throw response.error;
    }

    return response.data;
  };

  return useMutation<Awaited<ReturnType<typeof signIn>>, AuthError, SignInWithPasswordCredentials>({
    mutationFn: signIn,
    mutationKey: ['auth', 'signin', 'email'],
    // Query invalidation handled by useAuthListener on SIGNED_IN event.
    // Duplicating here causes unnecessary double-refetches.
  });
}
