import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export function useDepartments(facultyId: string | null) {
  const client = useSupabase();

  return useQuery({
    queryKey: ['departments', facultyId],
    queryFn: async () => {
      if (!facultyId) return [];

      const { data, error } = await client
        .from('departments')
        .select('id, name')
        .eq('faculty_id', facultyId);

      if (error) {
        throw error;
      }

      return data;
    },
    enabled: !!facultyId,
  });
}
