import { useLocalSearchParams, Stack } from 'expo-router';
import { Avatar, Button, Chip, Separator } from 'heroui-native';
import { ExternalLink } from 'lucide-react-native';
import { useCallback, useMemo } from 'react';
import { Alert, Image, Linking, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EnrichedMarkdownText } from 'react-native-enriched-markdown';
import type { MarkdownStyle } from 'react-native-enriched-markdown';

import { ThemedText } from '@/components/themed-text';
import { useNewsDetails } from '@/hooks/src-news';
import { useTheme } from '@/hooks/use-theme';
import { formatRelativeTime } from '@/utils/format-relative-time';

import { NewsDetailSkeleton, NewsError } from './components';

/**
 * Formats a date string into a US English long date including weekday, month, day, and year.
 *
 * @param dateString - A string parseable by the JavaScript Date constructor (for example, an ISO 8601 timestamp).
 * @returns The formatted date (e.g., "Tuesday, January 2, 2024").
 */
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Render the news details screen showing an article's cover, metadata, publisher info, markdown body, and optional source link.
 *
 * Renders loading and error states, supports retrying fetches, and safely opens external source links (validates scheme and availability before opening).
 *
 * @returns A React element that displays the article details screen.
 */
export function NewsDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const articleId = Array.isArray(id) ? id[0] : (id ?? '');

  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const {
    data: article,
    isLoading,
    isError,
    refetch,
  } = useNewsDetails(articleId);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleOpenSource = useCallback(async (url: string) => {
    const ALLOWED_SCHEMES = ['https:', 'http:'];
    try {
      const parsed = new URL(url);
      if (!ALLOWED_SCHEMES.includes(parsed.protocol)) {
        Alert.alert('Unsupported link', 'This link cannot be opened.');
        return;
      }
    } catch {
      Alert.alert('Invalid link', 'This link is not valid.');
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Cannot open link', 'No app is available to open this link.');
        return;
      }
      await Linking.openURL(url);
    } catch {
      Alert.alert('Error', 'Something went wrong while opening the link.');
    }
  }, []);

  const handleLinkPress = useCallback(
    (event: { url: string }) => {
      handleOpenSource(event.url);
    },
    [handleOpenSource]
  );

  const markdownStyle: MarkdownStyle = useMemo(
    () => ({
      paragraph: {
        fontSize: 16,
        lineHeight: 26,
        color: theme.text,
      },
      h1: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.text,
        marginTop: 24,
        marginBottom: 12,
      },
      h2: {
        fontSize: 24,
        fontWeight: '600',
        color: theme.text,
        marginTop: 20,
        marginBottom: 10,
      },
      h3: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.text,
        marginTop: 16,
        marginBottom: 8,
      },
      strong: {
        color: theme.text,
      },
      em: {
        color: theme.textSecondary,
      },
      link: {
        color: theme.accent,
        underline: true,
      },
      code: {
        color: theme.accent,
        backgroundColor: theme.backgroundElement,
      },
      codeBlock: {
        fontSize: 14,
        backgroundColor: theme.backgroundElement,
        color: theme.text,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
      },
      blockquote: {
        borderColor: theme.accent,
        borderWidth: 3,
        backgroundColor: theme.accentSubtle,
        marginBottom: 12,
      },
      list: {
        fontSize: 16,
        color: theme.text,
        bulletColor: theme.accent,
        markerColor: theme.accent,
        gapWidth: 8,
        marginLeft: 20,
      },
      image: {
        borderRadius: 12,
        marginBottom: 12,
      },
    }),
    [theme]
  );

  if (isLoading) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        <NewsDetailSkeleton />
      </View>
    );
  }

  if (isError || !article) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        <NewsError onRetry={handleRetry} />
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <Stack.Screen options={{ title: article.title }} />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        {/* Cover Image */}
        {article.cover_image && (
          <Image
            source={{ uri: article.cover_image }}
            style={{ width: '100%', aspectRatio: 16 / 9 }}
            resizeMode="cover"
            accessibilityLabel={`Cover image for ${article.title}`}
            accessible
          />
        )}

        <View className="gap-5 p-4">
          {/* Category & Date */}
          <View className="flex-row items-center justify-between">
            <Chip size="sm" variant="soft" color="accent">
              <Chip.Label className="capitalize">{article.category}</Chip.Label>
            </Chip>
            <ThemedText type="small" themeColor="textSecondary">
              {formatDate(article.published_at)}
            </ThemedText>
          </View>

          {/* Title */}
          <ThemedText className="text-2xl font-bold" selectable>
            {article.title}
          </ThemedText>

          {/* Publisher */}
          <View className="flex-row items-center gap-3">
            <Avatar size="md" alt={article.publisher} color="accent">
              <Avatar.Image
                source={{ uri: article.publisher_image ?? undefined }}
                animation={false}
                isAnimatedStyleActive={false}
              />
              <Avatar.Fallback animation="disabled">
                {article.publisher?.charAt(0).toUpperCase() || 'N'}
              </Avatar.Fallback>
            </Avatar>
            <View>
              <ThemedText className="font-medium">{article.publisher}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {formatRelativeTime(article.published_at)}
              </ThemedText>
            </View>
          </View>

          <Separator />

          {/* Markdown Body */}
          <EnrichedMarkdownText
            markdown={article.body}
            markdownStyle={markdownStyle}
            onLinkPress={handleLinkPress}
            isSelectable
          />

          {/* Source Link */}
          {article.source && (
            <>
              <Separator />
              <Button
                variant="secondary"
                onPress={() => handleOpenSource(article.source!)}
              >
                <ExternalLink size={16} color={theme.accent} />
                <Button.Label>View Original Source</Button.Label>
              </Button>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}