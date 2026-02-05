import { ScrollView, View } from 'react-native';
import { Separator, useThemeColor } from 'heroui-native';
import { Lock } from 'lucide-react-native';
import {
  LegalHeader,
  LegalSectionList,
  LegalFooter,
  privacyPolicySections,
  lastUpdatedDate,
} from './components/legal';

export const PrivacyPolicyScreen = () => {
  const successColor = useThemeColor('success');

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-6 pb-10 pt-4 bg-background"
    >
      <LegalHeader
        icon={Lock}
        iconColor={successColor}
        title="Privacy Policy"
        subtitle="Learn how we collect, use, and protect your personal information"
        lastUpdated={lastUpdatedDate}
      />

      <View className="px-4">
        <Separator />
      </View>

      <View className="gap-2 px-4">
        <LegalSectionList
          sections={privacyPolicySections}
          defaultExpandedId="overview"
        />
      </View>

      <View className="px-4">
        <Separator />
      </View>

      <LegalFooter documentType="privacy" />
    </ScrollView>
  );
};
