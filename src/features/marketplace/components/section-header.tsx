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
 * Render a horizontal section header with a bold title and an optional right-aligned action.
 *
 * @param title - The header title text.
 * @param actionText - Label for the action button when present; defaults to `"See all"`.
 * @param onActionPress - If provided, the action area is rendered and called when pressed.
 * @returns A React element containing the title and, when `onActionPress` is set, a pressable action with the label and chevron icon.
 */
export function SectionHeader({
  title,
  actionText = 'See all',
  onActionPress,
}: SectionHeaderProps) {
  const theme = useTheme();

  return (
    <View className="flex-row items-center justify-between">
      <ThemedText className="text-lg font-bold">{title}</ThemedText>
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