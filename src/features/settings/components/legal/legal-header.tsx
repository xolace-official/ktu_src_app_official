import { View, Text } from 'react-native';
import { Surface } from 'heroui-native';
import type { LucideIcon } from 'lucide-react-native';

interface LegalHeaderProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
}

export function LegalHeader({
  icon: Icon,
  iconColor,
  title,
  subtitle,
  lastUpdated,
}: LegalHeaderProps) {
  return (
    <View className="items-center gap-4 px-6 pt-2">
      <View
        className="items-center justify-center rounded-2xl bg-accent/10 p-4"
        style={{ borderCurve: 'continuous' }}
      >
        <Icon size={32} color={iconColor} />
      </View>

      <View className="items-center gap-1">
        <Text className="text-xl font-semibold text-foreground">{title}</Text>
        <Text className="text-center text-sm text-muted">{subtitle}</Text>
      </View>

      <Surface variant="secondary" className="w-full rounded-xl px-4 py-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-xs font-medium uppercase tracking-wide text-muted">
            Last Updated
          </Text>
          <Text className="text-sm font-medium text-foreground">
            {lastUpdated}
          </Text>
        </View>
      </Surface>
    </View>
  );
}
