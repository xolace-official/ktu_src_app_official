import { View, Text } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

interface ProfileInfoRowProps {
  icon: LucideIcon;
  iconBgClass: string;
  iconColor: string;
  label: string;
  value: string | null;
  fallback?: string;
  selectable?: boolean;
}

export function ProfileInfoRow({
  icon: Icon,
  iconBgClass,
  iconColor,
  label,
  value,
  fallback = 'Not set',
  selectable,
}: ProfileInfoRowProps) {
  return (
    <View className="min-h-[48px] flex-row items-center px-4 py-3">
      <View
        className={`size-[30px] items-center justify-center rounded-lg ${iconBgClass}`}
      >
        <Icon size={16} color={iconColor} />
      </View>
      <View className="ml-3 flex-1 gap-0.5">
        <Text className="text-xs font-medium uppercase tracking-wide text-muted">
          {label}
        </Text>
        {value ? (
          <Text
            className="text-[15px] text-foreground"
            selectable={selectable}
          >
            {value}
          </Text>
        ) : (
          <Text className="text-[15px] italic text-muted">{fallback}</Text>
        )}
      </View>
    </View>
  );
}
