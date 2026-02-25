import React, { useEffect } from 'react';
import '../global.css'

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import RootProvider from '@/providers/root-provider';
import { useAuthSession } from '@/hooks/auth/use-auth-session';
import { useAuthListener } from '@/lib/supabase/use-auth-listener';
import { useRegisterAutoRefresh } from '@/lib/supabase/use-register-auto-refresh';
import { useOtaUpdate } from '@/hooks/use-ota-update';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Keep the native splash visible until the JS overlay is mounted and ready
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Default to the tabs shell so deep-link reloads start from a valid root.
  initialRouteName: '(protected)',
};

/**
 * Provides the application's root context and renders the navigation layout.
 *
 * @returns A React element that wraps RootLayoutNav with the RootProvider
 */
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
  useOtaUpdate();

  const { isAuthenticated, isLoading } = useAuthSession();

  console.log('RootLayoutNav: isAuthenticated', isAuthenticated);
  console.log('RootLayoutNav: isLoading', isLoading);

  // Hand off from native splash to JS overlay on first render
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <AnimatedSplashOverlay isLoading={isLoading} />
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