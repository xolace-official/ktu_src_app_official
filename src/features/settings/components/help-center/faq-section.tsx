import { Accordion, Chip } from 'heroui-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { faqCategories, type FAQCategory } from './faq-data';

function FAQCategoryFilter({
  categories,
  selectedId,
  onSelect,
}: {
  categories: FAQCategory[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-4"
    >
      <Chip
        variant={selectedId === null ? 'primary' : 'soft'}
        color={selectedId === null ? 'accent' : 'default'}
        size="sm"
        onPress={() => onSelect(null)}
      >
        <Chip.Label>All</Chip.Label>
      </Chip>
      {categories.map((cat) => (
        <Chip
          key={cat.id}
          variant={selectedId === cat.id ? 'primary' : 'secondary'}
          color={selectedId === cat.id ? 'accent' : 'default'}
          size="sm"
          onPress={() => onSelect(cat.id)}
        >
          <Chip.Label>{cat.title}</Chip.Label>
        </Chip>
      ))}
    </ScrollView>
  );
}

export function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = selectedCategory
    ? faqCategories.filter((cat) => cat.id === selectedCategory)
    : faqCategories;

  return (
    <View className="gap-4">
      <View className="gap-1 px-4">
        <Text className="text-lg font-semibold text-foreground">
          Frequently Asked Questions
        </Text>
        <Text className="text-sm text-muted">
          Find quick answers to common questions
        </Text>
      </View>

      <FAQCategoryFilter
        categories={faqCategories}
        selectedId={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <View className="gap-4 px-4">
        {filteredCategories.map((category) => (
          <View key={category.id} className="gap-1.5">
            {selectedCategory === null && (
              <Text className="text-xs font-medium uppercase tracking-wide text-muted">
                {category.title}
              </Text>
            )}
            <Accordion selectionMode="single" variant="surface">
              {category.items.map((item, idx) => (
                <Accordion.Item key={idx} value={`${category.id}-${idx}`}>
                  <Accordion.Trigger>
                    <Text className="flex-1 pr-2 text-[15px] font-medium text-foreground">
                      {item.question}
                    </Text>
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <Text
                      selectable
                      className="text-[14px] leading-[22px] text-muted"
                    >
                      {item.answer}
                    </Text>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion>
          </View>
        ))}
      </View>
    </View>
  );
}
