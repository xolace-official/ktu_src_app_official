import { View, Text, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { satisfactionLevels, type SatisfactionLevel } from './feedback-data';

interface SatisfactionRatingProps {
  selectedRating: number | null;
  onSelectRating: (rating: number) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function SatisfactionEmoji({
  level,
  isSelected,
  onPress,
}: {
  level: SatisfactionLevel;
  isSelected: boolean;
  onPress: () => void;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isSelected ? 1.2 : 1, {
            damping: 10,
            stiffness: 150,
          }),
        },
      ],
      opacity: withTiming(isSelected ? 1 : 0.6, { duration: 150 }),
    };
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      style={animatedStyle}
      className={`items-center gap-1 rounded-xl p-2 ${
        isSelected ? 'bg-accent/10' : ''
      }`}
    >
      <Text
        style={{ fontSize: 32 }}
        className={isSelected ? 'scale-110' : ''}
      >
        {level.emoji}
      </Text>
    </AnimatedPressable>
  );
}

export function SatisfactionRating({
  selectedRating,
  onSelectRating,
}: SatisfactionRatingProps) {
  const selectedLevel = satisfactionLevels.find((l) => l.value === selectedRating);

  return (
    <View className="gap-3">
      <View className="gap-1">
        <Text className="text-sm font-medium text-foreground">
          How would you rate your experience?
        </Text>
        <Text className="text-xs text-muted">
          Your rating helps us understand how we&apos;re doing
        </Text>
      </View>
      <View className="flex-row items-center justify-between">
        {satisfactionLevels.map((level) => (
          <SatisfactionEmoji
            key={level.value}
            level={level}
            isSelected={selectedRating === level.value}
            onPress={() => onSelectRating(level.value)}
          />
        ))}
      </View>
      {selectedLevel && (
        <Text className="text-center text-sm font-medium text-accent">
          {selectedLevel.label}
        </Text>
      )}
    </View>
  );
}
