import { useMutation } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export function useDeleteAccount() {
  const supabase = useSupabase();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc('delete_user_account');
      if (error) throw error;

      // The RPC deletes the auth.users row server-side, but the local
      // Supabase client still holds a cached session/token. Calling signOut
      // clears the local session and fires SIGNED_OUT through onAuthStateChange,
      // which the auth listener already handles (resetAuth + clear query cache).
      await supabase.auth.signOut();
    },
  });
}
