import { View, Text, ScrollView } from 'react-native';
import { Surface, Avatar } from 'heroui-native';
import { devTeam, aboutContent } from './about-data';
import type { TeamMember } from './about-data';

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Surface
      variant="secondary"
      className="items-center gap-2 rounded-xl p-4"
      style={{ width: 110 }}
    >
      <Avatar size="lg" alt={member.initials}>
        <Avatar.Fallback />
      </Avatar>
      <View className="items-center gap-0.5">
        <Text
          className="text-center text-xs font-medium text-foreground"
          numberOfLines={1}
        >
          {member.name}
        </Text>
        <Text
          className="text-center text-[11px] text-muted"
          numberOfLines={2}
        >
          {member.role}
        </Text>
      </View>
    </Surface>
  );
}

export function CreditsSection() {
  return (
    <View className="gap-4">
      <View className="gap-1 px-4">
        <Text className="text-lg font-semibold text-foreground">
          Built By Students, For Students
        </Text>
        <Text className="text-sm text-muted">
          Meet the team behind the KTU SRC App
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3 px-4"
      >
        {devTeam.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </ScrollView>

      {/* Acknowledgments */}
      <View className="gap-2 px-4">
        <Text className="text-xs font-medium uppercase tracking-wide text-muted">
          Special Thanks
        </Text>
        <Surface variant="secondary" className="gap-2 rounded-xl p-4">
          <Text className="text-sm leading-5 text-muted">
            We extend our gratitude to the {aboutContent.srcFullName} executives,{' '}
            {aboutContent.universityName} administration, and all students who
            provided feedback during development.
          </Text>
        </Surface>
      </View>
    </View>
  );
}
