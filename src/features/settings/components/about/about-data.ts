import type { LucideIcon } from 'lucide-react-native';
import {
  Calendar,
  ShoppingBag,
  Bell,
  Users,
  Building2,
  MessageSquare,
  Target,
  Heart,
  Lightbulb,
  Shield,
  Twitter,
  Instagram,
  Facebook,
  Globe,
  Mail,
} from 'lucide-react-native';

export interface AppFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgClass: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
  iconColor: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const appFeatures: AppFeature[] = [
  {
    id: 'events',
    title: 'Campus Events',
    description: 'Stay updated with SRC events, workshops, and campus activities',
    icon: Calendar,
    iconBgClass: 'bg-accent/10',
  },
  {
    id: 'marketplace',
    title: 'Student Marketplace',
    description: 'Buy and sell items within the KTU student community',
    icon: ShoppingBag,
    iconBgClass: 'bg-success/10',
  },
  {
    id: 'announcements',
    title: 'Announcements',
    description: 'Important updates from SRC and university administration',
    icon: Bell,
    iconBgClass: 'bg-warning/10',
  },
  {
    id: 'hostels',
    title: 'Hostel Directory',
    description: 'Find and explore accommodation options near campus',
    icon: Building2,
    iconBgClass: 'bg-danger/10',
  },
  {
    id: 'community',
    title: 'Student Community',
    description: 'Connect with fellow students and join campus groups',
    icon: Users,
    iconBgClass: 'bg-accent/10',
  },
  {
    id: 'feedback',
    title: 'Voice Your Opinion',
    description: 'Share feedback and suggestions to improve campus life',
    icon: MessageSquare,
    iconBgClass: 'bg-success/10',
  },
];

export const coreValues: CoreValue[] = [
  {
    id: 'mission',
    title: 'Our Mission',
    description:
      'To represent and advocate for the welfare, interests, and rights of all students at Koforidua Technical University.',
    icon: Target,
  },
  {
    id: 'vision',
    title: 'Our Vision',
    description:
      'To create a vibrant, inclusive, and supportive campus environment where every student can thrive academically and personally.',
    icon: Lightbulb,
  },
  {
    id: 'values',
    title: 'Our Values',
    description:
      'Integrity, transparency, inclusivity, and dedication to student success guide everything we do.',
    icon: Heart,
  },
  {
    id: 'commitment',
    title: 'Our Commitment',
    description:
      'We are committed to bridging the gap between students and administration, ensuring your voice is always heard.',
    icon: Shield,
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com/ktusrc',
    icon: Twitter,
    iconColor: '#1DA1F2',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/ktusrc',
    icon: Instagram,
    iconColor: '#E4405F',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://facebook.com/ktusrc',
    icon: Facebook,
    iconColor: '#1877F2',
  },
  {
    id: 'website',
    name: 'Website',
    url: 'https://ktusrc.com',
    icon: Globe,
    iconColor: '#6366F1',
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:src@ktu.edu.gh',
    icon: Mail,
    iconColor: '#22C55E',
  },
];

export const devTeam: TeamMember[] = [
  {
    id: 'lead',
    name: 'Dev Team Lead',
    role: 'Lead Developer',
    initials: 'DT',
  },
  {
    id: 'design',
    name: 'UI/UX Designer',
    role: 'Design & Experience',
    initials: 'UX',
  },
  {
    id: 'backend',
    name: 'Backend Dev',
    role: 'API & Infrastructure',
    initials: 'BE',
  },
  {
    id: 'mobile',
    name: 'Mobile Dev',
    role: 'React Native',
    initials: 'MD',
  },
];

export const aboutContent = {
  appName: 'KTU SRC App',
  tagline: 'Your Campus Companion',
  description:
    'The official mobile application of the Students\u0027 Representative Council (SRC) of Koforidua Technical University. Designed to keep you connected with campus life, events, and your fellow students.',
  universityName: 'Koforidua Technical University',
  srcFullName: 'Students\u0027 Representative Council',
  establishedYear: '2026',
  copyright: '\u00A9 2026 KTU SRC. All rights reserved.',
};
