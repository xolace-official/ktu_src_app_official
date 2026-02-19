import { Surface } from 'heroui-native';
import { Pressable, Text, View } from 'react-native';
import { feedbackTypes, type FeedbackType, type FeedbackTypeKind } from './feedback-data';

interface FeedbackTypeSelectorProps {
  selectedType: FeedbackTypeKind | null;
  onSelectType: (typeId: FeedbackTypeKind) => void;
}

/**
 * Render a selectable feedback type card that displays the type's icon and label and reflects selection state.
 *
 * @param type - Feedback type metadata (icon component, label, colors, and background class) to display
 * @param isSelected - Whether this card is the currently selected type; controls border and text accent styling
 * @param onPress - Callback invoked when the card is pressed
 * @returns The rendered Pressable card element
 */
function FeedbackTypeCard({
  type,
  isSelected,
  onPress,
}: {
  type: FeedbackType;
  isSelected: boolean;
  onPress: () => void;
}) {
  const Icon = type.icon;

  return (
    <Pressable onPress={onPress} className="flex-1">
      <Surface
        variant="secondary"
        className={`items-center gap-2 rounded-xl border-2 p-3 ${
          isSelected ? 'border-accent' : 'border-transparent'
        }`}
      >
        <View
          className={`size-10 items-center justify-center rounded-full ${type.iconBgClass}`}
        >
          <Icon size={20} color={type.iconColor} />
        </View>
        <Text
          className={`text-center text-xs font-medium ${
            isSelected ? 'text-accent' : 'text-foreground'
          }`}
          numberOfLines={1}
        >
          {type.label}
        </Text>
      </Surface>
    </Pressable>
  );
}

export function FeedbackTypeSelector({
  selectedType,
  onSelectType,
}: FeedbackTypeSelectorProps) {
  const selectedFeedbackType = feedbackTypes.find((t) => t.id === selectedType);

  return (
    <View className="gap-3">
      <View className="gap-1">
        <Text className="text-sm font-medium text-foreground">
          What type of feedback do you have?
        </Text>
        <Text className="text-xs text-muted">
          Select the category that best describes your feedback
        </Text>
      </View>
      <View className="flex-row gap-2">
        {feedbackTypes.map((type) => (
          <FeedbackTypeCard
            key={type.id}
            type={type}
            isSelected={selectedType === type.id}
            onPress={() => onSelectType(type.id)}
          />
        ))}
      </View>
      {selectedFeedbackType && (
        <Text className="text-xs text-muted">
          {selectedFeedbackType.description}
        </Text>
      )}
    </View>
  );
}