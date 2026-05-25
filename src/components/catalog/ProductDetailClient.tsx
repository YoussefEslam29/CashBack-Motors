'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { bikeInquiryLink } from '@/lib/whatsapp';
import { LOCATIONS } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import type { Bike, Locale } from '@/types';

interface ProductDetailClientProps {
  bike: Bike;
}

export default function ProductDetailClient({ bike }: ProductDetailClientProps) {
  const locale = useLocale() as Locale;
  const isRtl = locale === 'ar';

  const name = isRtl ? bike.name.ar : bike.name.en;

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
          {isRtl ? 'العودة للكتالوج' : 'Back to Catalog'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border">
            <Image
              src={bike.images[0] ?? '/images/placeholder.jpg'}
              alt={name}
              width={800}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
            {/* Type badge */}
            <div className="absolute top-4 right-4">
              <Badge variant="primary">
                {bike.type === 'scooter' ? (isRtl ? 'سكوتر' : 'Scooter') : (isRtl ? 'موتوسيكل' : 'Motorcycle')}
              </Badge>
            </div>
            <div className="absolute top-4 left-4">
              <Badge variant="primary">{bike.make}</Badge>
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-h1 font-black text-text-primary mb-2 font-display uppercase">
              {name}
            </h1>

            <p className="text-text-secondary text-lg mb-6">
              {bike.make} — {bike.model}
            </p>

            {/* Contact for Pricing CTA */}
            <div className="mb-8 p-5 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-xl font-bold text-primary mb-2">
                {isRtl ? 'اسأل عن السعر' : 'Ask for Price'}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {isRtl
                  ? 'تواصل معنا لمعرفة السعر الحالي وتفاصيل التوافر.'
                  : 'Contact us for current pricing and availability.'}
              </p>
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
                  {isRtl ? 'واتساب القاهرة' : 'Cairo WhatsApp'}
                </a>
                <a
                  href={bikeInquiryLink(name, 'alexandria', locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] hover:bg-[#25D366]/90 rounded-md text-white font-bold transition-all duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  {isRtl ? 'واتساب إسكندرية' : 'Alex WhatsApp'}
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${LOCATIONS.cairo.phone}`}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 border border-zinc-700 hover:border-primary rounded-md text-zinc-300 hover:text-primary font-medium transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  {isRtl ? 'اتصل بالقاهرة' : 'Call Cairo'} — {LOCATIONS.cairo.phone}
                </a>
                <a
                  href={`tel:${LOCATIONS.alexandria.phone}`}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 border border-zinc-700 hover:border-primary rounded-md text-zinc-300 hover:text-primary font-medium transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  {isRtl ? 'اتصل بالإسكندرية' : 'Call Alex'} — {LOCATIONS.alexandria.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
