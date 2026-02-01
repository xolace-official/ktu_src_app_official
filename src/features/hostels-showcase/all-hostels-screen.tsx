import { useMemo, useCallback, useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, useWindowDimensions } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { SkeletonGroup, Spinner, PressableFeedback, Button } from 'heroui-native';
import { Grid2x2, LayoutList } from 'lucide-react-native';

import { useTheme } from '@/hooks/use-theme';
import { useInfiniteHostels } from '@/hooks/hostels';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { HostelCard } from './components';
import { ThemedText } from '@/components/themed-text';
import type { HostelCard as HostelCardType } from '@/types/hostels';

const GRID_GAP = 16;
const HORIZONTAL_PADDING = 16;

/**
 * Skeleton loader for a single hostel card
 */
function HostelCardSkeleton({ width }: { width: number }) {
  return (
    <SkeletonGroup
      isLoading
      isSkeletonOnly
      className="rounded-xl"
      style={{
        width,
        borderCurve: 'continuous',
        overflow: 'hidden',
      }}
    >
      <SkeletonGroup.Item
        className="w-full"
        style={{ height: 160, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      />
      <View className="gap-2 p-3">
        <SkeletonGroup.Item className="h-5 w-3/4 rounded-md" />
        <SkeletonGroup.Item className="h-3 w-1/2 rounded-md" />
        <SkeletonGroup.Item className="mt-1 h-5 w-1/3 rounded-md" />
      </View>
    </SkeletonGroup>
  );
}

/**
 * Loading skeleton grid
 */
function LoadingSkeleton({ cardWidth }: { cardWidth: number }) {
  return (
    <View className="flex-row flex-wrap justify-between px-4 pt-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} className="mb-4">
          <HostelCardSkeleton width={cardWidth} />
        </View>
      ))}
    </View>
  );
}

/**
 * Empty state component
 */
function EmptyState({
  search,
  isError,
  errorMessage,
  onRetry,
}: {
  search: string;
  isError: boolean;
  errorMessage?: string;
  onRetry: () => void;
}) {
  const theme = useTheme();

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center gap-4 py-20">
        <ThemedText themeColor="textSecondary" className="text-center text-lg font-semibold">
          Failed to load hostels
        </ThemedText>
        <ThemedText themeColor="textSecondary" className="text-center text-sm">
          {errorMessage ?? 'Please try again.'}
        </ThemedText>
        <Button
          size="sm"
          variant="tertiary"
          onPress={onRetry}
          className="mt-2"
          style={{ borderColor: theme.accent }}
        >
          <Button.Label style={{ color: theme.accent }}>Tap to retry</Button.Label>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center py-20">
      <ThemedText themeColor="textSecondary" className="text-center text-lg">
        {search ? `No hostels found for "${search}"` : 'No hostels available'}
      </ThemedText>
      <ThemedText themeColor="textSecondary" className="mt-2 text-center text-sm">
        {search ? 'Try adjusting your search' : 'Check back later'}
      </ThemedText>
    </View>
  );
}

/**
 * Loading footer for infinite scroll
 */
function LoadingFooter() {
  return (
    <View className="items-center py-6">
      <Spinner size="sm" />
    </View>
  );
}

/**
 * Section header with title, count, and view mode toggle
 */
function SectionHeader({
  currentCount,
  totalCount,
  viewMode,
  onToggleViewMode,
}: {
  currentCount: number;
  totalCount: number;
  viewMode: 1 | 2;
  onToggleViewMode: () => void;
}) {
  const theme = useTheme();

  return (
    <View className="flex-row items-center justify-between px-4 py-4">
      <View>
        <ThemedText className="text-lg font-semibold">All available hostels</ThemedText>
        {totalCount > 0 && (
          <ThemedText themeColor="textSecondary" className="text-xs">
            Showing {currentCount} of {totalCount} hostels
          </ThemedText>
        )}
      </View>
      <PressableFeedback
        onPress={onToggleViewMode}
        className="size-10 items-center justify-center rounded-lg bg-surface"
      >
        {viewMode === 2 ? (
          <LayoutList size={20} color={theme.text} />
        ) : (
          <Grid2x2 size={20} color={theme.text} />
        )}
      </PressableFeedback>
    </View>
  );
}

/**
 * All hostels screen with infinite scrolling and search
 *
 * Improvements over reference code:
 * - Uses native headerSearchBarOptions (follows Apple HIG)
 * - Uses HeroUI Native components
 * - Responsive layout with useWindowDimensions
 * - Better error handling with retry
 * - Removed redundant hero image (home screen has it)
 * - Proper TypeScript typing
 */
export function AllHostelsScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { width: screenWidth } = useWindowDimensions();

  // View mode: 1 = single column, 2 = two columns
  const [viewMode, setViewMode] = useState<1 | 2>(2);
  const toggleViewMode = useCallback(() => {
    setViewMode((v) => (v === 2 ? 1 : 2));
  }, []);

  // Calculate card width based on screen size and view mode
  const cardWidth = useMemo(() => {
    if (viewMode === 1) {
      return screenWidth - HORIZONTAL_PADDING * 2;
    }
    return (screenWidth - HORIZONTAL_PADDING * 2 - GRID_GAP) / 2;
  }, [screenWidth, viewMode]);

  // Search state managed by native header search bar
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 400);

  // Configure native header with search bar
  useEffect(() => {
    navigation.setOptions({
      title: 'Hostels',
      headerSearchBarOptions: {
        placeholder: 'Search hostels...',
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

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteHostels(debouncedSearch);

  // Flatten pages into single array
  const hostels = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  // Total count from first page
  const totalCount = data?.pages[0]?.count ?? 0;

  const handleHostelPress = useCallback((id: string) => {
    router.push(`/hostels-showcase/${id}`);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: HostelCardType }) => (
      <View
        style={{
          width: cardWidth,
          marginBottom: GRID_GAP,
        }}
      >
        <HostelCard hostel={item} onPress={() => handleHostelPress(item.id)} />
      </View>
    ),
    [cardWidth, handleHostelPress]
  );

  const keyExtractor = useCallback((item: HostelCardType) => item.id, []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const ListHeaderComponent = useMemo(
    () => (
      <SectionHeader
        currentCount={hostels.length}
        totalCount={totalCount}
        viewMode={viewMode}
        onToggleViewMode={toggleViewMode}
      />
    ),
    [hostels.length, totalCount, viewMode, toggleViewMode]
  );

  // Show loading skeleton on initial load
  if (isLoading && !isRefetching) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        <SectionHeader
          currentCount={0}
          totalCount={0}
          viewMode={viewMode}
          onToggleViewMode={toggleViewMode}
        />
        <LoadingSkeleton cardWidth={cardWidth} />
      </View>
    );
  }

  return (
    <FlatList
      key={viewMode} // Force re-render when view mode changes
      data={hostels}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={viewMode}
      columnWrapperStyle={viewMode === 2 ? { justifyContent: 'space-between' } : undefined}
      contentContainerStyle={{
        paddingHorizontal: HORIZONTAL_PADDING,
        paddingBottom: 32,
        flexGrow: 1,
      }}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.background }}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <EmptyState
          search={debouncedSearch}
          isError={isError}
          errorMessage={(error as Error)?.message}
          onRetry={refetch}
        />
      }
      ListFooterComponent={isFetchingNextPage ? <LoadingFooter /> : null}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      keyboardShouldPersistTaps="handled"
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
