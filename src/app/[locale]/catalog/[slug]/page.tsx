import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getBikeBySlug, getRelatedBikes } from '@/lib/utils';
import { bikes } from '@/data/bikes';
import { pageMetadata, shareableImage } from '@/lib/seo';
import ProductDetailClient from '@/components/catalog/ProductDetailClient';
import type { Locale } from '@/types';

export function generateStaticParams() {
  return bikes.map((bike) => ({
    slug: bike.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = raw === 'ar' ? 'ar' : 'en';
  const bike = getBikeBySlug(bikes, slug);
  if (!bike) return {};

  const t = await getTranslations({ locale, namespace: 'meta' });
  const tc = await getTranslations({ locale, namespace: 'catalog' });
  const name = locale === 'ar' ? bike.name.ar : bike.name.en;
  const type = bike.type === 'scooter' ? tc('typeScooter') : tc('typeMotorcycle');

  return pageMetadata({
    locale,
    path: `/catalog/${bike.slug}`,
    title: t('bikeTitle', { name }),
    description: bike.description?.[locale] ?? t('bikeDescription', { name, type }),
    image: shareableImage(bike.images[0]),
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const bike = getBikeBySlug(bikes, slug);
  if (!bike) {
    notFound();
  }

  return <ProductDetailClient bike={bike} related={getRelatedBikes(bikes, bike)} />;
}
