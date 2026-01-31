import { View, Text } from 'react-native';
import { TextField, PressableFeedback } from 'heroui-native';
import { Search, SlidersHorizontal, X } from 'lucide-react-native';
import { useTheme } from '@/hooks/use-theme';

interface ProductSearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  onFilterPress?: () => void;
  editable?: boolean;
}

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
