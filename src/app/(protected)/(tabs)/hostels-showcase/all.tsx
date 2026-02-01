import { useCallback } from 'react';
import { View, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';

import { useRecommendedHostels } from '@/hooks/hostels';
import { useTheme } from '@/hooks/use-theme';
import { HostelCard, RecommendedHostelsSkeleton } from '@/features/hostels-showcase';
import { ThemedText } from '@/components/themed-text';
import type { HostelCard as HostelCardType } from '@/types/hostels';

export default function AllHostelsScreen() {
  const theme = useTheme();
  const {
    data: hostels = [],
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useRecommendedHostels(50); // Fetch more hostels for the all screen

  const handleHostelPress = useCallback((id: string) => {
    router.push(`/hostels-showcase/${id}`);
  }, []);

  const renderItem: ListRenderItem<HostelCardType> = useCallback(
    ({ item }) => (
      <View className="flex-1 px-2 pb-4">
        <HostelCard hostel={item} onPress={() => handleHostelPress(item.id)} />
      </View>
    ),
    [handleHostelPress]
  );

  const keyExtractor = useCallback((item: HostelCardType) => item.id, []);

  if (isLoading && !isRefetching) {
    return (
      <View
        className="flex-1 px-4 pt-4"
        style={{ backgroundColor: theme.background }}
      >
        <RecommendedHostelsSkeleton />
      </View>
    );
  }

  if (isError) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <ThemedText themeColor="textSecondary">
          Could not load hostels
        </ThemedText>
      </View>
    );
  }

  return (
    <FlashList
      data={hostels}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 8,
        paddingTop: 16,
        paddingBottom: 50,
      }}
      ListEmptyComponent={
        <View className="items-center py-10">
          <ThemedText themeColor="textSecondary">
            No hostels available
          </ThemedText>
        </View>
      }
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
