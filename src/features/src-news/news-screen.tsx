import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { router } from 'expo-router';
import { Spinner } from 'heroui-native';
import { useCallback, useMemo, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';
import { useInfiniteNews } from '@/hooks/src-news';
import type { NewsCardItem } from '@/types/news';

import { CategoryFilter, NewsCard, NewsEmpty, NewsError, NewsListSkeleton } from './components';

/**
 * Renders a fixed-height spacer used to separate list items.
 *
 * @returns A View element with a fixed height of 12px used as an item separator.
 */
function ItemSeparator() {
  return <View className="h-3" />;
}

/**
 * Render a footer that displays a centered loading spinner when more items are being loaded.
 *
 * @param isLoadingMore - Whether the list is currently loading additional items
 * @returns A View containing a centered Spinner when `isLoadingMore` is `true`, otherwise `null`
 */
function ListFooter({ isLoadingMore }: { isLoadingMore: boolean }) {
  if (!isLoadingMore) return null;
  return (
    <View className="items-center py-6">
      <Spinner size="sm" color="default" />
    </View>
  );
}

/**
 * Render the news listing screen with a category filter, pull-to-refresh, and infinite scroll.
 *
 * The component displays a header category selector, a list of news articles, an empty-state or loading skeleton when appropriate, and an error view with a retry action when loading fails. Selecting an article navigates to its detail screen; reaching the list end loads more pages.
 *
 * @returns The screen element that renders a category-filterable, refreshable, infinitely scrollable list of news articles
 */
export function NewsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteNews(selectedCategory);

  const articles = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.items);
  }, [data]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handlePress = useCallback((id: string) => {
    router.push({
      pathname: '/(protected)/(tabs)/(home)/src-news/news/[id]',
      params: { id },
    });
  }, []);

  const renderItem: ListRenderItem<NewsCardItem> = useCallback(
    ({ item }) => (
      <View className="px-4">
        <NewsCard article={item} onPress={() => handlePress(item.id)} />
      </View>
    ),
    [handlePress]
  );

  const keyExtractor = useCallback((item: NewsCardItem) => item.id, []);

  const listHeader = useMemo(
    () => (
      <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
    ),
    [selectedCategory]
  );

//   if (isLoading) {
//     return (
//       <View className="flex-1" style={{ backgroundColor: theme.background }}>
//         <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
//         <NewsListSkeleton />
//       </View>
//     );
//   }

  if (isError) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        <NewsError onRetry={refetch} />
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <FlashList
        data={articles}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={listHeader}
        ListFooterComponent={<ListFooter isLoadingMore={isFetchingNextPage} />}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        ListEmptyComponent={isLoading ? <NewsListSkeleton /> : <NewsEmpty />}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={theme.accent}
          />
        }
      />
    </View>
  );
}