import { View, Text, Pressable } from 'react-native';
import { Surface } from 'heroui-native';
import { feedbackTypes, type FeedbackType } from './feedback-data';

interface FeedbackTypeSelectorProps {
  selectedType: string | null;
  onSelectType: (typeId: string) => void;
}

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
        className={`items-center gap-2 rounded-xl p-3 ${
          isSelected ? 'border-2 border-accent' : 'border border-transparent'
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
