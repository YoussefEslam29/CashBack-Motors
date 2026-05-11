import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/features/home/Hero';
import FeaturedBikes from '@/components/features/home/FeaturedBikes';
import BrandStrip from '@/components/features/home/BrandStrip';
import CategoryStrip from '@/components/home/CategoryStrip';
import WhyUs from '@/components/home/WhyUs';
import SocialStrip from '@/components/home/SocialStrip';
import CTASection from '@/components/home/CTASection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <CategoryStrip />
      <BrandStrip />
      <FeaturedBikes />
      <WhyUs />
      <SocialStrip />
      <CTASection />
    </>
  );
}
