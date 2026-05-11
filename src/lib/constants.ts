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
    mapUrl: 'https://maps.app.goo.gl/USLPyWr7Mjdbr9x1A',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.123!2d31.2!3d30.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAwJzAwLjAiTiAzMcKwMTInMDAuMCJF!5e0!3m2!1sen!2seg!4v1',
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
  'ZONTOS',
  'SYM',
  'KEEWAY',
  'HOGAN',
  'DAYUN',
  'BENELLI',
  'VIGOREY',
] as const;

export const SITE_NAME = 'Cash Back Moto';
export const SITE_NAME_AR = 'كاش باك موتو';
