import { useMutation } from '@tanstack/react-query';
// import { supabase } from '@/lib/supabase';

type VerifyOtpParams = {
  email: string;
  token: string;
  type: 'email' | 'sms';
};

export function useVerifyOtp() {
  return useMutation({
    mutationFn: async ({ email, token, type }: VerifyOtpParams) => {
      // Mock implementation since supabase client is missing
       const { data, error } = { data: {}, error: null }; // await supabase.auth.verifyOtp({
      //   email,
      //   token,
      //   type,
      // });

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
