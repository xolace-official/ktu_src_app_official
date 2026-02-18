import { memo } from 'react';
import { Card, PressableFeedback } from 'heroui-native';
import { ThemedText } from '@/components/themed-text';
import type { NewsArticle } from '@/types/home';
import {Text} from 'react-native'

interface NewsCardProps {
  article: NewsArticle;
  onPress?: () => void;
}

export const NewsCard = memo(function NewsCard({ article, onPress }: NewsCardProps) {
  const { title, description } = article;

  return (
    <Card className="mb-3 rounded-2xl bg-[#f3d3ab] px-2 py-3">
      <Card.Body className="px-2">
        <Card.Title className='text-black' numberOfLines={1}>
          {title}
        </Card.Title>
        <Card.Description numberOfLines={2} className='text-sm'>
          {description}
        </Card.Description>
        <Card.Footer>
          <PressableFeedback onPress={onPress}>
            <Text className="text-sm font-semibold text-[#984D29]">Read more.</Text>
          </PressableFeedback>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
});
