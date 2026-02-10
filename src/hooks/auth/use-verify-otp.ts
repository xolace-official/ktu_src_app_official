import type { VerifyOtpParams } from '@supabase/supabase-js';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useSupabase } from '@/lib/supabase/use-supabase';

export function useVerifyOtp() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (params: VerifyOtpParams) => {
    console.log("Verifying ", params)
    const { data, error } = await client.auth.verifyOtp(params);

    console.log("Error ", error)
    console.log("Data ", data)
    if (error) throw error;
    return data;
  };

  return useMutation({
    mutationFn,
    mutationKey: ['verify-otp'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supabase', 'user'] });
    },
  });
}
