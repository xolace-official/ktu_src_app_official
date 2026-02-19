import { z } from 'zod';

// Schema for creating a new product listing
export const NewProductSchema = z.object({
  title: z
    .string()
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name is too long'),
  price: z
    .number()
    .positive('Price must be greater than 0')
    .max(100000, 'Price seems too high'),
  stock_qty: z
    .number()
    .int('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .optional(),
  category_id: z.string().min(1, 'Please select a category'),
  description: z
    .string()
    .max(1000, 'Description is too long')
    .optional()
    .or(z.literal('')),
  condition: z.enum(['new', 'used', 'refurbished']).optional(),
  whatsapp_contact: z
    .string()
    .regex(/^0\d{9}$/, 'Enter a valid phone number (e.g., 0241234567)')
    .optional()
    .or(z.literal('')),
  call_contact: z
    .string()
    .regex(/^0\d{9}$/, 'Enter a valid phone number (e.g., 0241234567)')
    .optional()
    .or(z.literal('')),
  placement_type: z.enum(['normal', 'featured']),
});

export type NewProductFormType = z.infer<typeof NewProductSchema>;

// Condition options for the form
export const CONDITION_OPTIONS = [
  { label: 'Brand New', value: 'new' },
  { label: 'Used', value: 'used' },
  { label: 'Refurbished', value: 'refurbished' },
] as const;

// Search schema for filtering listings
export const SearchListingsSchema = z.object({
  query: z.string().optional(),
  category_id: z.string().optional(),
  min_price: z.coerce.number().min(0).optional(),
  max_price: z.coerce.number().min(0).optional(),
  condition: z.enum(['new', 'used', 'refurbished']).optional(),
});

export type SearchListingsParams = z.infer<typeof SearchListingsSchema>;
