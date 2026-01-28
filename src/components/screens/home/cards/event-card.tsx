import { memo, useMemo } from 'react';
import { View, Platform } from 'react-native';
import { Card, PressableFeedback } from 'heroui-native';
import { Calendar, MapPin } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import type { HomeEvent } from '@/types/home';

interface EventCardProps {
  event: HomeEvent;
  onPress?: () => void;
}

function formatEventDate(dateStr: Date | string) {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return { day, month, time };
}

export const EventCard = memo(function EventCard({ event, onPress }: EventCardProps) {
  const theme = useTheme();
  const { title, startsAt, location } = event;
  const { day, month, time } = useMemo(() => formatEventDate(startsAt), [startsAt]);

  return (
    <PressableFeedback onPress={onPress}>
      <Card variant="secondary" className="overflow-hidden rounded-2xl">
        <Card.Body className="flex-row items-center gap-3 p-1">
          {/* Date Badge */}
          <View className="w-14 items-center rounded-lg bg-accent px-2 py-1">
            <ThemedText className="text-center text-base font-bold text-white">{month}</ThemedText>
            <ThemedText
              className="text-center text-3xl font-extrabold leading-none text-white"
              style={{
                fontVariant: ['tabular-nums'],
                fontFamily: Platform.select({
                  ios: 'Menlo',
                  android: 'monospace',
                  default: 'monospace',
                }),
              }}
            >
              {day}
            </ThemedText>
          </View>

          {/* Event Info */}
          <View className="flex-1">
            <ThemedText className="mb-1 text-base font-semibold" numberOfLines={1}>
              {title}
            </ThemedText>

            <View className="flex-row items-center gap-4">
              <View className="flex-row items-center gap-1">
                <Calendar size={12} color={theme.textSecondary} />
                <ThemedText type="small" themeColor="textSecondary">
                  {time}
                </ThemedText>
              </View>

              <View className="flex-1 flex-row items-center gap-1">
                <MapPin size={12} color={theme.textSecondary} />
                <ThemedText
                  type="small"
                  themeColor="textSecondary"
                  numberOfLines={1}
                  className="flex-shrink"
                >
                  {location || 'TBA'}
                </ThemedText>
              </View>
            </View>
          </View>
        </Card.Body>
      </Card>
    </PressableFeedback>
  );
});
