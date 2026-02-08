import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

/**
 * Layout component that provides a themed Stack navigator for the SRC News section.
 *
 * Renders a Stack with header styling derived from the active theme and registers the "index" and "news/[id]" screens, both titled "SRC News".
 *
 * @returns The configured Stack navigator element for the SRC News routes.
 */
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