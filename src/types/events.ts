/**
 * Event-related types for the events feature
 */

export type TabKeys = 'featured' | 'popular' | 'upcoming';

export type EventAttendanceStatus = 'going' | 'interested' | 'not_going' | null;

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
 * Extended event details with attendance info
 */
export interface EventDetails extends Event {
  going_count: number;
  interested_count: number;
  can_book_canopy: boolean;
  disable_attendance: boolean;
  user_attendance_status: EventAttendanceStatus;
  organizer: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
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
