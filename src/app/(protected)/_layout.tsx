import { Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { Button, Spinner } from 'heroui-native';
import { useProfileBootstrap } from '@/hooks/profile/use-profile-bootstrap';
import { useAppStore } from '@/store/store';

const ProtectedLayout = () => {
  const { isPending, isError, refetch, data } = useProfileBootstrap();

  const completedFromStore = useAppStore((s) => s.profileSummary.completed);
  const hydrated = useAppStore((s) => s._hasHydrated);

  if (!hydrated || isPending) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size="lg" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 }}>
        <Text className="text-foreground">Something went wrong loading your profile.</Text>
        <Button onPress={() => refetch()}>
          <Button.Label>Retry</Button.Label>
        </Button>
      </View>
    );
  }

  // Use query data directly to avoid a one-render lag from the Zustand useEffect sync
  const completed = data?.completed ?? completedFromStore ?? false;

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
