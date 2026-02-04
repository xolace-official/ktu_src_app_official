import { useCallback, useMemo } from 'react';
import { View, ScrollView, useWindowDimensions, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import {
  MapPin,
  Calendar,
  Users,
  ArrowLeft,
  Star,
  Check,
  X,
} from 'lucide-react-native';
import {
  Avatar,
  Button,
  Chip,
  Divider,
  PressableFeedback,
  Skeleton,
} from 'heroui-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useEventDetails, useUpdateAttendance } from '@/hooks/events';
import type { EventAttendanceStatus } from '@/types/events';

/**
 * Formats date into components for display
 */
function formatEventDate(dateString: string): {
  day: string;
  month: string;
  time: string;
  fullDate: string;
} {
  const date = new Date(dateString);
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    time: date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
    fullDate: date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}

/**
 * Attendance status option configuration
 */
const ATTENDANCE_OPTIONS: {
  label: string;
  value: Exclude<EventAttendanceStatus, null>;
  icon: typeof Check;
}[] = [
  { label: 'Going', value: 'going', icon: Check },
  { label: 'Interested', value: 'interested', icon: Star },
  { label: 'Not Going', value: 'not_going', icon: X },
];

/**
 * Loading skeleton for event details
 */
function EventDetailsSkeleton() {
  const { width } = useWindowDimensions();
  const imageHeight = width * 0.55;

  return (
    <View className="flex-1">
      <Skeleton className="w-full" style={{ height: imageHeight }} />
      <View className="gap-4 p-4">
        <Skeleton className="h-4 w-20 rounded-md" />
        <Skeleton className="h-7 w-3/4 rounded-md" />
        <View className="flex-row gap-3">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </View>
        <Skeleton className="h-4 w-28 rounded-md" />
        <Divider className="my-2" />
        <Skeleton className="h-5 w-24 rounded-md" />
        <View className="flex-row gap-2">
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </View>
        <Divider className="my-2" />
        <Skeleton className="h-5 w-28 rounded-md" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </View>
    </View>
  );
}

/**
 * Error state component
 */
function EventError({ onRetry }: { onRetry: () => void }) {
  return (
    <View className="flex-1 items-center justify-center gap-4 px-6">
      <ThemedText className="text-lg font-semibold">Event not found</ThemedText>
      <ThemedText themeColor="textSecondary" className="text-center">
        The event you are looking for does not exist or has been removed.
      </ThemedText>
      <Button variant="secondary" onPress={onRetry}>
        <Button.Label>Try Again</Button.Label>
      </Button>
    </View>
  );
}

/**
 * Attendance status pills component
 */
function AttendanceSection({
  currentStatus,
  canUpdate,
  isUpdating,
  onStatusChange,
}: {
  currentStatus: EventAttendanceStatus;
  canUpdate: boolean;
  isUpdating: boolean;
  onStatusChange: (status: EventAttendanceStatus) => void;
}) {
  const theme = useTheme();

  return (
    <View className="gap-3">
      <ThemedText className="text-base font-semibold">Your Status</ThemedText>

      <View className="flex-row flex-wrap gap-2">
        {ATTENDANCE_OPTIONS.map((option) => {
          const isSelected = currentStatus === option.value;
          const isDisabled = !canUpdate && !isSelected;
          const IconComponent = option.icon;

          return (
            <PressableFeedback
              key={option.value}
              onPress={() => onStatusChange(option.value)}
              isDisabled={isDisabled || isUpdating}
              className="rounded-full px-4 py-2.5"
              style={{
                backgroundColor: isSelected
                  ? theme.accent
                  : isDisabled
                    ? theme.backgroundElement
                    : 'transparent',
                borderWidth: isSelected ? 0 : 1,
                borderColor: isDisabled ? 'transparent' : theme.cardBorder,
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              <View className="flex-row items-center gap-2">
                <IconComponent
                  size={14}
                  color={
                    isSelected
                      ? '#fff'
                      : isDisabled
                        ? theme.textSecondary
                        : theme.text
                  }
                />
                <ThemedText
                  className="text-sm font-medium"
                  style={{
                    color: isSelected
                      ? '#fff'
                      : isDisabled
                        ? theme.textSecondary
                        : theme.text,
                  }}
                >
                  {option.label}
                </ThemedText>
              </View>
            </PressableFeedback>
          );
        })}
      </View>

      {!canUpdate && currentStatus && (
        <ThemedText type="small" themeColor="textSecondary">
          Attendance updates are disabled for this event
        </ThemedText>
      )}
    </View>
  );
}

/**
 * Main event details screen
 */
export function EventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const eventId = Array.isArray(id) ? id[0] : (id ?? '');

  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const imageHeight = width * 0.55;

  const {
    data: event,
    isLoading,
    isError,
    refetch,
  } = useEventDetails(eventId);

  const { mutate: updateAttendance, isPending: isUpdatingAttendance } =
    useUpdateAttendance();

  // Calculate if user can update attendance
  const canUpdateAttendance = useMemo(() => {
    if (!event) return false;
    if (event.disable_attendance) return false;

    const eventDate = new Date(event.starts_at);
    const now = new Date();
    const daysUntilEvent = Math.ceil(
      (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    const hasExistingStatus = event.user_attendance_status !== null;

    return daysUntilEvent > 5 || !hasExistingStatus;
  }, [event]);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleAttendanceChange = useCallback(
    (status: EventAttendanceStatus) => {
      if (!canUpdateAttendance || isUpdatingAttendance) return;
      updateAttendance({ eventId, status });
    },
    [canUpdateAttendance, isUpdatingAttendance, eventId, updateAttendance]
  );

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        <View
          className="absolute left-4 z-10"
          style={{ top: insets.top + 8 }}
        >
          <Button
            isIconOnly
            variant="secondary"
            className="rounded-full"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            onPress={handleBack}
          >
            <ArrowLeft size={22} color="#fff" />
          </Button>
        </View>
        <EventDetailsSkeleton />
      </View>
    );
  }

  // Error state
  if (isError || !event) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        <View
          className="absolute left-4 z-10"
          style={{ top: insets.top + 8 }}
        >
          <Button
            isIconOnly
            variant="secondary"
            className="rounded-full"
            onPress={handleBack}
          >
            <ArrowLeft size={22} color={theme.text} />
          </Button>
        </View>
        <EventError onRetry={handleRetry} />
      </View>
    );
  }

  const { day, month, time, fullDate } = formatEventDate(event.starts_at);

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Fixed Back Button */}
      <View
        className="absolute left-4 z-10"
        style={{ top: insets.top + 8 }}
      >
        <Button
          isIconOnly
          variant="secondary"
          className="rounded-full"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={handleBack}
        >
          <ArrowLeft size={22} color="#fff" />
        </Button>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 24,
        }}
      >
        {/* Hero Image */}
        <View className="relative" style={{ height: imageHeight }}>
          <Image
            source={
              event.hero_image_url
                ? { uri: event.hero_image_url }
                : require('@/assets/images/events/img.png')
            }
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={200}
          />

          {/* Date Badge */}
          <View
            className="absolute left-4 items-center rounded-lg border-2 px-3 py-2"
            style={{
              top: insets.top + 8,
              left: 60,
              backgroundColor: 'rgba(11, 21, 30, 0.74)',
              borderColor: theme.goldAccent,
              borderCurve: 'continuous',
            }}
          >
            <ThemedText
              className="text-xs font-bold"
              style={{ color: '#fff' }}
            >
              {month}
            </ThemedText>
            <ThemedText
              className="text-2xl font-extrabold leading-tight"
              style={{
                color: '#fff',
                fontVariant: ['tabular-nums'],
                fontFamily: Platform.select({
                  ios: 'Menlo',
                  android: 'monospace',
                  default: 'monospace',
                }),
              }}
            >
              {day}
            </ThemedText>
          </View>
        </View>

        {/* Content */}
        <View className="gap-5 p-4">
          {/* Category */}
          {event.category && (
            <View className="flex-row">
              <Chip size="sm" variant="soft" color="accent">
                <Chip.Label className="capitalize">{event.category}</Chip.Label>
              </Chip>
            </View>
          )}

          {/* Title */}
          <ThemedText className="text-2xl font-bold">{event.title}</ThemedText>

          {/* Meta Info */}
          <View className="gap-3">
            {/* Location */}
            {event.location && (
              <View className="flex-row items-center gap-2">
                <MapPin size={16} color={theme.textSecondary} />
                <ThemedText type="small" themeColor="textSecondary">
                  {event.location}
                </ThemedText>
              </View>
            )}

            {/* Date & Time */}
            <View className="flex-row items-center gap-2">
              <Calendar size={16} color={theme.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary">
                {fullDate} • {time}
              </ThemedText>
            </View>

            {/* Attendance Counts */}
            <View className="flex-row items-center gap-4">
              <View className="flex-row items-center gap-2">
                <Users size={16} color={theme.textSecondary} />
                <ThemedText type="small" themeColor="textSecondary">
                  {event.going_count} Going
                </ThemedText>
              </View>
              {event.interested_count > 0 && (
                <ThemedText type="small" themeColor="textSecondary">
                  {event.interested_count} Interested
                </ThemedText>
              )}
            </View>
          </View>

          <Divider />

          {/* Attendance Status */}
          <AttendanceSection
            currentStatus={event.user_attendance_status}
            canUpdate={canUpdateAttendance}
            isUpdating={isUpdatingAttendance}
            onStatusChange={handleAttendanceChange}
          />

          {/* Book Canopy Button */}
          {event.can_book_canopy && (
            <Button
              variant="primary"
              className="self-start"
              onPress={() => {
                // TODO: Implement canopy booking modal
              }}
            >
              <Button.Label>Book Canopy</Button.Label>
            </Button>
          )}

          <Divider />

          {/* About Event */}
          <View className="gap-2">
            <ThemedText className="text-base font-semibold">
              About Event
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              className="leading-6"
            >
              {event.description ||
                'No detailed description available for this event.'}
            </ThemedText>
          </View>

          {/* Organizer */}
          {event.organizer && (
            <>
              <Divider />
              <View className="gap-3">
                <ThemedText className="text-base font-semibold">
                  Organizer
                </ThemedText>
                <View className="flex-row items-center gap-3">
                  <Avatar alt={event.organizer.full_name || "Organizer" } size="md" color="accent">
                    {event.organizer.avatar_url ? (
                      <Avatar.Image
                        source={{ uri: event.organizer.avatar_url }}
                      />
                    ) : null}
                    <Avatar.Fallback>
                      {event.organizer.full_name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase() || 'O'}
                    </Avatar.Fallback>
                  </Avatar>
                  <ThemedText className="font-medium">
                    {event.organizer.full_name || 'Unknown Organizer'}
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
