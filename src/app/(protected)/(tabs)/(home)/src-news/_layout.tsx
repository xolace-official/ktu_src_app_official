import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

export default function SrcNewsLayout() {
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
        options={{ title: 'SRC News' }}
      />
      <Stack.Screen
        name="news/[id]"
        options={{ title: 'SRC News', headerBackButtonDisplayMode: 'minimal' }}
      />
    </Stack>
  );
}
