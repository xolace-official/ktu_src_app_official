import type { Json } from './types_db';

export type InfoCenterTabKey = 'announcements' | 'notifications';

export interface InfoCenterTabOption {
  key: InfoCenterTabKey;
  label: string;
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface Attachment {
  name: string;
  url: string;
  type?: string;
}

export interface AnnouncementCardItem {
  id: string;
  title: string;
  summary: string | null;
  category: string;
  pinned: boolean;
  is_important: boolean;
  created_at: string;
}

export interface AnnouncementDetails {
  id: string;
  title: string;
  subtitle: string | null;
  body: string | null;
  summary: string | null;
  category: string;
  pinned: boolean;
  is_important: boolean;
  is_public: boolean;
  notice: string | null;
  heads_up: string | null;
  location: string | null;
  address: string | null;
  contact: string | null;
  starts_at: string | null;
  ends_at: string | null;
  quick_facts: QuickFact[];
  attachments: Attachment[];
  created_at: string;
  updated_at: string;
  author: { full_name: string | null; avatar_url: string | null } | null;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string | null;
  type: string;
  read: boolean;
  link_id: string | null;
  link_type: string | null;
  data: Json;
  created_at: string;
  actor: { full_name: string | null; avatar_url: string | null } | null;
}
