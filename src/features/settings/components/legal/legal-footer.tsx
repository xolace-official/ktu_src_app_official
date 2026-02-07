import { View, Text, Pressable, Linking } from 'react-native';
import { Surface, useThemeColor } from 'heroui-native';
import { ExternalLink, Mail, HelpCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface LegalFooterProps {
  documentType: 'terms' | 'privacy';
}

export function LegalFooter({ documentType }: LegalFooterProps) {
  const router = useRouter();
  const accentColor = useThemeColor('accent');
  const mutedColor = useThemeColor('muted');

  const handleEmailPress = () => {
    const subject =
      documentType === 'terms'
        ? 'Question about Terms of Service'
        : 'Privacy Policy Inquiry';
    Linking.openURL(`mailto:src@ktu.edu.gh?subject=${encodeURIComponent(subject)}`);
  };

  const handleHelpPress = () => {
    router.push('/settings/help-center');
  };

  return (
    <View className="gap-4 px-4">
      <Surface variant="secondary" className="gap-3 rounded-xl p-4">
        <View className="flex-row items-center gap-2">
          <HelpCircle size={16} color={accentColor} />
          <Text className="text-sm font-medium text-foreground">
            Questions about this document?
          </Text>
        </View>
        <Text className="text-sm leading-5 text-muted">
          If you have questions or concerns about{' '}
          {documentType === 'terms'
            ? 'these terms'
            : 'our privacy practices'}
          , we&apos;re here to help.
        </Text>
        <View className="flex-row gap-3 pt-1">
          <Pressable
            onPress={handleEmailPress}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-accent/10 py-2.5"
            style={{ borderCurve: 'continuous' }}
          >
            <Mail size={16} color={accentColor} />
            <Text className="text-sm font-medium text-accent">Email Us</Text>
          </Pressable>
          <Pressable
            onPress={handleHelpPress}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-foreground/5 py-2.5"
            style={{ borderCurve: 'continuous' }}
          >
            <ExternalLink size={16} color={mutedColor} />
            <Text className="text-sm font-medium text-muted">Help Center</Text>
          </Pressable>
        </View>
      </Surface>

      <Text className="text-center text-xs leading-5 text-muted px-4">
        By using the KTU SRC App, you acknowledge that you have read and
        understood this{' '}
        {documentType === 'terms' ? 'Terms of Service' : 'Privacy Policy'}.
      </Text>
    </View>
  );
}
