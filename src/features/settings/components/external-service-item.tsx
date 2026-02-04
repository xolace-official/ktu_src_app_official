import { View, Text } from 'react-native';
import { PressableFeedback, Surface } from 'heroui-native';
import type { ExternalService } from '@/types/settings.types';

interface ExternalServiceItemProps {
  service: ExternalService;
  onPress: () => void;
}

export function ExternalServiceItem({ service, onPress }: ExternalServiceItemProps) {
  const Icon = service.icon;

  return (
    <PressableFeedback onPress={onPress} className="w-[100px]">
      <Surface variant="secondary" className="items-center gap-2 rounded-2xl px-2 py-4">
        <View className={`size-[40px] items-center justify-center rounded-full ${service.iconBgClass}`}>
          <Icon size={20} color={service.iconColor} />
        </View>
        <Text className="text-center text-xs text-foreground" numberOfLines={2}>
          {service.name}
        </Text>
      </Surface>
    </PressableFeedback>
  );
}
