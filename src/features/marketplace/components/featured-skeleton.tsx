import { View } from 'react-native';
import { Skeleton } from 'heroui-native';

export function FeaturedSkeleton() {
  return (
    <View className="flex-row flex-wrap justify-between">
      {[1, 2, 3, 4].map((i) => (
        <View key={i} className="mb-4 w-[48%] gap-2">
          <Skeleton className="h-36 w-full rounded-2xl" />
          <Skeleton className="h-4 w-3/4 rounded" />
          <Skeleton className="h-4 w-1/2 rounded" />
        </View>
      ))}
    </View>
  );
}
