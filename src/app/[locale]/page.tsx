import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import CategoryStrip from "@/components/home/CategoryStrip";
import FeaturedRides from "@/components/home/FeaturedRides";
import WhyUs from "@/components/home/WhyUs";
import CTASection from "@/components/home/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <CategoryStrip />
      <FeaturedRides />
      <WhyUs />
      <CTASection />
    </>
  );
}
