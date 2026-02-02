import { memo } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Card, Chip, PressableFeedback } from 'heroui-native';
import { Image } from 'expo-image';
import { MapPin, Users, Calendar } from 'lucide-react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import type { EventCard as EventCardType } from '@/types/events';

interface EventCardProps {
  event: EventCardType;
  onPress?: () => void;
}

/**
 * Formats date into day and month components
 */
function formatEventDate(dateString: string): { day: string; month: string; time: string } {
  const date = new Date(dateString);
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
  };
}

export const EventCard = memo(function EventCard({ event, onPress }: EventCardProps) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const cardWidth = width - 32; // Full width minus horizontal padding

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push({
        pathname: '/events/[id]',
        params: { id: event.id },
      });
    }
  };

  const { day, month, time } = formatEventDate(event.starts_at);

  return (
    <PressableFeedback onPress={handlePress} style={{ width: cardWidth }}>
      <Card className="overflow-hidden rounded-2xl">
        {/* Event Image */}
        <View className="relative">
          <Image
            source={
              event.hero_image_url
                ? { uri: event.hero_image_url }
                : require('@/assets/images/events/img.png')
            }
            style={{ width: '100%', height: 160, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            contentFit="cover"
            transition={200}
          />

          {/* Date Badge */}
          <View
            className="absolute left-3 top-3 items-center rounded-lg px-2.5 py-1.5"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderCurve: 'continuous',
            }}
          >
            <ThemedText
              className="text-xs font-semibold"
              style={{ color: '#fff' }}
            >
              {month}
            </ThemedText>
            <ThemedText
              className="text-xl font-bold leading-tight"
              style={{ color: '#fff', fontVariant: ['tabular-nums'] }}
            >
              {day}
            </ThemedText>
          </View>

          {/* Category Chip */}
          {event.category && (
            <View className="absolute right-3 top-3">
              <Chip size="sm" variant="primary" color="accent">
                <Chip.Label>{event.category}</Chip.Label>
              </Chip>
            </View>
          )}
        </View>

        {/* Card Content */}
        <Card.Body className="gap-3 p-4">
          <ThemedText className="text-lg font-semibold" numberOfLines={2}>
            {event.title}
          </ThemedText>

          {/* Event Meta Info */}
          <View className="gap-2">
            {/* Time */}
            <View className="flex-row items-center gap-2">
              <Calendar size={16} color={theme.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary">
                {time}
              </ThemedText>
            </View>

            {/* Location */}
            {event.location && (
              <View className="flex-row items-center gap-2">
                <MapPin size={16} color={theme.textSecondary} />
                <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
                  {event.location}
                </ThemedText>
              </View>
            )}

            {/* Attendees */}
            {event.attendees_count > 0 && (
              <View className="flex-row items-center gap-2">
                <Users size={16} color={theme.textSecondary} />
                <ThemedText type="small" themeColor="textSecondary">
                  {event.attendees_count} attending
                </ThemedText>
              </View>
            )}
          </View>
        </Card.Body>
      </Card>
    </PressableFeedback>
  );
});
