import { View } from 'react-native';
import { PressableFeedback } from 'heroui-native';
import { ChevronRight } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
}

/**
 * Reusable section header with title and optional action button
 */
export function SectionHeader({
  title,
  actionText = 'See all',
  onActionPress,
}: SectionHeaderProps) {
  const theme = useTheme();

  return (
    <View className="flex-row items-center justify-between">
      <ThemedText className="text-xl font-bold">{title}</ThemedText>
      {onActionPress && (
        <PressableFeedback
          onPress={onActionPress}
          className="min-h-[44px] flex-row items-center gap-1"
        >
          <ThemedText themeColor="accent" className="text-base font-semibold">
            {actionText}
          </ThemedText>
          <ChevronRight size={18} color={theme.accent} />
        </PressableFeedback>
      )}
    </View>
  );
}
