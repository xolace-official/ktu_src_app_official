import { View, Text } from 'react-native';
import { Surface } from 'heroui-native';
import { GraduationCap } from 'lucide-react-native';
import Constants from 'expo-constants';
import { aboutContent } from './about-data';

export function AboutHeader() {
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';
  const buildNumber = Constants.expoConfig?.ios?.buildNumber ?? '1';

  return (
    <View className="items-center gap-4 px-6 pt-2">
      {/* App Icon */}
      <View
        className="items-center justify-center rounded-3xl bg-accent p-5"
        style={{ borderCurve: 'continuous' }}
      >
        <GraduationCap size={48} color="#fff" />
      </View>

      {/* App Info */}
      <View className="items-center gap-1">
        <Text className="text-2xl font-bold text-foreground">
          {aboutContent.appName}
        </Text>
        <Text className="text-base text-muted">{aboutContent.tagline}</Text>
      </View>

      {/* Version Badge */}
      <Surface
        variant="secondary"
        className="flex-row items-center gap-3 rounded-full px-4 py-2"
      >
        <View className="flex-row items-center gap-1.5">
          <View className="size-2 rounded-full bg-success" />
          <Text className="text-sm font-medium text-foreground">
            Version {appVersion}
          </Text>
        </View>
        <View className="h-4 w-px bg-foreground/10" />
        <Text className="text-sm text-muted">Build {buildNumber}</Text>
      </Surface>

      {/* Description */}
      <Text className="text-center text-[15px] leading-6 text-muted px-2">
        {aboutContent.description}
      </Text>
    </View>
  );
}
