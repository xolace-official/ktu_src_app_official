import { View, ScrollView } from 'react-native';
import { SkeletonGroup, Surface, Divider } from 'heroui-native';

function SkeletonRow() {
  return (
    <View className="min-h-[48px] flex-row items-center px-4 py-3">
      <SkeletonGroup.Item className="size-[30px] rounded-lg" />
      <View className="ml-3 flex-1 gap-1.5">
        <SkeletonGroup.Item className="h-3 w-20 rounded-md" />
        <SkeletonGroup.Item className="h-4 w-36 rounded-md" />
      </View>
    </View>
  );
}

function SkeletonSection({ rows }: { rows: number }) {
  return (
    <View>
      <SkeletonGroup.Item className="mb-1.5 ml-4 h-3 w-28 rounded-md" />
      <Surface variant="secondary" className="overflow-hidden rounded-xl p-0">
        {Array.from({ length: rows }).map((_, index) => (
          <View key={index}>
            {index > 0 && <Divider className="ml-[54px]" />}
            <SkeletonRow />
          </View>
        ))}
      </Surface>
    </View>
  );
}

export function ProfileLoadingSkeleton() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="pb-10 bg-background"
    >
      <SkeletonGroup isLoading isSkeletonOnly>
        {/* Header */}
        <View className="items-center py-8">
          <SkeletonGroup.Item className="size-20 rounded-full" />
          <SkeletonGroup.Item className="mt-3 h-6 w-40 rounded-md" />
          <SkeletonGroup.Item className="mt-2 h-4 w-48 rounded-md" />
        </View>

        {/* Sections */}
        <View className="gap-6 px-4">
          <SkeletonSection rows={3} />
          <SkeletonSection rows={4} />
          <SkeletonSection rows={2} />
        </View>
      </SkeletonGroup>
    </ScrollView>
  );
}
