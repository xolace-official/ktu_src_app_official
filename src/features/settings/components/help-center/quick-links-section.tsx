import { View, Text } from 'react-native';
import { Surface, PressableFeedback } from 'heroui-native';
import {
  FileText,
  Shield,
  Scale,
  Globe,
  ExternalLink,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { useTheme } from '@/hooks/use-theme';

interface QuickLinkItem {
  id: string;
  icon: LucideIcon;
  iconBgClass: string;
  iconColor: string;
  title: string;
  subtitle: string;
  url: string;
}

const quickLinks: QuickLinkItem[] = [
  {
    id: 'student-handbook',
    icon: FileText,
    iconBgClass: 'bg-accent/10',
    iconColor: '#3B82F6',
    title: 'Student Handbook',
    subtitle: 'Academic policies & regulations',
    url: 'https://ktu.edu.gh',
  },
  // {
  //   id: 'privacy-policy',
  //   icon: Shield,
  //   iconBgClass: 'bg-success/10',
  //   iconColor: '#22C55E',
  //   title: 'Privacy Policy',
  //   subtitle: 'How we protect your data',
  //   url: 'https://ktu.edu.gh/privacy',
  // },
  // {
  //   id: 'terms',
  //   icon: Scale,
  //   iconBgClass: 'bg-warning/10',
  //   iconColor: '#F59E0B',
  //   title: 'Terms of Service',
  //   subtitle: 'App usage terms & conditions',
  //   url: 'https://ktu.edu.gh/terms',
  // },
  {
    id: 'ktu-website',
    icon: Globe,
    iconBgClass: 'bg-purple-500/10',
    iconColor: '#A855F7',
    title: 'KTU Website',
    subtitle: 'Official university website',
    url: 'https://ktu.edu.gh',
  },
];

function QuickLinkRow({ item }: { item: QuickLinkItem }) {
  const theme = useTheme();
  const Icon = item.icon;

  const handlePress = async () => {
    await openBrowserAsync(item.url, {
      presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
    });
  };

  return (
    <PressableFeedback
      onPress={handlePress}
      className="min-h-[48px] flex-row items-center px-4 py-3"
    >
      <PressableFeedback.Highlight />
      <View
        className={`size-[30px] items-center justify-center rounded-lg ${item.iconBgClass}`}
      >
        <Icon size={16} color={item.iconColor} />
      </View>
      <View className="ml-3 flex-1 gap-0.5">
        <Text className="text-[15px] font-medium text-foreground">
          {item.title}
        </Text>
        <Text className="text-xs text-muted">{item.subtitle}</Text>
      </View>
      <ExternalLink size={16} color={theme.textSecondary} />
    </PressableFeedback>
  );
}

export function QuickLinksSection() {
  return (
    <View className="gap-1.5">
      <View className="gap-1 px-4">
        <Text className="text-lg font-semibold text-foreground">
          Useful Resources
        </Text>
        <Text className="text-sm text-muted">
          Important documents and links
        </Text>
      </View>
      <View className="px-4 pt-2">
        <Surface variant="secondary" className="overflow-hidden rounded-xl p-0">
          {quickLinks.map((item, index) => (
            <View key={item.id}>
              {index > 0 && (
                <View className="ml-[54px] h-px bg-default/40" />
              )}
              <QuickLinkRow item={item} />
            </View>
          ))}
        </Surface>
      </View>
    </View>
  );
}
