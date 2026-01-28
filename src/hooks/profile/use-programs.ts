import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export function usePrograms(departmentId: string | null) {
  const client = useSupabase();
  console.log("departmentId ", departmentId)
  return useQuery({
    queryKey: ['programs', departmentId],
    queryFn: async () => {
      if (!departmentId) return [];

        console.log("departmentId2 ", departmentId)
      const { data, error } = await client
        .from('programs')
        .select('id, name')
        .eq('department', departmentId);

      if (error) {
        console.log("error ", error)
        throw error;
      }
      console.log("programs ", data)
      return data;
    },
    enabled: !!departmentId,
  });
}
