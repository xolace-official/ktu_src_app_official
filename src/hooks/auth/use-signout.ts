import { useMutation } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { useAppStore } from '@/store/store';

export function useSignOut() {
  const supabase = useSupabase();
  const resetAuth = useAppStore((s) => s.resetAuth);

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      resetAuth();
      // Don't use queryClient.clear() — it destroys query observers,
      // preventing useUser from refetching on subsequent sign-ins.
      // The auth listener already sets ['supabase', 'user'] to null on SIGNED_OUT,
      // and user-specific queries (profile, etc.) auto-disable via enabled: !!userId.
    },
  });
}
