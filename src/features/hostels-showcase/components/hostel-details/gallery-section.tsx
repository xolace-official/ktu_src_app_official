import { useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { PressableFeedback } from 'heroui-native';

import { ThemedText } from '@/components/themed-text';
import { blurhash } from '@/constants';
import type { HostelGalleryItem } from '@/types/hostels';

interface GallerySectionProps {
  gallery: HostelGalleryItem[];
}

/**
 * Gallery section with horizontal scroll
 * Uses expo-image for optimized loading
 */
export function GallerySection({ gallery }: GallerySectionProps) {
  const renderItem = useCallback(
    ({ item }: { item: HostelGalleryItem }) => (
      <PressableFeedback
        className="mr-3 overflow-hidden rounded-xl"
        style={{ borderCurve: 'continuous' }}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 160, height: 160 }}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={200}
        />
      </PressableFeedback>
    ),
    []
  );

  const keyExtractor = useCallback((item: HostelGalleryItem) => item.id, []);

  if (gallery.length === 0) return null;

  return (
    <View className="mt-7">
      <ThemedText className="text-xl font-bold">Gallery</ThemedText>
      <FlatList
        data={gallery}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12 }}
      />
    </View>
  );
}
