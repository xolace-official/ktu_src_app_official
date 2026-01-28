import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CompleteProfileForm from './complete-profile-form';
import { useUpdateProfile } from '@/hooks/profile/use-update-profile';
import type { CompleteProfileFormType } from '@/lib/schemas/profile';

export function CompleteProfileScreen() {
  const updateProfile = useUpdateProfile();

  const handleSubmit = async (data: CompleteProfileFormType) => {
    try {
      await updateProfile.mutateAsync(data);
      // Navigate to main app on success
      // router.replace('/(protected)/(drawer)/(tabs)');
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-red-400">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <CompleteProfileForm onSubmit={handleSubmit} isSubmitting={updateProfile.isPending} />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
