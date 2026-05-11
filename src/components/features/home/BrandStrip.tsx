'use client';

import { useTranslations } from 'next-intl';
import { BRANDS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';

export default function BrandStrip() {
  const t = useTranslations('brands');

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {BRANDS.map((brand) => (
            <div
              key={brand}
              className="bg-bg-surface border border-border rounded-lg p-4 text-center hover:border-primary hover:shadow-[0_0_24px_rgba(204,0,0,0.15)] transition-all duration-300"
            >
              <p className="text-sm font-bold text-primary uppercase tracking-wider">
                {brand}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
