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

function ItemSeparator() {
  return <View className="h-3" />;
}

function ListFooter({ isLoadingMore }: { isLoadingMore: boolean }) {
  if (!isLoadingMore) return null;
  return (
    <View className="items-center py-6">
      <Spinner size="sm" color="default" />
    </View>
  );
}

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

  if (isLoading) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        <NewsListSkeleton />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        <NewsError onRetry={refetch} />
      </View>
    );
  }

  if (articles.length === 0) {
    return (
      <View className="" >
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        <NewsEmpty />
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
