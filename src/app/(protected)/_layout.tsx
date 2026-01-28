import { Stack } from 'expo-router';

const ProtectedLayout = () => {
//   // Load profile into store
//   useProfileBootstrap();

//   const completed = useAppStore((s) => s.profileSummary.completed);
//   const hydrated = useAppStore((s) => s._hasHydrated);

//   // Don’t render router until store hydration + bootstrap done
//   if (!hydrated || completed === null) {
//     return null; // or splash screen
//   }
const completed = true;

  return (
    <Stack>
      <Stack.Protected guard={!completed}>
        <Stack.Screen name="complete-profile-route" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={completed}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default ProtectedLayout;
