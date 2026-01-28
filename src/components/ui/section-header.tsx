import { View } from 'react-native';
import { Button } from 'heroui-native';
import { ThemedText } from '@/components/themed-text';

interface SectionHeaderProps {
  title: string;
  onViewAllPress?: () => void;
  showViewAll?: boolean;
}

export function SectionHeader({
  title,
  onViewAllPress,
  showViewAll = true,
}: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <ThemedText className="text-lg font-bold">{title}</ThemedText>
      {showViewAll && onViewAllPress && (
        <Button variant="ghost" size="sm" onPress={onViewAllPress}>
          <Button.Label className="text-sm text-accent">View All</Button.Label>
        </Button>
      )}
    </View>
  );
}
