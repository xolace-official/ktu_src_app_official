import { View } from 'react-native';
import { Button } from 'heroui-native';
import { Info } from 'lucide-react-native';

import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/themed-text';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
  onBack: () => void;
}

/**
 * Error state component for hostel details
 * Shows error message with retry and back actions
 */
export function ErrorState({ message, onRetry, onBack }: ErrorStateProps) {
  const theme = useTheme();

  return (
    <View
      className="flex-1 items-center justify-center gap-4 px-6"
      style={{ backgroundColor: theme.background }}
    >
      <View
        className="size-16 items-center justify-center rounded-full"
        style={{ backgroundColor: theme.accentSubtle }}
      >
        <Info size={32} color={theme.accent} />
      </View>
      <ThemedText className="text-center text-lg font-semibold">
        Failed to load hostel details
      </ThemedText>
      <ThemedText themeColor="textSecondary" className="text-center">
        {message ?? 'Please try again.'}
      </ThemedText>
      <View className="mt-4 flex-row gap-3">
        <Button variant="tertiary" onPress={onBack}>
          <Button.Label>Go Back</Button.Label>
        </Button>
        <Button variant="primary" onPress={onRetry}>
          <Button.Label>Try Again</Button.Label>
        </Button>
      </View>
    </View>
  );
}
