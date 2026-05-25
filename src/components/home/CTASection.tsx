'use client';

import { useTranslations, useLocale } from 'next-intl';
import { MessageCircle, Phone } from 'lucide-react';
import { generalInquiryLink } from '@/lib/whatsapp';
import { LOCATIONS } from '@/lib/constants';
import type { Locale } from '@/types';

export default function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale() as Locale;

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-bg-dark to-bg-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-6 font-display uppercase">
          <span className="gradient-text">{t('title')}</span>
        </h2>
        <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>

        <div className="flex flex-col gap-4 max-w-lg mx-auto">
          {/* WhatsApp — Cairo */}
          <a
            href={generalInquiryLink('cairo', locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#25D366]/90 rounded-md text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-[#25D366]/20"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            {t('whatsapp')} — {t('cairo')}
          </a>
          {/* WhatsApp — Alexandria */}
          <a
            href={generalInquiryLink('alexandria', locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#25D366]/90 rounded-md text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-[#25D366]/20"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            {t('whatsapp')} — {t('alexandria')}
          </a>
          {/* Call — Cairo */}
          <a
            href={`tel:${LOCATIONS.cairo.phone}`}
            className="group flex items-center justify-center gap-3 px-8 py-4 border border-zinc-700 hover:border-primary rounded-md text-zinc-300 hover:text-zinc-50 font-medium text-lg transition-all duration-300"
          >
            <Phone className="w-5 h-5 group-hover:text-primary transition-colors" />
            {t('call')} — {LOCATIONS.cairo.phone}
          </a>
          {/* Call — Alexandria */}
          <a
            href={`tel:${LOCATIONS.alexandria.phone}`}
            className="group flex items-center justify-center gap-3 px-8 py-4 border border-zinc-700 hover:border-primary rounded-md text-zinc-300 hover:text-zinc-50 font-medium text-lg transition-all duration-300"
          >
            <Phone className="w-5 h-5 group-hover:text-primary transition-colors" />
            {t('call')} — {LOCATIONS.alexandria.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
