/**
 * Hostel-related types for the hostels showcase feature
 */

export interface HostelCard {
  id: string;
  image: string | null;
  rating: number | null;
  name: string;
  address: string | null;
  price: number;
}

export interface HostelGalleryItem {
  id: string;
  image: string;
  caption: string | null;
  position: number;
}

export interface HostelAgent {
  name: string | null;
  email: string | null;
  avatar: string | null;
}

export interface HostelDetails extends HostelCard {
  description: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  facilities: string[];
  type: string;
  campus: boolean;
  contact: string | null;
  paymentTerm: string | null;
  agent: HostelAgent;
  gallery: HostelGalleryItem[];
}

/**
 * Raw row type from Supabase hostels table
 */
export interface HostelRow {
  id: string;
  hero_image_url: string | null;
  rating: number | null;
  name: string;
  address: string | null;
  price: number;
}
