import { Tabs } from 'heroui-native';
import type { InfoCenterTabKey, InfoCenterTabOption } from '@/types/info-center';

const TAB_OPTIONS: InfoCenterTabOption[] = [
  { key: 'announcements', label: 'Announcements' },
  { key: 'notifications', label: 'Notifications' },
];

interface InfoCenterTabsProps {
  selected: InfoCenterTabKey;
  onTabChange: (tab: InfoCenterTabKey) => void;
}

export function InfoCenterTabs({ selected, onTabChange }: InfoCenterTabsProps) {
  return (
    <Tabs
      value={selected}
      onValueChange={(value) => onTabChange(value as InfoCenterTabKey)}
      variant="secondary"
      className="px-4 py-3"
    >
      <Tabs.List className="gap-2">
        <Tabs.Indicator />
        {TAB_OPTIONS.map((option) => (
          <Tabs.Trigger key={option.key} value={option.key} className="flex-1">
            <Tabs.Label>{option.label}</Tabs.Label>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
