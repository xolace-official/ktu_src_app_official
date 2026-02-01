import { ThemedText } from '@/components/themed-text';
import { AnimatedSelectTrigger } from '@/components/ui/animated-select-trigger';
import { useCreateListing } from '@/hooks/marketplace/use-create-listing';
import { useMarketCategories } from '@/hooks/marketplace/use-market-categories';
import {
  CONDITION_OPTIONS,
  NewProductSchema,
  type NewProductFormType,
} from '@/lib/schemas/marketplace';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Button, Select, Spinner, TextField } from 'heroui-native';
import { useMemo, useRef } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Keyboard, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

type SelectOption = {
  value: string;
  label: string;
};

function toSelectOption(id: string, name: string): SelectOption {
  return { value: id, label: name };
}

function findSelectOption(
  options: SelectOption[] | undefined,
  id: string
): SelectOption | undefined {
  return options?.find((opt) => opt.value === id);
}

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = data as NewProductFormType;
    try {
      await createListing.mutateAsync({
        title: formData.title,
        price: formData.price,
        stock_qty: formData.stock_qty,
        category_id: formData.category_id,
        description: formData.description || null,
        condition: formData.condition || null,
        whatsapp_contact: formData.whatsapp_contact || null,
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
                  onValueChange={(option) => setValue('category_id', option?.value ?? '', { shouldValidate: true })}
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
                    setValue('condition', option?.value as 'new' | 'used' | 'refurbished' | undefined, { shouldValidate: true })
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
