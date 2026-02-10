import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useSupabase } from '../../lib/supabase/use-supabase';

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
      console.error(response.error);
      throw response.error.message;
    }

    const user = response.data?.user;
    const identities = user?.identities ?? [];

    // if the user has no identities, it means that the email is taken
    if (identities.length === 0) {
      throw new Error('User already registered');
    }

    return response.data;
  };

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      return queryClient.refetchQueries({
        queryKey: ['supabase', 'user'],
      });
    },
  });
}







// import { useMutation } from '@tanstack/react-query';

// interface SignInParams {
//   email: string;
//   password: string;
// }

// interface SignInResult {
//   user: { id: string; email: string } | null;
//   error: Error | null;
// }

// export function useSignInWithEmailPassword() {
//   return useMutation<SignInResult, Error, SignInParams>({
//     mutationFn: async ({ email, password }) => {
//       // TODO: Replace with your Supabase auth logic
//       // Example:
//       // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//       // if (error) throw error;
//       // return { user: data.user, error: null };

//       // Placeholder implementation
//       console.log('Sign in with:', email, password);
//       return { user: { id: '1', email }, error: null };
//     },
//     onError: (error) => {
//       console.error('Sign in error:', error);
//     },
//   });
// }
