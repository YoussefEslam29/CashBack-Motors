'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const t = useTranslations('hero');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 50, damping: 15 }
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        suppressHydrationWarning
      >
        <Image
          src="/hero-bg.jpg"
          alt="Cash Back Moto"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="hero-gradient absolute inset-0" />
      </motion.div>

      {/* Animated red accent lines */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/4 left-0 w-40 h-px bg-gradient-to-r from-primary/50 to-transparent origin-left" 
      />
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-1/3 right-0 w-60 h-px bg-gradient-to-l from-primary/30 to-transparent origin-right" 
      />
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-1/3 left-0 w-32 h-px bg-gradient-to-r from-primary/40 to-transparent origin-left" 
      />

      {/* Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Logo text */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-sm font-bold tracking-[0.4em] text-primary uppercase">
            Cash Back Moto
          </span>
        </motion.div>

        {/* Main tagline */}
        <motion.h1 variants={itemVariants} className="text-hero font-black mb-6 font-display uppercase text-primary">
          <span>{t('tagline')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/catalog"
            className="group relative px-8 py-4 bg-[#CC0000] hover:bg-red-700 rounded-md text-zinc-50 font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">{t('cta')}</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 hover:border-zinc-600 rounded-md text-zinc-300 hover:text-zinc-50 font-medium text-lg transition-all duration-300 shadow-lg shadow-black/20"
          >
            {t('ctaContact')}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
      >
        <ChevronDown className="w-6 h-6 text-text-muted" />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-dark to-transparent pointer-events-none" />
    </section>
  );
}
