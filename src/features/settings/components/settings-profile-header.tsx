import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { Avatar, PressableFeedback, Surface } from 'heroui-native';
import { ChevronRight } from 'lucide-react-native';
import { useAppStore } from '@/store/store';
import { useTheme } from '@/hooks/use-theme';

export function SettingsProfileHeader() {
  const theme = useTheme();
  const avatarUrl = useAppStore((s) => s.profileSummary.avatar_url);
  const fullName = useAppStore((s) => s.profileSummary.full_name);
  const email = useAppStore((s) => s.email);

  const getInitials = (name?: string | null) => {
    if (!name) return 'ST';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View className="px-4">
      <PressableFeedback
        onPress={() => router.push('/settings/profile-account')}
        className="overflow-hidden rounded-xl"
      >
        <Surface variant="secondary" className="flex-row items-center p-4">
          <PressableFeedback.Highlight />
          <Avatar alt="Profile" size="lg" color="accent">
            {avatarUrl ? (
              <Avatar.Image source={{ uri: avatarUrl }} />
            ) : (
              <Avatar.Fallback>
                {getInitials(fullName)}
              </Avatar.Fallback>
            )}
          </Avatar>
          <View className="ml-3 flex-1">
            <Text className="text-base font-semibold text-foreground">
              {fullName || 'Student'}
            </Text>
            <Text className="mt-0.5 text-sm text-muted">{email || 'No email set'}</Text>
          </View>
          <ChevronRight size={20} color={theme.textSecondary} />
        </Surface>
      </PressableFeedback>
    </View>
  );
}
