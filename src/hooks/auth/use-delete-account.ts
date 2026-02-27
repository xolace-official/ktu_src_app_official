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
    },
    onSuccess: () => {
      resetAuth();
    },
  });
}
