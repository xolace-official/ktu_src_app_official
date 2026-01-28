import { useMutation } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { CompleteProfileFormType } from '@/lib/schemas/profile';

export function useUpdateProfile() {
  const client = useSupabase();

  return useMutation({
    mutationFn: async (data: CompleteProfileFormType) => {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await client.from('profiles').upsert({
        id: user.id,
        full_name: data.fullName,
        index_number: data.indexNumber,
        phone_number: data.phoneNumber,
        faculty_id: data.faculty,
        department_id: data.department,
        program_id: data.program,
        level: data.level,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      return { success: true };
    },
  });
}
