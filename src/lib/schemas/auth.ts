import { z } from 'zod';

const ktuEmail = z
  .email('Please enter a valid email address')
  .refine((val) => val.endsWith('@ktu.edu.gh'), {
    message: 'Only KTU institutional emails (@ktu.edu.gh) are accepted',
  });

export const SignupSchema = z
  .object({
    email: ktuEmail,
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormType = z.infer<typeof SignupSchema>;

export const SigninSchema = z.object({
  email: ktuEmail,
  password: z.string().min(1, 'Password is required'),
});

export type SigninFormType = z.infer<typeof SigninSchema>;

export const OTPSchema = z.object({
  otpCode: z.string().length(6, 'Please enter all 6 digits'),
});

export type OTPFormType = z.infer<typeof OTPSchema>;
