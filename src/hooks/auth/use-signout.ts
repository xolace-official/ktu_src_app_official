import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { useAppStore } from '@/store/store';

export function useSignOut() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const resetAuth = useAppStore((s) => s.resetAuth);

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      resetAuth();
      queryClient.clear();
    },
  });
}
