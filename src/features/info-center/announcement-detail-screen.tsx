import { useLocalSearchParams } from 'expo-router';
import { Avatar, Button, Chip, Separator, Skeleton } from 'heroui-native';
import { AlertTriangle, Calendar, Clock, FileText, MapPin, Phone } from 'lucide-react-native';
import { useCallback } from 'react';
import { Linking, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useAnnouncementDetails } from '@/hooks/info-center';
import { useTheme } from '@/hooks/use-theme';
import type { Attachment, QuickFact } from '@/types/info-center';

function DetailSkeleton() {
  return (
    <View className="gap-4 p-4">
      <View className="flex-row gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </View>
      <Skeleton className="h-8 w-3/4 rounded-md" />
      <Skeleton className="h-5 w-1/2 rounded-md" />
      <Separator />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-2/3 rounded-md" />
      <Separator />
      <Skeleton className="h-20 w-full rounded-lg" />
    </View>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <View className="flex-1 items-center justify-center gap-4 px-6">
      <ThemedText className="text-lg font-semibold">Announcement not found</ThemedText>
      <ThemedText themeColor="textSecondary" className="text-center">
        This announcement may have been removed or is no longer available.
      </ThemedText>
      <Button variant="secondary" onPress={onRetry}>
        <Button.Label>Try Again</Button.Label>
      </Button>
    </View>
  );
}

