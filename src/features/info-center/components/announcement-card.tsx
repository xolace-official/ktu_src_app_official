import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import type { AnnouncementCardItem } from '@/types/info-center';
import { formatRelativeTime } from '@/utils/format-relative-time';
import { Card, Chip, PressableFeedback } from 'heroui-native';
import { Pin } from 'lucide-react-native';
import { memo } from 'react';
import { View } from 'react-native';

interface AnnouncementCardProps {
  announcement: AnnouncementCardItem;
  onPress: () => void;
}

export const AnnouncementCard = memo(function AnnouncementCard({
  announcement,
  onPress,
}: AnnouncementCardProps) {
  const theme = useTheme();

  return (
    <PressableFeedback onPress={onPress}>
      <Card className="rounded-2xl">
        <Card.Body className="gap-2.5 p-4">
          {/* Chips row */}
          <View className="flex-row flex-wrap items-center gap-2">
            {announcement.pinned && (
              <Chip size="sm" variant="soft" color="warning">
                <Pin size={12} color={theme.goldAccent} />
                <Chip.Label>Pinned</Chip.Label>
              </Chip>
            )}
            {announcement.is_important && (
              <Chip size="sm" variant="soft" color="danger">
                <Chip.Label>Important</Chip.Label>
              </Chip>
            )}
            <Chip size="sm" variant="soft" color="accent">
              <Chip.Label className="capitalize">{announcement.category}</Chip.Label>
            </Chip>
          </View>

          {/* Title */}
          <ThemedText className="text-base font-semibold" numberOfLines={2}>
            {announcement.title}
          </ThemedText>

          {/* Summary */}
          {announcement.summary && (
            <ThemedText
              type="small"
              themeColor="textSecondary"
              numberOfLines={2}
              className="leading-5"
            >
              {announcement.summary}
            </ThemedText>
          )}

          {/* Time */}
          <ThemedText type="small" themeColor="textSecondary">
            {formatRelativeTime(announcement.created_at)}
          </ThemedText>
        </Card.Body>
      </Card>
    </PressableFeedback>
  );
});
