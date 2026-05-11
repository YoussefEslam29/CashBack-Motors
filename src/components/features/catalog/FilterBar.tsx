'use client';

import { useTranslations } from 'next-intl';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { BRANDS } from '@/lib/constants';

interface FilterBarProps {
  typeFilter: string;
  fuelFilter: string;
  brandFilter: string;
  search: string;
  onTypeChange: (v: string) => void;
  onFuelChange: (v: string) => void;
  onBrandChange: (v: string) => void;
  onSearchChange: (v: string) => void;
  onClear: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export default function FilterBar({
  typeFilter,
  fuelFilter,
  brandFilter,
  search,
  onTypeChange,
  onFuelChange,
  onBrandChange,
  onSearchChange,
  onClear,
  showFilters,
  onToggleFilters,
}: FilterBarProps) {
  const t = useTranslations('catalog');

  const typeButtons = [
    { key: 'all', label: t('filterAll') },
    { key: 'motorcycle', label: t('filterMotorcycle') },
    { key: 'scooter', label: t('filterScooter') },
  ];

  const fuelButtons = [
    { key: 'all', label: t('filterAll') },
    { key: 'gas', label: t('fuelGas') },
    { key: 'electric', label: t('fuelElectric') },
  ];

  const hasActiveFilters =
    search || typeFilter !== 'all' || fuelFilter !== 'all' || brandFilter !== 'all';

  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="relative max-w-xl mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-4 pr-10 py-3 bg-bg-surface border border-border rounded-md text-text-primary placeholder-text-muted focus:border-primary focus:outline-none transition-all"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Toggle (mobile) */}
      <div className="flex justify-center md:hidden">
        <button
          onClick={onToggleFilters}
          className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md text-text-secondary hover:border-primary hover:text-primary transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {t('filters')}
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-300 ${
              showFilters ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Filters */}
      <div
        className={`flex flex-wrap items-center justify-center gap-3 ${
          showFilters ? 'block' : 'hidden md:flex'
        }`}
      >
        {/* Type pills */}
        {typeButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => onTypeChange(btn.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              typeFilter === btn.key
                ? 'bg-primary text-white'
                : 'bg-bg-surface border border-border text-text-secondary hover:border-primary hover:text-white'
            }`}
          >
            {btn.label}
          </button>
        ))}

        {/* Fuel pills */}
        {fuelButtons.map((btn) => (
          <button
            key={`fuel-${btn.key}`}
            onClick={() => onFuelChange(btn.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              fuelFilter === btn.key
                ? 'bg-primary text-white'
                : 'bg-bg-surface border border-border text-text-secondary hover:border-primary hover:text-white'
            }`}
          >
            {btn.label}
          </button>
        ))}

        {/* Brand select */}
        <div className="relative">
          <select
            value={brandFilter}
            onChange={(e) => onBrandChange(e.target.value)}
            className="appearance-none bg-bg-surface border border-border rounded-md px-4 py-2 pr-10 text-sm font-medium text-text-secondary hover:border-primary focus:border-primary focus:outline-none transition-all cursor-pointer"
          >
            <option value="all">{t('allBrands')}</option>
            {BRANDS.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        </div>

        {/* Clear */}
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
