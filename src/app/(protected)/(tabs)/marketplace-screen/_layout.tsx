import { Stack, router } from 'expo-router';
import { PressableFeedback } from 'heroui-native';
import { Plus } from 'lucide-react-native';
import { useTheme } from '@/hooks/use-theme';

/**
 * Renders a themed pressable button that opens the New Product screen.
 *
 * The button displays a plus icon colored from the current theme. When pressed, it navigates to '/marketplace-screen/new-product'.
 *
 * @returns A pressable element containing a plus icon; pressing it navigates to the New Product screen.
 */
function AddProductButton() {
  const theme = useTheme();

  return (
    <PressableFeedback
      onPress={() => router.push('/marketplace-screen/new-product')}
      className=""
    >
      <Plus size={24} color={theme.accent} />
    </PressableFeedback>
  );
}

/**
 * Renders the Marketplace navigation stack with themed headers and route configuration.
 *
 * Provides screens for the marketplace index (with an Add Product button), a "New Product" modal,
 * categories listing, category detail, and product detail with a transparent header. Header
 * colors and shadow visibility are derived from the current theme.
 *
 * @returns The configured Stack navigator for the marketplace screens
 */
export default function MarketplaceStack() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Marketplace',
          headerRight: () => <AddProductButton />,
        }}
      />
      <Stack.Screen
        name="new-product"
        options={{
          presentation: 'modal',
          headerTitle: 'New Product',
        }}
      />
      {/* <Stack.Screen
        name="search"
        options={{
          headerTitle: 'Search',
        }}
      /> */}
      <Stack.Screen
        name="categories"
        options={{
          headerTitle: 'Categories',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <Stack.Screen
        name="category/[id]"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerTitle: '',
          headerBackButtonDisplayMode: 'minimal',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="submission-receipt"
        options={{
          headerTitle: 'Submission Receipt',
          headerBackButtonDisplayMode: 'minimal',
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}