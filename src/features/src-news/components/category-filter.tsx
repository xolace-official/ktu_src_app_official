import { Chip } from 'heroui-native';
import { useCallback } from 'react';
import { ScrollView } from 'react-native';

const CATEGORIES = ['All', 'Campus', 'Academic', 'Sports', 'SRC', 'General', 'Events'] as const;

interface CategoryFilterProps {
  selected: string | undefined;
  onSelect: (category: string | undefined) => void;
}

/**
 * Render a horizontal list of selectable category chips.
 *
 * Displays chips for the fixed categories and highlights the currently selected one.
 *
 * @param selected - The currently selected category; `undefined` represents the "All" selection.
 * @param onSelect - Callback invoked when a category is pressed. Receives `undefined` when "All" is chosen, otherwise the chosen category string.
 * @returns The category filter UI as a React element.
 */
export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const handlePress = useCallback(
    (cat: string) => {
      onSelect(cat === 'All' ? undefined : cat);
    },
    [onSelect]
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="px-4 gap-2 py-3"
    >
      {CATEGORIES.map((cat) => {
        const isSelected = cat === 'All' ? !selected : selected === cat;
        return (
          <Chip
            key={cat}
            size="md"
            variant={isSelected ? 'primary' : 'tertiary'}
            color="accent"
            onPress={() => handlePress(cat)}
          >
            <Chip.Label>{cat}</Chip.Label>
          </Chip>
        );
      })}
    </ScrollView>
  );
}