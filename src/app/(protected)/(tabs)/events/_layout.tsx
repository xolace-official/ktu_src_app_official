import { Stack } from 'expo-router';

export default function EventsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Events',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Event',
        }}
      />
    </Stack>
  );
}
