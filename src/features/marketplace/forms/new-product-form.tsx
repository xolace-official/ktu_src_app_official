import { useRef, useMemo } from 'react';
import { View, Text, TextInput, Keyboard } from 'react-native';
import { TextField, Select, Button, Spinner } from 'heroui-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { router } from 'expo-router';
import {
  NewProductSchema,
  CONDITION_OPTIONS,
  type NewProductFormType,
} from '@/lib/schemas/marketplace';
import { useMarketCategories } from '@/hooks/marketplace/use-market-categories';
import { useCreateListing } from '@/hooks/marketplace/use-create-listing';
import { AnimatedSelectTrigger } from '@/components/ui/animated-select-trigger';
import { ThemedText } from '@/components/themed-text';

type SelectOption = {
  value: string;
  label: string;
};

/**
 * Create a SelectOption object from an identifier and display name.
 *
 * @param id - The option identifier to use as `value`
 * @param name - The display text to use as `label`
 * @returns A SelectOption whose `value` is `id` and `label` is `name`
 */
function toSelectOption(id: string, name: string): SelectOption {
  return { value: id, label: name };
}

/**
 * Finds a select option whose `value` matches the provided `id`.
 *
 * @param options - Array of select options to search, or `undefined`
 * @param id - The option `value` to match
 * @returns The matching `SelectOption` if found, `undefined` otherwise
 */
function findSelectOption(
  options: SelectOption[] | undefined,
  id: string
): SelectOption | undefined {
  return options?.find((opt) => opt.value === id);
}

/**
 * Render a form for creating a new marketplace product.
 *
 * The form manages product fields (title, price, stock quantity, category, condition, description,
 * and WhatsApp contact), validates input with the NewProductSchema, and submits a create-listing
 * request. While submission is pending the submit button is disabled and displays a spinner.
 * On successful creation the router navigates back; submission errors are logged to the console.
 *
 * @returns A JSX element containing the new product creation form
 */
