import { PROGRAM_OPTIONS, LEVEL_OPTIONS } from '@/constants/profile.constants';

export const getProgramLabel = (value: string): string => {
  return PROGRAM_OPTIONS.find((opt) => opt.value === value)?.label || value;
};

export const getLevelLabel = (value: string): string => {
  return LEVEL_OPTIONS.find((opt) => opt.value === value)?.label || value;
};

export const getInitials = (fullName: string): string => {
  const names = fullName.trim().split(' ');
  if (names.length === 0) return '';
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  // Format: +233 XX XXX XXXX
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+233 ${cleaned.slice(1, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return phone;
};
