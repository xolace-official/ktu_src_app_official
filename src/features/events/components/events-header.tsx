import { View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { MapPin, ArrowRight } from 'lucide-react-native';
import { Button, PressableFeedback } from 'heroui-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  type SharedValue,
  Extrapolation,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

const HEADER_IMAGE_HEIGHT = 180;

interface EventsHeaderProps {
  scrollOffset?: SharedValue<number>;
  featuredEventImage?: string | null;
  featuredEventDate?: Date;
  onFeaturedPress?: () => void;
}

/**
 * Formats date into day and month components
 */
function getFormattedDate(date: Date): { day: string; month: string } {
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
  };
}

export function EventsHeader({
  scrollOffset,
  featuredEventImage,
  featuredEventDate = new Date(),
  onFeaturedPress,
}: EventsHeaderProps) {
  const { width } = useWindowDimensions();
  const theme = useTheme();

  // Calculate image dimensions based on screen width
  const imageHeight = width * 0.45;
  const overlap = imageHeight * 0.35;

  const { day, month } = getFormattedDate(featuredEventDate);

  // Parallax effect for the background
  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollOffset) return {};
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_IMAGE_HEIGHT, 0, HEADER_IMAGE_HEIGHT],
            [-HEADER_IMAGE_HEIGHT / 2, 0, HEADER_IMAGE_HEIGHT * 0.5],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_IMAGE_HEIGHT, 0],
            [1.5, 1],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <View className="w-full" style={{ backgroundColor: theme.background }}>
      {/* Background Image Section */}
      <View style={{ height: HEADER_IMAGE_HEIGHT + 60, overflow: 'hidden' }}>
        <Animated.View style={[{ height: HEADER_IMAGE_HEIGHT + 60, width }, backgroundAnimatedStyle]}>
          <Image
            source={require('@/assets/images/events/event-bg.png')}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
          {/* Gradient Overlay */}
          <View
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          />
        </Animated.View>

        {/* Header Content */}
        <View className="absolute inset-x-0 top-0 px-4 pt-4">
          <ThemedText
            className="text-4xl font-extrabold"
            style={{ color: '#fff' }}
          >
            Events
          </ThemedText>

          <View className="mt-2 gap-1">
            <ThemedText
              className="text-base font-medium"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              Upcoming Events
            </ThemedText>

            <View className="flex-row items-center gap-2">
              <MapPin size={16} color="#fff" />
              <ThemedText style={{ color: '#fff' }}>On Campus</ThemedText>
            </View>
          </View>
        </View>
      </View>

      {/* Featured Event Card - Overlapping */}
      <View
        className="relative z-10 px-4"
        style={{ marginTop: -overlap }}
      >
        <PressableFeedback onPress={onFeaturedPress} className="relative">
          <Image
            source={
              featuredEventImage
                ? { uri: featuredEventImage }
                : require('@/assets/images/events/img.png')
            }
            style={{
              width: '100%',
              height: imageHeight,
              borderRadius: 16,
            }}
            contentFit="cover"
          />

          {/* Shadow overlay for better visibility */}
          <View
            className="absolute inset-0 rounded-2xl"
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderCurve: 'continuous',
            }}
          />

          {/* Date Badge */}
          <View
            className="absolute left-4 top-4 items-center rounded-lg border-2 px-3 py-2"
            style={{
              backgroundColor: 'rgba(11, 21, 30, 0.74)',
              borderColor: theme.goldAccent,
              borderCurve: 'continuous',
            }}
          >
            <ThemedText
              className="text-xs font-bold"
              style={{ color: '#fff' }}
            >
              {month}
            </ThemedText>
            <ThemedText
              className="text-2xl font-extrabold leading-tight"
              style={{
                color: '#fff',
                fontVariant: ['tabular-nums'],
              }}
            >
              {day}
            </ThemedText>
          </View>

          {/* Arrow Button */}
          <View className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <Button
              isIconOnly
              size="lg"
              className="rounded-full"
              style={{ backgroundColor: 'rgba(11, 21, 30, 0.74)' }}
              onPress={onFeaturedPress}
            >
              <ArrowRight size={24} color="#fff" />
            </Button>
          </View>
        </PressableFeedback>
      </View>
    </View>
  );
}
