import type { Metadata } from 'next';
import { Barlow_Condensed, DM_Sans, Cairo } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ChatWidget from '@/components/features/chat/ChatWidget';

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

export const metadata: Metadata = {
  title: 'Cash Back Moto — Motorcycles & Scooters in Egypt',
  description:
    'Premium gas and electric motorcycles & scooters at unbeatable prices. Cash Back Moto — your trusted ride dealer in Egypt.',
  keywords: [
    'motorcycles',
    'scooters',
    'electric bikes',
    'Egypt',
    'Cash Back Moto',
    'دراجات نارية',
    'سكوترات',
    'مصر',
  ],
  openGraph: {
    title: 'Cash Back Moto',
    description: 'Premium motorcycles & scooters in Egypt',
    type: 'website',
  },
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
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
