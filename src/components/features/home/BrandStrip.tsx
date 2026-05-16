'use client';

import { useTranslations } from 'next-intl';
import { BRANDS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';

export default function BrandStrip() {
  const t = useTranslations('brands');

  // Double the brands array so the marquee loop appears seamless
  const marqueeBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />
      </div>

      {/* Marquee Wrapper */}
      <div className="relative flex w-full overflow-hidden bg-zinc-950/80 backdrop-blur-md py-10 border-y border-zinc-900">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-zinc-950 to-transparent md:w-32" />

        <motion.div
          className="flex whitespace-nowrap gap-8"
          animate={{ x: [0, -1035] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {marqueeBrands.map((brand, idx) => (
            <div
              key={`${brand}-${idx}`}
              className="flex-shrink-0 w-48 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-lg p-6 text-center hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300 mx-4 shadow-lg shadow-black/50"
            >
              <p className="text-xl font-bold text-primary uppercase tracking-wider">
                {brand}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-zinc-950 to-transparent md:w-32" />
      </div>
    </section>
  );
}
