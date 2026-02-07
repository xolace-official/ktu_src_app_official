import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

export default function InfoCenterLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Info Center' }}
      />
      <Stack.Screen
        name="info/[id]"
        options={{ title: 'Announcement', headerBackButtonDisplayMode: 'minimal' }}
      />
    </Stack>
  );
}
