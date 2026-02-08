import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Button } from 'heroui-native';
import { Newspaper } from 'lucide-react-native';
import { View } from 'react-native';

/**
 * Render an empty-state UI indicating there are no news articles.
 *
 * @returns A React element containing a centered newspaper icon and the text "No news articles yet" styled with the current theme's secondary text color.
 */
export function NewsEmpty() {
  const theme = useTheme();

  return (
    <View className="items-center justify-center gap-3 py-20">
      <Newspaper size={40} color={theme.textSecondary} strokeWidth={1.5} />
      <ThemedText themeColor="textSecondary" className="text-base">
        No news articles yet
      </ThemedText>
    </View>
  );
}

/**
 * Render an error state for the news list with an optional retry action.
 *
 * If `onRetry` is provided, a "Try Again" button is displayed and invoked when pressed.
 *
 * @param onRetry - Optional callback invoked when the retry button is pressed
 * @returns A React element displaying the error message and optional retry button
 */
export function NewsError({ onRetry }: { onRetry?: () => void }) {
  return (
    <View className="items-center justify-center gap-3 px-6 py-20">
      <ThemedText className="text-base font-semibold">
        Failed to load news
      </ThemedText>
      <ThemedText themeColor="textSecondary" className="text-center">
        Something went wrong. Please try again.
      </ThemedText>
      {onRetry && (
        <Button variant="secondary" onPress={onRetry}>
          <Button.Label>Try Again</Button.Label>
        </Button>
      )}
    </View>
  );
}