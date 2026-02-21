import { memo } from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { Card, PressableFeedback } from 'heroui-native';
import type { Representative } from '@/types/home';

interface RepresentativeCardProps {
  representative: Representative;
  onPress?: () => void;
}

export const RepresentativeCard = memo(function RepresentativeCard({
  representative,
  onPress,
}: RepresentativeCardProps) {
  const { name, position, description, imageUrl } = representative;

  const content = (
    <Card className="flex-row rounded-2xl gap-4 p-4" variant="tertiary">
      <View>
              <Image
                source={{ uri: imageUrl }}
                style={{
                  height: 110,
                  aspectRatio: 1,
                  borderRadius: 14,
                }}
                contentFit="cover"
                contentPosition="top"
                transition={300}
              />
          </View>

          <View className="flex-1 gap-4">
          <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Description numberOfLines={3} className="text-sm">
                  {description}
                </Card.Description>
                <Card.Footer>
                  <Text className="text-xs font-semibold text-accent">
                    {position}
                  </Text>
                </Card.Footer>
          </Card.Body>
          </View>
    </Card>
  );

  if (onPress) {
    return (
      <PressableFeedback onPress={onPress} className="w-full px-4">
        {content}
      </PressableFeedback>
    );
  }

  return <View className="w-full px-4">{content}</View>;
});
