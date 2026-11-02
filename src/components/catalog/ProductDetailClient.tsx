'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowLeft, MessageCircle, Phone } from 'lucide-react';
import { bikeInquiryLink } from '@/lib/whatsapp';
import { LOCATIONS } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import SectionHeading from '@/components/ui/SectionHeading';
import BikeCard from '@/components/features/catalog/BikeCard';
import type { Bike, Locale, SpecKey } from '@/types';

interface ProductDetailClientProps {
  bike: Bike;
  related: Bike[];
}

const SPEC_ORDER: SpecKey[] = [
  'engine',
  'power',
  'topSpeed',
  'transmission',
  'fuelTank',
  'battery',
  'range',
  'weight',
  'brakes',
];

export default function ProductDetailClient({ bike, related }: ProductDetailClientProps) {
  const t = useTranslations('catalog');
  const tSpecs = useTranslations('specs');
  const locale = useLocale() as Locale;
  const [activeImage, setActiveImage] = useState(0);

  const name = locale === 'ar' ? bike.name.ar : bike.name.en;
  const typeLabel = bike.type === 'scooter' ? t('typeScooter') : t('typeMotorcycle');
  const images = bike.images.length > 0 ? bike.images : ['/placeholder.jpg'];
  const specRows = SPEC_ORDER.filter((key) => bike.specs?.[key]);
  const description = bike.description?.[locale];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
          {t('backToCatalog')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border">
              <Image
                src={images[activeImage] ?? images[0]}
                alt={name}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute top-4 end-4 flex gap-2">
                <Badge variant="primary">{typeLabel}</Badge>
                {bike.fuel === 'electric' && <Badge variant="electric">{t('electric')}</Badge>}
              </div>
              <div className="absolute top-4 start-4">
                <Badge variant="primary">{bike.make}</Badge>
              </div>
            </div>

            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3" aria-label={t('gallery')}>
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveImage(i)}
                    aria-label={`${name} ${i + 1}`}
                    aria-pressed={i === activeImage}
                    className={`relative aspect-[4/3] rounded-md overflow-hidden border transition-colors ${
                      i === activeImage ? 'border-primary' : 'border-border hover:border-border-active'
                    }`}
                  >
                    <Image src={src} alt="" width={200} height={150} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-h1 font-black text-text-primary mb-2 font-display uppercase">
              {name}
            </h1>

            <p className="text-text-secondary text-lg mb-6">
              {bike.make} — {bike.model}
            </p>

            {/* Price is never shown — always ask (Phase 1 rule) */}
            <div className="mb-8 p-5 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-xl font-bold text-primary mb-2">{t('askPrice')}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{t('priceContact')}</p>
            </div>

            {/* CTAs — both branches */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={bikeInquiryLink(name, 'cairo', locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-bike={bike.slug}
                  className="flex-1 min-h-12 flex items-center justify-center gap-3 px-6 py-4 bg-whatsapp hover:bg-whatsapp/90 rounded-md text-white font-bold transition-all duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('cairoWhatsapp')}
                </a>
                <a
                  href={bikeInquiryLink(name, 'alexandria', locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-bike={bike.slug}
                  className="flex-1 min-h-12 flex items-center justify-center gap-3 px-6 py-4 bg-whatsapp hover:bg-whatsapp/90 rounded-md text-white font-bold transition-all duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('alexWhatsapp')}
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${LOCATIONS.cairo.phone}`}
                  data-bike={bike.slug}
                  className="flex-1 min-h-12 flex items-center justify-center gap-3 px-6 py-4 border border-zinc-700 hover:border-primary rounded-md text-text-secondary hover:text-primary font-medium transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  {t('callCairo')} — <span dir="ltr">{LOCATIONS.cairo.phone}</span>
                </a>
                <a
                  href={`tel:${LOCATIONS.alexandria.phone}`}
                  data-bike={bike.slug}
                  className="flex-1 min-h-12 flex items-center justify-center gap-3 px-6 py-4 border border-zinc-700 hover:border-primary rounded-md text-text-secondary hover:text-primary font-medium transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  {t('callAlex')} — <span dir="ltr">{LOCATIONS.alexandria.phone}</span>
                </a>
              </div>
            </div>

            {description && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-text-primary mb-3 font-display uppercase">
                  {t('description')}
                </h2>
                <p className="text-text-secondary leading-relaxed">{description}</p>
              </div>
            )}

            {specRows.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-text-primary mb-3 font-display uppercase">
                  {t('specifications')}
                </h2>
                <dl className="divide-y divide-border border border-border rounded-lg overflow-hidden">
                  {specRows.map((key) => (
                    <div key={key} className="flex justify-between gap-4 px-4 py-3 bg-bg-surface">
                      <dt className="text-text-secondary text-sm">{tSpecs(key)}</dt>
                      <dd className="text-text-primary text-sm font-medium" dir="ltr">
                        {bike.specs?.[key]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <SectionHeading title={t('related')} subtitle={t('relatedSubtitle')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <BikeCard key={item.id} bike={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
