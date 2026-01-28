import { useMutation } from '@tanstack/react-query';

interface SignInParams {
  email: string;
  password: string;
}

interface SignInResult {
  user: { id: string; email: string } | null;
  error: Error | null;
}

export function useSignInWithEmailPassword() {
  return useMutation<SignInResult, Error, SignInParams>({
    mutationFn: async ({ email, password }) => {
      // TODO: Replace with your Supabase auth logic
      // Example:
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      // if (error) throw error;
      // return { user: data.user, error: null };

      // Placeholder implementation
      console.log('Sign in with:', email, password);
      return { user: { id: '1', email }, error: null };
    },
    onError: (error) => {
      console.error('Sign in error:', error);
    },
  });
}
