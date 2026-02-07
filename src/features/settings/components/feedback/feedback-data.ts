import type { LucideIcon } from 'lucide-react-native';
import {
    AlertTriangle,
    Bug,
    Heart,
    Lightbulb,
} from 'lucide-react-native';

export interface FeedbackType {
  id: string;
  label: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgClass: string;
  description: string;
}

export interface FeedbackCategory {
  value: string;
  label: string;
}

export interface SatisfactionLevel {
  value: number;
  emoji: string;
  label: string;
}

export const feedbackTypes: FeedbackType[] = [
  {
    id: 'suggestion',
    label: 'Suggestion',
    icon: Lightbulb,
    iconColor: '#F59E0B',
    iconBgClass: 'bg-warning/10',
    description: 'Share an idea to improve the app',
  },
  {
    id: 'bug',
    label: 'Bug Report',
    icon: Bug,
    iconColor: '#EF4444',
    iconBgClass: 'bg-danger/10',
    description: 'Report something that isn\'t working',
  },
  {
    id: 'compliment',
    label: 'Compliment',
    icon: Heart,
    iconColor: '#EC4899',
    iconBgClass: 'bg-danger/10',
    description: 'Tell us what you love about the app',
  },
  {
    id: 'complaint',
    label: 'Complaint',
    icon: AlertTriangle,
    iconColor: '#F97316',
    iconBgClass: 'bg-warning/10',
    description: 'Let us know about an issue or concern',
  },
];

export const feedbackCategories: FeedbackCategory[] = [
  { value: 'app-experience', label: 'App Experience' },
  { value: 'events', label: 'Events' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'hostels', label: 'Hostels' },
  { value: 'src-services', label: 'SRC Services' },
  { value: 'campus-life', label: 'Campus Life' },
  { value: 'academics', label: 'Academics' },
  { value: 'other', label: 'Other' },
];

export const satisfactionLevels: SatisfactionLevel[] = [
  { value: 1, emoji: '😡', label: 'Very Dissatisfied' },
  { value: 2, emoji: '😞', label: 'Dissatisfied' },
  { value: 3, emoji: '😐', label: 'Neutral' },
  { value: 4, emoji: '😊', label: 'Satisfied' },
  { value: 5, emoji: '🤩', label: 'Very Satisfied' },
];
