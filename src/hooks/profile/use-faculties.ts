import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export function useFaculties() {
  const client = useSupabase();

  return useQuery({
    queryKey: ['faculties'],
    queryFn: async () => {
      const { data, error } = await client.from('faculties').select('id, name');

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
