import { View, useWindowDimensions } from 'react-native';
import { SkeletonGroup, Divider } from 'heroui-native';

import { useTheme } from '@/hooks/use-theme';

/**
 * Loading skeleton for the hostel details screen
 * Shows placeholder UI while data is being fetched
 */
export function LoadingSkeleton() {
  const theme = useTheme();
  const { height: screenHeight } = useWindowDimensions();

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <SkeletonGroup isLoading isSkeletonOnly>
        {/* Hero image skeleton */}
        <SkeletonGroup.Item
          className="w-full"
          style={{ height: screenHeight * 0.45 }}
        />

        <View className="gap-4 px-5 pt-6">
          {/* Title */}
          <SkeletonGroup.Item className="h-8 w-3/4 rounded-lg" />

          {/* Type and rating chips */}
          <View className="flex-row gap-3">
            <SkeletonGroup.Item className="h-8 w-24 rounded-full" />
            <SkeletonGroup.Item className="h-8 w-16 rounded-full" />
          </View>

          {/* Beds and baths */}
          <View className="flex-row gap-6 pt-4">
            <View className="flex-row items-center gap-2">
              <SkeletonGroup.Item className="size-10 rounded-full" />
              <SkeletonGroup.Item className="h-4 w-16 rounded-md" />
            </View>
            <View className="flex-row items-center gap-2">
              <SkeletonGroup.Item className="size-10 rounded-full" />
              <SkeletonGroup.Item className="h-4 w-16 rounded-md" />
            </View>
          </View>

          <Divider className="my-4" />

          {/* Agent section */}
          <SkeletonGroup.Item className="h-6 w-20 rounded-md" />
          <View className="flex-row items-center gap-3">
            <SkeletonGroup.Item className="size-12 rounded-full" />
            <View className="flex-1 gap-2">
              <SkeletonGroup.Item className="h-5 w-32 rounded-md" />
              <SkeletonGroup.Item className="h-4 w-48 rounded-md" />
            </View>
          </View>

          {/* Overview */}
          <SkeletonGroup.Item className="mt-4 h-6 w-24 rounded-md" />
          <SkeletonGroup.Item className="h-4 w-full rounded-md" />
          <SkeletonGroup.Item className="h-4 w-full rounded-md" />
          <SkeletonGroup.Item className="h-4 w-2/3 rounded-md" />
        </View>
      </SkeletonGroup>
    </View>
  );
}
