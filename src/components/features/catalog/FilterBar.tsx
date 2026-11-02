'use client';

import { useTranslations } from 'next-intl';
import { SlidersHorizontal, ChevronDown, X, Zap } from 'lucide-react';
import type { CatalogFilters } from './CatalogView';
import type { Brand } from '@/types';

interface FilterBarProps {
  filters: CatalogFilters;
  /** Only brands that have bikes in the catalogue, so no filter leads to "No results". */
  stockedBrands: Brand[];
  /** The Electric toggle only appears once electric bikes are in the catalogue. */
  showElectric: boolean;
  onChange: (patch: Partial<CatalogFilters>) => void;
  onClear: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const pill = (active: boolean) =>
  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
    active
      ? 'bg-primary text-white'
      : 'bg-bg-surface border border-border text-text-secondary hover:border-primary hover:text-white'
  }`;

export default function FilterBar({
  filters,
  stockedBrands,
  showElectric,
  onChange,
  onClear,
  showFilters,
  onToggleFilters,
}: FilterBarProps) {
  const t = useTranslations('catalog');

  const typeButtons = [
    { key: 'all', label: t('filterAll') },
    { key: 'motorcycle', label: t('typeMotorcycle') },
    { key: 'scooter', label: t('typeScooter') },
  ] as const;

  const hasActiveFilters =
    filters.search ||
    filters.type !== 'all' ||
    filters.fuel !== 'all' ||
    filters.brand !== 'all';

  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="relative max-w-xl mx-auto">
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchPlaceholder')}
          className="w-full ps-4 pe-10 py-3 bg-bg-surface border border-border rounded-md text-text-primary placeholder-text-muted focus:border-primary focus:outline-none transition-all"
        />
        {filters.search && (
          <button
            onClick={() => onChange({ search: '' })}
            aria-label={t('clearSearch')}
            className="absolute end-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Toggle (mobile) */}
      <div className="flex justify-center md:hidden">
        <button
          onClick={onToggleFilters}
          aria-expanded={showFilters}
          className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md text-text-secondary hover:border-primary hover:text-primary transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {t('filters')}
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Filters */}
      <div
        className={`flex flex-wrap items-center justify-center gap-3 ${
          showFilters ? 'flex' : 'hidden md:flex'
        }`}
      >
        {typeButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => onChange({ type: btn.key })}
            aria-pressed={filters.type === btn.key}
            className={pill(filters.type === btn.key)}
          >
            {btn.label}
          </button>
        ))}

        {showElectric && (
          <button
            onClick={() => onChange({ fuel: filters.fuel === 'electric' ? 'all' : 'electric' })}
            aria-pressed={filters.fuel === 'electric'}
            className={`${pill(filters.fuel === 'electric')} flex items-center gap-1.5`}
          >
            <Zap className="w-3.5 h-3.5" />
            {t('filterElectric')}
          </button>
        )}

        {/* Brand select */}
        <div className="relative">
          <select
            value={filters.brand}
            onChange={(e) => onChange({ brand: e.target.value as CatalogFilters['brand'] })}
            aria-label={t('allBrands')}
            className="appearance-none bg-bg-surface border border-border rounded-md ps-4 pe-10 py-2 text-sm font-medium text-text-secondary hover:border-primary focus:border-primary focus:outline-none transition-all cursor-pointer"
          >
            <option value="all">{t('allBrands')}</option>
            {stockedBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute end-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-sm text-primary hover:text-primary-hover transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            {t('resetFilters')}
          </button>
        )}
      </div>
    </div>
  );
}
