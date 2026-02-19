import { memo } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Avatar, PressableFeedback } from 'heroui-native';
import { Share2, ExternalLink } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import type { SRCUpdate } from '@/types/home';
import MemoMicMegaphone from '@/components/icons/MicMegaphone';

interface UpdateCardProps {
  update: SRCUpdate;
  onShare?: () => void;
  onExternalLink?: () => void;
  onReadMore?: () => void;
}

export const UpdateCard = memo(function UpdateCard({
  update,
  onShare,
  onExternalLink,
  onReadMore,
}: UpdateCardProps) {
  const { title, submitterName, timestamp, description, avatarUrl, avatarFallback, gradientColors, linkUrl } =
    update;

  return (
    <View className="w-full">
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="overflow-hidden rounded-2xl!"
      >
        <Card className="border-0 bg-transparent p-0 shadow-none">
          <Card.Body className="px-4 py-3">
            {/* Header Section */}
            <View className="mb-1 flex-row items-start justify-between">
              <View className="flex-1 flex-row items-center gap-3">
                <Avatar alt={avatarFallback} size="md" color="default">
                  {avatarUrl ? (
                    <Avatar.Image source={{ uri: avatarUrl }} />
                  ) : (
                    <Avatar.Fallback>
                      <ThemedText className="text-sm font-semibold text-primary">
                        {avatarFallback}
                      </ThemedText>
                    </Avatar.Fallback>
                  )}
                </Avatar>

                <View className="flex-1">
                  <Text className="text-[13px] font-medium leading-tight text-white">
                    {title}
                  </Text>
                  <Text className="text-xs text-white/80">{submitterName}</Text>
                  {timestamp && (
                    <Text className="text-[10px] text-white/60">{timestamp}</Text>
                  )}
                </View>
              </View>
            </View>

            {/* Description */}
            <View className="mb-3 pl-12">
              <Text numberOfLines={4} className="text-sm leading-relaxed text-white">{description}</Text>
              {onReadMore && (
                <PressableFeedback onPress={onReadMore} className="mt-1">
                  <Text className="text-xs font-semibold text-accent">[Read More]</Text>
                </PressableFeedback>
              )}
            </View>

            {/* Action Buttons */}
            <View className="flex-row items-center gap-5 pl-12">
              {onShare && (
                <PressableFeedback onPress={onShare} className="rounded-full bg-white/10 p-2.5">
                  <Share2 color="white" size={20} />
                </PressableFeedback>
              )}

              <View className="flex-1" />

              {linkUrl && (
                <PressableFeedback onPress={onExternalLink} className="rounded-full bg-white/10 p-2.5">
                  <ExternalLink color="white" size={20} />
                </PressableFeedback>
              )}
            </View>
          </Card.Body>
        </Card>

        {/* Decorative Icon */}
        <View className="absolute -right-5 -top-4">
          <MemoMicMegaphone />
        </View>
      </LinearGradient>
    </View>
  );
});
