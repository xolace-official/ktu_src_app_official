import { View, Text } from 'react-native';
import { PressableFeedback } from 'heroui-native';
import { Image, ImageSource } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Tag } from 'lucide-react-native';

interface BannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onPress?: () => void;
  image?: ImageSource;
}

/**
 * Renders a promotional banner with a diagonal orange-to-brown gradient, a title, an optional subtitle, a pill-shaped call-to-action button, and an optional image on the right.
 *
 * @param title - The banner title text; supports newlines for multi-line headings.
 * @param subtitle - Optional secondary text displayed below the title.
 * @param ctaText - Text displayed inside the call-to-action button.
 * @param onPress - Optional callback invoked when the call-to-action button is pressed.
 * @param image - Optional image source rendered on the right side of the banner.
 * @returns A React element containing the configured promotional banner.
 */
export function Banner({
  title = 'Shop Smarter,\nSave More!',
  subtitle,
  ctaText = 'Get 40% OFF!',
  onPress,
  image,
}: BannerProps) {
  return (
    <View className="overflow-hidden rounded-2xl">
      <LinearGradient
        colors={['#F5882B', '#8A3324']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 16, flexDirection: 'row' }}
      >
        <View className="flex-1 justify-center gap-3">
          <Text className="text-2xl font-bold text-white">{title}</Text>
          {subtitle && (
            <Text className="text-sm text-white/80">{subtitle}</Text>
          )}
          <PressableFeedback
            onPress={onPress}
            className="min-h-[44px] flex-row items-center gap-2 self-start rounded-full border border-white/60 bg-transparent px-4 py-2"
          >
            <Tag size={16} color="#fff" />
            <Text className="text-sm font-semibold text-white">{ctaText}</Text>
          </PressableFeedback>
        </View>

        {image && (
          <Image
            source={image}
            style={{ width: 120, height: 100 }}
            contentFit="contain"
          />
        )}
      </LinearGradient>
    </View>
  );
}