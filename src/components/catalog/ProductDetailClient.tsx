'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Phone,
  Zap,
  Fuel,
} from 'lucide-react';
import { bikeInquiryLink } from '@/lib/whatsapp';
import { LOCATIONS } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import type { Bike, Locale } from '@/types';

interface ProductDetailClientProps {
  bike: Bike;
}

export default function ProductDetailClient({ bike }: ProductDetailClientProps) {
  const t = useTranslations('catalog');
  const locale = useLocale() as Locale;
  const isRtl = locale === 'ar';

  const name = isRtl ? bike.nameAr : bike.name;
  const description = isRtl ? bike.descriptionAr : bike.descriptionEn;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8 group"
        >
          {isRtl ? (
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          ) : (
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          )}
          {t('backToCatalog')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border">
            <Image
              src={bike.images[0]}
              alt={name}
              fill
              className="object-cover"
              priority
            />
            {/* Badges */}
            <div className="absolute top-4 right-4">
              <Badge variant={bike.isElectric ? 'electric' : 'gas'}>
                {bike.isElectric ? (
                  <Zap className="w-4 h-4" />
                ) : (
                  <Fuel className="w-4 h-4" />
                )}
                {bike.isElectric ? t('fuelElectric') : t('fuelGas')}
              </Badge>
            </div>
            <div className="absolute top-4 left-4">
              <Badge variant="primary">{bike.brand}</Badge>
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-4 font-display uppercase">
              {name}
            </h1>

            {/* Ask for Price CTA */}
            <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-2xl font-black text-primary mb-1">
                {t('askPrice')}
              </p>
              <p className="text-sm text-text-secondary">
                {t('priceContact')}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-text-primary mb-3">
                {t('description')}
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {description}
              </p>
            </div>

            {/* Specs */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-text-primary mb-4">
                {t('specifications')}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {bike.specs.map((spec) => (
                  <div
                    key={spec.labelEn}
                    className="bg-bg-surface border border-border rounded-lg p-4"
                  >
                    <span className="text-xs text-text-muted font-medium block mb-1">
                      {isRtl ? spec.labelAr : spec.labelEn}
                    </span>
                    <p className="text-sm font-bold text-text-primary">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs — Both Branches */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={bikeInquiryLink(name, 'cairo', locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] hover:bg-[#25D366]/90 rounded-md text-white font-bold transition-all duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('cairoWhatsapp')}
                </a>
                <a
                  href={bikeInquiryLink(name, 'alexandria', locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] hover:bg-[#25D366]/90 rounded-md text-white font-bold transition-all duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('alexWhatsapp')}
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${LOCATIONS.cairo.phone}`}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 border border-border hover:border-primary rounded-md text-text-secondary hover:text-primary font-medium transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  {t('callCairo')} — {LOCATIONS.cairo.phone}
                </a>
                <a
                  href={`tel:${LOCATIONS.alexandria.phone}`}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 border border-border hover:border-primary rounded-md text-text-secondary hover:text-primary font-medium transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  {t('callAlex')} — {LOCATIONS.alexandria.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
