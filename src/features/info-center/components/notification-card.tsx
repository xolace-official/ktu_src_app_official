import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import type { NotificationItem } from '@/types/info-center';
import { formatRelativeTime } from '@/utils/format-relative-time';
import { Avatar, Card, PressableFeedback } from 'heroui-native';
import { memo } from 'react';
import { View } from 'react-native';

interface NotificationCardProps {
  notification: NotificationItem;
  onPress: () => void;
}

export const NotificationCard = memo(function NotificationCard({
  notification,
  onPress,
}: NotificationCardProps) {
  const theme = useTheme();
  const isUnread = !notification.read;

  const actorName = notification.actor?.full_name;
  const actorInitials = actorName
    ? actorName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'N';

  return (
    <PressableFeedback onPress={onPress}>
      <Card
        className="rounded-2xl"
        style={isUnread ? { backgroundColor: theme.accentSubtle } : undefined}
      >
        <Card.Body className="flex-row items-start gap-3 p-4">
          {/* Actor Avatar */}
          <Avatar size="sm" color="accent" alt={actorName ?? 'Notification'}>
            {notification.actor?.avatar_url ? (
              <Avatar.Image source={{ uri: notification.actor.avatar_url }} />
            ) : (
              <Avatar.Fallback>
                <ThemedText className="text-xs font-semibold text-white">
                  {actorInitials}
                </ThemedText>
              </Avatar.Fallback>
            )}
          </Avatar>

          {/* Content */}
          <View className="flex-1 gap-1">
            <View className="flex-row items-center gap-2">
              <ThemedText
                className="flex-1 text-sm font-semibold"
                numberOfLines={1}
              >
                {notification.title}
              </ThemedText>
              {/* Unread dot */}
              {isUnread && (
                <View
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: theme.accent }}
                />
              )}
            </View>

            {notification.body && (
              <ThemedText
                type="small"
                themeColor="textSecondary"
                numberOfLines={2}
                className="leading-5"
              >
                {notification.body}
              </ThemedText>
            )}

            <ThemedText type="small" themeColor="textSecondary">
              {formatRelativeTime(notification.created_at)}
            </ThemedText>
          </View>
        </Card.Body>
      </Card>
    </PressableFeedback>
  );
});
