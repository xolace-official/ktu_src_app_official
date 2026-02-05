import { View, Text, ScrollView } from 'react-native';
import { Select, Button } from 'heroui-native';
import { ChevronDown } from 'lucide-react-native';
import { feedbackCategories, type FeedbackCategory } from './feedback-data';
import { useTheme } from '@/hooks/use-theme';

interface FeedbackCategoryPickerProps {
  selectedCategory: FeedbackCategory | null;
  onSelectCategory: (category: FeedbackCategory | null) => void;
  isInvalid?: boolean;
}

export function FeedbackCategoryPicker({
  selectedCategory,
  onSelectCategory,
  isInvalid,
}: FeedbackCategoryPickerProps) {
  const theme = useTheme();

  return (
    <View className="gap-2">
      <View className="gap-1">
        <Text className="text-sm font-medium text-foreground">
          Which area is this about?
        </Text>
        <Text className="text-xs text-muted">
          Help us route your feedback to the right team
        </Text>
      </View>
      <Select
        value={selectedCategory}
        onValueChange={(value) => {
          const selected = feedbackCategories.find((c) => c.value === value?.value);
          onSelectCategory(selected ?? null);
        }}
      >
        <Select.Trigger asChild>
          <Button
            variant="secondary"
            className={`justify-between ${isInvalid ? 'border border-danger' : ''}`}
          >
            <Button.Label
              className={selectedCategory ? 'text-foreground' : 'text-muted'}
            >
              {selectedCategory?.label ?? 'Select a category'}
            </Button.Label>
            <ChevronDown size={18} color={theme.textSecondary} />
          </Button>
        </Select.Trigger>
        <Select.Portal>
          <Select.Overlay />
          <Select.Content
            presentation="bottom-sheet"
            snapPoints={['45%']}
          >
            <View className="px-4 pb-2 pt-4">
              <Text className="text-lg font-semibold text-foreground">
                Select Category
              </Text>
              <Text className="text-xs text-muted">
                Choose the area related to your feedback
              </Text>
            </View>
            <ScrollView className="flex-1">
              {feedbackCategories.map((category) => (
                <Select.Item
                  key={category.value}
                  value={category.value}
                  label={category.label}
                >
                  <Select.ItemLabel className="text-foreground" />
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </ScrollView>
          </Select.Content>
        </Select.Portal>
      </Select>
    </View>
  );
}
