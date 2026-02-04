import { View, useWindowDimensions } from 'react-native';
import { Skeleton, Card } from 'heroui-native';

/**
 * Skeleton for a single event card
 */
export function EventCardSkeleton() {
  const { width } = useWindowDimensions();
  const cardWidth = width - 32;

  return (
    <Card className="overflow-hidden rounded-2xl" style={{ width: cardWidth }}>
      {/* Image placeholder */}
      <Skeleton className="h-40 w-full rounded-t-2xl" />

      {/* Content placeholder */}
      <Card.Body className="gap-3 p-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4 rounded-lg" />

        {/* Meta info */}
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </View>
          <View className="flex-row items-center gap-2">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </View>
          <View className="flex-row items-center gap-2">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </View>
        </View>
      </Card.Body>
    </Card>
  );
}

/**
 * Skeleton for multiple event cards in a list
 */
export function EventsListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <View className="gap-4 px-4">
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </View>
  );
}

/**
 * Skeleton for the events header section
 */
export function EventsHeaderSkeleton() {
  const { width } = useWindowDimensions();
  const imageHeight = width * 0.45;

  return (
    <View className="w-full">
      {/* Background skeleton */}
      <Skeleton className="h-60 w-full" variant="pulse" />

      {/* Featured card skeleton - overlapping */}
      <View className="relative z-10 px-4" style={{ marginTop: -(imageHeight * 0.35) }}>
        <Skeleton
          className="w-full rounded-2xl"
          style={{ height: imageHeight }}
        />
      </View>
    </View>
  );
}

/**
 * Skeleton for the tabs section
 */
export function EventsTabsSkeleton() {
  return (
    <View className="flex-row gap-3 px-4 py-3">
      <Skeleton className="h-10 flex-1 rounded-lg" />
      <Skeleton className="h-10 flex-1 rounded-lg" />
      <Skeleton className="h-10 flex-1 rounded-lg" />
    </View>
  );
}

/**
 * Complete events screen skeleton
 */
export function EventsScreenSkeleton() {
  return (
    <View className="flex-1 gap-4">
      <EventsHeaderSkeleton />
      <EventsTabsSkeleton />
      <EventsListSkeleton count={2} />
    </View>
  );
}
