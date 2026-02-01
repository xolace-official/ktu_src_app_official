import { memo } from 'react';
import { Text } from 'react-native';
import { PressableFeedback } from 'heroui-native';
import { router } from 'expo-router';
import type { MarketCategory } from '@/types/marketplace';

interface CategoryCardProps {
  category: MarketCategory;
  onPress?: () => void;
}

export const CategoryCard = memo(function CategoryCard({ category, onPress }: CategoryCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push({
        pathname: '/marketplace-screen/category/[id]',
        params: { id: category.id, title: category.name },
      });
    }
  };

  return (
    <PressableFeedback
      onPress={handlePress}
      className="h-24 w-24 items-center justify-center rounded-2xl"
      style={{ backgroundColor: category.color ?? '#6B7280' }}
    >
      <Text className="text-3xl">{category.icon ?? '📦'}</Text>
      <Text className="mt-1 text-center text-sm font-semibold text-white" numberOfLines={1}>
        {category.name}
      </Text>
    </PressableFeedback>
  );
});
