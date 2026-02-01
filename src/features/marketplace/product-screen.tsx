import { ThemedText } from '@/components/themed-text';
import { useProductDetails } from '@/hooks/marketplace';
import { useTheme } from '@/hooks/use-theme';
import type { MarketListingVariant } from '@/types/marketplace';
import { useLocalSearchParams } from 'expo-router';
import {
    Avatar,
    BottomSheet,
    Button,
    Chip,
    PressableFeedback,
    SkeletonGroup,
} from 'heroui-native';
import { ChevronRight, Heart, MessageCircle, Phone, Star } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import {
    ActionSheetIOS,
    Alert,
    Linking,
    Platform,
    ScrollView,
    Share,
    useWindowDimensions,
    View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductImageCarousel } from './components';

// Stock status colors using semantic approach
function getStockStatus(isInStock: boolean, stockQty: number | null) {
  if (!isInStock) {
    return { label: 'Out of stock', color: 'danger' as const };
  }
  if (stockQty !== null && stockQty <= 5) {
    return { label: `${stockQty} left`, color: 'warning' as const };
  }
  return { label: 'In stock', color: 'success' as const };
}

function LoadingSkeleton() {
  const { width: screenWidth } = useWindowDimensions();

  return (
    <SkeletonGroup isLoading isSkeletonOnly className="flex-1 bg-background">
      {/* Image skeleton */}
      <SkeletonGroup.Item
        className="bg-surface-secondary"
        style={{ width: screenWidth, height: screenWidth }}
      />

      {/* Content skeleton */}
      <View className="gap-4 p-4">
        <SkeletonGroup.Item className="h-8 w-24 rounded-lg" />
        <SkeletonGroup.Item className="h-6 w-3/4 rounded-lg" />
        <SkeletonGroup.Item className="h-4 w-32 rounded-lg" />

        <View className="mt-4 gap-2">
          <SkeletonGroup.Item className="h-4 w-full rounded-md" />
          <SkeletonGroup.Item className="h-4 w-full rounded-md" />
          <SkeletonGroup.Item className="h-4 w-2/3 rounded-md" />
        </View>

        <View className="mt-4 flex-row items-center gap-3">
          <SkeletonGroup.Item className="size-12 rounded-full" />
          <View className="flex-1 gap-2">
            <SkeletonGroup.Item className="h-4 w-32 rounded-md" />
            <SkeletonGroup.Item className="h-3 w-24 rounded-md" />
          </View>
        </View>
      </View>
    </SkeletonGroup>
  );
}

function NotFoundState() {
  return (
    <View className="flex-1 items-center justify-center bg-background p-8">
      <ThemedText themeColor="textSecondary" className="text-center">
        Product not found or has been removed.
      </ThemedText>
    </View>
  );
}

function RatingStars({ rating, size = 16 }: { rating: number; size?: number }) {
  const theme = useTheme();

  return (
    <View className="flex-row gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= Math.floor(rating) ? theme.goldAccent : 'transparent'}
          color={star <= Math.floor(rating) ? theme.goldAccent : `${theme.text}30`}
        />
      ))}
    </View>
  );
}

