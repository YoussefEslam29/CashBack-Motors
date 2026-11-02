import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import CatalogView, { type CatalogFilters } from '@/components/features/catalog/CatalogView';
import { bikes } from '@/data/bikes';
import { BRANDS } from '@/lib/constants';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/types';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

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
    path: '/catalog',
    title: t('catalogTitle'),
    description: t('catalogDescription', { count: bikes.length }),
  });
}

/** Reads filters from the URL, e.g. /en/catalog?type=scooter&brand=keeway&fuel=electric&q=k368 */
function filtersFromUrl(sp: Record<string, string | string[] | undefined>): CatalogFilters {
  const type = first(sp.type);
  // Old links used ?type=electric; electric is a fuel, not a body type.
  const fuel = first(sp.fuel) ?? (type === 'electric' ? 'electric' : undefined);
  const brand = first(sp.brand)?.toUpperCase();

  return {
    type: type === 'motorcycle' || type === 'scooter' ? type : 'all',
    fuel: fuel === 'gas' || fuel === 'electric' ? fuel : 'all',
    brand: BRANDS.find((b) => b === brand) ?? 'all',
    search: first(sp.q) ?? '',
  };
}

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const initial = filtersFromUrl(await searchParams);
  const key = `${initial.type}|${initial.fuel}|${initial.brand}|${initial.search}`;

  return <CatalogView key={key} initial={initial} />;
}
