import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, DM_Sans, Cairo } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import AnalyticsScripts from '@/components/analytics/AnalyticsScripts';
import LeadTracker from '@/components/analytics/LeadTracker';
import { SITE_NAME, SITE_NAME_AR, SITE_URL } from '@/lib/constants';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import type { Locale } from '@/types';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-arabic',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = raw === 'ar' ? 'ar' : 'en';
  const t = await getTranslations({ locale, namespace: 'meta' });
  const siteName = locale === 'ar' ? SITE_NAME_AR : SITE_NAME;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t('siteTitle'), template: `%s | ${siteName}` },
    description: t('siteDescription'),
    keywords: [
      'motorcycles Egypt',
      'scooters Egypt',
      'motorcycle Cairo',
      'motorcycle Alexandria',
      'ZONTES',
      'KEEWAY',
      'HOGAN',
      'DAYUN',
      'VIGOREY',
      'Cash Back Moto',
      'موتوسيكلات',
      'سكوترات',
      'سعر موتوسيكل',
      'موتوسيكل القاهرة',
      'موتوسيكل الإسكندرية',
      'كاش باك موتو',
    ],
    openGraph: {
      type: 'website',
      siteName,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: siteName }],
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${barlowCondensed.variable} ${dmSans.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`antialiased ${isRTL ? 'font-arabic' : 'font-body'}`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <LeadTracker />
        </NextIntlClientProvider>
        <AnalyticsScripts />
        <Analytics />
      </body>
    </html>
  );
}
