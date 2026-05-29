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
    mapUrl: 'https://maps.app.goo.gl/EGuXQq52qH3pogk9A',
    embedUrl:
      'https://maps.google.com/maps?q=30.049982,31.356527&hl=en&z=16&output=embed',
  },
  alexandria: {
    label: 'Alexandria',
    labelAr: 'الإسكندرية',
    phone: '+20 11 10782513',
    whatsapp: '201110782513',
    mapUrl: 'https://maps.app.goo.gl/nHStDGwekLnKUJAK7',
    embedUrl:
      'https://maps.google.com/maps?q=31.225298,29.936758&hl=en&z=15&output=embed',
  },
} as const;

export type BranchKey = keyof typeof LOCATIONS;

export const BRANCHES: BranchKey[] = ['cairo', 'alexandria'];

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
