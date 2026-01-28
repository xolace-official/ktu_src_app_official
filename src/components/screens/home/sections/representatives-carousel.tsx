import { useState, useCallback } from 'react';
import { View, Dimensions } from 'react-native';
import { interpolate } from 'react-native-reanimated';
import Carousel, { TAnimationStyle } from 'react-native-reanimated-carousel';
import { Skeleton } from 'heroui-native';
import { RepresentativeCard } from '../cards/representative-card';
import { ThemedText } from '@/components/themed-text';
import { useRepresentatives } from '@/hooks/home/use-representatives';
import type { Representative } from '@/types/home';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SCALE = 0.9;
const PAGE_HEIGHT = 190 * SCALE;

function PaginationIndicator({ total, current }: { total: number; current: number }) {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={`h-2 rounded-full ${
            index === current ? 'w-8 bg-accent' : 'w-2 bg-background-inverse'
          }`}
        />
      ))}
    </View>
  );
}

export function RepresentativesCarousel() {
  const { data, isLoading } = useRepresentatives();
  const [currentIndex, setCurrentIndex] = useState(0);

  const animationStyle: TAnimationStyle = useCallback((value: number) => {
    'worklet';
    const opacity = interpolate(value, [-1, 0, 1], [0, 1, 0]);
    const scale = interpolate(value, [-1, 0, 1], [0.85, 1, 0.85]);
    return {
      transform: [{ scale }],
      opacity,
    };
  }, []);

  if (isLoading) {
    return (
      <View className="w-full gap-2 px-4">
        <ThemedText className="text-base font-medium">Know your representatives</ThemedText>
        <Skeleton className="h-[180px] w-full rounded-2xl" />
      </View>
    );
  }

  if (!data?.length) {
    return null;
  }

  return (
    <View className="w-full">
      <ThemedText className="mb-1 px-4 text-base font-medium">Know your representatives</ThemedText>
      <Carousel
        loop={false}
        autoPlay
        autoPlayInterval={4000}
        style={{
          width: SCREEN_WIDTH,
          height: PAGE_HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        width={SCREEN_WIDTH}
        height={PAGE_HEIGHT}
        data={data}
        renderItem={({ item }: { item: Representative }) => (
          <RepresentativeCard representative={item} />
        )}
        customAnimation={animationStyle}
        onSnapToItem={(index) => setCurrentIndex(index)}
      />
      <PaginationIndicator total={data.length} current={currentIndex} />
    </View>
  );
}
