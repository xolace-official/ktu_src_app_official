import { ScrollView, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from '@/hooks/use-theme';
import { HomeHeader } from './home-header';
import {
  UpdatesCarousel,
  RepresentativesCarousel,
  UpcomingEventsSection,
  CampusNewsSection,
  ActiveProjectsSection,
  MarketCTA,
} from './sections';

export function HomeScreen() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey[0];
        return [
          'spotlights',
          'representatives',
          'upcoming-events',
          'campus-news',
          'active-projects',
        ].includes(key as string);
      },
    });
    setRefreshing(false);
  }, [queryClient]);

  return (
    <SafeAreaView
      edges={['top', 'right', 'left', 'bottom']}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <StatusBar style="auto" />
      <HomeHeader />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="pt-4 pb-4">
          <UpdatesCarousel />
        </View>

        <View className="mt-4">
          <RepresentativesCarousel />
        </View>

        <View className="mt-5">
          <UpcomingEventsSection />
        </View>

        <View className="mt-10">
          <CampusNewsSection />
        </View>

        <View className="mt-10">
          <ActiveProjectsSection />
        </View>

        <View className="mt-8">
          <MarketCTA />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
