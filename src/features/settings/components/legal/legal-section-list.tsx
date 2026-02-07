import { View, Text } from 'react-native';
import { Accordion, useThemeColor } from 'heroui-native';
import type { LegalSection } from './legal-data';

interface LegalSectionListProps {
  sections: LegalSection[];
  defaultExpandedId?: string;
}

export function LegalSectionList({
  sections,
  defaultExpandedId,
}: LegalSectionListProps) {
  const iconColor = useThemeColor('muted');

  return (
    <Accordion
      selectionMode="single"
      variant="surface"
      defaultValue={defaultExpandedId}
    >
      {sections.map((section) => {
        const IconComponent = section.icon;
        return (
          <Accordion.Item key={section.id} value={section.id}>
            <Accordion.Trigger>
              <View className="flex-1 flex-row items-center gap-3 pr-2">
                <View className="items-center justify-center rounded-lg bg-accent/10 p-2">
                  <IconComponent size={18} color={iconColor} />
                </View>
                <Text className="flex-1 text-[15px] font-medium text-foreground">
                  {section.title}
                </Text>
              </View>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <Text
                selectable
                className="text-[14px] leading-[22px] text-muted pl-[52px] pr-2"
              >
                {section.content}
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
