import { View, Text, Pressable } from 'react-native';
import { useThemeColor } from 'heroui-native';
import { FileText, Lock, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { aboutContent } from './about-data';

export function AboutFooter() {
  const router = useRouter();
  const mutedColor = useThemeColor('muted');

  return (
    <View className="gap-4 px-4">
      {/* Quick Legal Links */}
      <View className="flex-row gap-3">
        <Pressable
          onPress={() => router.push('/settings/terms-of-service')}
          className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-foreground/5 py-3 active:opacity-70"
          style={{ borderCurve: 'continuous' }}
        >
          <FileText size={16} color={mutedColor} />
          <Text className="text-sm font-medium text-muted">Terms</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/settings/privacy-policy')}
          className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-foreground/5 py-3 active:opacity-70"
          style={{ borderCurve: 'continuous' }}
        >
          <Lock size={16} color={mutedColor} />
          <Text className="text-sm font-medium text-muted">Privacy</Text>
        </Pressable>
      </View>

      {/* Footer */}
      <View className="items-center gap-2 pt-2">
        <View className="flex-row items-center gap-1">
          <Text className="text-xs text-muted">Made with</Text>
          <Heart size={12} color="#EF4444" fill="#EF4444" />
          <Text className="text-xs text-muted">in Koforidua</Text>
        </View>
        <Text className="text-center text-[11px] text-muted">
          {aboutContent.copyright}
        </Text>
        <Text className="text-center text-[10px] text-muted/60">
          {aboutContent.universityName}
        </Text>
      </View>
    </View>
  );
}
