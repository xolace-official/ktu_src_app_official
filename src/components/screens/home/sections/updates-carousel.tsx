import { View, Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { Skeleton } from 'heroui-native';
import { UpdateCard } from '../cards/update-card';
import { useSRCUpdates } from '@/hooks/home/use-src-updates';
import type { SRCUpdate } from '@/types/home';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 240;

export function UpdatesCarousel() {
  const { data, isLoading } = useSRCUpdates();
  const progress = useSharedValue<number>(0);

  const handleAction = (action: string, updateId: string) => {
    console.log(`${action} pressed for update ${updateId}`);
  };

  if (isLoading) {
    return (
      <View className="w-full px-4">
        <Skeleton className="h-[200px] w-full rounded-2xl" />
      </View>
    );
  }

  if (!data?.length) {
    return null;
  }

  const renderItem = ({ item }: { item: SRCUpdate }) => {
    return (
      <UpdateCard
        update={item}
        onDownload={() => handleAction('Download', item.id)}
        onShare={() => handleAction('Share', item.id)}
        onCopy={() => handleAction('Copy', item.id)}
        onExternalLink={() => handleAction('External Link', item.id)}
        onReadMore={() => handleAction('Read More', item.id)}
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
