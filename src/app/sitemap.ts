import type { MetadataRoute } from 'next';
import { bikes } from '@/data/bikes';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/constants';

/** /sitemap.xml — every page in EN and AR, with hreflang alternates for Google. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{ path: string; priority: number }> = [
    { path: '', priority: 1 },
    { path: '/catalog', priority: 0.9 },
    { path: '/contact', priority: 0.8 },
    { path: '/about', priority: 0.6 },
    ...bikes.map((bike) => ({ path: `/catalog/${bike.slug}`, priority: 0.7 })),
  ];

  const lastModified = new Date();

  return pages.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
    );
    return routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority,
      alternates: { languages },
    }));
  });
}
