/**
 * Type definitions for the SRC News feature
 */

export interface NewsCardItem {
  id: string;
  title: string;
  excerpt: string | null;
  category: string;
  publisher: string;
  publisher_image: string | null;
  published_at: string;
  cover_image?: string | null;
}

export interface NewsArticle {
  id: string;
  title: string;
  body: string;
  excerpt: string | null;
  category: string;
  publisher: string;
  publisher_image: string | null;
  published_at: string;
  cover_image?: string | null;
  source: string | null;
  author: { full_name: string | null; avatar_url: string | null } | null;
  created_at: string;
}
