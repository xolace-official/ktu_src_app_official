import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useSegments } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

// Routes where the tab bar should be hidden
const HIDDEN_TAB_ROUTES = ['product', 'hostel'];

/**
 * Renders the app's bottom tab navigator with adaptive theming and runtime visibility control.
 *
 * The component maps the system color scheme to the app theme, configures tab bar colors,
 * and hides the tab bar when the current navigation segment matches an entry in HIDDEN_TAB_ROUTES.
 *
 * @returns A NativeTabs element containing Home, Marketplace, and Explore triggers; the tab bar's
 * visibility and colors adapt to the active route segments and color scheme.
 */
export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];
  const segments = useSegments();

  // Check if current route should hide tabs
  // segments will be like: ['(protected)', '(tabs)', 'marketplace-screen', 'product', '[id]']
  const shouldHideTabs = segments.some((segment) => HIDDEN_TAB_ROUTES.includes(segment));

  return (
    <NativeTabs
      hidden={shouldHideTabs}
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="(home)">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/home.png')} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="marketplace-screen">
        <NativeTabs.Trigger.Label>Marketplace</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/explore.png')} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="hostels-showcase">
        <NativeTabs.Trigger.Label>Hostels</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/explore.png')} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/explore.png')} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}