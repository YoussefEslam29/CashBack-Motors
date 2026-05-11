import { LOCATIONS, type BranchKey } from './constants';

export function buildWhatsAppLink(branch: BranchKey, message?: string): string {
  const number = LOCATIONS[branch].whatsapp;
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function bikeInquiryLink(
  bikeName: string,
  branch: BranchKey,
  locale: 'en' | 'ar'
): string {
  const message =
    locale === 'ar'
      ? `مرحبا، أنا مهتم بـ ${bikeName}. هل هو متاح؟`
      : `Hello, I'm interested in the ${bikeName}. Is it available?`;
  return buildWhatsAppLink(branch, message);
}

export function generalInquiryLink(
  branch: BranchKey,
  locale: 'en' | 'ar'
): string {
  const message =
    locale === 'ar'
      ? 'مرحبا، عايز أستفسر عن الدراجات المتاحة.'
      : 'Hello, I would like to inquire about available bikes.';
  return buildWhatsAppLink(branch, message);
}
