/**
 * Type definitions for home screen components
 */

export interface SRCUpdate {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  readMoreLink?: string;
  linkUrl?: string;
  avatarUrl?: string;
  avatarFallback: string;
  gradientColors: [string, string];
}

export interface Representative {
  id: string;
  name: string;
  position: string;
  description: string;
  imageUrl: string;
}

export interface HomeEvent {
  id: string;
  title: string;
  startsAt: Date | string;
  endsAt?: Date | string;
  location: string | null;
  coverImage?: string;
  category?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  heroImage?: string;
  createdAt?: Date | string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  progress: number;
  category?: string;
  gradientColors?: [string, string] | [string, string, string];
}

export interface UserGreeting {
  greeting: string;
  name: string;
  fullGreeting: string;
  subtitle: string;
}
