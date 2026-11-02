'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { bikes } from '@/data/bikes';
import FilterBar from './FilterBar';
import CatalogGrid from './CatalogGrid';
import SectionHeading from '@/components/ui/SectionHeading';
import { getStockedBrands, hasElectricBikes } from '@/lib/utils';
import type { Brand, BikeType, FuelType } from '@/types';

export interface CatalogFilters {
  type: BikeType | 'all';
  fuel: FuelType | 'all';
  brand: Brand | 'all';
  search: string;
}

const EMPTY: CatalogFilters = { type: 'all', fuel: 'all', brand: 'all', search: '' };
const stockedBrands = getStockedBrands(bikes);
const showElectric = hasElectricBikes(bikes);

/**
 * `initial` comes from the URL (?type=, ?fuel=, ?brand=, ?q=), so links like the
 * home page category tiles open the catalogue already filtered. The page keys this
 * component on those filters, so following a new link always starts fresh.
 */
export default function CatalogView({ initial }: { initial: CatalogFilters }) {
  const t = useTranslations('catalog');
  const [filters, setFilters] = useState<CatalogFilters>(() => ({
    ...initial,
    // A brand with no bikes in stock isn't in the dropdown; fall back to all brands.
    brand: initial.brand !== 'all' && stockedBrands.includes(initial.brand) ? initial.brand : 'all',
  }));
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return bikes.filter((b) => {
      if (filters.type !== 'all' && b.type !== filters.type) return false;
      if (filters.fuel !== 'all' && b.fuel !== filters.fuel) return false;
      if (filters.brand !== 'all' && b.make.toUpperCase() !== filters.brand) return false;
      if (!q) return true;
      return (
        b.name.en.toLowerCase().includes(q) ||
        b.name.ar.includes(q) ||
        b.make.toLowerCase().includes(q) ||
        b.model.toLowerCase().includes(q)
      );
    });
  }, [filters]);

  const update = (patch: Partial<CatalogFilters>) => setFilters((f) => ({ ...f, ...patch }));
  const clearFilters = () => setFilters(EMPTY);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        <FilterBar
          filters={filters}
          stockedBrands={stockedBrands}
          showElectric={showElectric}
          onChange={update}
          onClear={clearFilters}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((v) => !v)}
        />

        <div className="mb-6 text-center">
          <p className="text-text-muted text-sm" aria-live="polite">
            {t('resultsCount', { count: filtered.length })}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg mb-4">{t('noResults')}</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-all"
            >
              {t('resetFilters')}
            </button>
          </div>
        ) : (
          <CatalogGrid bikes={filtered} />
        )}
      </div>
    </div>
  );
}
