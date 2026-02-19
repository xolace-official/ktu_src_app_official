import React, { useEffect } from 'react';
import '../global.css'

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import RootProvider from '@/providers/root-provider';
import { useAuthSession } from '@/hooks/auth/use-auth-session';
import { useAuthListener } from '@/lib/supabase/use-auth-listener';
import { useRegisterAutoRefresh } from '@/lib/supabase/use-register-auto-refresh';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Keep the native splash visible until the JS overlay is mounted and ready
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Default to the tabs shell so deep-link reloads start from a valid root.
  initialRouteName: '(protected)',
};

export default function RootLayout() {
  return (
    <RootProvider>
      <RootLayoutNav />
    </RootProvider>
  );
}

const RootLayoutNav = () => {
  useRegisterAutoRefresh();
  useAuthListener();

  const { isAuthenticated, isLoading } = useAuthSession();

  // Hand off from native splash to JS overlay on first render
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      {/* <AnimatedSplashOverlay isLoading={isLoading} /> */}
      <Stack>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoading && !isAuthenticated}>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
