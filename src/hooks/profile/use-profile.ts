import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export type FullProfile = {
  id: string;
  full_name: string | null;
  username: string | null;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  phone: string | null;
  index_number: string | null;
  level: number | null;
  created_at: string;
  updated_at: string;
  completed: boolean;
  faculty_name: string | null;
  department_name: string | null;
  program_name: string | null;
};

export function useProfile(userId: string | null) {
  const client = useSupabase();

  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async (): Promise<FullProfile> => {
      if (!userId) throw new Error('No user ID');

      const { data, error } = await client
        .from('profiles')
        .select(
          `
          id,
          full_name,
          username,
          email,
          avatar_url,
          bio,
          phone,
          index_number,
          level,
          created_at,
          updated_at,
          completed,
          faculties:faculty_id ( name ),
          departments:department_id ( name ),
          programs:program_id ( name )
        `
        )
        .eq('id', userId)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        full_name: data.full_name,
        username: data.username,
        email: data.email,
        avatar_url: data.avatar_url,
        bio: data.bio,
        phone: data.phone,
        index_number: data.index_number,
        level: data.level,
        created_at: data.created_at,
        updated_at: data.updated_at,
        completed: data.completed,
        faculty_name: (data.faculties as { name: string } | null)?.name ?? null,
        department_name: (data.departments as { name: string } | null)?.name ?? null,
        program_name: (data.programs as { name: string } | null)?.name ?? null,
      };
    },
    enabled: !!userId,
  });
}
