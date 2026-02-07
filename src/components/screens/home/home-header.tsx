import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Avatar, PressableFeedback } from 'heroui-native';
import { BellRing } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useUserGreeting } from '@/hooks/home/use-user-greeting';
import { useAppStore } from '@/store/store';
import { useUnreadNotificationCount } from '@/hooks/info-center';

interface HomeHeaderProps {
  onNotificationPress?: () => void;
}

export function HomeHeader({ onNotificationPress }: HomeHeaderProps) {
  const theme = useTheme();
  const { fullGreeting, subtitle } = useUserGreeting();
  const avatarUrl = useAppStore((s) => s.profileSummary.avatar_url);
  const fullName = useAppStore((s) => s.profileSummary.full_name);
  const { data: unreadCount } = useUnreadNotificationCount();

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      router.push({
        pathname: '/info-center',
        params: { type: 'notifications' },
      });
    }
  };

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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Action Row */}
      <View className="flex-row items-center justify-end px-4 pb-2">
        <PressableFeedback
          onPress={handleNotificationPress}
          className="min-h-[44px] min-w-[44px] items-center justify-center rounded-full"
        >
          <BellRing color={theme.accent} size={24} />
          {!!unreadCount && unreadCount > 0 && (
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </ThemedText>
            </View>
          )}
        </PressableFeedback>
      </View>

      {/* Greeting Section */}
      <View className="flex-row items-start justify-between px-5">
        <View className="flex-1">
          <ThemedText className="mb-1 text-xl font-normal">{fullGreeting}</ThemedText>
          <ThemedText themeColor="textSecondary" className="font-normal">
            {subtitle}
          </ThemedText>
        </View>

        <View className="pl-4">
          <Avatar alt={fullName || 'User'} size="lg" color="accent">
            {avatarUrl ? (
              <Avatar.Image source={{ uri: avatarUrl }} />
            ) : (
              <Avatar.Fallback>
                <ThemedText className="font-semibold text-white">
                  {getInitials(fullName)}
                </ThemedText>
              </Avatar.Fallback>
            )}
          </Avatar>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
  },
});
