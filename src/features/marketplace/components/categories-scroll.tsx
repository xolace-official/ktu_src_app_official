import { ScrollView, View } from 'react-native';
import { Skeleton } from 'heroui-native';
import { CategoryCard } from './category-card';
import type { MarketCategory } from '@/types/marketplace';

interface CategoriesScrollProps {
  categories: MarketCategory[];
  isLoading?: boolean;
  maxItems?: number;
}

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
