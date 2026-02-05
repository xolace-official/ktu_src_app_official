import { Separator, Surface } from 'heroui-native';
import React from 'react';
import { Text, View } from 'react-native';

interface ProfileInfoSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ProfileInfoSection({ title, children }: ProfileInfoSectionProps) {
  const childArray = React.Children.toArray(children);

  return (
    <View>
      <Text className="mb-1.5 px-4 text-xs font-medium uppercase tracking-wide text-muted">
        {title}
      </Text>
      <Surface variant="secondary" className="overflow-hidden rounded-xl p-0">
        {childArray.map((child, index) => (
          <View key={index}>
            {index > 0 && <Separator className="ml-[54px]" />}
            {child}
          </View>
        ))}
      </Surface>
    </View>
  );
}
