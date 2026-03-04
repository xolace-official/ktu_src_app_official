import { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CompleteProfileForm from './complete-profile-form';
import { useUpdateProfile } from '@/hooks/profile/use-update-profile';
import type { CompleteProfileFormType } from '@/lib/schemas/profile';

type PostgrestError = { code: string; message: string };

export function CompleteProfileScreen() {
  const updateProfile = useUpdateProfile();
  const [indexNumberError, setIndexNumberError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (data: CompleteProfileFormType) => {
    setIndexNumberError(null);
    setFormError(null);
    try {
      await updateProfile.mutateAsync(data);
      // Navigate to main app on success
      // router.replace('/(protected)/(drawer)/(tabs)');
    } catch (error) {
      const pgError = error as PostgrestError;
      if (pgError?.code === '23505') {
        setIndexNumberError('This index number is already registered. Please check and try again.');
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <CompleteProfileForm
          onSubmit={handleSubmit}
          isSubmitting={updateProfile.isPending}
          indexNumberError={indexNumberError}
          formError={formError}
        />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
