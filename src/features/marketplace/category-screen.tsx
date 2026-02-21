import { useMemo, useCallback, useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SkeletonGroup, Spinner } from 'heroui-native';
import { useTheme } from '@/hooks/use-theme';
import { useCategoryListings } from '@/hooks/marketplace';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { ProductCard } from './components';
import { ThemedText } from '@/components/themed-text';
import type { FeaturedListing } from '@/types/marketplace';

const GRID_GAP = 16;
const HORIZONTAL_PADDING = 16;

/**
 * Renders a static skeleton placeholder for a product card sized to the given width.
 *
 * @param width - The pixel width to apply to the skeleton card container
 * @returns A React element representing the product card loading skeleton
 */
function ProductCardSkeleton({ width }: { width: number }) {
  return (
    <SkeletonGroup isLoading isSkeletonOnly className="rounded-2xl bg-surface-secondary" style={{ width }}>
      <SkeletonGroup.Item className="h-36 w-full rounded-t-2xl" style={{ borderCurve: 'continuous' }} />
      <View className="gap-2 p-3">
        <SkeletonGroup.Item className="h-4 w-3/4 rounded-md" />
        <View className="flex-row items-center justify-between">
          <SkeletonGroup.Item className="h-5 w-16 rounded-md" />
          <SkeletonGroup.Item className="h-4 w-10 rounded-md" />
        </View>
      </View>
    </SkeletonGroup>
  );
}

/**
 * Renders a two-column wrapping row of product card skeletons used as a loading placeholder.
 *
 * @param cardWidth - The width, in pixels, to apply to each product card skeleton.
 * @returns A React element containing six product card skeletons arranged in a wrapped row.
 */
function LoadingSkeleton({ cardWidth }: { cardWidth: number }) {
  return (
    <View className="flex-row flex-wrap justify-between px-4 pt-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} className="mb-4">
          <ProductCardSkeleton width={cardWidth} />
        </View>
      ))}
    </View>
  );
}

/**
 * Displays a centered message when no products are available for the current category or search.
 *
 * @param search - Current search query; when non-empty the message includes the query
 * @returns A view containing a centered, themed message indicating no products were found
 */
function EmptyState({ search }: { search: string }) {
  return (
    <View className=" items-center justify-center py-20">
      <ThemedText themeColor="textSecondary" className="text-center">
        {search
          ? `No products found for "${search}"`
          : 'No products found in this category'}
      </ThemedText>
    </View>
  );
}

/**
 * Renders a centered small spinner intended for the list footer while additional items load.
 *
 * @returns A View containing a centered `Spinner` used as a loading footer.
 */
function LoadingFooter() {
  return (
    <View className="items-center py-6">
      <Spinner size="sm" />
    </View>
  );
}

/**
 * Displays a two-column grid of product listings for a category, including a debounced header search, infinite scrolling, pull-to-refresh, and loading/empty states.
 *
 * The header search is wired to the native header search bar and clears on cancel; the native header title is updated to include the total result count when available. Initial loading shows a skeleton grid, additional pages show a footer spinner, and an empty state message is shown when there are no results.
 *
 * @returns A React element rendering the category listings screen.
 */
export function CategoryScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const { width: screenWidth } = useWindowDimensions();

  // Calculate card width based on screen size (2 columns)
  const cardWidth = (screenWidth - HORIZONTAL_PADDING * 2 - GRID_GAP) / 2;

  // Search state managed by native header search bar
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 400);

  // Configure native header search bar
  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search products...',
        autoCapitalize: 'none',
        hideWhenScrolling: false,
        onChangeText: (event: { nativeEvent: { text: string } }) => {
          setSearch(event.nativeEvent.text);
        },
        onCancelButtonPress: () => {
          setSearch('');
        },
      },
    });
  }, [navigation]);

  const categoryId = id ?? '';
  const categoryTitle = title ?? 'Products';

  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCategoryListings(categoryId, debouncedSearch);

  // Flatten pages into a single array
  const listings = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  // Total count from first page
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  // Update header title with count
  useEffect(() => {
    if (!isLoading && totalCount > 0) {
      navigation.setOptions({
        headerTitle: `${categoryTitle} (${totalCount})`,
      });
    } else {
      navigation.setOptions({
        headerTitle: categoryTitle,
      });
    }
  }, [navigation, categoryTitle, totalCount, isLoading]);

  const renderItem = useCallback(
    ({ item }: { item: FeaturedListing }) => (
      <View style={{ width: cardWidth, marginBottom: GRID_GAP }}>
        <ProductCard product={item} />
      </View>
    ),
    [cardWidth]
  );

  const keyExtractor = useCallback((item: FeaturedListing) => item.id, []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Show loading skeleton on initial load
  if (isLoading && !isRefetching) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        <LoadingSkeleton cardWidth={cardWidth} />
      </View>
    );
  }

  return (
    <FlatList
      data={listings}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{
        paddingHorizontal: HORIZONTAL_PADDING,
        paddingTop: GRID_GAP,
        paddingBottom: 32,
      }}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.background }}
      ListEmptyComponent={<EmptyState search={debouncedSearch} />}
      ListFooterComponent={isFetchingNextPage ? <LoadingFooter /> : null}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
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