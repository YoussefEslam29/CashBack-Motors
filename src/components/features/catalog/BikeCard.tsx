'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { MessageCircle, Eye } from 'lucide-react';
import { bikeInquiryLink } from '@/lib/whatsapp';
import Badge from '@/components/ui/Badge';
import type { Bike, Locale } from '@/types';

interface BikeCardProps {
  bike: Bike;
}

export default function BikeCard({ bike }: BikeCardProps) {
  const locale = useLocale() as Locale;
  const isArabic = locale === 'ar';
  const name = isArabic ? bike.name.ar : bike.name.en;

  return (
    <div className="bg-bg-surface border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-[0_0_24px_rgba(204,0,0,0.2)] transition-all duration-300 group">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-elevated">
        <Image
          src={bike.images[0] ?? '/images/placeholder.jpg'}
          alt={name}
          width={560}
          height={420}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="primary">
            {bike.type === 'scooter' ? (isArabic ? 'سكوتر' : 'Scooter') : (isArabic ? 'موتوسيكل' : 'Motorcycle')}
          </Badge>
        </div>

        {/* Brand badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="primary">{bike.make}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-text-secondary text-sm uppercase tracking-widest mb-1">
          {bike.make}
        </p>
        <h3 className="text-white font-bold text-xl mb-2 leading-tight group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Contact for pricing */}
        <p className="text-sm text-text-muted mb-4 leading-relaxed">
          {isArabic
            ? 'تواصل معنا لمعرفة السعر الحالي وتفاصيل التوافر.'
            : 'Contact us for current pricing and availability.'}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Link
            href={`/catalog/${bike.slug}`}
            className="w-full py-2.5 text-center text-sm font-medium border border-border rounded-md hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {isArabic ? 'عرض التفاصيل' : 'View Details'}
          </Link>
          <div className="flex gap-2">
            <a
              href={bikeInquiryLink(name, 'cairo', locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-center text-xs font-medium bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-md hover:bg-[#25D366]/20 transition-all duration-300 flex items-center justify-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              {isArabic ? 'واتساب القاهرة' : 'Cairo WhatsApp'}
            </a>
            <a
              href={bikeInquiryLink(name, 'alexandria', locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-center text-xs font-medium bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-md hover:bg-[#25D366]/20 transition-all duration-300 flex items-center justify-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              {isArabic ? 'واتساب إسكندرية' : 'Alex WhatsApp'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
