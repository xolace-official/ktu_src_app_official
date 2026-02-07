import { View } from 'react-native';
import { Card, Skeleton } from 'heroui-native';

function AnnouncementCardSkeleton() {
  return (
    <Card className="rounded-2xl">
      <Card.Body className="gap-3 p-4">
        <View className="flex-row gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </View>
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-3 w-16 rounded-md" />
      </Card.Body>
    </Card>
  );
}

function NotificationCardSkeleton() {
  return (
    <Card className="rounded-2xl">
      <Card.Body className="flex-row items-start gap-3 p-4">
        <Skeleton className="size-8 rounded-full" />
        <View className="flex-1 gap-2">
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-3 w-full rounded-md" />
          <Skeleton className="h-3 w-16 rounded-md" />
        </View>
      </Card.Body>
    </Card>
  );
}

export function AnnouncementsListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <View className="gap-3 px-4">
      {Array.from({ length: count }).map((_, i) => (
        <AnnouncementCardSkeleton key={i} />
      ))}
    </View>
  );
}

export function NotificationsListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <View className="gap-3 px-4">
      {Array.from({ length: count }).map((_, i) => (
        <NotificationCardSkeleton key={i} />
      ))}
    </View>
  );
}
