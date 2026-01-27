import React from 'react';
import '../global.css'

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import RootProvider from '@/providers/root-provider';

export default function TabLayout() {
  return (
    <RootProvider>
      <AnimatedSplashOverlay />
      <AppTabs />
    </RootProvider>
  );
}
