'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight, MessageCircle, Zap, Fuel } from 'lucide-react';
import { bikes } from '@/data/bikes';
import { bikeInquiryLink } from '@/lib/whatsapp';
import { getFeaturedBikes } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Locale } from '@/types';

export default function FeaturedBikes() {
  const t = useTranslations('featured');
  const locale = useLocale() as Locale;
  const featured = getFeaturedBikes(bikes);

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((bike) => {
            const name = locale === 'ar' ? bike.nameAr : bike.name;
            const engineSpec = bike.specs.find(
              (s) => s.labelEn === 'Engine' || s.labelEn === 'Motor'
            );
            const speedSpec = bike.specs.find(
              (s) => s.labelEn === 'Top Speed'
            );

            return (
              <div
                key={bike.id}
                className="bg-bg-surface border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-[0_0_24px_rgba(204,0,0,0.2)] transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-bg-elevated">
                  <Image
                    src={bike.images[0]}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent" />

                  {/* Fuel badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant={bike.isElectric ? 'electric' : 'gas'}>
                      {bike.isElectric ? (
                        <Zap className="w-3 h-3" />
                      ) : (
                        <Fuel className="w-3 h-3" />
                      )}
                      {bike.isElectric ? 'Electric' : 'Gas'}
                    </Badge>
                  </div>

                  {/* Brand badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary">{bike.brand}</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {name}
                  </h3>

                  {/* Ask for Price */}
                  <p className="text-2xl font-black text-primary mb-4">
                    {t('askPrice')}
                  </p>

                  {/* Quick Specs */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {engineSpec && (
                      <span className="px-2 py-1 bg-bg-elevated rounded-sm text-xs text-text-secondary">
                        {engineSpec.value}
                      </span>
                    )}
                    {speedSpec && (
                      <span className="px-2 py-1 bg-bg-elevated rounded-sm text-xs text-text-secondary">
                        {speedSpec.value}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/catalog/${bike.slug}`}
                      className="flex-1 py-2.5 text-center text-sm font-medium border border-border rounded-md hover:border-primary hover:text-primary transition-all duration-300"
                    >
                      {t('specs')}
                    </Link>
                    <a
                      href={bikeInquiryLink(name, 'cairo', locale)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 text-center text-sm font-medium bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-md hover:bg-[#25D366]/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {t('inquire')}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary rounded-md font-medium hover:bg-primary hover:text-white transition-all duration-300 group"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
