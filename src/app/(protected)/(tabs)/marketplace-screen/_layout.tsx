import { Stack, router } from 'expo-router';
import { PressableFeedback } from 'heroui-native';
import { Plus } from 'lucide-react-native';
import { useTheme } from '@/hooks/use-theme';

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
      <Stack.Screen
        name="search"
        options={{
          headerTitle: 'Search',
        }}
      />
      {/* <Stack.Screen
        name="categories"
        options={{
          headerTitle: 'Categories',
        }}
      />
      <Stack.Screen
        name="category/[id]"
        options={{
          headerTitle: 'Category',
        }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerTitle: 'Product',
        }}
      /> */}
    </Stack>
  );
}
