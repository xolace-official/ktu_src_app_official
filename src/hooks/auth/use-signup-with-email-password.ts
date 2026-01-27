import { useMutation } from '@tanstack/react-query';

interface SignUpParams {
  email: string;
  password: string;
}

interface SignUpResult {
  user: { id: string; email: string } | null;
  error: Error | null;
}

export function useSignUpWithEmail({ onError }: { onError?: (error: Error) => void } = {}) {
  return useMutation<SignUpResult, Error, SignUpParams>({
    mutationFn: async ({ email, password }) => {
      // TODO: Replace with your Supabase auth logic
      // Example:
      // const { data, error } = await supabase.auth.signUp({ email, password });
      // if (error) throw error;
      // return { user: data.user, error: null };

      // Placeholder implementation
      console.log('Sign up with:', email, password);
      return { user: { id: '1', email }, error: null };
    },
    onError: (error) => {
      console.error('Sign up error:', error);
      onError?.(error);
    },
  });
}
