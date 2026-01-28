import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Skeleton } from 'heroui-native';
import { SectionHeader } from '@/components/ui/section-header';
import { EventCard } from '../cards/event-card';
import { useUpcomingEvents } from '@/hooks/home/use-upcoming-events';

export function UpcomingEventsSection() {
  const { data, isLoading } = useUpcomingEvents(3);

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
    return null;
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
