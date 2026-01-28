import { memo } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Avatar, PressableFeedback } from 'heroui-native';
import { Download, Share2, Copy, ExternalLink, Megaphone } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import type { SRCUpdate } from '@/types/home';
import MemoMicMegaphone from '@/components/icons/MicMegaphone';

interface UpdateCardProps {
  update: SRCUpdate;
  onDownload?: () => void;
  onShare?: () => void;
  onCopy?: () => void;
  onExternalLink?: () => void;
  onReadMore?: () => void;
}

export const UpdateCard = memo(function UpdateCard({
  update,
  onDownload,
  onShare,
  onCopy,
  onExternalLink,
  onReadMore,
}: UpdateCardProps) {
  const { title, timestamp, description, avatarUrl, avatarFallback, gradientColors } = update;

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
                    <Avatar.Fallback className="bg-white">
                      <ThemedText className="text-sm font-semibold text-primary">
                        {avatarFallback}
                      </ThemedText>
                    </Avatar.Fallback>
                  )}
                </Avatar>

                <View className="flex-1">
                  <ThemedText className="text-[13px] font-medium leading-tight text-white">
                    {title}
                  </ThemedText>
                  <ThemedText className="mt-0.5 text-xs text-white/80">{timestamp}</ThemedText>
                </View>
              </View>
            </View>

            {/* Description */}
            <View className="mb-3 pl-12">
              <ThemedText className="text-sm leading-relaxed text-white">{description}</ThemedText>
              {onReadMore && (
                <PressableFeedback onPress={onReadMore} className="mt-1">
                  <ThemedText className="text-sm font-semibold text-white">[Read More]</ThemedText>
                </PressableFeedback>
              )}
            </View>

            {/* Action Buttons */}
            <View className="flex-row items-center gap-5 pl-12">
              <PressableFeedback
                onPress={onDownload}
                className="rounded-full bg-white/10 p-2.5"
              >
                <Download color="white" size={20} />
              </PressableFeedback>

              <PressableFeedback
                onPress={onShare}
                className="rounded-full bg-white/10 p-2.5"
              >
                <Share2 color="white" size={20} />
              </PressableFeedback>

              <PressableFeedback
                onPress={onCopy}
                className="rounded-full bg-white/10 p-2.5"
              >
                <Copy color="white" size={20} />
              </PressableFeedback>

              <View className="flex-1" />

              <PressableFeedback onPress={onExternalLink}>
                <ExternalLink color="white" size={20} />
              </PressableFeedback>
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
