import { View, Text } from 'react-native';
import { Surface, Divider} from 'heroui-native';
import { SettingItemRow } from './setting-item';
import type { SettingSection, SettingItem } from '@/types/settings.types';

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
      <Surface variant="secondary" className="overflow-hidden rounded-xl p-0">
        {section.items.map((item, index) => (
          <View key={item.id}>
            {index > 0 && <Divider />}
            <SettingItemRow item={item} onPress={() => onItemPress(item)} />
          </View>
        ))}
      </Surface>
    </View>
  );
}
