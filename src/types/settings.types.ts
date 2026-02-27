import type { LucideIcon } from 'lucide-react-native';

export interface SettingItem {
  id: string;
  label: string;
  icon: LucideIcon;
  iconBgClass: string;
  iconColor: string;
  type: 'navigate' | 'action' | 'external';
  route?: string;
  action?: 'signout' | 'deleteaccount';
  externalUrl?: string;
  isDestructive?: boolean;
  itemBgClass?: string;
}

export interface SettingSection {
  id: string;
  title?: string;
  items: SettingItem[];
}

export interface ExternalService {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
  iconBgClass: string;
  iconColor: string;
}
