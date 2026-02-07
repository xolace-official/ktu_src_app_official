import { ThemedText } from '@/components/themed-text';
import { Button } from 'heroui-native';
import { Bell, Megaphone } from 'lucide-react-native';
import { View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

interface EmptyStateProps {
  onRetry?: () => void;
}

export function AnnouncementsEmpty() {
  const theme = useTheme();

  return (
    <View className="items-center justify-center gap-3 py-20">
      <Megaphone size={40} color={theme.textSecondary} strokeWidth={1.5} />
      <ThemedText themeColor="textSecondary" className="text-base">
        No announcements yet
      </ThemedText>
    </View>
  );
}

export function NotificationsEmpty() {
  const theme = useTheme();

  return (
    <View className="items-center justify-center gap-3 py-20">
      <Bell size={40} color={theme.textSecondary} strokeWidth={1.5} />
      <ThemedText themeColor="textSecondary" className="text-base">
        No notifications yet
      </ThemedText>
    </View>
  );
}

export function AnnouncementsError({ onRetry }: EmptyStateProps) {
  return (
    <View className="items-center justify-center gap-3 py-20 px-6">
      <ThemedText className="text-base font-semibold">
        Failed to load announcements
      </ThemedText>
      <ThemedText themeColor="textSecondary" className="text-center">
        Something went wrong. Please try again.
      </ThemedText>
      {onRetry && (
        <Button variant="secondary" onPress={onRetry}>
          <Button.Label>Try Again</Button.Label>
        </Button>
      )}
    </View>
  );
}

export function NotificationsError({ onRetry }: EmptyStateProps) {
  return (
    <View className="items-center justify-center gap-3 py-20 px-6">
      <ThemedText className="text-base font-semibold">
        Failed to load notifications
      </ThemedText>
      <ThemedText themeColor="textSecondary" className="text-center">
        Something went wrong. Please try again.
      </ThemedText>
      {onRetry && (
        <Button variant="secondary" onPress={onRetry}>
          <Button.Label>Try Again</Button.Label>
        </Button>
      )}
    </View>
  );
}
