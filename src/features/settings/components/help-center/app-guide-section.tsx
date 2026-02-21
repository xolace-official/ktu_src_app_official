import { View, Text } from 'react-native';
import { Surface } from 'heroui-native';
import {
  Compass,
  CalendarDays,
  Store,
  Building2,
  Settings,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

interface GuideItem {
  icon: LucideIcon;
  iconColor: string;
  iconBgClass: string;
  title: string;
  description: string;
}

const guides: GuideItem[] = [
  {
    icon: Compass,
    iconColor: '#3B82F6',
    iconBgClass: 'bg-accent/10',
    title: 'Home',
    description: 'Your dashboard with announcements, news, and quick access to features',
  },
  {
    icon: CalendarDays,
    iconColor: '#F59E0B',
    iconBgClass: 'bg-warning/10',
    title: 'Events',
    description: 'Discover and register for campus events, workshops, and social activities',
  },
  {
    icon: Store,
    iconColor: '#22C55E',
    iconBgClass: 'bg-success/10',
    title: 'Marketplace',
    description: 'Buy and sell items within the KTU community, textbooks, gadgets, and more',
  },
  {
    icon: Building2,
    iconColor: '#A855F7',
    iconBgClass: 'bg-purple-500/10',
    title: 'Hostels',
    description: 'Browse available hostels, compare prices, and find your ideal accommodation',
  },
  {
    icon: Settings,
    iconColor: '#6366F1',
    iconBgClass: 'bg-indigo-500/10',
    title: 'Settings',
    description: 'Manage your profile, preferences, notifications, and app settings',
  },
];

function GuideCard({ item }: { item: GuideItem }) {
  const Icon = item.icon;

  return (
    <Surface variant="secondary" className="overflow-hidden rounded-xl p-4">
      <View className="flex-row items-start gap-3">
        <View
          className={`size-10 items-center justify-center rounded-xl ${item.iconBgClass}`}
          style={{ borderCurve: 'continuous' }}
        >
          <Icon size={20} color={item.iconColor} />
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-[15px] font-semibold text-foreground">
            {item.title}
          </Text>
          <Text className="text-[13px] leading-[18px] text-muted">
            {item.description}
          </Text>
        </View>
      </View>
    </Surface>
  );
}

export function AppGuideSection() {
  return (
    <View className="gap-3">
      <View className="gap-1 px-4">
        <Text className="text-lg font-semibold text-foreground">
          App Guide
        </Text>
        <Text className="text-sm text-muted">
          Learn what each section of the app offers
        </Text>
      </View>
      <View className="gap-2 px-4">
        {guides.map((guide) => (
          <GuideCard key={guide.title} item={guide} />
        ))}
      </View>
    </View>
  );
}
