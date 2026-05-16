'use client';

import { useTranslations, useLocale } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { generalInquiryLink } from '@/lib/whatsapp';
import type { Locale } from '@/types';

export default function WhatsAppButton() {
  const t = useTranslations('cta');
  const locale = useLocale() as Locale;

  return (
    <div className="fixed bottom-6 left-6 z-[500] flex flex-col items-start gap-2">
      {/* Cairo button */}
      <a
        href={generalInquiryLink('cairo', locale)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp - ${t('cairo')}`}
        className="group flex items-center p-3 rounded-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800 text-zinc-50 font-semibold text-sm shadow-lg hover:bg-zinc-800/60 hover:border-zinc-700 transition-all duration-300"
      >
        <MessageCircle className="w-5 h-5 text-[#25D366]" />
        <span className="max-w-0 opacity-0 overflow-hidden group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 whitespace-nowrap">
          {t('cairo')}
        </span>
      </a>
      {/* Alexandria button */}
      <a
        href={generalInquiryLink('alexandria', locale)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp - ${t('alexandria')}`}
        className="group flex items-center p-3 rounded-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800 text-zinc-50 font-semibold text-sm shadow-lg hover:bg-zinc-800/60 hover:border-zinc-700 transition-all duration-300"
      >
        <MessageCircle className="w-5 h-5 text-[#25D366]" />
        <span className="max-w-0 opacity-0 overflow-hidden group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 whitespace-nowrap">
          {t('alexandria')}
        </span>
      </a>
    </div>
  );
}
