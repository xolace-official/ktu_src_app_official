import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Button } from 'heroui-native';
import { Bell, Megaphone, type LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';

interface InfoCenterEmptyProps {
  icon: LucideIcon;
  entityName: string;
}

function InfoCenterEmpty({ icon: Icon, entityName }: InfoCenterEmptyProps) {
  const theme = useTheme();

  return (
    <View className="items-center justify-center gap-3 py-20">
      <Icon size={40} color={theme.textSecondary} strokeWidth={1.5} />
      <ThemedText themeColor="textSecondary" className="text-base">
        No {entityName} yet
      </ThemedText>
    </View>
  );
}

interface InfoCenterErrorProps {
  entityName: string;
  onRetry?: () => void;
}

function InfoCenterError({ entityName, onRetry }: InfoCenterErrorProps) {
  return (
    <View className="items-center justify-center gap-3 px-6 py-20">
      <ThemedText className="text-base font-semibold">
        Failed to load {entityName}
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

export function AnnouncementsEmpty() {
  return <InfoCenterEmpty icon={Megaphone} entityName="announcements" />;
}

export function NotificationsEmpty() {
  return <InfoCenterEmpty icon={Bell} entityName="notifications" />;
}

export function AnnouncementsError({ onRetry }: { onRetry?: () => void }) {
  return <InfoCenterError entityName="announcements" onRetry={onRetry} />;
}

export function NotificationsError({ onRetry }: { onRetry?: () => void }) {
  return <InfoCenterError entityName="notifications" onRetry={onRetry} />;
}
