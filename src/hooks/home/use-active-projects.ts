import { useSupabase } from '@/lib/supabase/use-supabase';
import type { Project } from '@/types/home';
import { useQuery } from '@tanstack/react-query';

const STALE_TIME_1_HOUR = 1000 * 60 * 60;

export function useActiveProjects(limit = 5) {
  const client = useSupabase();
  const safeLimit = Math.max(1, Math.floor(limit));

  return useQuery({
    queryKey: ['active-projects', safeLimit],
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await client
        .from('projects')
        .select('id, name, progress, gradient_colors')
        .order('created_at', { ascending: false })
        .limit(safeLimit);

      if (error) throw new Error(error.message);

      return (data ?? []).map((row) => ({
        id: row.id,
        title: row.name,
        progress: row.progress,
        gradientColors: (row.gradient_colors as [string, string] | [string, string, string]) ?? undefined,
      }));
    },
  });
}
