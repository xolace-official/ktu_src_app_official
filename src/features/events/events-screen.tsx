import { FlashList, type ListRenderItem } from '@shopify/flash-list';
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

// Mock data - replace with actual hook when available
const MOCK_EVENTS: EventCardType[] = [
  {
    id: '1',
    title: 'Annual Tech Conference 2025',
    starts_at: '2025-03-15T09:00:00Z',
    location: 'Main Auditorium, Engineering Block',
    hero_image_url: null,
    category: 'Technology',
    attendees_count: 150,
  },
  {
    id: '2',
    title: 'Student Government Elections',
    starts_at: '2025-03-20T08:00:00Z',
    location: 'Student Union Building',
    hero_image_url: null,
    category: 'Campus',
    attendees_count: 500,
  },
  {
    id: '3',
    title: 'Career Fair & Networking Event',
    starts_at: '2025-03-25T10:00:00Z',
    location: 'Sports Complex',
    hero_image_url: null,
    category: 'Career',
    attendees_count: 320,
  },
  {
    id: '4',
    title: 'Cultural Night Festival',
    starts_at: '2025-04-01T18:00:00Z',
    location: 'Open Air Theatre',
    hero_image_url: null,
    category: 'Cultural',
    attendees_count: 800,
  },
];

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
function EmptyState({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return <EventsListSkeleton count={3} />;
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  // TODO: Replace with actual data hook
  // const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteEvents(selectedTab);
  const isLoading = false;
  const isFetchingNextPage = false;
  const events = MOCK_EVENTS;

  // Scroll handler for animations
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const handleTabChange = useCallback((tab: TabKeys) => {
    setSelectedTab(tab);
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // TODO: Replace with actual refetch
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);

  const handleLoadMore = useCallback(() => {
    // TODO: Implement with actual pagination
    // if (hasNextPage) {
    //   fetchNextPage();
    // }
  }, []);

  const handleFeaturedPress = useCallback(() => {
    // TODO: Navigate to featured event details
    console.log('Featured event pressed');
  }, []);

  const renderItem: ListRenderItem<EventCardType> = useCallback(
    ({ item }) => (
      <View className="px-4">
        <EventCard event={item} />
      </View>
    ),
    []
  );

  const keyExtractor = useCallback((item: EventCardType) => item.id, []);

  const ListHeaderComponent = useMemo(
    () => (
      <View style={{ paddingTop: insets.top }}>
        <EventsHeader
          scrollOffset={scrollOffset}
          onFeaturedPress={handleFeaturedPress}
        />
        <EventsTabs selected={selectedTab} onTabChange={handleTabChange} />
      </View>
    ),
    [scrollOffset, selectedTab, handleTabChange, handleFeaturedPress, insets.top]
  );

  const ListEmptyComponent = useMemo(
    () => <EmptyState isLoading={isLoading} />,
    [isLoading]
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
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.accent}
            progressViewOffset={insets.top + 100}
          />
        }
      />
    </View>
  );
}
