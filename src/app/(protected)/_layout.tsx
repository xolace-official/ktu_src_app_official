import { Stack } from 'expo-router';
import { useProfileBootstrap } from '@/hooks/profile/use-profile-bootstrap';
import { useAppStore } from '@/store/store';

const ProtectedLayout = () => {
  const { isLoading } = useProfileBootstrap();

  const completed = useAppStore((s) => s.profileSummary.completed);
  const hydrated = useAppStore((s) => s._hasHydrated);

  // Don't render router until store hydration + profile bootstrap done
  if (!hydrated || isLoading || completed === null) {
    return null;
  }

  return (
    <Stack>
      <Stack.Protected guard={!completed}>
        <Stack.Screen name="complete-profile-route" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={completed}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default ProtectedLayout;
