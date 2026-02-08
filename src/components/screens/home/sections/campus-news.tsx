import { View } from 'react-native';
import { router } from 'expo-router';
import { Button, Skeleton } from 'heroui-native';
import { NewsCard } from '../cards/news-card';
import { useCampusNews } from '@/hooks/home/use-campus-news';
import { Image } from 'expo-image';

export function CampusNewsSection() {
  const { data, isLoading } = useCampusNews(3);

  const handleReadMore = (newsId: string) => {
    router.push({
      pathname: '/src-news/news/[id]',
      params: { id: newsId },
    });
  };

  const handleViewAll = () => {
    router.push({
      pathname: '/src-news',
    });
  };

  if (isLoading) {
    return (
      <View className="px-4">
        <View className="w-full overflow-hidden rounded-3xl bg-[#CD8606]">
          <Skeleton className="aspect-16/10 w-full" />
          <View className="gap-3 p-4">
            <Skeleton className="h-20 w-full rounded-[5px]" />
            <Skeleton className="h-20 w-full rounded-[5px]" />
            <Skeleton className="h-20 w-full rounded-[5px]" />
          </View>
        </View>
      </View>
    );
  }

  if (!data?.length) {
    return null;
  }

  return (
    <View className="px-4">
      <View className="w-full overflow-hidden rounded-3xl bg-[#CD8606]">
        {/* Header Section with Gradient */}
        <View className="relative aspect-16/10 w-full overflow-hidden">
          {/* <LinearGradient
            colors={['#CD8606', '#B87503', '#8B5A00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Newspaper size={60} color="white" strokeWidth={1.5} />
            <ThemedText className="mt-2 text-2xl font-bold text-white">Campus News</ThemedText>
            <ThemedText className="text-white/80">& Updates</ThemedText>
          </LinearGradient> */}

           <Image
            source={require('@/assets/images/Campus-1.png')}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={300}
          />

          {/* View All Button */}
          <View className="absolute bottom-3 right-4">
            <Button variant="ghost" size="sm" onPress={handleViewAll}>
              <Button.Label className="text-sm font-semibold text-white/90">
                View All
              </Button.Label>
            </Button>
          </View>
        </View>

        {/* News Items List */}
        <View className="p-4">
          {data.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onPress={() => handleReadMore(article.id)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
