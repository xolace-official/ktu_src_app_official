import { View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Spinner } from 'heroui-native';

import { useHostelDetails } from '@/hooks/hostels';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/themed-text';

export default function HostelDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { data: hostel, isLoading, isError } = useHostelDetails(id);

  if (isLoading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <Spinner size="lg" color="default" />
      </View>
    );
  }

  if (isError || !hostel) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <ThemedText themeColor="textSecondary">
          Could not load hostel details
        </ThemedText>
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 16, paddingTop: 100 }}
    >
      <ThemedText className="text-2xl font-bold">{hostel.name}</ThemedText>
      <ThemedText themeColor="textSecondary" className="mt-2">
        {hostel.address}
      </ThemedText>
      <ThemedText themeColor="accent" className="mt-4 text-xl font-bold">
        GHS {hostel.price.toLocaleString()}/semester
      </ThemedText>
      {hostel.description && (
        <ThemedText className="mt-4">{hostel.description}</ThemedText>
      )}
      {/* TODO: Add full hostel detail UI with gallery, facilities, agent info, etc. */}
    </ScrollView>
  );
}
