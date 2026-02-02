import { Tabs } from 'heroui-native';
import type { TabKeys, EventTabOption } from '@/types/events';

const EVENT_TAB_OPTIONS: EventTabOption[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'popular', label: 'Popular' },
  { key: 'upcoming', label: 'Upcoming' },
];

interface EventsTabsProps {
  selected: TabKeys;
  onTabChange: (tab: TabKeys) => void;
}

export function EventsTabs({ selected, onTabChange }: EventsTabsProps) {
  return (
    <Tabs
      value={selected}
      onValueChange={(value) => onTabChange(value as TabKeys)}
      variant="pill"
      className="px-4 py-3"
    >
      <Tabs.List className="gap-2">
        <Tabs.Indicator />
        {EVENT_TAB_OPTIONS.map((option) => (
          <Tabs.Trigger key={option.key} value={option.key} className="flex-1">
            <Tabs.Label>{option.label}</Tabs.Label>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