export default function NewProductForm() {
  const priceRef = useRef<TextInput>(null);
  const stockRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const whatsappRef = useRef<TextInput>(null);

  const { data: categories = [], isLoading: isCategoriesLoading } = useMarketCategories();
  const createListing = useCreateListing();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<NewProductFormType>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      title: '',
      price: undefined,
      stock_qty: undefined,
      category_id: '',
      description: '',
      condition: undefined,
      whatsapp_contact: '',
    },
    mode: 'onChange',
  });

  const categoryOptions = useMemo(
    () => categories.map((c) => toSelectOption(c.id, c.name)),
    [categories]
  );

  const conditionOptions = useMemo(
    () => CONDITION_OPTIONS.map((c) => toSelectOption(c.value, c.label)),
    []
  );

  const onSubmit = async (data: NewProductFormType) => {
    try {
      await createListing.mutateAsync({
        title: data.title,
        price: data.price,
        stock_qty: data.stock_qty,
        category_id: data.category_id,
        description: data.description || null,
        condition: data.condition || null,
        whatsapp_contact: data.whatsapp_contact || null,
      });
      router.back();
    } catch (error) {
      console.error('Failed to create listing:', error);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <KeyboardAwareScrollView
        bottomOffset={20}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6">
          <ThemedText className="mb-1 text-2xl font-bold">Create New Product</ThemedText>
          <ThemedText themeColor="textSecondary" className="text-sm">
            Fill in the product details below
          </ThemedText>
        </View>

        {/* Form Fields */}
        <View className="gap-5">
          {/* Product Name */}
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.title} isRequired>
                <TextField.Label>Product Name</TextField.Label>
                <TextField.Input
                  placeholder="Enter product name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => priceRef.current?.focus()}
                  blurOnSubmit={false}
                />
                {errors.title && (
                  <TextField.ErrorMessage>{errors.title.message}</TextField.ErrorMessage>
                )}
              </TextField>
            )}
          />

          {/* Price */}
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.price} isRequired>
                <TextField.Label>Price (GH₵)</TextField.Label>
                <TextField.Input
                  ref={priceRef}
                  placeholder="0.00"
                  value={value?.toString() ?? ''}
                  onChangeText={(text) => onChange(text ? parseFloat(text) : undefined)}
                  onBlur={onBlur}
                  keyboardType="decimal-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => stockRef.current?.focus()}
                  blurOnSubmit={false}
                />
                {errors.price && (
                  <TextField.ErrorMessage>{errors.price.message}</TextField.ErrorMessage>
                )}
              </TextField>
            )}
          />

          {/* Stock Quantity */}
          <Controller
            control={control}
            name="stock_qty"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.stock_qty}>
                <TextField.Label>Stock Quantity (Optional)</TextField.Label>
                <TextField.Input
                  ref={stockRef}
                  placeholder="Enter available stock"
                  value={value?.toString() ?? ''}
                  onChangeText={(text) => onChange(text ? parseInt(text, 10) : undefined)}
                  onBlur={onBlur}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                {errors.stock_qty && (
                  <TextField.ErrorMessage>{errors.stock_qty.message}</TextField.ErrorMessage>
                )}
              </TextField>
            )}
          />

          {/* Category Select */}
          <Controller
            control={control}
            name="category_id"
            render={({ field: { value } }) => (
              <View className="gap-1.5">
                <Text className="text-sm font-medium text-foreground">
                  Category <Text className="text-danger">*</Text>
                </Text>
                <Select
                  value={findSelectOption(categoryOptions, value)}
                  onValueChange={(option) => setValue('category_id', option?.value ?? '')}
                  isDisabled={isCategoriesLoading}
                >
                  <Select.Trigger>
                    <AnimatedSelectTrigger
                      placeholder="Select a category"
                      isInvalid={!!errors.category_id}
                      isDisabled={isCategoriesLoading}
                    />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Overlay />
                    <Select.Content presentation="bottom-sheet">
                      {categoryOptions.map((option) => (
                        <Select.Item
                          key={option.value}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </Select.Content>
                  </Select.Portal>
                </Select>
                {errors.category_id && (
                  <Text className="text-sm text-danger">{errors.category_id.message}</Text>
                )}
              </View>
            )}
          />

          {/* Condition Select */}
          <Controller
            control={control}
            name="condition"
            render={({ field: { value } }) => (
              <View className="gap-1.5">
                <Text className="text-sm font-medium text-foreground">
                  Condition (Optional)
                </Text>
                <Select
                  value={value ? findSelectOption(conditionOptions, value) : undefined}
                  onValueChange={(option) =>
                    setValue('condition', option?.value as 'new' | 'used' | 'refurbished' | undefined)
                  }
                >
                  <Select.Trigger>
                    <AnimatedSelectTrigger
                      placeholder="Select condition"
                      isInvalid={!!errors.condition}
                    />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Overlay />
                    <Select.Content presentation="bottom-sheet">
                      {conditionOptions.map((option) => (
                        <Select.Item
                          key={option.value}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </Select.Content>
                  </Select.Portal>
                </Select>
              </View>
            )}
          />

          {/* Description */}
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.description}>
                <TextField.Label>Description (Optional)</TextField.Label>
                <TextField.Input
                  ref={descriptionRef}
                  placeholder="Describe your product..."
                  value={value ?? ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  style={{ minHeight: 100 }}
                />
                {errors.description && (
                  <TextField.ErrorMessage>{errors.description.message}</TextField.ErrorMessage>
                )}
              </TextField>
            )}
          />

          {/* WhatsApp Contact */}
          <Controller
            control={control}
            name="whatsapp_contact"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.whatsapp_contact}>
                <TextField.Label>WhatsApp Number (Optional)</TextField.Label>
                <TextField.Input
                  ref={whatsappRef}
                  placeholder="0241234567"
                  value={value ?? ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  autoComplete="tel"
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                {errors.whatsapp_contact && (
                  <TextField.ErrorMessage>{errors.whatsapp_contact.message}</TextField.ErrorMessage>
                )}
              </TextField>
            )}
          />
        </View>

        {/* Submit Button */}
        <View className="pb-8 pt-8">
          <Button
            onPress={handleSubmit(onSubmit)}
            isDisabled={!isValid || createListing.isPending}
            className="w-full"
            size="lg"
          >
            {createListing.isPending ? (
              <Spinner size="sm" className="text-primary-foreground" />
            ) : (
              <Button.Label>Create Product</Button.Label>
            )}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}