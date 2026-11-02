/**
 * Public site URL, used for SEO (sitemap, canonical links, social previews).
 * Set NEXT_PUBLIC_SITE_URL in Vercel when the custom domain is live.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cashback-motors.vercel.app'
).replace(/\/$/, '');

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/Cashbackmotoo',
  instagram: 'https://www.instagram.com/cashbackmoto',
  tiktok: 'https://www.tiktok.com/@cashbackmoto',
} as const;

export const LOCATIONS = {
  cairo: {
    label: 'Cairo',
    labelAr: 'القاهرة',
    phone: '01005804463',
    whatsapp: '201005804463',
    // TODO(owner): confirm. Notes/AGENTS.md use https://maps.app.goo.gl/USLPyWr7Mjdbr9x1A
    mapUrl: 'https://maps.app.goo.gl/EGuXQq52qH3pogk9A',
    embedUrl:
      'https://maps.google.com/maps?q=30.049982,31.356527&hl=en&z=16&output=embed',
    geo: { lat: 30.049982, lng: 31.356527 },
  },
  alexandria: {
    label: 'Alexandria',
    labelAr: 'الإسكندرية',
    phone: '+20 11 10782513',
    whatsapp: '201110782513',
    // TODO(owner): confirm. Vault notes use https://maps.app.goo.gl/omChfM4oFsqhCepE7
    mapUrl: 'https://maps.app.goo.gl/nHStDGwekLnKUJAK7',
    embedUrl:
      'https://maps.google.com/maps?q=31.225298,29.936758&hl=en&z=15&output=embed',
    geo: { lat: 31.225298, lng: 29.936758 },
  },
} as const;

export type BranchKey = keyof typeof LOCATIONS;

export const BRANCHES: BranchKey[] = ['cairo', 'alexandria'];

/**
 * Google "write a review" links, one per branch (from Google Business Profile).
 * Leave null to hide the review buttons. See PLAN/plan-business-growth.md, guide G4.
 */
export const GOOGLE_REVIEW_URLS: Record<BranchKey, string | null> = {
  cairo: null,
  alexandria: null,
};

export const BRANDS = [
  'ZONTES',
  'SYM',
  'KEEWAY',
  'HOGAN',
  'DAYUN',
  'BENELLI',
  'VIGOREY',
] as const;

export const SITE_NAME = 'Cash Back Moto';
export const SITE_NAME_AR = 'كاش باك موتو';
