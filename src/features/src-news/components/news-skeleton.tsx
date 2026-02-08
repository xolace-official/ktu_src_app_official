import { View } from 'react-native';
import { Card, Skeleton } from 'heroui-native';

function NewsCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <Skeleton className="aspect-video w-full" />
      <Card.Body className="gap-3 p-4">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <View className="mt-1 flex-row items-center gap-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-3 w-24 rounded-md" />
        </View>
      </Card.Body>
    </Card>
  );
}

export function NewsListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <View className="gap-3 px-4">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </View>
  );
}

export function NewsDetailSkeleton() {
  return (
    <View className="gap-4 p-4">
      <Skeleton className="aspect-video w-full rounded-xl" />
      <View className="flex-row items-center justify-between">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-4 w-28 rounded-md" />
      </View>
      <Skeleton className="h-8 w-3/4 rounded-md" />
      <View className="flex-row items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <View className="gap-1">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-3 w-20 rounded-md" />
        </View>
      </View>
      <Skeleton className="h-px w-full" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-5/6 rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-2/3 rounded-md" />
    </View>
  );
}
