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

// Listing submissions (staging before approval)
export type ListingSubmissionStatus =
  | 'submitted'
  | 'payment_pending'
  | 'paid'
  | 'approved'
  | 'rejected';

export interface ListingFeePlan {
  id: string;
  name: string;
  currency: string;
  normal_fee: number;
  featured_fee: number;
  active: boolean;
  created_at: string;
}

export interface ListingSubmission {
  id: string;
  reference_code: string;
  submitter_id: string | null;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  category_id: string | null;
  stock_qty: number | null;
  condition: string | null;
  placement_type: 'normal' | 'featured';
  call_contact: string | null;
  whatsapp_contact: string | null;
  photos: string[];
  fee_plan_id: string | null;
  status: ListingSubmissionStatus;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}
