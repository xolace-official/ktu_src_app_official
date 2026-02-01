import { View, Text } from 'react-native';
import { TextField, PressableFeedback } from 'heroui-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { useTheme } from '@/hooks/use-theme';

interface ProductSearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  onFilterPress?: () => void;
  editable?: boolean;
}

/**
 * Render a product search bar that switches between an interactive text input and a non-editable pressable bar.
 *
 * When `editable` is false the component renders a single pressable row that invokes `onPress`; when `editable` is true it renders a text input bound to `value` and `onChangeText`. If `onFilterPress` is provided a filter button is shown; tapping the filter button does not trigger the bar's `onPress`.
 *
 * @param placeholder - Placeholder text shown inside the input or non-editable bar
 * @param value - Current input value (used in editable mode)
 * @param onChangeText - Callback invoked with the new text when the input changes (editable mode)
 * @param onPress - Callback invoked when the non-editable bar is pressed (non-editable mode)
 * @param onFilterPress - Callback invoked when the filter button is pressed; does not propagate to the bar press
 * @param editable - If true, render an editable text input; otherwise render a non-editable pressable bar
 * @returns A React element representing the product search bar in the selected mode
 */
export function ProductSearchBar({
  placeholder = 'Search products...',
  value,
  onChangeText,
  onPress,
  onFilterPress,
  editable = false,
}: ProductSearchBarProps) {
  const theme = useTheme();

  const handleClear = () => {
    onChangeText?.('');
  };

  // Non-editable version - acts as a button to navigate to search screen
  if (!editable) {
    return (
      <PressableFeedback
        onPress={onPress}
        className="min-h-[48px] flex-row items-center gap-3 rounded-2xl bg-backgroundElement px-4"
      >
        <Search size={20} color={theme.textSecondary} />
        <Text style={{ color: theme.textSecondary }} className="flex-1 text-base">
          {placeholder}
        </Text>
        {onFilterPress && (
          <PressableFeedback
            onPress={(e) => {
              e.stopPropagation();
              onFilterPress();
            }}
            className="min-h-[44px] min-w-[44px] items-center justify-center"
          >
            <SlidersHorizontal size={20} color={theme.textSecondary} />
          </PressableFeedback>
        )}
      </PressableFeedback>
    );
  }

  // Editable version with TextField
  return (
    <View className="flex-row items-center gap-2">
      <View className="flex-1">
        <TextField>
          <TextField.Input
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
          />
        </TextField>
      </View>

      {onFilterPress && (
        <PressableFeedback
          onPress={onFilterPress}
          className="min-h-[48px] min-w-[48px] items-center justify-center rounded-2xl bg-backgroundElement"
        >
          <SlidersHorizontal size={20} color={theme.textSecondary} />
        </PressableFeedback>
      )}
    </View>
  );
}