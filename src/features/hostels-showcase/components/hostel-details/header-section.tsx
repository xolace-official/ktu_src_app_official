import { View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PressableFeedback } from 'heroui-native';
import { Heart, Share2, ChevronLeft } from 'lucide-react-native';

import { useTheme } from '@/hooks/use-theme';
import { blurhash } from '@/constants';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800';

interface HeaderSectionProps {
  image: string | null;
  onBack: () => void;
  onShare: () => void;
  onFavorite: () => void;
}

/**
 * Header section with hero image and navigation buttons
 * Uses gradient overlay for better text visibility
 */
export function HeaderSection({
  image,
  onBack,
  onShare,
  onFavorite,
}: HeaderSectionProps) {
  const { height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View className="relative w-full" style={{ height: screenHeight * 0.45 }}>
      <Image
        source={{ uri: image ?? FALLBACK_IMAGE }}
        style={{ flex: 1, width: '100%' }}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={300}
      />

      {/* Gradient overlay for navigation buttons */}
      <View
        className="absolute top-0 h-32 w-full"
        style={{
          backgroundColor: 'transparent',
          experimental_backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
        }}
      />

      {/* Navigation buttons */}
      <View className="absolute inset-x-5" style={{ top: insets.top + 8 }}>
        <View className="flex-row items-center justify-between">
          <PressableFeedback
            onPress={onBack}
            className="size-11 items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
          >
            <ChevronLeft size={24} color="#000" />
          </PressableFeedback>

          <View className="flex-row items-center gap-3">
            <PressableFeedback
              onPress={onFavorite}
              className="size-11 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
            >
              <Heart size={22} color={theme.text} />
            </PressableFeedback>
            <PressableFeedback
              onPress={onShare}
              className="size-11 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
            >
              <Share2 size={22} color={theme.text} />
            </PressableFeedback>
          </View>
        </View>
      </View>
    </View>
  );
}
