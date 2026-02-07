import { View, Text, ScrollView } from 'react-native';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { externalServices } from '@/config/settings.config';
import { ExternalServiceItem } from './external-service-item';

export function ExternalServicesSection() {
  const handleServicePress = async (url: string) => {
    await openBrowserAsync(url, {
      presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
    });
  };

  return (
    <View className="gap-1.5">
      <Text className="px-4 text-xs font-medium uppercase tracking-wide text-muted">
        Quick Links
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
      >
        {externalServices.map((service) => (
          <ExternalServiceItem
            key={service.id}
            service={service}
            onPress={() => handleServicePress(service.url)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
