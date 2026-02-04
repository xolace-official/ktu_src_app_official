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
    </Stack>
  );
};

export default SettingsLayout;
