import { useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useMarketCategories, useFeaturedListings } from '@/hooks/marketplace';
import {
  ProductCard,
  ProductSearchBar,
  Banner,
  CategoriesScroll,
  SectionHeader,
  FeaturedSkeleton,
} from './components';
import type { FeaturedListing } from '@/types/marketplace';
import { ThemedText } from '@/components/themed-text';

/**
 * Render the marketplace screen's list header containing search, promotional banner, categories, and the featured items title.
 *
 * The search bar navigates to the marketplace search screen when pressed. The categories header action navigates to the categories screen. Categories and their loading state are provided to the categories scroller and limited to six visible items.
 *
 * @returns A React element containing the composed header UI for the marketplace list
 */
function ListHeaderContent() {
  const { data: categories = [], isLoading: categoriesLoading } = useMarketCategories();
  const theme = useTheme();

  const handleSearchPress = () => {
    router.push('/marketplace-screen/search');
  };

  const handleSeeAllCategories = () => {
    router.push('/marketplace-screen/categories');
  };

  return (
    <View className="gap-6 pb-4">
      {/* Search Bar */}
      <ProductSearchBar
        onPress={handleSearchPress}
        placeholder="Search products..."
        editable
      />

      {/* Promotional Banner */}
      <Banner
        title={'Shop Smarter,\nSave More!'}
        ctaText="Get 40% OFF!"
        onPress={() => {}}
      />

      {/* Categories Section */}
      <View className="gap-4">
        <SectionHeader
          title="Categories"
          onActionPress={handleSeeAllCategories}
        />
        <CategoriesScroll
          categories={categories}
          isLoading={categoriesLoading}
          maxItems={6}
        />
      </View>

      {/* Featured Items Title */}
      <SectionHeader title="Featured Items" />
    </View>
  );
}

/**
 * Renders a centered empty-state message shown when there are no featured items.
 *
 * @returns A React element containing a themed text message "No featured items found".
 */
function EmptyState() {
  return (
    <View className="items-center justify-center py-10">
      <ThemedText themeColor="textSecondary">No featured items found</ThemedText>
    </View>
  );
}

/**
 * Render the marketplace screen with a search bar, promotional banner, categories section, and a two-column grid of featured items.
 *
 * The component shows a skeleton while initial featured items are loading (unless a refetch is in progress), supports pull-to-refresh to reload featured items, and renders an empty state when no featured items are available.
 *
 * @returns A React element representing the marketplace screen
 */
export function MarketplaceScreen() {
  const theme = useTheme();
  const {
    data: featuredItems = [],
    isLoading: featuredLoading,
    refetch,
    isRefetching,
  } = useFeaturedListings();

  const renderItem = useCallback(
    ({ item }: { item: FeaturedListing }) => <ProductCard product={item} />,
    []
  );

  const keyExtractor = useCallback((item: FeaturedListing) => item.id, []);

  if (featuredLoading && !isRefetching) {
    return (
      <View className="flex-1 px-4 pt-4" style={{ backgroundColor: theme.background }}>
        <ListHeaderContent />
        <FeaturedSkeleton />
      </View>
    );
  }

  return (
    <FlatList
      data={featuredItems}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      ListHeaderComponent={ListHeaderContent}
      ListEmptyComponent={EmptyState}
      columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
      }}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.background }}
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