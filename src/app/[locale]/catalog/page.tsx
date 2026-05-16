'use client';

import { useLocale } from 'next-intl';
import { useState, useMemo } from 'react';
import { bikes } from '@/data/bikes';
import FilterBar from '@/components/features/catalog/FilterBar';
import CatalogGrid from '@/components/features/catalog/CatalogGrid';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Locale } from '@/types';

export default function CatalogPage() {
  const locale = useLocale() as Locale;
  const isArabic = locale === 'ar';

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...bikes];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.en.toLowerCase().includes(q) ||
          b.name.ar.includes(q) ||
          b.make.toLowerCase().includes(q) ||
          b.model.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== 'all') {
      result = result.filter((b) => b.type === typeFilter);
    }

    if (brandFilter !== 'all') {
      result = result.filter((b) => b.make.toUpperCase() === brandFilter);
    }

    return result;
  }, [search, typeFilter, brandFilter]);

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('all');
    setBrandFilter('all');
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeading
          title={isArabic ? 'الكتالوج' : 'Catalog'}
          subtitle={isArabic ? 'تصفح جميع الموتوسيكلات والسكوترات المتاحة' : 'Browse all available motorcycles and scooters'}
        />

        {/* Filters */}
        <FilterBar
          typeFilter={typeFilter}
          brandFilter={brandFilter}
          search={search}
          onTypeChange={setTypeFilter}
          onBrandChange={setBrandFilter}
          onSearchChange={setSearch}
          onClear={clearFilters}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {/* Results count */}
        <div className="mb-6 text-center">
          <p className="text-text-muted text-sm">
            {isArabic
              ? `${filtered.length} نتيجة`
              : `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg mb-4">
              {isArabic ? 'لا توجد نتائج' : 'No results found'}
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-all"
            >
              {isArabic ? 'إعادة تعيين الفلاتر' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <CatalogGrid bikes={filtered} />
        )}
      </div>
    </div>
  );
}
