import { View } from 'react-native';
import {
  Wifi,
  Car,
  UtensilsCrossed,
  Shirt,
  Users,
  ShieldCheck,
  Info,
} from 'lucide-react-native';

import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/themed-text';

/**
 * Facility icon mapping - using lucide icons
 */
const facilityIcons: Record<string, typeof Wifi> = {
  WiFi: Wifi,
  Parking: Car,
  Kitchen: UtensilsCrossed,
  Laundry: Shirt,
  Lounge: Users,
  '24/7 Security': ShieldCheck,
};

interface FacilitiesSectionProps {
  facilities: string[];
}

/**
 * Facilities section with icon grid
 * Displays available amenities with icons
 */
export function FacilitiesSection({ facilities }: FacilitiesSectionProps) {
  const theme = useTheme();

  if (facilities.length === 0) {
    return (
      <ThemedText themeColor="textSecondary" className="mt-2">
        No facilities listed.
      </ThemedText>
    );
  }

  return (
    <View className="mt-3 flex-row flex-wrap gap-5">
      {facilities.map((item, index) => {
        const IconComponent = facilityIcons[item] ?? Info;
        return (
          <View key={index} className="min-w-16 max-w-20 flex-1 items-center">
            <View
              className="size-14 items-center justify-center rounded-full"
              style={{ backgroundColor: theme.accentSubtle }}
            >
              <IconComponent size={24} color={theme.accent} />
            </View>
            <ThemedText
              numberOfLines={1}
              className="mt-1.5 text-center text-sm"
              themeColor="textSecondary"
            >
              {item}
            </ThemedText>
          </View>
        );
      })}
    </View>
  );
}
