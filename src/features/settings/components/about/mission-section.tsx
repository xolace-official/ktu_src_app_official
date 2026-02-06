import { View, Text } from 'react-native';
import { Surface, useThemeColor } from 'heroui-native';
import { coreValues } from './about-data';

export function MissionSection() {
  const accentColor = useThemeColor('accent');

  return (
    <View className="gap-4">
      <View className="gap-1 px-4">
        <Text className="text-lg font-semibold text-foreground">
          About KTU SRC
        </Text>
        <Text className="text-sm text-muted">
          Our mission, vision, and commitment to students
        </Text>
      </View>

      <View className="gap-3 px-4">
        {coreValues.map((value, index) => {
          const IconComponent = value.icon;
          const isEven = index % 2 === 0;
          return (
            <Surface
              key={value.id}
              variant="secondary"
              className="gap-3 rounded-xl p-4"
            >
              <View className="flex-row items-center gap-2">
                <View
                  className={`items-center justify-center rounded-lg p-2 ${isEven ? 'bg-accent/10' : 'bg-success/10'}`}
                >
                  <IconComponent
                    size={18}
                    color={accentColor}
                  />
                </View>
                <Text className="text-base font-semibold text-foreground">
                  {value.title}
                </Text>
              </View>
              <Text className="text-[14px] leading-6 text-muted">
                {value.description}
              </Text>
            </Surface>
          );
        })}
      </View>
    </View>
  );
}
