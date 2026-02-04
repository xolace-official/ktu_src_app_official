import { ScrollView, View, Text } from 'react-native';
import { Divider } from 'heroui-native';
import Constants from 'expo-constants';
import {
  EmergencyBanner,
  FAQSection,
  AppGuideSection,
  ContactSupportSection,
  QuickLinksSection,
} from './components/help-center';

export const HelpCenterScreen = () => {
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-8 pb-10 pt-4 bg-background"
    >
      {/* Emergency Contact Banner */}
      <EmergencyBanner />

      {/* FAQ Section with Category Filters */}
      <FAQSection />

      <View className="px-4">
        <Divider />
      </View>

      {/* App Guide */}
      <AppGuideSection />

      <View className="px-4">
        <Divider />
      </View>

      {/* Contact Support */}
      <ContactSupportSection />

      <View className="px-4">
        <Divider />
      </View>

      {/* Quick Links & Resources */}
      <QuickLinksSection />

      {/* Footer */}
      <View className="items-center gap-1 px-4 pt-4">
        <Text className="text-xs text-muted">
          KTU SRC App v{appVersion}
        </Text>
        <Text className="text-center text-[11px] text-muted">
          Built with care for the students of Koforidua Technical University
        </Text>
      </View>
    </ScrollView>
  );
};
