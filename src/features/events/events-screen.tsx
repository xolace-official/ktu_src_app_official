import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { router } from 'expo-router';
import { Spinner } from 'heroui-native';
import { useCallback, useMemo, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useFeaturedEvent, useInfiniteEvents } from '@/hooks/events';
import { useTheme } from '@/hooks/use-theme';
import type { EventCard as EventCardType, TabKeys } from '@/types/events';
import {
  EventCard,
  EventsHeader,
  EventsListSkeleton,
  EventsTabs,
} from './components';

// Create animated FlashList
const AnimatedFlashList = Animated.createAnimatedComponent(
  FlashList<EventCardType>
);

// Header height for scroll-based animations
const HEADER_SCROLL_THRESHOLD = 280;

/**
 * Floating header that appears when scrolling past the main header
 */
function FloatingHeader({
  scrollOffset,
  title,
}: {
  scrollOffset: SharedValue<number>;
  title: string;
}) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffset.value,
      [HEADER_SCROLL_THRESHOLD - 100, HEADER_SCROLL_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    ),
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [HEADER_SCROLL_THRESHOLD - 100, HEADER_SCROLL_THRESHOLD],
          [-20, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        headerAnimatedStyle,
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          paddingTop: insets.top,
          paddingHorizontal: 16,
          paddingBottom: 12,
          backgroundColor: theme.background,
          borderBottomWidth: 0.5,
          borderBottomColor: theme.cardBorder,
        },
      ]}
    >
      <ThemedText className="text-xl font-bold">{title}</ThemedText>
    </Animated.View>
  );
}

/**
 * Empty state component
 */
function EmptyState({ isLoading, isError }: { isLoading: boolean; isError: boolean }) {
  if (isLoading) {
    return <EventsListSkeleton count={3} />;
  }

  if (isError) {
    return (
      <View className="items-center justify-center py-16">
        <ThemedText themeColor="textSecondary">Failed to load events</ThemedText>
      </View>
    );
  }

  return (
    <View className="items-center justify-center py-16">
      <ThemedText themeColor="textSecondary">No events found</ThemedText>
    </View>
  );
}

/**
 * List footer with loading spinner
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
 * Main events screen component
 */
export function EventsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);

  const [selectedTab, setSelectedTab] = useState<TabKeys>('featured');

  // Fetch events data with infinite query
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteEvents(selectedTab);

  // Fetch featured event for header
  const { data: featuredEvent } = useFeaturedEvent();

  // Flatten paginated data into a single array
  const events = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.items);
  }, [data]);

  // Scroll handler for animations
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const handleTabChange = useCallback((tab: TabKeys) => {
    setSelectedTab(tab);
  }, []);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleFeaturedPress = useCallback(() => {
    if (featuredEvent?.id) {
      router.push({
        pathname: '/events/[id]',
        params: { id: featuredEvent.id },
      });
    }
  }, [featuredEvent?.id]);

  const handleEventPress = useCallback((eventId: string) => {
    router.push({
      pathname: '/events/[id]',
      params: { id: eventId },
    });
  }, []);

  const renderItem: ListRenderItem<EventCardType> = useCallback(
    ({ item }) => (
      <View className="px-4">
        <EventCard event={item} onPress={() => handleEventPress(item.id)} />
      </View>
    ),
    [handleEventPress]
  );

  const keyExtractor = useCallback((item: EventCardType) => item.id, []);

  const ListHeaderComponent = useMemo(
    () => (
      <View style={{ paddingTop: insets.top }}>
        <EventsHeader
          scrollOffset={scrollOffset}
          featuredEventImage={featuredEvent?.hero_image_url}
          featuredEventDate={featuredEvent?.starts_at ? new Date(featuredEvent.starts_at) : undefined}
          onFeaturedPress={handleFeaturedPress}
        />
        <EventsTabs selected={selectedTab} onTabChange={handleTabChange} />
      </View>
    ),
    [
      scrollOffset,
      selectedTab,
      handleTabChange,
      handleFeaturedPress,
      featuredEvent,
      insets.top,
    ]
  );

  const ListEmptyComponent = useMemo(
    () => <EmptyState isLoading={isLoading} isError={isError} />,
    [isLoading, isError]
  );

  const ListFooterComponent = useMemo(
    () => <ListFooter isLoadingMore={isFetchingNextPage} />,
    [isFetchingNextPage]
  );

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Floating Header */}
      <FloatingHeader scrollOffset={scrollOffset} title="Events" />

      {/* Main List */}
      <AnimatedFlashList
        data={events}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 24,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            tintColor={theme.accent}
            progressViewOffset={insets.top + 100}
          />
        }
      />
    </View>
  );
}
