import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import CategoryStrip from "@/components/home/CategoryStrip";
import BrandsStrip from "@/components/home/BrandsStrip";
import FeaturedRides from "@/components/home/FeaturedRides";
import WhyUs from "@/components/home/WhyUs";
import SocialStrip from "@/components/home/SocialStrip";
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
      <BrandsStrip />
      <FeaturedRides />
      <WhyUs />
      <SocialStrip />
      <CTASection />
    </>
  );
}
