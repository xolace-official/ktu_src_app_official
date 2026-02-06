import { View, Text } from 'react-native';
import { Card, Avatar } from 'heroui-native';
import type { TeamMember } from './team-data';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card variant="secondary" className="flex-row items-center gap-4 p-4">
      <Avatar size="lg" color="accent" alt={member.name}>
        {member.imageUrl ? (
          <Avatar.Image source={{ uri: member.imageUrl }} />
        ) : null}
        <Avatar.Fallback>{member.initials}</Avatar.Fallback>
      </Avatar>
      <View className="flex-1 gap-0.5">
        <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
          {member.name}
        </Text>
        <Text className="text-sm text-muted" numberOfLines={1}>
          {member.position}
        </Text>
      </View>
    </Card>
  );
}
