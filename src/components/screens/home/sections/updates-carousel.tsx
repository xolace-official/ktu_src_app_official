import { View, Dimensions, Share } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { Skeleton } from 'heroui-native';
import * as Linking from 'expo-linking';
import { UpdateCard } from '../cards/update-card';
import { useSRCUpdates } from '@/hooks/home/use-src-updates';
import type { SRCUpdate } from '@/types/home';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 240;

export function UpdatesCarousel() {
  const { data, isLoading, isError } = useSRCUpdates();
  const progress = useSharedValue<number>(0);

  if (isLoading) {
    return (
      <View className="w-full px-4">
        <Skeleton className="h-[200px] w-full rounded-2xl" />
      </View>
    );
  }

  if (isError || !data?.length) {
    return null;
  }

  const renderItem = ({ item }: { item: SRCUpdate }) => {
    const handleShare = async () => {
      if (item.linkUrl) {
        await Share.share({ message: `${item.title}\n${item.linkUrl}`, url: item.linkUrl });
      } else {
        await Share.share({ message: `${item.title}\n\n${item.description}` });
      }
    };

    const handleExternalLink = () => {
      if (item.linkUrl) {
        Linking.openURL(item.linkUrl);
      }
    };

    return (
      <UpdateCard
        update={item}
        onShare={handleShare}
        onExternalLink={item.linkUrl ? handleExternalLink : undefined}
        onReadMore={item.linkUrl ? handleExternalLink : undefined}
      />
    );
  };

  return (
    <View className="w-full">
      <Carousel
        autoPlay
        autoPlayInterval={5000}
        data={data}
        height={CAROUSEL_HEIGHT}
        loop
        pagingEnabled
        snapEnabled
        width={SCREEN_WIDTH}
        style={{ width: SCREEN_WIDTH }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.95,
          parallaxScrollingOffset: 40,
        }}
        onProgressChange={progress}
        renderItem={renderItem}
      />
    </View>
  );
}
