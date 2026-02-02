import { ScrollView, View } from 'react-native';
import { Skeleton } from 'heroui-native';
import { CategoryCard } from './category-card';
import type { MarketCategory } from '@/types/marketplace';

interface CategoriesScrollProps {
  categories: MarketCategory[];
  isLoading?: boolean;
  maxItems?: number;
}

/**
 * Renders a horizontal row of four square skeleton placeholders used while categories load.
 *
 * @returns A JSX element containing four 24x24 rounded skeletons arranged in a horizontal layout with spacing.
 */
function CategoriesSkeleton() {
  return (
    <View className="flex-row gap-3">
      {[1, 2, 3, 4].map((i) => (
        <View key={i} className="items-center gap-2">
          <Skeleton className="h-24 w-24 rounded-2xl" />
        </View>
      ))}
    </View>
  );
}

/**
 * Render a horizontal list of category cards or a compact loading skeleton.
 *
 * @param categories - Categories to display; only the first `maxItems` entries are shown.
 * @param isLoading - When `true`, renders a placeholder skeleton row instead of the categories.
 * @param maxItems - Maximum number of categories to render from `categories`.
 * @returns A React element containing either a horizontal ScrollView of `CategoryCard` components or a skeleton row.
 */
export function CategoriesScroll({
  categories,
  isLoading = false,
  maxItems = 6,
}: CategoriesScrollProps) {
  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  const displayCategories = categories.slice(0, maxItems);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12, paddingRight: 16 }}
    >
      {displayCategories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </ScrollView>
  );
}