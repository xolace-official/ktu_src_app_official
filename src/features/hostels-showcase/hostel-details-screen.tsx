import { useCallback } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Button, Chip } from 'heroui-native';
import { Star, Bed, Bath, MapPin } from 'lucide-react-native';

import { useTheme } from '@/hooks/use-theme';
import { useHostelDetails } from '@/hooks/hostels';
import { ThemedText } from '@/components/themed-text';
import {
  HeaderSection,
  AgentSection,
  FacilitiesSection,
  GallerySection,
  BookingBar,
  LoadingSkeleton,
  ErrorState,
} from './components/hostel-details';

/**
 * Hostel details screen
 *
 * Improvements over reference code:
 * - Uses HeroUI Native components (Avatar, Button, Chip, etc.)
 * - Uses lucide-react-native icons (consistent with rest of app)
 * - Uses expo-image with blur hash placeholders
 * - Proper safe area handling with useSafeAreaInsets
 * - Uses useWindowDimensions instead of Dimensions.get()
 * - Theme-aware styling using CSS variables
 * - Better error and loading states with skeleton
 * - Avoids TouchableOpacity (uses PressableFeedback)
 * - Uses Intl.NumberFormat for currency formatting
 * - Proper TypeScript typing
 */
export function HostelDetailsScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const {
    data: hostel,
    isLoading,
    isError,
    error,
    refetch,
  } = useHostelDetails(id);

  // Navigation handlers
  const handleBack = useCallback(() => router.back(), []);
  const handleShare = useCallback(() => {
    // TODO: Implement share functionality
  }, []);
  const handleFavorite = useCallback(() => {
    // TODO: Implement favorite functionality
  }, []);

  const handleMessage = useCallback(() => {
    if (hostel?.agent.email) {
      Linking.openURL(`mailto:${hostel.agent.email}`);
    }
  }, [hostel?.agent.email]);

  const handleCall = useCallback(() => {
    if (hostel?.contact) {
      Linking.openURL(`tel:${hostel.contact}`);
    }
  }, [hostel?.contact]);

  // Invalid ID state
  if (!id) {
    return (
      <View
        className="flex-1 items-center justify-center px-6"
        style={{ backgroundColor: theme.background }}
      >
        <ThemedText className="text-center font-medium">
          Invalid hostel ID. Please go back and try again.
        </ThemedText>
        <Button variant="tertiary" onPress={handleBack} className="mt-4">
          <Button.Label>Go Back</Button.Label>
        </Button>
      </View>
    );
  }

  // Loading state
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (isError || !hostel) {
    return (
      <ErrorState
        message={(error as Error)?.message}
        onRetry={refetch}
        onBack={handleBack}
      />
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
        bounces
      >
        <HeaderSection
          image={hostel.image ?? hostel.gallery[0]?.image ?? null}
          onBack={handleBack}
          onShare={handleShare}
          onFavorite={handleFavorite}
        />

        <View className="gap-2 px-5 pt-6">
          {/* Hostel name */}
          <ThemedText className="text-2xl font-bold">{hostel.name}</ThemedText>

          {/* Type chip and rating */}
          <View className="flex-row items-center gap-3">
            <Chip variant="secondary" size="sm">
              <Chip.Label className="font-bold">{hostel.type}</Chip.Label>
            </Chip>

            {hostel.rating != null && hostel.rating > 0 && (
              <View className="flex-row items-center gap-1.5">
                <Star size={18} fill="#f9e406" color="#f9e406" />
                <ThemedText className="font-semibold" themeColor="textSecondary">
                  {hostel.rating.toFixed(1)}
                </ThemedText>
              </View>
            )}
          </View>

          {/* Beds and baths info */}
          <View className="mt-5 flex-row items-center">
            <View
              className="size-10 items-center justify-center rounded-full"
              style={{ backgroundColor: theme.accentSubtle }}
            >
              <Bed size={20} color={theme.accent} />
            </View>
            <ThemedText className="ml-2 font-medium" themeColor="textSecondary">
              {hostel.bedrooms ?? 0} Beds
            </ThemedText>

            <View
              className="ml-7 size-10 items-center justify-center rounded-full"
              style={{ backgroundColor: theme.accentSubtle }}
            >
              <Bath size={20} color={theme.accent} />
            </View>
            <ThemedText className="ml-2 font-medium" themeColor="textSecondary">
              {hostel.bathrooms ?? 0} Baths
            </ThemedText>
          </View>

          {/* Agent section */}
          <AgentSection
            agent={hostel.agent}
            onMessage={handleMessage}
            onCall={handleCall}
          />

          {/* Overview */}
          <View className="mt-7">
            <ThemedText className="text-xl font-bold">Overview</ThemedText>
            <ThemedText
              className="mt-2 leading-6"
              themeColor="textSecondary"
              selectable
            >
              {hostel.description ?? 'No description provided.'}
            </ThemedText>
          </View>

          {/* Facilities */}
          <View className="mt-7">
            <ThemedText className="text-xl font-bold">Facilities</ThemedText>
            <FacilitiesSection facilities={hostel.facilities} />
          </View>

          {/* Gallery */}
          <GallerySection gallery={hostel.gallery} />

          {/* Location */}
          <View className="mt-7">
            <ThemedText className="text-xl font-bold">Location</ThemedText>
            <View className="mt-4 flex-row items-start gap-2">
              <MapPin size={24} color={theme.accent} />
              <ThemedText
                className="flex-1 leading-5"
                themeColor="textSecondary"
                selectable
              >
                {hostel.address ?? 'Address not available'}
              </ThemedText>
            </View>

            {/* Map placeholder */}
            <View
              className="mt-5 h-52 w-full items-center justify-center rounded-xl"
              style={{
                backgroundColor: theme.backgroundElement,
                borderCurve: 'continuous',
              }}
            >
              <MapPin size={48} color={theme.textSecondary} />
              <ThemedText themeColor="textSecondary" className="mt-2">
                Map view
              </ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom booking bar */}
      <BookingBar
        price={hostel.price}
        paymentTerm={hostel.paymentTerm}
        contact={hostel.contact}
      />
    </View>
  );
}
