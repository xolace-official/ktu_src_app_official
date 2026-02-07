import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import { Spinner } from 'heroui-native';
import { useCallback, useMemo, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';
import {
  useInfiniteAnnouncements,
  useInfiniteNotifications,
  useMarkNotificationRead,
} from '@/hooks/info-center';
import type { AnnouncementCardItem, InfoCenterTabKey, NotificationItem } from '@/types/info-center';

import {
  AnnouncementCard,
  AnnouncementsEmpty,
  AnnouncementsError,
  AnnouncementsListSkeleton,
  InfoCenterTabs,
  NotificationCard,
  NotificationsEmpty,
  NotificationsError,
  NotificationsListSkeleton,
} from './components';

function ListFooter({ isLoadingMore }: { isLoadingMore: boolean }) {
  if (!isLoadingMore) return null;
  return (
    <View className="items-center py-6">
      <Spinner size="sm" color="default" />
    </View>
  );
}

function AnnouncementsList() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteAnnouncements();

  const announcements = useMemo(() => {
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
      pathname: '/info-center/info/[id]',
      params: { id },
    });
  }, []);

  const renderItem: ListRenderItem<AnnouncementCardItem> = useCallback(
    ({ item }) => (
      <View className="px-4">
        <AnnouncementCard announcement={item} onPress={() => handlePress(item.id)} />
      </View>
    ),
    [handlePress]
  );

  const keyExtractor = useCallback((item: AnnouncementCardItem) => item.id, []);

  if (isLoading) return <AnnouncementsListSkeleton />;
  if (isError) return <AnnouncementsError onRetry={refetch} />;
  if (announcements.length === 0) return <AnnouncementsEmpty />;

  return (
    <FlashList
      data={announcements}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => <View className="h-3" />}
      ListFooterComponent={<ListFooter isLoadingMore={isFetchingNextPage} />}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ paddingTop: 4, paddingBottom: insets.bottom + 24 }}
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

function NotificationsList() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteNotifications();

  const { mutate: markRead } = useMarkNotificationRead();

  const notifications = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.items);
  }, [data]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handlePress = useCallback(
    (notification: NotificationItem) => {
      if (!notification.read) {
        markRead(notification.id);
      }

      if (notification.link_type === 'announcement' && notification.link_id) {
        router.push({
          pathname: '/info-center/info/[id]',
          params: { id: notification.link_id },
        });
      }
    },
    [markRead]
  );

  const renderItem: ListRenderItem<NotificationItem> = useCallback(
    ({ item }) => (
      <View className="px-4">
        <NotificationCard notification={item} onPress={() => handlePress(item)} />
      </View>
    ),
    [handlePress]
  );

  const keyExtractor = useCallback((item: NotificationItem) => item.id, []);

  if (isLoading) return <NotificationsListSkeleton />;
  if (isError) return <NotificationsError onRetry={refetch} />;
  if (notifications.length === 0) return <NotificationsEmpty />;

  return (
    <FlashList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => <View className="h-3" />}
      ListFooterComponent={<ListFooter isLoadingMore={isFetchingNextPage} />}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ paddingTop: 4, paddingBottom: insets.bottom + 24 }}
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

export function InfoCenterScreen() {
  const theme = useTheme();
  const { type } = useLocalSearchParams<{ type?: string }>();

  const [selectedTab, setSelectedTab] = useState<InfoCenterTabKey>(
    type === 'notifications' ? 'notifications' : 'announcements'
  );

  const handleTabChange = useCallback((tab: InfoCenterTabKey) => {
    setSelectedTab(tab);
  }, []);

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <InfoCenterTabs selected={selectedTab} onTabChange={handleTabChange} />
      {selectedTab === 'announcements' ? <AnnouncementsList /> : <NotificationsList />}
    </View>
  );
}
