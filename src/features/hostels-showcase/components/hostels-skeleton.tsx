import { Skeleton, SkeletonGroup } from 'heroui-native';
import { View } from 'react-native';

import {
  CARD_HEIGHT,
  CARD_WIDTH,
} from './featured-hostel-card';

/**
 * Skeleton loader for the featured hostels horizontal carousel
 */
export function FeaturedHostelsSkeleton() {
  return (
    <SkeletonGroup isLoading className="flex-row gap-4">
      {[1, 2].map((i) => (
        <View key={i} style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
          <SkeletonGroup.Item className="h-full w-full rounded-2xl" />
        </View>
      ))}
    </SkeletonGroup>
  );
}

/**
 * Skeleton loader for the recommended hostels grid
 */
export function RecommendedHostelsSkeleton() {
  return (
    <View className="flex-row flex-wrap justify-between px-4">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonGroup key={i} isLoading className="mb-4 w-[48%] gap-2">
          <SkeletonGroup.Item className="h-32 w-full rounded-2xl" />
          <SkeletonGroup.Item className="h-4 w-3/4 rounded" />
          <SkeletonGroup.Item className="h-3 w-1/2 rounded" />
          <SkeletonGroup.Item className="h-4 w-2/3 rounded" />
        </SkeletonGroup>
      ))}
    </View>
  );
}

/**
 * Combined skeleton for the full hostels home screen
 */
export function HostelsHomeSkeleton() {
  return (
    <View className="gap-6">
      {/* Hero Image Skeleton */}
      <Skeleton className="h-72 w-full" />

      {/* Featured Section Skeleton */}
      <View className="gap-4 px-4">
        <Skeleton className="h-6 w-24 rounded" />
        <FeaturedHostelsSkeleton />
      </View>

      {/* Recommendations Section Skeleton */}
      <View className="gap-4">
        <View className="flex-row items-center justify-between px-4">
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </View>
        <RecommendedHostelsSkeleton />
      </View>
    </View>
  );
}
