import { View } from 'react-native';
import { Card, Skeleton } from 'heroui-native';

/**
 * Renders a news card skeleton used as a placeholder while content loads.
 *
 * @returns A JSX element representing a card-shaped skeleton with a media placeholder, title and summary lines, and an author/avatar row.
 */
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

/**
 * Render a vertical list of news card skeletons.
 *
 * @param count - Number of skeleton cards to render (defaults to 3)
 * @returns A container View containing `count` NewsCardSkeleton items
 */
export function NewsListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <View className="gap-3 px-4">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </View>
  );
}

/**
 * Render a skeleton layout that mimics a news detail screen while content is loading.
 *
 * The layout includes a hero media placeholder, header meta placeholders, headline, author block, a divider, and multiple paragraph lines to simulate the article body.
 *
 * @returns A React element containing the composed skeleton placeholders for the news detail view.
 */
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