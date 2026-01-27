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
