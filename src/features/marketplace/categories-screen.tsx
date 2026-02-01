import { useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { PressableFeedback, SkeletonGroup } from 'heroui-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/hooks/use-theme';
import { useMarketCategories } from '@/hooks/marketplace';
import { ThemedText } from '@/components/themed-text';
import type { MarketCategory } from '@/types/marketplace';

interface CategoryRowProps {
  category: MarketCategory;
}

/**
 * Render a pressable category row that navigates to the category detail screen.
 *
 * @param category - The category to display; should include `id`, `name`, optional `icon`, and optional `color`.
 * @returns A JSX element representing a pressable row for the given category.
 */
function CategoryRow({ category }: CategoryRowProps) {
  const theme = useTheme();

  const handlePress = () => {
    router.push({
      pathname: '/marketplace-screen/category/[id]',
      params: { id: category.id, title: category.name },
    });
  };

  return (
    <PressableFeedback
      onPress={handlePress}
      className="my-1.5 flex-row items-center rounded-2xl bg-surface-secondary p-4"
      accessibilityRole="button"
      accessibilityLabel={`View ${category.name} category`}
    >
      <PressableFeedback.Highlight />
      <View
        className="mr-4 size-14 items-center justify-center rounded-full"
        style={{ backgroundColor: category.color ?? theme.backgroundElement }}
      >
        <ThemedText className="text-2xl">{category.icon ?? '📦'}</ThemedText>
      </View>

      <View className="flex-1">
        <ThemedText className="text-base font-semibold">{category.name}</ThemedText>
      </View>

      <ChevronRight size={24} color={theme.textSecondary} />
    </PressableFeedback>
  );
}

/**
 * Render a skeleton placeholder that matches the visual layout of a category row.
 *
 * @returns A JSX element containing a horizontal skeleton row with a circular leading avatar placeholder, a rectangular title placeholder, and a small circular trailing placeholder.
 */
function CategoryRowSkeleton() {
  return (
    <SkeletonGroup
      isLoading
      isSkeletonOnly
      className="my-1.5 flex-row items-center rounded-2xl bg-surface-secondary p-4"
    >
      <SkeletonGroup.Item className="mr-4 size-14 rounded-full" />
      <View className="flex-1">
        <SkeletonGroup.Item className="h-5 w-32 rounded-md" />
      </View>
      <SkeletonGroup.Item className="size-6 rounded-full" />
    </SkeletonGroup>
  );
}

/**
 * Render a vertical stack of skeleton placeholders for category rows.
 *
 * Renders eight CategoryRowSkeleton items inside a padded container to indicate loading state.
 *
 * @returns A view containing eight skeleton rows used as a loading placeholder for the categories list.
 */
function LoadingSkeleton() {
  return (
    <View className="flex-1 px-4 py-5">
      {Array.from({ length: 8 }).map((_, index) => (
        <CategoryRowSkeleton key={index} />
      ))}
    </View>
  );
}

/**
 * Render a centered empty-state view indicating no categories are available.
 *
 * @returns A view containing centered text "No categories found" styled with the theme's secondary text color.
 */
function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center py-10">
      <ThemedText themeColor="textSecondary">No categories found</ThemedText>
    </View>
  );
}

/**
 * Displays a scrollable list of marketplace categories with loading, empty, and pull-to-refresh states.
 *
 * @returns The categories screen UI: a FlatList of categories, a loading skeleton during initial load, or an empty-state view when no categories are available; supports pull-to-refresh.
 */
export function CategoriesScreen() {
  const theme = useTheme();
  const { data: categories = [], isLoading, refetch, isRefetching } = useMarketCategories();

  const renderItem = useCallback(
    ({ item }: { item: MarketCategory }) => <CategoryRow category={item} />,
    []
  );

  const keyExtractor = useCallback((item: MarketCategory) => item.id, []);

  if (isLoading && !isRefetching) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        <LoadingSkeleton />
      </View>
    );
  }

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.background }}
      ListEmptyComponent={EmptyState}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
          tintColor={theme.accent}
        />
      }
    />
  );
}