import type { Metadata } from 'next';
import { LOCATIONS, SITE_NAME, SITE_NAME_AR, SITE_URL, SOCIAL_LINKS, BRANCHES } from './constants';
import type { Locale } from '@/types';

export const DEFAULT_OG_IMAGE = '/og-image.jpg';

/** Social apps reliably preview JPG/PNG; anything else falls back to the default image. */
export function shareableImage(path: string | undefined): string {
  return path && /\.(jpe?g|png)$/i.test(path) ? path : DEFAULT_OG_IMAGE;
}

/**
 * Builds per-page metadata: canonical URL, hreflang links for EN/AR,
 * and Open Graph / Twitter tags used for WhatsApp and Facebook link previews.
 * `path` is the route without the locale, e.g. '' for home or '/catalog'.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  absoluteTitle = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = `/${locale}${path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `/en${path}`,
        ar: `/ar${path}`,
        'x-default': `/en${path}`,
      },
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: locale === 'ar' ? SITE_NAME_AR : SITE_NAME,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_EG',
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/** schema.org data so Google can show both showrooms (phone, map, socials) in search. */
export function localBusinessJsonLd(locale: Locale) {
  const isAr = locale === 'ar';
  return BRANCHES.map((key) => {
    const branch = LOCATIONS[key];
    const city = isAr ? branch.labelAr : branch.label;
    return {
      '@context': 'https://schema.org',
      '@type': 'MotorcycleDealer',
      '@id': `${SITE_URL}/#${key}`,
      name: `${isAr ? SITE_NAME_AR : SITE_NAME} — ${city}`,
      url: `${SITE_URL}/${locale}`,
      image: `${SITE_URL}/logo.jpg`,
      logo: `${SITE_URL}/logo.jpg`,
      telephone: `+${branch.whatsapp}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: branch.label,
        addressCountry: 'EG',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: branch.geo.lat,
        longitude: branch.geo.lng,
      },
      hasMap: branch.mapUrl,
      sameAs: Object.values(SOCIAL_LINKS),
    };
  });
}

/** Safe for dangerouslySetInnerHTML: escapes `<` so data can't close the script tag. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
