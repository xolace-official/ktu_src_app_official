import { ScrollView, View } from 'react-native';
import { Separator, useThemeColor } from 'heroui-native';
import { FileText } from 'lucide-react-native';
import {
  LegalHeader,
  LegalSectionList,
  LegalFooter,
  termsOfServiceSections,
  lastUpdatedDate,
} from './components/legal';

export const TermsOfServiceScreen = () => {
  const accentColor = useThemeColor('accent');

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-6 pb-10 pt-4 bg-background"
    >
      <LegalHeader
        icon={FileText}
        iconColor={accentColor}
        title="Terms of Service"
        subtitle="Please read these terms carefully before using the KTU SRC App"
        lastUpdated={lastUpdatedDate}
      />

      <View className="px-4">
        <Separator />
      </View>

      <View className="gap-2 px-4">
        <LegalSectionList
          sections={termsOfServiceSections}
          defaultExpandedId="acceptance"
        />
      </View>

      <View className="px-4">
        <Separator />
      </View>

      <LegalFooter documentType="terms" />
    </ScrollView>
  );
};
