import { View, Text } from 'react-native';
import { PressableFeedback } from 'heroui-native';
import { ChevronRight } from 'lucide-react-native';
import type { SettingItem } from '@/types/settings.types';
import { useTheme } from '@/hooks/use-theme';

interface SettingItemRowProps {
  item: SettingItem;
  onPress: () => void;
}

export function SettingItemRow({ item, onPress }: SettingItemRowProps) {
  const theme = useTheme();
  const Icon = item.icon;

  return (
    <PressableFeedback onPress={onPress} className="min-h-[44px] flex-row items-center px-4 py-3">
      <PressableFeedback.Highlight />
      <View className={`size-[30px] items-center justify-center rounded-lg ${item.iconBgClass}`}>
        <Icon size={16} color={item.iconColor} />
      </View>
      <Text
        className={`ml-3 flex-1 text-[15px] ${item.isDestructive ? 'text-danger' : 'text-foreground'}`}
      >
        {item.label}
      </Text>
      {(item.type === 'navigate' || item.type === 'external') && (
        <ChevronRight size={18} color={theme.textSecondary} />
      )}
    </PressableFeedback>
  );
}
