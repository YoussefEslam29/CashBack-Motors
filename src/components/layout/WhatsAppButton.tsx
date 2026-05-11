'use client';

import { useTranslations, useLocale } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { generalInquiryLink } from '@/lib/whatsapp';
import type { Locale } from '@/types';

export default function WhatsAppButton() {
  const t = useTranslations('cta');
  const locale = useLocale() as Locale;

  return (
    <div className="fixed bottom-6 right-6 z-[500] flex flex-col items-end gap-2">
      {/* Cairo button */}
      <a
        href={generalInquiryLink('cairo', locale)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp - ${t('cairo')}`}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_32px_rgba(37,211,102,0.6)] hover:scale-105 transition-all duration-200"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">{t('cairo')}</span>
      </a>
      {/* Alexandria button */}
      <a
        href={generalInquiryLink('alexandria', locale)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp - ${t('alexandria')}`}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_32px_rgba(37,211,102,0.6)] hover:scale-105 transition-all duration-200"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">{t('alexandria')}</span>
      </a>
    </div>
  );
}
