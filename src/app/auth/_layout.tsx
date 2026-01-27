import { Stack } from 'expo-router';

export default function AuthStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="auth-screen" options={{ headerShown: false, title: 'Auth Screen' }} />
      <Stack.Screen name="verify-screen" options={{ headerShown: false, title: 'Verify' }} />
    </Stack>
  );
}