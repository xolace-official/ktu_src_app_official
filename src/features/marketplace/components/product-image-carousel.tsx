import { useState, useCallback } from 'react';
import { View, ScrollView, useWindowDimensions, type NativeScrollEvent } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '@/hooks/use-theme';

interface ProductImageCarouselProps {
  images: string[];
}

export function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  const theme = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(
    (event: { nativeEvent: NativeScrollEvent }) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(offsetX / screenWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < images.length) {
        setActiveIndex(newIndex);
      }
    },
    [activeIndex, screenWidth, images.length]
  );

  if (images.length === 0) {
    return (
      <View
        className="items-center justify-center bg-surface-secondary"
        style={{ width: screenWidth, height: screenWidth }}
      >
        <View className="size-20 items-center justify-center rounded-full bg-surface-tertiary">
          <Image
            source={require('@/assets/images/marketplace/img.png')}
            style={{ width: 40, height: 40, opacity: 0.5 }}
          />
        </View>
      </View>
    );
  }

  return (
    <View className="bg-surface-secondary" style={{ width: screenWidth, height: screenWidth }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {images.map((uri, index) => (
          <Animated.View key={`${uri}-${index}`} entering={FadeIn.duration(300)}>
            <Image
              source={{ uri }}
              style={{
                width: screenWidth,
                height: screenWidth,
              }}
              contentFit="contain"
              transition={200}
            />
          </Animated.View>
        ))}
      </ScrollView>

      {/* Pagination dots */}
      {images.length > 1 && (
        <View className="absolute bottom-3 flex-row self-center gap-1.5">
          {images.map((_, index) => (
            <Animated.View
              key={index}
              entering={FadeIn.delay(index * 50)}
              style={{
                width: index === activeIndex ? 20 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: index === activeIndex ? theme.accent : `${theme.text}30`,
                borderCurve: 'continuous',
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
}
