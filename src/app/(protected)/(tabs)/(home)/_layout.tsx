import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="info-center" options={{ headerShown: false }} />
      <Stack.Screen name="src-news" options={{ headerShown: false}} />
    </Stack>
  );
};

export default HomeLayout;
