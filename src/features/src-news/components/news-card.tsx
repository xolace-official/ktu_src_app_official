import { ThemedText } from '@/components/themed-text';
import type { NewsCardItem } from '@/types/news';
import { formatRelativeTime } from '@/utils/format-relative-time';
import { Avatar, Card, Chip, PressableFeedback } from 'heroui-native';
import { memo } from 'react';
import { Image, View } from 'react-native';

interface NewsCardProps {
  article: NewsCardItem;
  onPress: () => void;
}

export const NewsCard = memo(function NewsCard({ article, onPress }: NewsCardProps) {
  return (
    <PressableFeedback onPress={onPress}>
      <Card className="overflow-hidden rounded-2xl">
        {article.cover_image && (
          <Card.Header className="p-0">
            <Image
              source={{ uri: article.cover_image }}
              style={{ width: '100%', aspectRatio: 16 / 9 }}
              resizeMode="cover"
            />
          </Card.Header>
        )}
        <Card.Body className="gap-2.5 p-4">
          <Chip size="sm" variant="soft" color="accent">
            <Chip.Label className="capitalize">{article.category}</Chip.Label>
          </Chip>

          <ThemedText className="text-base font-semibold" numberOfLines={2}>
            {article.title}
          </ThemedText>

          {article.excerpt && (
            <ThemedText
              type="small"
              themeColor="textSecondary"
              numberOfLines={2}
              className="leading-5"
            >
              {article.excerpt}
            </ThemedText>
          )}

          <View className="mt-1 flex-row items-center gap-2">
            <Avatar size="sm" alt={article.publisher}>
              <Avatar.Image
                source={{ uri: article.publisher_image ?? undefined }}
                animation={false}
                isAnimatedStyleActive={false}
              />
              <Avatar.Fallback animation="disabled">
                {article.publisher?.charAt(0).toUpperCase() ?? 'N'}
              </Avatar.Fallback>
            </Avatar>
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
              {article.publisher}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              · {formatRelativeTime(article.published_at)}
            </ThemedText>
          </View>
        </Card.Body>
      </Card>
    </PressableFeedback>
  );
});
