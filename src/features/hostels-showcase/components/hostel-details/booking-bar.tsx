import { useMemo, useCallback, useState } from 'react';
import { View, Platform, ActionSheetIOS, Alert, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, BottomSheet, useToast } from 'heroui-native';
import { Phone, MessageCircle } from 'lucide-react-native';

import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/themed-text';

interface BookingBarProps {
  price: number;
  paymentTerm: string | null;
  contact: string | null;
}

async function openExternalLink(url: string, errorMessage: string) {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', errorMessage);
    }
  } catch {
    Alert.alert('Error', 'An unexpected error occurred.');
  }
}

/**
 * Bottom booking bar with price and contact CTA
 * iOS: Fixed at bottom with absolute positioning
 * Android: Inline section within scroll content
 */
export function BookingBar({ price, paymentTerm, contact }: BookingBarProps) {
  const theme = useTheme();
  const { toast } = useToast();
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);

  const hasContact = !!contact;

  const formattedPrice = useMemo(
    () =>
      new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price),
    [price]
  );

  const termLabel = useMemo(() => {
    switch (paymentTerm) {
      case 'academic_year':
        return 'Aca year';
      case 'yearly':
        return 'year';
      case 'semester':
      default:
        return 'sem';
    }
  }, [paymentTerm]);

  const handleWhatsAppPress = useCallback(async () => {
    setIsContactSheetOpen(false);
    if (!contact) {
      toast.show({
        variant: 'danger',
        label: 'Contact information is not available for this hostel.',
      });
      return;
    }
    await openExternalLink(`https://wa.me/${contact}`, 'WhatsApp is not installed or cannot be opened.');
  }, [contact, toast]);

  const handlePhonePress = useCallback(async () => {
    setIsContactSheetOpen(false);
    if (!contact) {
      toast.show({
        variant: 'danger',
        label: 'Contact information is not available for this hostel.',
      });
      return;
    }
    await openExternalLink(`tel:${contact}`, 'Phone dialer is not available.');
  }, [contact, toast]);

  const handleContactPress = useCallback(() => {
    if (!hasContact) {
      Alert.alert('No Contact', 'Contact information is not available for this hostel.');
      return;
    }

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Chat on WhatsApp', 'Voice Call'],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          handleWhatsAppPress();
        } else if (buttonIndex === 2) {
          handlePhonePress();
        }
      }
    );
  }, [hasContact, handleWhatsAppPress, handlePhonePress]);

  const priceSection = (
    <View className="shrink-0">
      <ThemedText type="small" themeColor="textSecondary">
        Price per {termLabel}
      </ThemedText>
      <ThemedText
        numberOfLines={1}
        className="text-2xl font-bold"
        themeColor="accent"
      >
        {formattedPrice}
      </ThemedText>
    </View>
  );

  const contactButton = (
    <Button
      variant="primary"
      size="lg"
      onPress={isIOS ? handleContactPress : undefined}
      className="flex-1"
      style={{
        borderRadius: 999,
        boxShadow: isIOS ? '0 4px 12px rgba(60, 135, 247, 0.3)' : undefined,
      }}
    >
      <Phone size={20} color="#fff" />
      <Button.Label className="text-lg font-bold">Book Now</Button.Label>
    </Button>
  );

  // iOS: absolute floating bar
  if (isIOS) {
    return (
      <View
        className="absolute bottom-0 w-full rounded-t-2xl"
        style={{
          backgroundColor: theme.background,
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: theme.cardBorder,
          paddingBottom: Math.max(insets.bottom, 16),
          paddingTop: 20,
          paddingHorizontal: 20,
          borderCurve: 'continuous',
        }}
      >
        <View className="flex-row items-center justify-between gap-6">
          {priceSection}
          {contactButton}
        </View>
      </View>
    );
  }

  // Android: inline section within scroll content
  return (
    <View
      className="mt-7 rounded-2xl border border-border p-5"
      style={{ borderCurve: 'continuous' }}
    >
      <View className="flex-row items-center justify-between gap-6">
        {priceSection}
      </View>
      <View className="mt-4">
        <BottomSheet
          isOpen={isContactSheetOpen}
          onOpenChange={setIsContactSheetOpen}
        >
          <BottomSheet.Trigger asChild>
            {contactButton}
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content>
              <BottomSheet.Close />
              <View className="items-center gap-4 pb-4">
                <BottomSheet.Title>Contact Agent</BottomSheet.Title>
                <BottomSheet.Description>
                  Choose how you&apos;d like to reach the agent
                </BottomSheet.Description>
              </View>

              <View className="gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onPress={handleWhatsAppPress}
                  className="w-full"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <MessageCircle size={20} color="#fff" />
                  <Button.Label className="text-white">Chat on WhatsApp</Button.Label>
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onPress={handlePhonePress}
                  className="w-full"
                >
                  <Phone size={20} color={theme.accent} />
                  <Button.Label>Voice Call</Button.Label>
                </Button>

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
    </View>
  );
}
