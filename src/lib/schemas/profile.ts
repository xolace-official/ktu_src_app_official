import { z } from 'zod';

export const CompleteProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters long')
    .max(50, 'Full name cannot exceed 50 characters')
    .regex(/^[A-Za-z\s]+$/, 'Full name must contain only letters and spaces'),
  indexNumber: z
    .string()
    .min(5, 'Index number must be at least 5 characters')
    .regex(/^[A-Z]\d+$/, 'Index number format should be like B202210330'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^0\d{9}$/, 'Phone number format should be like 0241234567'),
  faculty: z.string().min(1, 'Please select a faculty'),
  department: z.string().min(1, 'Please select a department'),
  program: z.string().min(1, 'Please select a program'),
  level: z.string().min(1, 'Please select your level'),
});

export type CompleteProfileFormType = z.infer<typeof CompleteProfileSchema>;

export const LEVEL_OPTIONS = [
  { label: 'Level 100', value: '100' },
  { label: 'Level 200', value: '200' },
  { label: 'Level 300', value: '300' },
  { label: 'Level 400', value: '400' },
] as const;
