import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { jsonLdString, localBusinessJsonLd, pageMetadata } from '@/lib/seo';
import type { Locale } from '@/types';

// The contact page is a client component, so its SEO metadata lives here.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = raw === 'ar' ? 'ar' : 'en';
  const t = await getTranslations({ locale, namespace: 'meta' });
  return pageMetadata({
    locale,
    path: '/contact',
    title: t('contactTitle'),
    description: t('contactDescription'),
  });
}

export default async function ContactLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(localBusinessJsonLd(locale === 'ar' ? 'ar' : 'en')),
        }}
      />
      {children}
    </>
  );
}
