import { ScrollView, View, Text } from 'react-native';
import { Surface } from 'heroui-native';
import { Code, Rocket, Lightbulb } from 'lucide-react-native';
import { TeamMemberCard, techTeam } from './components/developer-credits';

export function DeveloperCreditScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-8 pb-10 pt-6 bg-background"
    >
      {/* Header Section */}
      <View className="items-center gap-4 px-4">
        <View className="flex-row items-center gap-3">
          {[Code, Rocket, Lightbulb].map((Icon, index) => (
            <Surface
              key={index}
              variant="secondary"
              className="size-12 items-center justify-center rounded-full"
            >
              <Icon size={22} className="text-accent" />
            </Surface>
          ))}
        </View>
        <View className="items-center gap-1">
          <Text className="text-xl font-bold text-foreground">
            Tech & Innovations Committee
          </Text>
          <Text className="text-center text-sm text-muted">
            Students building for students
          </Text>
        </View>
      </View>

      {/* Team Section */}
      <View className="gap-4 px-4">
        <Text className="text-xs font-medium uppercase tracking-wide text-muted">
          The Team
        </Text>
        <View className="gap-3">
          {techTeam.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
