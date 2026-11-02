import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/types';

// The about page is a client component, so its SEO metadata lives here.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = raw === 'ar' ? 'ar' : 'en';
  const t = await getTranslations({ locale, namespace: 'meta' });
  return pageMetadata({
    locale,
    path: '/about',
    title: t('aboutTitle'),
    description: t('aboutDescription'),
  });
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
