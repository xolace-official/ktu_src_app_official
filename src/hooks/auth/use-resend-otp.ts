import { useMutation } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export function useResendOtp() {
  const client = useSupabase();

  const mutationFn = async (email: string) => {
    const { error } = await client.auth.resend({
      type: 'signup',
      email,
    });

    if (error) throw error;
    return true;
  };

  return useMutation({
    mutationFn,
    mutationKey: ['resend-otp'],
  });
}
