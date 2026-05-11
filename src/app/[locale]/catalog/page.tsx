'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useMemo } from 'react';
import { bikes } from '@/data/bikes';
import FilterBar from '@/components/features/catalog/FilterBar';
import CatalogGrid from '@/components/features/catalog/CatalogGrid';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Locale } from '@/types';

export default function CatalogPage() {
  const t = useTranslations('catalog');
  const locale = useLocale() as Locale;

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [fuelFilter, setFuelFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...bikes];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.nameAr.includes(q) ||
          b.brand.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== 'all') {
      result = result.filter((b) => b.type === typeFilter);
    }

    if (fuelFilter !== 'all') {
      result = result.filter((b) => b.fuel === fuelFilter);
    }

    if (brandFilter !== 'all') {
      result = result.filter((b) => b.brand === brandFilter);
    }

    return result;
  }, [search, typeFilter, fuelFilter, brandFilter]);

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('all');
    setFuelFilter('all');
    setBrandFilter('all');
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        {/* Filters */}
        <FilterBar
          typeFilter={typeFilter}
          fuelFilter={fuelFilter}
          brandFilter={brandFilter}
          search={search}
          onTypeChange={setTypeFilter}
          onFuelChange={setFuelFilter}
          onBrandChange={setBrandFilter}
          onSearchChange={setSearch}
          onClear={clearFilters}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {/* Results count */}
        <div className="mb-6 text-center">
          <p className="text-text-muted text-sm">
            {t('resultsCount', { count: filtered.length })}
          </p>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg mb-4">
              {t('noResults')}
            </p>
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
