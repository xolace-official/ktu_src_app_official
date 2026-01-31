import { memo } from 'react';
import { View, Dimensions } from 'react-native';
import { Card, PressableFeedback } from 'heroui-native';
import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import type { FeaturedListing } from '@/types/marketplace';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2; // 16px padding on each side + 16px gap

interface ProductCardProps {
  product: FeaturedListing;
  onPress?: () => void;
}

export const ProductCard = memo(function ProductCard({ product, onPress }: ProductCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push({
        pathname: '/marketplace-screen/product/[id]',
        params: { id: product.id },
      });
    }
  };

  return (
    <PressableFeedback
      onPress={handlePress}
      style={{ width: CARD_WIDTH }}
      className="min-h-[44px]"
    >
      <Card className="overflow-hidden rounded-2xl bg-surface-secondary">
        <Image
          source={
            product.hero_image_url
              ? { uri: product.hero_image_url }
              : require('@/assets/images/icon.png')
          }
          className='rounded-t-xl'
          style={{ width: '100%', height: 140 }}
          contentFit="cover"
          transition={200}
        />
        <Card.Body className="p-3">
          <ThemedText className="font-semibold" numberOfLines={1}>
            {product.title}
          </ThemedText>
          <View className="mt-1 flex-row items-center justify-between">
            <ThemedText className="text-lg font-bold" themeColor="accent">
              {'\u20B5'}{product.price.toFixed(2)}
            </ThemedText>
            <View className="flex-row items-center gap-1">
              <Star size={14} fill="#FFD700" color="#FFD700" />
              <ThemedText type="small" themeColor="textSecondary">
                {product.rating.toFixed(1)}
              </ThemedText>
            </View>
          </View>
        </Card.Body>
      </Card>
    </PressableFeedback>
  );
});
