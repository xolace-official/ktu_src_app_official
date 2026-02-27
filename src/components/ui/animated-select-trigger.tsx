import Feather from '@expo/vector-icons/Feather';
import { Select, useSelectAnimation } from 'heroui-native';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';

const StyledFeather = withUniwind(Feather);
const AnimatedView = withUniwind(Animated.View);

interface AnimatedSelectTriggerProps {
  placeholder?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
}

export function AnimatedSelectTrigger({
  placeholder = 'Select an option',
  isInvalid = false,
  isDisabled = false,
  children,
}: AnimatedSelectTriggerProps) {
  const { progress } = useSelectAnimation();

  const rContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1, 2], [0, 1, 0]);
    return {
      opacity,
    };
  });

  const rChevronStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, 1, 2], [0, -180, 0]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const borderColorClass = isInvalid ? 'border-danger' : 'border-accent';
  const opacityClass = isDisabled ? 'opacity-50' : '';

  return (
    <View
      className={`bg-surface w-full py-3 px-3 rounded-2xl justify-center shadow-md shadow-black/5 ${opacityClass}`}
      style={{ borderCurve: 'continuous' }}
    >
      <AnimatedView
        style={[rContainerStyle, { borderCurve: 'continuous' }]}
        className={`absolute -inset-1 border-[2.5px] ${borderColorClass} rounded-[18px] pointer-events-none`}
      />
      {children ?? <Select.Value placeholder={placeholder} />}
      <AnimatedView style={rChevronStyle} className="absolute right-3">
        <StyledFeather
          name="chevron-down"
          size={18}
          className={isDisabled ? 'text-muted/50' : 'text-muted'}
        />
      </AnimatedView>
    </View>
  );
}
