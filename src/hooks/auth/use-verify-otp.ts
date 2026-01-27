// import { useMutation } from '@tanstack/react-query';
// import { supabase } from '@/lib/supabase';

// type VerifyOtpParams = {
//   email: string;
//   token: string;
//   type: 'email' | 'sms';
// };

// export function useVerifyOtp() {
//   return useMutation({
//     mutationFn: async ({ email, token, type }: VerifyOtpParams) => {
//       const { data, error } = await supabase.auth.verifyOtp({
//         email,
//         token,
//         type,
//       });

//       if (error) {
//         throw error;
//       }

//       return data;
//     },
//   });
// }