export function ProductScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);

  const productId = Array.isArray(id) ? id[0] : (id ?? '');
  const { data: product, isLoading } = useProductDetails(productId);

  // Derive current prices and stock based on selected variant
  const selectedVariant = useMemo(() => {
    if (!product || !selectedVariantId) return null;
    return product.variants.find((v) => v.id === selectedVariantId) ?? null;
  }, [product, selectedVariantId]);

  const currentPrice = selectedVariant?.price ?? product?.price;
  const currentStock = selectedVariant?.stock_qty ?? product?.stock_qty;
  const isInStock = selectedVariant ? selectedVariant.is_in_stock : product?.is_in_stock;
  const stockStatus = getStockStatus(isInStock ?? false, currentStock ?? null);

  // Contact info
  const phoneNumber = product?.call_contact;
  const whatsappNumber = product?.whatsapp_contact;
  const hasPhone = !!phoneNumber;
  const hasWhatsApp = !!whatsappNumber;
  const hasContactInfo = hasPhone || hasWhatsApp;

  // Get all images from photos array, fallback to hero_image_url
  const images = useMemo(() => {
    if (!product) return [];
    if (product.photos.length > 0) {
      return product.photos.map((photo) => photo.storage_path);
    }
    return product.hero_image_url ? [product.hero_image_url] : [];
  }, [product]);

  const handleShare = useCallback(async () => {
    if (!product) return;
    try {
      await Share.share({
        message: `Check out ${product.title} - ${product.currency} ${currentPrice?.toFixed(2)}`,
        title: product.title,
      });
    } catch {
      // User cancelled or error
    }
  }, [product, currentPrice]);

  const handleToggleFavorite = useCallback(() => {
    setIsFavorite((prev) => !prev);
    // TODO: Implement actual favorite logic with backend
  }, []);

  const handleVariantSelect = useCallback(
    (variant: MarketListingVariant) => {
      setSelectedVariantId(selectedVariantId === variant.id ? null : variant.id);
    },
    [selectedVariantId]
  );

  const handleContactPress = useCallback(() => {
    if (!hasContactInfo) return;

    // iOS uses native ActionSheet for better UX
    if (Platform.OS === 'ios') {
      const options: string[] = ['Cancel'];
      const actions: (() => void)[] = [() => {}];

      if (hasWhatsApp) {
        options.push('Chat on WhatsApp');
        actions.push(async () => {
          const url = `https://wa.me/${whatsappNumber}`;
          try {
            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
              await Linking.openURL(url);
            } else {
              Alert.alert('Error', 'WhatsApp is not installed or cannot be opened.');
            }
          } catch (error) {
            console.error('Error opening WhatsApp:', error);
            Alert.alert('Error', 'An unexpected error occurred while trying to open WhatsApp.');
          }
        });
      }

      if (hasPhone) {
        options.push('Voice Call');
        actions.push(async () => {
          const url = `tel:${phoneNumber}`;
          try {
            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
              await Linking.openURL(url);
            } else {
              Alert.alert('Error', 'Phone dialer is not available.');
            }
          } catch (error) {
            console.error('Error opening phone dialer:', error);
            Alert.alert('Error', 'An unexpected error occurred while trying to make a call.');
          }
        });
      }

      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          const action = actions[buttonIndex];
          action?.();
        }
      );
    } else {
      // Android uses BottomSheet
      setIsContactSheetOpen(true);
    }
  }, [hasContactInfo, hasWhatsApp, hasPhone, whatsappNumber, phoneNumber]);

  const handleWhatsAppPress = useCallback(async () => {
    setIsContactSheetOpen(false);
    if (whatsappNumber) {
      const url = `https://wa.me/${whatsappNumber}`;
      try {
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', 'WhatsApp is not installed or cannot be opened.');
        }
      } catch (error) {
        console.error('Error opening WhatsApp:', error);
        Alert.alert('Error', 'An unexpected error occurred while trying to open WhatsApp.');
      }
    }
  }, [whatsappNumber]);

  const handlePhonePress = useCallback(async () => {
    setIsContactSheetOpen(false);
    if (phoneNumber) {
      const url = `tel:${phoneNumber}`;
      try {
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Phone dialer is not available.');
        }
      } catch (error) {
        console.error('Error opening phone dialer:', error);
        Alert.alert('Error', 'An unexpected error occurred while trying to make a call.');
      }
    }
  }, [phoneNumber]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!product) {
    return <NotFoundState />;
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 80, // Space for bottom CTA
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Image Carousel */}
        <View className="relative">
          <ProductImageCarousel images={images} />

          {/* Floating action buttons over image */}
          <View
            className="absolute right-4 gap-3"
            style={{ bottom: 16 }}
          >
            <Animated.View entering={FadeIn.delay(200)}>
              <PressableFeedback
                onPress={handleShare}
                className="size-11 items-center justify-center rounded-full bg-background/90"
                style={{ borderCurve: 'continuous' }}
                accessibilityRole="button"
                accessibilityLabel="Share product"
              >
                <PressableFeedback.Highlight />
                <MessageCircle size={20} color={theme.text} />
              </PressableFeedback>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(300)}>
              <PressableFeedback
                onPress={handleToggleFavorite}
                className="size-11 items-center justify-center rounded-full bg-background/90"
                style={{ borderCurve: 'continuous' }}
                accessibilityRole="button"
                accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <PressableFeedback.Highlight />
                <Heart
                  size={20}
                  color={isFavorite ? theme.accent : theme.text}
                  fill={isFavorite ? theme.accent : 'transparent'}
                />
              </PressableFeedback>
            </Animated.View>
          </View>
        </View>

        {/* Product Info */}
        <Animated.View entering={FadeInUp.delay(100)} className="gap-4 p-4">
          {/* Price */}
          <ThemedText
            themeColor="accent"
            className="text-3xl font-bold"
            selectable
          >
            {product.currency} {currentPrice?.toFixed(2)}
          </ThemedText>

          {/* Title and Stock Status */}
          <View className="flex-row items-start gap-2">
            <ThemedText className="flex-1 text-lg font-semibold" selectable>
              {product.title}
            </ThemedText>
            <Chip
              size="sm"
              variant="soft"
              color={stockStatus.color}
            >
              {stockStatus.label}
            </Chip>
          </View>

          {/* Rating */}
          <View className="flex-row items-center gap-2">
            <RatingStars rating={product.rating} />
            <ThemedText themeColor="textSecondary" type="small">
              {product.rating.toFixed(1)} ({product.rating_count} reviews)
            </ThemedText>
          </View>

          {/* Variants */}
          {product.variants.length > 0 && (
            <Animated.View entering={FadeInUp.delay(200)} className="gap-3">
              <ThemedText className="font-semibold">Available Options</ThemedText>
              <View className="flex-row flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariantId === variant.id;
                  return (
                    <PressableFeedback
                      key={variant.id}
                      onPress={() => handleVariantSelect(variant)}
                      className={`rounded-full border px-4 py-2 ${
                        isSelected
                          ? 'border-accent bg-accent/10'
                          : 'border-border bg-surface-secondary'
                      }`}
                      style={{ borderCurve: 'continuous' }}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                    >
                      <PressableFeedback.Highlight />
                      <ThemedText
                        themeColor={isSelected ? 'accent' : 'text'}
                        type="small"
                        className="font-medium"
                      >
                        {variant.label}
                      </ThemedText>
                    </PressableFeedback>
                  );
                })}
              </View>
            </Animated.View>
          )}

          {/* Description */}
          <Animated.View entering={FadeInUp.delay(300)} className="gap-2">
            <ThemedText className="font-semibold">Description</ThemedText>
            <ThemedText themeColor="textSecondary" selectable>
              {product.description || 'No description available.'}
            </ThemedText>
          </Animated.View>

          {/* Condition */}
          {product.condition && (
            <Animated.View entering={FadeInUp.delay(350)} className="flex-row items-center gap-2">
              <ThemedText themeColor="textSecondary" type="small">
                Condition:
              </ThemedText>
              <Chip size="sm" variant="tertiary" color="default">
                {product.condition}
              </Chip>
            </Animated.View>
          )}

          {/* Seller Info */}
          {product.seller && (
            <Animated.View entering={FadeInUp.delay(400)}>
              <PressableFeedback
                className="mt-2 flex-row items-center gap-3 rounded-2xl bg-surface-secondary p-4"
                style={{ borderCurve: 'continuous' }}
                accessibilityRole="button"
                accessibilityLabel={`View seller ${product.seller.full_name || 'Unknown'}`}
              >
                <PressableFeedback.Highlight />
                <Avatar alt={product.seller.full_name || 'Unknown'} size="md" color="default">
                  {product.seller.avatar_url ? (
                    <Avatar.Image source={{ uri: product.seller.avatar_url }} />
                  ) : null}
                  <Avatar.Fallback>
                    {product.seller.full_name
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase() || '?'}
                  </Avatar.Fallback>
                </Avatar>

                <View className="flex-1">
                  <ThemedText className="font-semibold">
                    {product.seller.full_name || 'Unknown Seller'}
                  </ThemedText>
                  <View className="flex-row items-center gap-1">
                    <Star size={14} fill={theme.goldAccent} color={theme.goldAccent} />
                    <ThemedText themeColor="textSecondary" type="small">
                      4.5 • Verified seller
                    </ThemedText>
                  </View>
                </View>

                <ChevronRight size={20} color={theme.textSecondary} />
              </PressableFeedback>
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Bottom CTA */}
      <Animated.View
        entering={FadeInDown.delay(500)}
        className="absolute bottom-0 left-0 right-0 border-t border-border bg-background px-4 pt-3"
        style={{ paddingBottom: Math.max(insets.bottom, 12) }}
      >
        <Button
          variant="primary"
          size="lg"
          onPress={handleContactPress}
          isDisabled={!hasContactInfo}
          className="w-full"
        >
          <Phone size={20} color={theme.background} />
          <Button.Label>Contact Seller</Button.Label>
        </Button>
      </Animated.View>

      {/* Contact Bottom Sheet for Android */}
      <BottomSheet
        isOpen={isContactSheetOpen}
        onOpenChange={setIsContactSheetOpen}
      >
        <BottomSheet.Portal>
          <BottomSheet.Overlay />
          <BottomSheet.Content>
            <BottomSheet.Close />
            <View className="items-center gap-4 pb-4">
              <BottomSheet.Title>Contact Seller</BottomSheet.Title>
              <BottomSheet.Description>
                Choose how you&apos;d like to reach the seller
              </BottomSheet.Description>
            </View>

            <View className="gap-3">
              {hasWhatsApp && (
                <Button
                  variant="primary"
                  size="lg"
                  onPress={handleWhatsAppPress}
                  className="w-full bg-[#25D366]"
                >
                  <MessageCircle size={20} color="#fff" />
                  <Button.Label className="text-white">Chat on WhatsApp</Button.Label>
                </Button>
              )}

              {hasPhone && (
                <Button
                  variant="secondary"
                  size="lg"
                  onPress={handlePhonePress}
                  className="w-full"
                >
                  <Phone size={20} color={theme.accent} />
                  <Button.Label>Voice Call</Button.Label>
                </Button>
              )}

              <Button
                variant="tertiary"
                size="lg"
                onPress={() => setIsContactSheetOpen(false)}
                className="w-full"
              >
                <Button.Label>Cancel</Button.Label>
              </Button>
            </View>
          </BottomSheet.Content>
        </BottomSheet.Portal>
      </BottomSheet>
    </View>
  );
}
