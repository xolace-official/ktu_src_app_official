import { View, Text } from 'react-native';
import { Avatar } from 'heroui-native';
import { getInitials } from '@/utils/profile.utils';

interface ProfileHeaderProps {
  fullName: string | null;
  email: string | null;
  username: string | null;
  avatarUrl: string | null;
}

export function ProfileHeader({
  fullName,
  email,
  username,
  avatarUrl,
}: ProfileHeaderProps) {
  const initials = fullName ? getInitials(fullName) : 'ST';

  return (
    <View className="items-center py-8">
      <Avatar alt="Profile" size="lg" color="accent" className="size-20">
        {avatarUrl ? (
          <Avatar.Image source={{ uri: avatarUrl }} />
        ) : (
          <Avatar.Fallback>
            <Text className="text-xl font-bold text-white">{initials}</Text>
          </Avatar.Fallback>
        )}
      </Avatar>
      <Text
        className="mt-3 text-xl font-bold text-foreground"
        selectable
      >
        {fullName || 'Student'}
      </Text>
      {email && (
        <Text className="mt-0.5 text-sm text-muted" selectable>
          {email}
        </Text>
      )}
      {username && (
        <Text className="mt-0.5 text-sm text-muted">@{username}</Text>
      )}
    </View>
  );
}
