import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

interface GradientProgressProps {
  progress: number;
  gradientColors?: [string, string] | [string, string, string];
  height?: number;
  className?: string;
}

export function GradientProgress({
  progress,
  gradientColors = ['#3c87f7', '#6366f1'],
  height = 8,
  className,
}: GradientProgressProps) {
  const progressValue = useDerivedValue(() => progress);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(
        `${interpolate(progressValue.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`,
        { overshootClamping: true }
      ),
    };
  }, [progress]);

  return (
    <View
      className={`w-full overflow-hidden rounded-full bg-background-element ${className}`}
      style={{ height }}
    >
      <Animated.View style={indicatorStyle} className="h-full overflow-hidden">
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, height: '100%' }}
        />
      </Animated.View>
    </View>
  );
}
