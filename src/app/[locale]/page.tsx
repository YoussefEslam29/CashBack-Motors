import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Hero from '@/components/features/home/Hero';
import FeaturedBikes from '@/components/features/home/FeaturedBikes';
import BrandStrip from '@/components/features/home/BrandStrip';
import CategoryStrip from '@/components/home/CategoryStrip';
import WhyUs from '@/components/home/WhyUs';
import SocialStrip from '@/components/home/SocialStrip';
import CTASection from '@/components/home/CTASection';
import { jsonLdString, localBusinessJsonLd, pageMetadata } from '@/lib/seo';
import type { Locale } from '@/types';

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
    path: '',
    title: t('siteTitle'),
    description: t('siteDescription'),
    absoluteTitle: true,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(localBusinessJsonLd(locale === 'ar' ? 'ar' : 'en')),
        }}
      />
      <Hero />
      <CategoryStrip />
      <BrandStrip />
      <FeaturedBikes />
      <WhyUs />
      <SocialStrip />
      <CTASection />
    </>
  );
}
