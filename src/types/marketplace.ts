import type { Database } from './types_db';

type Tables = Database['public']['Tables'];

// Database row types
export type MarketCategory = Tables['market_categories']['Row'];
export type MarketListing = Tables['market_listings']['Row'];
export type MarketListingInsert = Tables['market_listings']['Insert'];
export type MarketListingUpdate = Tables['market_listings']['Update'];
export type MarketPhoto = Tables['market_photos']['Row'];
export type MarketListingVariant = Tables['market_listing_variants']['Row'];

// Extended types with relations
export interface MarketListingWithCategory extends MarketListing {
  category: MarketCategory | null;
}

// API response types for listings with selected fields
export type FeaturedListing = Pick<
  MarketListing,
  'id' | 'title' | 'price' | 'hero_image_url' | 'rating'
>;

// Seller info for product details
export interface SellerInfo {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
}

export interface MarketListingDetails extends MarketListing {
  category: MarketCategory | null;
  seller: SellerInfo | null;
  photos: MarketPhoto[];
  variants: MarketListingVariant[];
}
