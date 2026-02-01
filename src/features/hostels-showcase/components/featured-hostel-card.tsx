import { ThemedText } from '@/components/themed-text';
import type { HostelCard } from '@/types/hostels';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { PressableFeedback } from 'heroui-native';
import { Star } from 'lucide-react-native';
import { memo } from 'react';
import { View } from 'react-native';

interface FeaturedHostelCardProps {
  hostel: HostelCard;
  onPress?: () => void;
}

export const CARD_WIDTH = 240;
export const CARD_HEIGHT = 288;

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400';

/**
 * Featured hostel card for horizontal carousel
 * Larger card with prominent image and gradient overlay content
 */
export const FeaturedHostelCard = memo(function FeaturedHostelCard({
  hostel,
  onPress,
}: FeaturedHostelCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(hostel.price);

  return (
    <PressableFeedback
      onPress={onPress}
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 16,
        borderCurve: 'continuous',
        overflow: 'hidden',
      }}
      className="min-h-[44px]"
    >
      {/* Background Image */}
      <Image
        source={{ uri: hostel.image ?? FALLBACK_IMAGE }}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        contentFit="cover"
        transition={200}
      />

      {/* Gradient Overlay - from transparent to dark at bottom */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        locations={[0, 0.5, 1]}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />

      {/* Rating Badge - Top Right */}
      {hostel.rating != null && hostel.rating > 0 && (
        <View
          className="absolute right-4 top-4 flex-row items-center gap-1 rounded-full px-3 py-1.5"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <Star size={14} fill="#f9e406" color="#f9e406" />
          <ThemedText
            className="text-xs font-bold"
            style={{ color: '#191D31' }}
          >
            {hostel.rating.toFixed(1)}
          </ThemedText>
        </View>
      )}

      {/* Content Overlay - Bottom */}
      <View className="absolute inset-x-5 bottom-5 gap-1">
        <ThemedText
          className="text-xl font-extrabold"
          style={{ color: '#FFFFFF' }}
          numberOfLines={1}
        >
          {hostel.name}
        </ThemedText>

        {hostel.address && (
          <ThemedText
            className="text-base"
            style={{ color: 'rgba(255,255,255,0.9)' }}
            numberOfLines={1}
          >
            {hostel.address}
          </ThemedText>
        )}

        <View className="mt-1 flex-row items-center justify-between">
          <ThemedText
            className="text-xl font-extrabold"
            style={{ color: '#FFFFFF' }}
          >
            {formattedPrice}
          </ThemedText>
        </View>
      </View>
    </PressableFeedback>
  );
});
