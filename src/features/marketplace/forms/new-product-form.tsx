import { ThemedText } from '@/components/themed-text';
import { AnimatedSelectTrigger } from '@/components/ui/animated-select-trigger';
import { useCreateSubmission } from '@/hooks/marketplace/use-create-submission';
import { useListingFeePlans } from '@/hooks/marketplace/use-listing-fee-plans';
import { useMarketCategories } from '@/hooks/marketplace/use-market-categories';
import { useTheme } from '@/hooks/use-theme';
import {
  CONDITION_OPTIONS,
  NewProductSchema,
  type NewProductFormType,
} from '@/lib/schemas/marketplace';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import {
  Button,
  FieldError,
  Input,
  Label,
  Select,
  Skeleton,
  Spinner,
  TextField,
} from 'heroui-native';
import { Plus, X } from 'lucide-react-native';
import { useMemo, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Keyboard, Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

const MAX_IMAGES = 3;

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

function formatFee(amount: number, currency: string) {
  return `${currency} ${amount.toFixed(2)}`;
}

export default function NewProductForm() {
  const priceRef = useRef<TextInput>(null);
  const stockRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const whatsappRef = useRef<TextInput>(null);
  const callRef = useRef<TextInput>(null);

  const theme = useTheme();
  const [images, setImages] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: categories = [], isLoading: isCategoriesLoading } = useMarketCategories();
  const { data: feePlan, isLoading: isFeePlanLoading } = useListingFeePlans();
  const createSubmission = useCreateSubmission();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
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
      call_contact: '',
      placement_type: 'normal',
    },
    mode: 'onChange',
  });

  const selectedPlacement = watch('placement_type');

  const categoryOptions = useMemo(
    () => categories.map((c) => toSelectOption(c.id, c.name)),
    [categories]
  );

  const conditionOptions = useMemo(
    () => CONDITION_OPTIONS.map((c) => toSelectOption(c.value, c.label)),
    []
  );

  const currentFee = feePlan
    ? selectedPlacement === 'featured'
      ? feePlan.featured_fee
      : feePlan.normal_fee
    : null;

  async function pickImage() {
    if (images.length >= MAX_IMAGES) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets[0]) {
      const newImages = [...images, result.assets[0].uri];
      setImages(newImages);
      if (newImages.length > 0) setImageError(null);
    }
  }

  function removeImage(index: number) {
    Alert.alert('Remove Image', 'Remove this photo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setImages((prev) => prev.filter((_, i) => i !== index)),
      },
    ]);
  }

  const onSubmit: SubmitHandler<NewProductFormType> = async (formData) => {
    if (images.length === 0) {
      setImageError('Please add at least 1 photo');
      return;
    }

    setSubmitError(null);

    try {
      const submission = await createSubmission.mutateAsync({
        title: formData.title,
        price: formData.price,
        stock_qty: formData.stock_qty,
        category_id: formData.category_id,
        description: formData.description || undefined,
        condition: formData.condition || undefined,
        whatsapp_contact: formData.whatsapp_contact || undefined,
        call_contact: formData.call_contact || undefined,
        placement_type: formData.placement_type,
        imageUris: images,
        fee_plan_id: feePlan?.id ?? null,
      });

      router.replace({
        pathname: '/marketplace-screen/submission-receipt',
        params: {
          reference_code: submission.reference_code,
          title: submission.title,
          price: String(submission.price),
          placement_type: submission.placement_type,
          fee_amount: String(currentFee ?? 0),
          currency: 'GHS',
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Submission failed. Please try again.';
      setSubmitError(message);
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
          <ThemedText className="mb-1 text-2xl font-bold">List Your Product</ThemedText>
          <ThemedText themeColor="textSecondary" className="text-sm">
            Fill in the details and add photos to submit for review
          </ThemedText>
        </View>

        <View className="gap-5">
          {/* Image Picker */}
          <View className="gap-2">
            <View className="flex-row items-center gap-1">
              <Label>Photos</Label>
              <Text className="text-danger">*</Text>
            </View>
            <View className="flex-row gap-3">
              {images.map((uri, index) => (
                <View
                  key={uri}
                  className="relative overflow-hidden rounded-2xl"
                  style={{ width: 90, height: 90, borderCurve: 'continuous' }}
                >
                  <Image
                    source={{ uri }}
                    style={{ width: 90, height: 90 }}
                    contentFit="cover"
                  />
                  <Pressable
                    onPress={() => removeImage(index)}
                    className="absolute right-1 top-1 items-center justify-center rounded-full bg-black/60"
                    style={{ width: 22, height: 22 }}
                  >
                    <X size={12} color="#fff" />
                  </Pressable>
                </View>
              ))}
              {images.length < MAX_IMAGES && (
                <Pressable
                  onPress={pickImage}
                  className="items-center justify-center rounded-2xl border-2 border-dashed border-muted/40 bg-surface"
                  style={{ width: 90, height: 90, borderCurve: 'continuous' }}
                >
                  <Plus size={24} color={theme.textSecondary} />
                  <ThemedText themeColor="textSecondary" className="mt-1 text-[10px]">
                    {images.length === 0 ? 'Add Photo' : 'Add More'}
                  </ThemedText>
                </Pressable>
              )}
            </View>
            <ThemedText themeColor="textSecondary" className="text-xs">
              {images.length}/{MAX_IMAGES} photos — min 1 required
            </ThemedText>
            {imageError && (
              <FieldError>{imageError}</FieldError>
            )}
          </View>

          {/* Product Name */}
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.title} isRequired>
                <Label>Product Name</Label>
                <Input
                  placeholder="Enter product name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => priceRef.current?.focus()}
                  blurOnSubmit={false}
                />
                {errors.title && <FieldError>{errors.title.message}</FieldError>}
              </TextField>
            )}
          />

          {/* Price */}
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.price} isRequired>
                <Label>Price (GH₵)</Label>
                <Input
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
                {errors.price && <FieldError>{errors.price.message}</FieldError>}
              </TextField>
            )}
          />

          {/* Stock Quantity */}
          <Controller
            control={control}
            name="stock_qty"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.stock_qty}>
                <Label>Stock Quantity (Optional)</Label>
                <Input
                  ref={stockRef}
                  placeholder="Enter available stock"
                  value={value?.toString() ?? ''}
                  onChangeText={(text) => onChange(text ? parseInt(text, 10) : undefined)}
                  onBlur={onBlur}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                {errors.stock_qty && <FieldError>{errors.stock_qty.message}</FieldError>}
              </TextField>
            )}
          />

          {/* Category Select */}
          <Controller
            control={control}
            name="category_id"
            render={({ field: { value } }) => (
              <View className="gap-1.5">
                <View className="flex-row items-center gap-1">
                  <Label>Category</Label>
                  <Text className="text-danger">*</Text>
                </View>
                <Select
                  value={findSelectOption(categoryOptions, value)}
                  onValueChange={(option) =>
                    setValue('category_id', option?.value ?? '', { shouldValidate: true })
                  }
                  isDisabled={isCategoriesLoading}
                  presentation="bottom-sheet"
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
                        <Select.Item key={option.value} value={option.value} label={option.label} />
                      ))}
                    </Select.Content>
                  </Select.Portal>
                </Select>
                {errors.category_id && <FieldError>{errors.category_id.message}</FieldError>}
              </View>
            )}
          />

          {/* Condition Select */}
          <Controller
            control={control}
            name="condition"
            render={({ field: { value } }) => (
              <View className="gap-1.5">
                <Label>Condition (Optional)</Label>
                <Select
                  value={value ? findSelectOption(conditionOptions, value) : undefined}
                  onValueChange={(option) =>
                    setValue('condition', option?.value as 'new' | 'used' | 'refurbished' | undefined, {
                      shouldValidate: true,
                    })
                  }
                  presentation="bottom-sheet"
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
                        <Select.Item key={option.value} value={option.value} label={option.label} />
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
                <Label>Description (Optional)</Label>
                <Input
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
                {errors.description && <FieldError>{errors.description.message}</FieldError>}
              </TextField>
            )}
          />

          {/* WhatsApp Contact */}
          <Controller
            control={control}
            name="whatsapp_contact"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.whatsapp_contact}>
                <Label>WhatsApp Number (Optional)</Label>
                <Input
                  ref={whatsappRef}
                  placeholder="0241234567"
                  value={value ?? ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  autoComplete="tel"
                  returnKeyType="next"
                  onSubmitEditing={() => callRef.current?.focus()}
                  blurOnSubmit={false}
                />
                {errors.whatsapp_contact && (
                  <FieldError>{errors.whatsapp_contact.message}</FieldError>
                )}
              </TextField>
            )}
          />

          {/* Call Contact */}
          <Controller
            control={control}
            name="call_contact"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField isInvalid={!!errors.call_contact}>
                <Label>Call Number (Optional)</Label>
                <Input
                  ref={callRef}
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
                {errors.call_contact && <FieldError>{errors.call_contact.message}</FieldError>}
              </TextField>
            )}
          />

          {/* Placement Type */}
          <Controller
            control={control}
            name="placement_type"
            render={({ field: { value } }) => (
              <View className="gap-2">
                <Label>Listing Placement</Label>
                <View className="flex-row gap-3">
                  {(['normal', 'featured'] as const).map((type) => {
                    const isSelected = value === type;
                    const fee = feePlan
                      ? type === 'featured'
                        ? feePlan.featured_fee
                        : feePlan.normal_fee
                      : null;

                    return (
                      <Pressable
                        key={type}
                        onPress={() => setValue('placement_type', type, { shouldValidate: true })}
                        className="flex-1 rounded-2xl bg-surface p-4"
                        style={{
                          borderCurve: 'continuous',
                          borderWidth: 2,
                          borderColor: isSelected ? theme.accent : 'transparent',
                        }}
                      >
                        <ThemedText className={`text-sm font-semibold capitalize ${isSelected ? '' : ''}`}>
                          {type === 'featured' ? '⭐ Featured' : 'Normal'}
                        </ThemedText>
                        {isFeePlanLoading ? (
                          <Skeleton className="mt-1 h-4 w-16 rounded-md" />
                        ) : fee !== null ? (
                          <ThemedText themeColor="textSecondary" className="mt-0.5 text-xs">
                            {formatFee(fee, feePlan?.currency ?? 'GHS')} fee
                          </ThemedText>
                        ) : null}
                        {type === 'featured' && (
                          <ThemedText themeColor="textSecondary" className="mt-1 text-[10px]">
                            Shown at top of listings
                          </ThemedText>
                        )}
                      </Pressable>
                    );
                  })}
                </View>
                <ThemedText themeColor="textSecondary" className="text-xs">
                  A listing fee is required to publish your product
                </ThemedText>
              </View>
            )}
          />

          {/* Submit Error */}
          {submitError && (
            <View className="rounded-xl bg-danger/10 p-3">
              <ThemedText className="text-sm text-danger">{submitError}</ThemedText>
            </View>
          )}
        </View>

        {/* Submit Button */}
        <View className="pb-8 pt-8">
          <Button
            onPress={handleSubmit(onSubmit)}
            isDisabled={!isValid || createSubmission.isPending}
            className="w-full"
            size="lg"
          >
            {createSubmission.isPending ? (
              <Spinner size="sm" className="#8B5CF6" />
            ) : (
              <Button.Label>Submit for Review</Button.Label>
            )}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
