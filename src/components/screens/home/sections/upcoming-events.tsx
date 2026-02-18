import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Skeleton } from 'heroui-native';
import { CalendarX } from 'lucide-react-native';
import { SectionHeader } from '@/components/ui/section-header';
import { ThemedText } from '@/components/themed-text';
import { EventCard } from '../cards/event-card';
import { useUpcomingEvents } from '@/hooks/home/use-upcoming-events';
import { useTheme } from '@/hooks/use-theme';

export function UpcomingEventsSection() {
  const { data, isLoading } = useUpcomingEvents(3);
  const theme = useTheme();

  if (isLoading) {
    return (
      <View className="mx-4 gap-3 rounded-xl bg-background p-4" style={styles.container}>
        <SectionHeader title="UPCOMING EVENTS" showViewAll={false} />
        <View className="gap-3">
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </View>
      </View>
    );
  }

  if (!data?.length) {
    return (
      <View className="relative mt-15">
        <View className="z-10 mx-4 rounded-xl bg-background p-4" style={styles.container}>
          <SectionHeader title="UPCOMING EVENTS" showViewAll={false} />
          <View className="mt-4 items-center gap-2 py-4">
            <CalendarX size={32} color={theme.textSecondary} strokeWidth={1.5} />
            <ThemedText themeColor="textSecondary" className="text-sm">
              No upcoming events right now
            </ThemedText>
            <ThemedText themeColor="textSecondary" className="text-xs">
              Check back soon for new events
            </ThemedText>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="relative mt-15">
      <View className="z-10 mx-4 rounded-xl bg-background p-4" style={styles.container}>
        <SectionHeader
          title="UPCOMING EVENTS"
          onViewAllPress={() => router.push('/events')}
        />
        <View className="mt-4 gap-3">
          {data.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => router.push(`/events/${event.id}`)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
