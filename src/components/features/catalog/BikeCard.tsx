'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { MessageCircle, Eye } from 'lucide-react';
import { bikeInquiryLink } from '@/lib/whatsapp';
import type { Bike, Locale } from '@/types';

interface BikeCardProps {
  bike: Bike;
}

export default function BikeCard({ bike }: BikeCardProps) {
  const t = useTranslations('catalog');
  const locale = useLocale() as Locale;
  const name = locale === 'ar' ? bike.name.ar : bike.name.en;
  const typeLabel = bike.type === 'scooter' ? t('typeScooter') : t('typeMotorcycle');
  const fuelLabel = bike.fuel === 'electric' ? t('fuelElectric') : t('fuelGas');

  return (
    <div className="h-full bg-bg-surface backdrop-blur-md border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-glow-red transition-all duration-300 group">
      {/* Image */}
      <Link href={`/catalog/${bike.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-bg-elevated">
        <Image
          src={bike.images[0] ?? '/placeholder.jpg'}
          alt={name}
          width={560}
          height={420}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-3 start-3 z-10 flex gap-2">
          <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
            {typeLabel}
          </span>
          {bike.fuel === 'electric' && (
            <span className="bg-success text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
              {t('electric')}
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <p className="text-text-secondary text-xs uppercase tracking-[0.2em] mb-1">{bike.make}</p>
        <h3 className="text-white font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-text-secondary text-sm mb-4">{typeLabel} · {fuelLabel}</p>

        {/* Actions — one WhatsApp per branch (never a single generic link) */}
        <div className="flex flex-col gap-2">
          <Link
            href={`/catalog/${bike.slug}`}
            className="w-full min-h-12 text-center text-sm font-medium text-text-secondary border border-zinc-700 rounded-md hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {t('viewDetails')}
          </Link>
          <div className="flex gap-2">
            <a
              href={bikeInquiryLink(name, 'cairo', locale)}
              target="_blank"
              rel="noopener noreferrer"
              data-bike={bike.slug}
              className="flex-1 min-h-12 text-center text-xs font-medium bg-success/10 text-success border border-success/20 rounded-md hover:bg-success/20 transition-all duration-300 flex items-center justify-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              {t('cairoWhatsapp')}
            </a>
            <a
              href={bikeInquiryLink(name, 'alexandria', locale)}
              target="_blank"
              rel="noopener noreferrer"
              data-bike={bike.slug}
              className="flex-1 min-h-12 text-center text-xs font-medium bg-success/10 text-success border border-success/20 rounded-md hover:bg-success/20 transition-all duration-300 flex items-center justify-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              {t('alexWhatsapp')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
