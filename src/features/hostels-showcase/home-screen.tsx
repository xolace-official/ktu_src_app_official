import { useCallback, useLayoutEffect } from 'react';
import { View, FlatList, RefreshControl, useWindowDimensions } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  Extrapolation,
  type SharedValue,
} from 'react-native-reanimated';

import { useTheme } from '@/hooks/use-theme';
import { useFeaturedHostels, useRecommendedHostels } from '@/hooks/hostels';
import {
  HostelCard,
  FeaturedHostelCard,
  SectionHeader,
  FeaturedHostelsSkeleton,
  RecommendedHostelsSkeleton,
} from './components';
import { ThemedText } from '@/components/themed-text';
import type { HostelCard as HostelCardType } from '@/types/hostels';
import { useThemeColor } from 'heroui-native';

const IMG_HEIGHT = 280;

// Create animated FlashList for scroll-driven animations
const AnimatedFlashList = Animated.createAnimatedComponent(
  FlashList<HostelCardType>
);

/**
 * Featured hostels horizontal carousel section
 */
function FeaturedSection({
  hostels,
  isLoading,
  isError,
  onHostelPress,
}: {
  hostels: HostelCardType[];
  isLoading: boolean;
  isError: boolean;
  onHostelPress: (id: string) => void;
}) {
  if (isLoading) {
    return <FeaturedHostelsSkeleton />;
  }

  if (isError) {
    return (
      <View className="items-center py-6">
        <ThemedText themeColor="textSecondary">
          Could not load featured hostels
        </ThemedText>
      </View>
    );
  }

  if (!hostels.length) {
    return (
      <View className="items-center py-6">
        <ThemedText themeColor="textSecondary">
          No featured hostels available
        </ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={hostels}
      renderItem={({ item }) => (
        <FeaturedHostelCard hostel={item} onPress={() => onHostelPress(item.id)} />
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
    />
  );
}

/**
 * List header component with hero image and sections
 */
function ListHeader({
  scrollOffset,
  onHostelPress,
  onSeeAllPress,
}: {
  scrollOffset: SharedValue<number>;
  onHostelPress: (id: string) => void;
  onSeeAllPress: () => void;
}) {
  const { width } = useWindowDimensions();
  const theme = useTheme();

  const {
    data: featuredHostels = [],
    isLoading: featuredLoading,
    isError: featuredError,
  } = useFeaturedHostels();

  // Parallax effect for hero image
  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-IMG_HEIGHT, 0, IMG_HEIGHT],
          [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
          Extrapolation.CLAMP
        ),
      },
      {
        scale: interpolate(
          scrollOffset.value,
          [-IMG_HEIGHT, 0, IMG_HEIGHT],
          [2, 1, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <View style={{ backgroundColor: theme.background }}>
      {/* Hero Image with Parallax - use negative margin to counter list padding */}
      <View
        style={{
          height: IMG_HEIGHT,
          overflow: 'hidden',
          marginHorizontal: -8,
        }}
      >
        <Animated.View style={[{ height: IMG_HEIGHT, width: width + 16 }, imageAnimatedStyle]}>
          <Image
            source={require('@/assets/images/hostels-showcase/House-For-Rent1.png')}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={300}
          />
          {/* Gradient overlay for better text visibility */}
          <View
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}
          />
        </Animated.View>
      </View>

      {/* Featured Section */}
      <View className="mt-6 gap-4">
        <View className="px-4">
          <SectionHeader title="Featured" />
        </View>
        <FeaturedSection
          hostels={featuredHostels}
          isLoading={featuredLoading}
          isError={featuredError}
          onHostelPress={onHostelPress}
        />
      </View>

      {/* Recommendations Section Header */}
      <View className="mt-6 px-4">
        <SectionHeader
          title="Our Recommendations"
          onActionPress={onSeeAllPress}
        />
      </View>
    </View>
  );
}

/**
 * Empty state when no recommendations are available
 */
function EmptyState({
  isLoading,
  isError,
}: {
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) {
    return <RecommendedHostelsSkeleton />;
  }

  if (isError) {
    return (
      <View className="items-center py-10">
        <ThemedText themeColor="textSecondary">
          Could not load recommended hostels
        </ThemedText>
      </View>
    );
  }

  return (
    <View className="items-center py-10">
      <ThemedText themeColor="textSecondary">
        No recommended hostels available
      </ThemedText>
    </View>
  );
}

/**
 * Main hostels showcase home screen
 */
export function HostelsHomeScreen() {
  const primaryColor = useThemeColor('accent')
  const theme = useTheme();
  const navigation = useNavigation();
  const scrollOffset = useSharedValue(0);

  const {
    data: recommendedHostels = [],
    isLoading: recommendedLoading,
    isError: recommendedError,
    refetch,
    isRefetching,
  } = useRecommendedHostels();

  // Scroll handler for parallax effect
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  // Animated header background opacity
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffset.value,
      [0, IMG_HEIGHT / 1.5],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const handleHostelPress = useCallback((id: string) => {
    router.push({
      pathname: '/hostels-showcase/hostel/[id]',
      params: { id },
    });
  }, []);

  const handleSeeAllPress = useCallback(() => {
    router.push('/hostels-showcase/all');
  }, []);

  const handleSharePress = useCallback(async () => {
    // TODO: Implement share functionality
    console.log('Share hostels');
  }, []);

  const handleFavoritePress = useCallback(() => {
    // TODO: Implement favorites
    console.log('Favorites');
  }, []);

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View
          style={[
            headerAnimatedStyle,
            {
              backgroundColor: theme.background,
              height: 120,
              borderBottomWidth: 0.5,
              borderBottomColor: theme.cardBorder,
            },
          ]}
        />
      ),
      // headerRight: () => (
      //   <HeaderButtons
      //     onSharePress={handleSharePress}
      //     onFavoritePress={handleFavoritePress}
      //   />
      // ),
    });
  }, [navigation, headerAnimatedStyle, theme, handleSharePress, handleFavoritePress]);

  const renderItem: ListRenderItem<HostelCardType> = useCallback(
    ({ item }) => (
      <View className="flex-1 px-2">
        <HostelCard hostel={item} onPress={() => handleHostelPress(item.id)} />
      </View>
    ),
    [handleHostelPress]
  );

  const keyExtractor = useCallback((item: HostelCardType) => item.id, []);

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <AnimatedFlashList
        data={recommendedHostels}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        ListHeaderComponent={
          <ListHeader
            scrollOffset={scrollOffset}
            onHostelPress={handleHostelPress}
            onSeeAllPress={handleSeeAllPress}
          />
        }
        ListEmptyComponent={
          <EmptyState isLoading={recommendedLoading} isError={recommendedError} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingBottom: 50,
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={primaryColor}
            progressViewOffset={100}
          />
        }
      />
    </View>
  );
}
