import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import type { CompleteProfileFormType } from '@/lib/schemas/profile';
import { useAppStore } from '@/store/store';

import { useToast } from 'heroui-native';

export function useUpdateProfile() {
  const { toast } = useToast();
  const client = useSupabase();
  const queryClient = useQueryClient();
  const userId = useAppStore((s) => s.userId);
  const setProfileSummary = useAppStore((s) => s.setProfileSummary);

  const mutationFn = async (profileData: CompleteProfileFormType) => {
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await client
      .from('profiles')
      .update({
        full_name: profileData.fullName,
        index_number: profileData.indexNumber,
        phone: profileData.phoneNumber,
        level: parseInt(profileData.level.replace('l', ''), 10),
        faculty_id: profileData.faculty,
        department_id: profileData.department,
        program_id: parseInt(profileData.program, 10),
        completed: true,
        onboarding_completed_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select('id , completed, full_name, username, avatar_url')
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      toast.show({
            variant: 'success',
            label: 'Profile updated successfully',
            description: 'You can continue using the app',
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })

      // Invalidate and refetch the profile query to get fresh data
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });

      // Update the store with new profile summary
      setProfileSummary({
        id: data.id,
        username: data.username,
        full_name: data.full_name,
        avatar_url: data.avatar_url,
        completed: data.completed,
      });
      // Optionally, you can update the profile summary in the store here
      // This is useful for immediate UI updates without waiting for refetch
      if (data) {
        // useAppStore.getState().setProfileSummary(data);
      }
    },
  });
}
