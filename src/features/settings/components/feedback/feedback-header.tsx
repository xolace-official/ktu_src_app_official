import { View, Text } from 'react-native';
import { Surface } from 'heroui-native';
import { MessageSquareHeart, Sparkles } from 'lucide-react-native';
import { useTheme } from '@/hooks/use-theme';

export function FeedbackHeader() {
  const theme = useTheme();

  return (
    <Surface
      variant="secondary"
      className="mx-4 overflow-hidden rounded-2xl"
    >
      <View className="relative p-4">
        {/* Decorative element */}
        <View className="absolute -right-4 -top-4 size-24 rounded-full bg-accent/5" />
        <View className="absolute -bottom-2 -left-2 size-16 rounded-full bg-success/5" />

        <View className="flex-row items-center gap-4">
          <View className="size-14 items-center justify-center rounded-2xl bg-accent/10">
            <MessageSquareHeart size={28} color={theme.accent} />
          </View>
          <View className="flex-1 gap-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-lg font-semibold text-foreground">
                We Value Your Voice
              </Text>
              <Sparkles size={16} color="#F59E0B" />
            </View>
            <Text className="text-sm text-muted">
              Help shape the future of the KTU SRC App with your valuable feedback
            </Text>
          </View>
        </View>
      </View>
    </Surface>
  );
}
