import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { type Session, type User } from '@supabase/supabase-js';

interface SignUpParams {
  email: string;
  password: string;
  options?: any;
}

interface SignUpResult {
  user: User | null;
  session: Session | null;
}

export function useSignUpWithEmail({ onError }: { onError?: (error: Error) => void } = {}) {
  const client = useSupabase();
  const qc = useQueryClient();
  const mutationKey = ['auth', 'sign-up-with-email-password'];

  return useMutation<SignUpResult, Error, SignUpParams>({
    mutationFn: async ({ email, password, options }) => {
      // TODO: Replace with your Supabase auth logic
      // Example:
      const res = await client.auth.signUp({
      email: email,
      password: password,
      options: options,
    });
    if (res.error) throw res.error;
    return res.data;

      // Placeholder implementation
      // console.log('Sign up with:', email, password);
      // return { user: { id: '1', email }, error: null };
    },
    mutationKey,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['supabase', 'user'] });
    },
    onError: (error) => {
      console.error('Sign up error:', error);
      onError?.(error);
    },
  });
}
