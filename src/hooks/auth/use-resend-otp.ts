import { useMutation } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export function useResendOtp() {
  const client = useSupabase();

  const mutationKey = ['resend-otp'];

  const mutationFn = async (email: string) => {
    const { error } = await client.auth.signInWithOtp({
      email,
    });

    if (error) throw error;
    return true;
  };

  return useMutation({
    mutationFn,
    mutationKey,
  });
}



// import { useMutation } from '@tanstack/react-query';
// import { supabase } from '@/lib/supabase';

// export function useResendOtp() {
//   return useMutation({
//     mutationFn: async (email: string) => {
//       const { data, error } = await supabase.auth.resend({
//         type: 'signup',
//         email,
//       });

//       if (error) {
//         throw error;
//       }

//       return data;
//     },
//   });
// }
