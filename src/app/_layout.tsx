import React from 'react';
import '../global.css'

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import RootProvider from '@/providers/root-provider';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <RootProvider>
      <AnimatedSplashOverlay />
      <RootLayoutNav />
    </RootProvider>
  );
}

const RootLayoutNav = () => {
  const isAuthenticated = false;
  return (
    <Stack>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
  );
}
