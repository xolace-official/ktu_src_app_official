import { View, Text, Linking, ScrollView } from 'react-native';
import { Surface, PressableFeedback, Avatar } from 'heroui-native';
import {
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ExternalLink,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '@/hooks/use-theme';

interface ContactItemProps {
  icon: LucideIcon;
  iconBgClass: string;
  iconColor: string;
  label: string;
  value: string;
  onPress: () => void;
  isExternal?: boolean;
}

function ContactItem({
  icon: Icon,
  iconBgClass,
  iconColor,
  label,
  value,
  onPress,
  isExternal,
}: ContactItemProps) {
  const theme = useTheme();

  return (
    <PressableFeedback
      onPress={onPress}
      className="min-h-[48px] flex-row items-center px-4 py-3"
    >
      <PressableFeedback.Highlight />
      <View
        className={`size-[30px] items-center justify-center rounded-lg ${iconBgClass}`}
      >
        <Icon size={16} color={iconColor} />
      </View>
      <View className="ml-3 flex-1 gap-0.5">
        <Text className="text-xs font-medium text-muted">{label}</Text>
        <Text selectable className="text-[15px] text-foreground">
          {value}
        </Text>
      </View>
      {isExternal ? (
        <ExternalLink size={16} color={theme.textSecondary} />
      ) : (
        <ChevronRight size={18} color={theme.textSecondary} />
      )}
    </PressableFeedback>
  );
}

interface SRCOfficerProps {
  name: string;
  role: string;
  initials: string;
}

function SRCOfficerCard({ name, role, initials }: SRCOfficerProps) {
  return (
    <View className="items-center gap-2" style={{ width: 100 }}>
      <Avatar size="lg" alt={initials}>
        <Avatar.Fallback />
      </Avatar>
      <View className="items-center gap-0.5">
        <Text
          className="text-center text-xs font-medium text-foreground"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text
          className="text-center text-[11px] text-muted"
          numberOfLines={2}
        >
          {role}
        </Text>
      </View>
    </View>
  );
}

const srcOfficers: SRCOfficerProps[] = [
  { name: 'SRC President', role: 'Student Leadership', initials: 'SP' },
  { name: 'Gen. Secretary', role: 'Administration', initials: 'GS' },
  { name: 'Finance Sec.', role: 'Finance & Budget', initials: 'FS' },
  { name: 'Welfare Chair', role: 'Student Welfare', initials: 'WC' },
];

export function ContactSupportSection() {
  const handleEmail = () => {
    Linking.openURL('mailto:src@ktu.edu.gh');
  };

  const handlePhone = () => {
    Linking.openURL('tel:+233XXXXXXXXX');
  };

  const handleLocation = () => {
    Linking.openURL(
      'https://maps.google.com/?q=Koforidua+Technical+University'
    );
  };

  return (
    <View className="gap-4">
      <View className="gap-1 px-4">
        <Text className="text-lg font-semibold text-foreground">
          Contact Support
        </Text>
        <Text className="text-sm text-muted">
          Reach out to the SRC team for assistance
        </Text>
      </View>

      {/* SRC Officers */}
      <View className="gap-2">
        <Text className="px-4 text-xs font-medium uppercase tracking-wide text-muted">
          SRC Executives
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-3 px-4"
        >
          {srcOfficers.map((officer) => (
            <Surface
              key={officer.initials}
              variant="secondary"
              className="overflow-hidden rounded-xl p-4"
            >
              <SRCOfficerCard {...officer} />
            </Surface>
          ))}
        </ScrollView>
      </View>

      {/* Contact Channels */}
      <View className="gap-1.5 px-4">
        <Text className="text-xs font-medium uppercase tracking-wide text-muted">
          Get In Touch
        </Text>
        <Surface variant="secondary" className="overflow-hidden rounded-xl p-0">
          <ContactItem
            icon={Mail}
            iconBgClass="bg-accent/10"
            iconColor="#3B82F6"
            label="Email"
            value="src@ktu.edu.gh"
            onPress={handleEmail}
          />
          <ContactItem
            icon={Phone}
            iconBgClass="bg-success/10"
            iconColor="#22C55E"
            label="Phone"
            value="+233 XX XXX XXXX"
            onPress={handlePhone}
          />
          <ContactItem
            icon={MapPin}
            iconBgClass="bg-warning/10"
            iconColor="#F59E0B"
            label="Office"
            value="SRC Office, Main Campus"
            onPress={handleLocation}
            isExternal
          />
        </Surface>
      </View>
    </View>
  );
}
