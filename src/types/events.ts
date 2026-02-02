/**
 * Event-related types for the events feature
 */

export type TabKeys = 'featured' | 'popular' | 'upcoming';

export interface EventTabOption {
  key: TabKeys;
  label: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string | null;
  location: string | null;
  hero_image_url: string | null;
  organizer_name: string | null;
  organizer_avatar: string | null;
  is_featured: boolean;
  attendees_count: number;
  category: string | null;
}

export interface EventCard {
  id: string;
  title: string;
  starts_at: string;
  location: string | null;
  hero_image_url: string | null;
  category: string | null;
  attendees_count: number;
}

/**
 * Raw row type from Supabase events table
 */
export interface EventRow {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string | null;
  location: string | null;
  hero_image_url: string | null;
  organizer_name: string | null;
  organizer_avatar: string | null;
  is_featured: boolean;
  attendees_count: number;
  category: string | null;
}
