import { ScrollView, View } from 'react-native';
import { Separator } from 'heroui-native';
import {
  AboutHeader,
  MissionSection,
  SocialLinksSection,
  AboutFooter,
} from './components/about';

export const AboutScreen = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-8 pb-10 pt-4 bg-background"
    >
      <AboutHeader />

      {/* <View className="px-4">
        <Separator />
      </View>

      <FeaturesSection /> */}

      <View className="px-4">
        <Separator />
      </View>

      <MissionSection />

      <View className="px-4">
        <Separator />
      </View>

      <SocialLinksSection />

      <View className="px-4">
        <Separator />
      </View>

      {/* <CreditsSection /> */}

      <View className="px-4">
        <Separator />
      </View>

      <AboutFooter />
    </ScrollView>
  );
};
