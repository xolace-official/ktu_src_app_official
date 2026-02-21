import { Stack } from 'expo-router';

export default function AuthStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth-content" options={{ title: 'Auth Screen' }} />
      <Stack.Screen name="verify-screen" options={{ title: 'Verify', animation: 'slide_from_right', gestureEnabled: false }} />
    </Stack>
  );
}