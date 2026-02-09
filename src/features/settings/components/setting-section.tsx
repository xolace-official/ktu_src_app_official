import type { SettingItem, SettingSection } from '@/types/settings.types';
import { Separator, Surface } from 'heroui-native';
import { Text, View } from 'react-native';
import { SettingItemRow } from './setting-item';

interface SettingSectionGroupProps {
  section: SettingSection;
  onItemPress: (item: SettingItem) => void;
}

export function SettingSectionGroup({ section, onItemPress }: SettingSectionGroupProps) {
  return (
    <View>
      {section.title && (
        <Text className="mb-1.5 px-4 text-xs font-medium uppercase tracking-wide text-muted">
          {section.title}
        </Text>
      )}
      <Surface variant="default" className="overflow-hidden rounded-xl p-0">
        {section.items.map((item, index) => (
          <View key={item.id}>
            {index > 0 && <Separator />}
            <SettingItemRow item={item} onPress={() => onItemPress(item)} />
          </View>
        ))}
      </Surface>
    </View>
  );
}
