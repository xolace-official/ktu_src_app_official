import { useTheme } from '@/hooks/use-theme';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Button, Select } from 'heroui-native';
import { ChevronDown } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { feedbackCategories, type FeedbackCategory } from './feedback-data';

interface SelectOption {
  value: string | number;
  label: string;
}

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
        value={selectedCategory ?? undefined}
        onValueChange={(val: SelectOption | null | undefined) => {
          const cleanValue = val?.value?.toString().trim();
          const selected = feedbackCategories.find((c) => c.value === cleanValue);
          onSelectCategory(selected ?? null);
        }}
        presentation="bottom-sheet"
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
            snapPoints={['35%', '50%']}
            detached
            enableDynamicSizing={false}
            enableOverDrag={false}
            backgroundClassName="bg-transparent shadow-none"
            handleClassName="h-1"
            handleIndicatorClassName="w-12 h-[3px]"
            contentContainerClassName="h-full pt-1 pb-1 mx-2.5 rounded-t-[36px] border border-separator/20 bg-overlay overflow-hidden"
            contentContainerProps={{
                style: {
                  borderCurve: 'continuous',
                },
              }}
          >
            <View className="px-4 pb-2 pt-4">
              <Text className="text-lg font-semibold text-foreground">
                Select Category
              </Text>
              <Text className="text-xs text-muted">
                Choose the area related to your feedback
              </Text>
            </View>
            <BottomSheetScrollView
                  contentContainerClassName="p-4"
                  showsVerticalScrollIndicator={false}>
              {feedbackCategories.map((category) => (
                <React.Fragment key={category.value}>
                <Select.Item
                  value={category.value}
                  label={category.label}
                >
                  <Select.ItemLabel className="text-foreground" />
                  <Select.ItemIndicator />
                </Select.Item>
                </React.Fragment>
              ))}
            </BottomSheetScrollView>
          </Select.Content>
        </Select.Portal>
      </Select>
    </View>
  );
}