function QuickFactsSection({ facts }: { facts: QuickFact[] }) {
  const theme = useTheme();

  if (facts.length === 0) return null;

  return (
    <View className="gap-3">
      <ThemedText className="text-base font-semibold">Quick Facts</ThemedText>
      <View
        className="gap-2 rounded-xl p-3"
        style={{ backgroundColor: theme.backgroundElement }}
      >
        {facts.map((fact, i) => (
          <View key={i} className="flex-row items-start gap-2">
            <ThemedText className="text-sm font-medium">{fact.label}:</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" className="flex-1">
              {fact.value}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

function AttachmentsSection({ attachments }: { attachments: Attachment[] }) {
  const theme = useTheme();

  if (attachments.length === 0) return null;

  const handleOpen = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View className="gap-3">
      <ThemedText className="text-base font-semibold">Attachments</ThemedText>
      {attachments.map((file, i) => (
        <Button
          key={i}
          variant="secondary"
          className="justify-start"
          onPress={() => handleOpen(file.url)}
        >
          <FileText size={16} color={theme.accent} />
          <Button.Label>{file.name}</Button.Label>
        </Button>
      ))}
    </View>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function AnnouncementDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const announcementId = Array.isArray(id) ? id[0] : (id ?? '');

  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const {
    data: announcement,
    isLoading,
    isError,
    refetch,
  } = useAnnouncementDetails(announcementId);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        <DetailSkeleton />
      </View>
    );
  }

  if (isError || !announcement) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        <ErrorState onRetry={handleRetry} />
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        <View className="gap-5 p-4">
          {/* Chips */}
          <View className="flex-row flex-wrap items-center gap-2">
            {announcement.pinned && (
              <Chip size="sm" variant="soft" color="warning">
                <Chip.Label>Pinned</Chip.Label>
              </Chip>
            )}
            {announcement.is_important && (
              <Chip size="sm" variant="soft" color="danger">
                <Chip.Label>Important</Chip.Label>
              </Chip>
            )}
            <Chip size="sm" variant="soft" color="accent">
              <Chip.Label className="capitalize">{announcement.category}</Chip.Label>
            </Chip>
          </View>

          {/* Title & Subtitle */}
          <View className="gap-1">
            <ThemedText className="text-2xl font-bold">{announcement.title}</ThemedText>
            {announcement.subtitle && (
              <ThemedText themeColor="textSecondary" className="text-base">
                {announcement.subtitle}
              </ThemedText>
            )}
          </View>

          {/* Published date */}
          <ThemedText type="small" themeColor="textSecondary">
            Published {formatDate(announcement.created_at)}
          </ThemedText>

          {/* Heads Up / Notice */}
          {announcement.heads_up && (
            <View
              className="flex-row items-start gap-3 rounded-xl p-3"
              style={{ backgroundColor: theme.goldAccentSubtle }}
            >
              <AlertTriangle size={18} color={theme.goldAccent} />
              <ThemedText className="flex-1 text-sm" style={{ color: theme.goldAccent }}>
                {announcement.heads_up}
              </ThemedText>
            </View>
          )}

          {announcement.notice && (
            <View
              className="flex-row items-start gap-3 rounded-xl p-3"
              style={{ backgroundColor: theme.accentSubtle }}
            >
              <AlertTriangle size={18} color={theme.accent} />
              <ThemedText className="flex-1 text-sm" style={{ color: theme.accent }}>
                {announcement.notice}
              </ThemedText>
            </View>
          )}

          <Separator />

          {/* Body */}
          {announcement.body && (
            <View className="gap-2">
              <ThemedText
                themeColor="textSecondary"
                className="text-sm leading-6"
              >
                {announcement.body}
              </ThemedText>
            </View>
          )}

          {/* Meta Info */}
          {(announcement.location || announcement.starts_at || announcement.contact) && (
            <>
              <Separator />
              <View className="gap-3">
                <ThemedText className="text-base font-semibold">Details</ThemedText>

                {announcement.location && (
                  <View className="flex-row items-center gap-2">
                    <MapPin size={16} color={theme.textSecondary} />
                    <ThemedText type="small" themeColor="textSecondary">
                      {announcement.location}
                      {announcement.address ? ` — ${announcement.address}` : ''}
                    </ThemedText>
                  </View>
                )}

                {announcement.starts_at && (
                  <View className="flex-row items-center gap-2">
                    <Calendar size={16} color={theme.textSecondary} />
                    <ThemedText type="small" themeColor="textSecondary">
                      {formatDate(announcement.starts_at)}
                    </ThemedText>
                  </View>
                )}

                {announcement.starts_at && (
                  <View className="flex-row items-center gap-2">
                    <Clock size={16} color={theme.textSecondary} />
                    <ThemedText type="small" themeColor="textSecondary">
                      {formatTime(announcement.starts_at)}
                      {announcement.ends_at ? ` — ${formatTime(announcement.ends_at)}` : ''}
                    </ThemedText>
                  </View>
                )}

                {announcement.contact && (
                  <View className="flex-row items-center gap-2">
                    <Phone size={16} color={theme.textSecondary} />
                    <ThemedText type="small" themeColor="textSecondary">
                      {announcement.contact}
                    </ThemedText>
                  </View>
                )}
              </View>
            </>
          )}

          {/* Quick Facts */}
          {announcement.quick_facts.length > 0 && (
            <>
              <Separator />
              <QuickFactsSection facts={announcement.quick_facts} />
            </>
          )}

          {/* Attachments */}
          {announcement.attachments.length > 0 && (
            <>
              <Separator />
              <AttachmentsSection attachments={announcement.attachments} />
            </>
          )}

          {/* Author */}
          {announcement.author && (
            <>
              <Separator />
              <View className="gap-3">
                <ThemedText className="text-base font-semibold">Posted by</ThemedText>
                <View className="flex-row items-center gap-3">
                  <Avatar alt={announcement.author.full_name || 'Author'} size="md" color="accent">
                    {announcement.author.avatar_url ? (
                      <Avatar.Image source={{ uri: announcement.author.avatar_url }} />
                    ) : null}
                    <Avatar.Fallback>
                      {announcement.author.full_name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase() || 'A'}
                    </Avatar.Fallback>
                  </Avatar>
                  <ThemedText className="font-medium">
                    {announcement.author.full_name || 'Unknown Author'}
                  </ThemedText>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
