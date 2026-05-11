import { getBikeBySlug } from '@/lib/utils';
import { bikes } from '@/data/bikes';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import ProductDetailClient from '@/components/catalog/ProductDetailClient';

export function generateStaticParams() {
  return bikes.map((bike) => ({
    slug: bike.slug,
  }));
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

  return <ProductDetailClient bike={bike} />;
}
