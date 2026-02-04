import { View, Text } from 'react-native';
import { PressableFeedback } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Code, Rocket, Lightbulb } from 'lucide-react-native';

export function DeveloperCredits() {
  return (
    <View className="px-4">
      <PressableFeedback className="overflow-hidden rounded-2xl">
        <LinearGradient
          colors={['#7C3AED', '#DB2777']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 20 }}
        >
          <View className="flex-row items-center justify-center gap-4 pb-4">
            {[Code, Rocket, Lightbulb].map((Icon, i) => (
              <View
                key={i}
                className="size-[40px] items-center justify-center rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <Icon size={20} color="#fff" />
              </View>
            ))}
          </View>
          <Text className="text-center text-sm text-white/80">Crafted with passion by</Text>
          <Text className="mt-1 text-center text-base font-semibold text-white">
            SRC Tech & Innovations Committee
          </Text>
          <Text className="mt-2 text-center text-xs text-white/60">
            Students building for students
          </Text>
        </LinearGradient>
      </PressableFeedback>
    </View>
  );
}
