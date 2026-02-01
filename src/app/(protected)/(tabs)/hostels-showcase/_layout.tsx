import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

export default function HostelShowcaseLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: theme.text,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="all"
        options={{
          headerTitle: 'All Hostels',
          headerLargeTitle: true,
          headerTransparent: false,
          headerStyle: { backgroundColor: theme.background },
        }}
      />
    </Stack>
  );
}
