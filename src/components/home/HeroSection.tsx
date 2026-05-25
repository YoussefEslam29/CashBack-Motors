"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0" suppressHydrationWarning>
        <Image
          src="/hero-bg.jpg"
          alt="Cash Back Moto"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      {/* Animated red accent lines */}
      <div className="absolute top-1/4 left-0 w-40 h-px bg-gradient-to-r from-primary/50 to-transparent animate-slide-left" />
      <div className="absolute top-1/3 right-0 w-60 h-px bg-gradient-to-l from-primary/30 to-transparent animate-slide-right" />
      <div className="absolute bottom-1/3 left-0 w-32 h-px bg-gradient-to-r from-primary/40 to-transparent animate-slide-left animation-delay-400" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo text */}
        <div className="mb-6 animate-fade-in">
          <span className="text-sm md:text-base font-bold tracking-[0.4em] text-primary uppercase">
            Cash Back Moto
          </span>
        </div>

        {/* Main tagline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 animate-fade-in animation-delay-200">
          <span className="gradient-text">{t("tagline")}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-fade-in animation-delay-400 leading-relaxed">
          {t("subtitle")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animation-delay-600">
          <Link
            href="/catalog"
            className="group relative px-8 py-4 bg-primary hover:bg-primary-dark rounded-xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 animate-pulse-glow"
          >
            <span className="relative z-10">{t("cta")}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border border-zinc-700 hover:border-primary rounded-xl text-zinc-300 hover:text-zinc-50 font-medium text-lg transition-all duration-300 hover:bg-primary/5"
          >
            {t("ctaContact")}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <ChevronDown className="w-6 h-6 text-text-muted" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-dark to-transparent" />
    </section>
  );
}
