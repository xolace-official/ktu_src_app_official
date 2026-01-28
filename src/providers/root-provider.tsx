import { HeroUINativeProvider } from 'heroui-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function RootProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <HeroUINativeProvider>{children}</HeroUINativeProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </KeyboardProvider>
    </GestureHandlerRootView>
  );
}