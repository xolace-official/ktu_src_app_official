import { View } from 'react-native';
import { Button } from 'heroui-native';
import { Share2, Heart } from 'lucide-react-native';
import { useTheme } from '@/hooks/use-theme';

interface HeaderButtonsProps {
  onSharePress?: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

/**
 * Header action buttons for share and favorite actions
 * Used in the Stack navigation header
 */
export function HeaderButtons({
  onSharePress,
  onFavoritePress,
  isFavorite = false,
}: HeaderButtonsProps) {
  const theme = useTheme();

  return (
    <View className="flex-row items-center gap-2">
      <Button
        isIconOnly
        size="sm"
        variant="secondary"
        onPress={onSharePress}
        className="rounded-full bg-background/80"
      >
        <Share2 size={18} color={theme.text} />
      </Button>
      <Button
        isIconOnly
        size="sm"
        variant="secondary"
        onPress={onFavoritePress}
        className="rounded-full bg-background/80"
      >
        <Heart
          size={18}
          color={isFavorite ? '#EF4444' : theme.text}
          fill={isFavorite ? '#EF4444' : 'transparent'}
        />
      </Button>
    </View>
  );
}
