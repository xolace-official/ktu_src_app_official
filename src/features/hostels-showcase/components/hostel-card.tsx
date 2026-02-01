import { memo } from 'react';
import { View } from 'react-native';
import { PressableFeedback } from 'heroui-native';
import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import type { HostelCard as HostelCardType } from '@/types/hostels';

interface HostelCardProps {
  hostel: HostelCardType;
  onPress?: () => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400';

/**
 * Hostel card for the recommendations grid
 * Displays hostel image, name, rating, address, and price
 * Width is determined by parent container - use flex-1 or explicit width on parent
 */
export const HostelCard = memo(function HostelCard({ hostel, onPress }: HostelCardProps) {
  const theme = useTheme();

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
        borderRadius: 12,
        borderCurve: 'continuous',
        backgroundColor: theme.background,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      className="min-h-[44px] px-3 py-4"
    >
      {/* Rating Badge - Positioned over the image */}
      {hostel.rating != null && hostel.rating > 0 && (
        <View
          className="absolute right-4 top-4 z-10 flex-row items-center gap-0.5 rounded-full px-2 py-1"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <Star size={12} fill="#f9e406" color="#f9e406" />
          <ThemedText
            className="text-xs font-bold"
            style={{ color: '#191D31' }}
          >
            {hostel.rating.toFixed(1)}
          </ThemedText>
        </View>
      )}

      {/* Hostel Image */}
      <Image
        source={{ uri: hostel.image ?? FALLBACK_IMAGE }}
        style={{
          width: '100%',
          height: 160,
          borderRadius: 8,
        }}
        contentFit="cover"
        transition={200}
      />

      {/* Card Content */}
      <View className="mt-2 gap-0.5">
        <ThemedText className="text-base font-bold" numberOfLines={1}>
          {hostel.name}
        </ThemedText>

        {hostel.address && (
          <ThemedText
            type="small"
            themeColor="textSecondary"
            numberOfLines={1}
            className="text-xs"
          >
            {hostel.address}
          </ThemedText>
        )}

        <View className="mt-2 flex-row items-center justify-between">
          <ThemedText className="text-base font-bold" themeColor="accent">
            {formattedPrice}
          </ThemedText>
        </View>
      </View>
    </PressableFeedback>
  );
});
