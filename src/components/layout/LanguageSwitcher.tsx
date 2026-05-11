'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('languageSwitcher');
  const switchLocale = locale === 'en' ? 'ar' : 'en';

  return (
    <Link
      href={pathname}
      locale={switchLocale}
      className="px-3 py-1.5 text-xs font-bold border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300 text-text-secondary"
    >
      {t(switchLocale)}
    </Link>
  );
}
