import { View, Text } from 'react-native';
import { Surface, useThemeColor } from 'heroui-native';
import { appFeatures } from './about-data';

export function FeaturesSection() {
  const mutedColor = useThemeColor('muted');

  return (
    <View className="gap-4">
      <View className="gap-1 px-4">
        <Text className="text-lg font-semibold text-foreground">
          What You Can Do
        </Text>
        <Text className="text-sm text-muted">
          Explore the features that make campus life easier
        </Text>
      </View>

      <View className="gap-3 px-4">
        {appFeatures.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <Surface
              key={feature.id}
              variant="secondary"
              className="flex-row items-start gap-3 rounded-xl p-4"
            >
              <View
                className={`items-center justify-center rounded-lg p-2.5 ${feature.iconBgClass}`}
              >
                <IconComponent size={20} color={mutedColor} />
              </View>
              <View className="flex-1 gap-0.5">
                <Text className="text-[15px] font-medium text-foreground">
                  {feature.title}
                </Text>
                <Text className="text-sm leading-5 text-muted">
                  {feature.description}
                </Text>
              </View>
            </Surface>
          );
        })}
      </View>
    </View>
  );
}
