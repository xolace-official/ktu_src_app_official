import { Stack } from 'expo-router';

const SettingsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
          headerLargeTitleShadowVisible: true,
          headerLargeTitle: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="profile-account/index"
        options={{
          title: 'Profile',
          headerBackTitle: '',
          headerLargeTitleShadowVisible: true,
          headerLargeTitle: false,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <Stack.Screen
        name="help-center/index"
        options={{
          title: 'Help Center',
          headerBackTitle: '',
          headerLargeTitleShadowVisible: true,
          headerLargeTitle: false,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <Stack.Screen
        name="feedback/index"
        options={{
          title: 'Send Feedback',
          headerBackTitle: '',
          headerLargeTitleShadowVisible: true,
          headerLargeTitle: false,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <Stack.Screen
        name="terms-of-service/index"
        options={{
          title: 'Terms of Service',
          presentation: 'modal',
          headerLargeTitle: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="privacy-policy/index"
        options={{
          title: 'Privacy Policy',
          presentation: 'modal',
          headerLargeTitle: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="about/index"
        options={{
          title: 'About',
          headerBackTitle: '',
          headerLargeTitleShadowVisible: true,
          headerLargeTitle: false,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <Stack.Screen
        name="developer-credit/index"
        options={{
          title: 'Developer Credit',
          headerBackTitle: '',
          headerLargeTitleShadowVisible: true,
          headerLargeTitle: false,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
