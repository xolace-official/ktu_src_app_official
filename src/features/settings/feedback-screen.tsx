import { Separator } from 'heroui-native';
import { ScrollView, Text, View } from 'react-native';
import { FeedbackForm, FeedbackHeader } from './components/feedback';

export const FeedbackScreen = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-6 pb-10 pt-4 bg-background"
      keyboardShouldPersistTaps="handled"
    >
      {/* Hero Header */}
      <FeedbackHeader />

      {/* Main Form */}
      <View className="px-4">
        <FeedbackForm />
      </View>

      {/* Footer Info */}
      <View className="gap-4 px-4">
        <Separator />
        <View className="gap-2">
          <Text className="text-xs font-medium uppercase tracking-wide text-muted">
            What happens next?
          </Text>
          <View className="gap-1.5">
            <Text className="text-xs text-muted">
              1. Your feedback is securely submitted to the SRC team
            </Text>
            <Text className="text-xs text-muted">
              2. Relevant team members review and categorize your input
            </Text>
            <Text className="text-xs text-muted">
              3. Action is taken based on priority and feasibility
            </Text>
            <Text className="text-xs text-muted">
              4. Updates may be shared through app announcements
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
