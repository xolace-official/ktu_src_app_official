import React from 'react';
import '../global.css'

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import RootProvider from '@/providers/root-provider';
import { useAuthSession } from '@/hooks/auth/use-auth-session';
import { useAuthListener } from '@/lib/supabase/use-auth-listener';
import { useRegisterAutoRefresh } from '@/lib/supabase/use-register-auto-refresh';
import { Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
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
