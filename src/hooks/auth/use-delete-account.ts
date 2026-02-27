import { useMutation } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { useAppStore } from '@/store/store';

export function useDeleteAccount() {
  const supabase = useSupabase();
  const resetAuth = useAppStore((s) => s.resetAuth);

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc('delete_user_account');
      if (error) throw error;

      // The RPC deletes the auth.users row server-side, but the local
      // Supabase client still holds a cached session/token. Calling signOut
      // clears the local session and fires SIGNED_OUT through onAuthStateChange,
      // which the auth listener already handles (resetAuth + clear query cache).
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        // Account is already deleted server-side. Force-clear local auth state
        // so the app navigates to the sign-in screen regardless.
        resetAuth();
        throw signOutError;
      }
    },
  });
}
