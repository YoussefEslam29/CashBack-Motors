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
      transition: { type: 'spring' as const, stiffness: 50, damping: 15 }
    },
  };
  const speedLines = [
    { top: '15%', delay: 0, duration: 1.5, width: '150px', opacity: 0.15 },
    { top: '30%', delay: 0.6, duration: 1.0, width: '220px', opacity: 0.2 },
    { top: '55%', delay: 0.2, duration: 1.8, width: '100px', opacity: 0.1 },
    { top: '75%', delay: 0.9, duration: 1.2, width: '180px', opacity: 0.25 },
    { top: '90%', delay: 0.4, duration: 1.6, width: '120px', opacity: 0.15 },
  ];

  return (
    <section className="relative min-h-screen bg-bg-base overflow-hidden flex items-center justify-center pt-24 lg:pt-0">
      {/* Dynamic horizontal speed lines */}
      {speedLines.map((line, idx) => (
        <motion.div
          key={idx}
          className="absolute left-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none z-10"
          style={{ top: line.top, width: line.width, opacity: line.opacity }}
          animate={{ x: ['-100vw', '100vw'] }}
          transition={{
            repeat: Infinity,
            duration: line.duration,
            delay: line.delay,
            ease: "linear"
          }}
        />
      ))}

      {/* Dark overlay for grid feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(204,0,0,0.08),rgba(255,255,255,0))] z-10 pointer-events-none" />

      {/* Animated red accent lines */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/4 left-0 w-40 h-px bg-gradient-to-r from-primary/50 to-transparent origin-left z-20" 
      />
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-1/3 right-0 w-60 h-px bg-gradient-to-l from-primary/30 to-transparent origin-right z-20" 
      />
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-1/3 left-0 w-32 h-px bg-gradient-to-r from-primary/40 to-transparent origin-left z-20" 
      />

      {/* Content Grid — sits above all overlays */}
      <div className="relative z-20 px-4 max-w-7xl mx-auto w-full pt-12 md:pt-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left column: Text details */}
          <div className="lg:col-span-7 text-center lg:text-start flex flex-col items-center lg:items-start order-2 lg:order-1">
            {/* Logo text */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="text-sm font-bold tracking-[0.4em] text-primary uppercase">
                Cash Back Moto
              </span>
            </motion.div>

            {/* Main tagline */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black mb-6 font-display uppercase tracking-tight">
              <span className="gradient-text leading-tight">{t('tagline')}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="text-body-lg text-text-secondary max-w-2xl mb-10 leading-relaxed">
              {t('subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <Link
                href="/catalog"
                className="group relative px-8 py-4 bg-primary hover:bg-primary-hover rounded-md text-white font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden hover:shadow-glow-red-hover w-full sm:w-auto text-center"
              >
                <span className="relative z-10">{t('cta')}</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-bg-surface backdrop-blur-md border border-border hover:border-border-active rounded-md text-text-secondary hover:text-white font-medium text-lg transition-all duration-300 shadow-lg shadow-black/20 w-full sm:w-auto text-center"
              >
                {t('ctaContact')}
              </Link>
            </motion.div>
          </div>

          {/* Right column: Dynamic rotating motorcycle wheel */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center items-center pointer-events-none relative order-1 lg:order-2"
          >
            {/* Neon outer glow behind wheel */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
            
            <div className="w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px] relative">
              {/* 1. Spin segment (Tire, Rim, Spokes, Brake disc) */}
              <motion.svg
                className="w-full h-full text-zinc-800 drop-shadow-[0_0_20px_rgba(204,0,0,0.2)]"
                viewBox="0 0 100 100"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              >
                {/* Outer tyre */}
                <circle cx="50" cy="50" r="47" stroke="#1c1917" strokeWidth="4.5" fill="none" />
                {/* Outer tread segment lines */}
                <circle cx="50" cy="50" r="48" stroke="#12100e" strokeWidth="0.8" strokeDasharray="3,6" fill="none" />
                {/* Inner tire rim line */}
                <circle cx="50" cy="50" r="44.5" stroke="#2e2a24" strokeWidth="0.5" fill="none" />
                
                {/* Main steel rim */}
                <circle cx="50" cy="50" r="40" stroke="#3f3f46" strokeWidth="3" fill="none" />
                {/* Crimson red decorative ring inside rim */}
                <circle cx="50" cy="50" r="38" stroke="var(--color-primary)" strokeWidth="0.75" strokeDasharray="10, 4" fill="none" className="opacity-80" />

                {/* 5-Spoke high performance sports layout */}
                <g stroke="#27272a" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="50" y1="50" x2="50" y2="10" stroke="#52525b" />
                  <line x1="50" y1="50" x2="88" y2="38" stroke="#52525b" />
                  <line x1="50" y1="50" x2="74" y2="82" stroke="#52525b" />
                  <line x1="50" y1="50" x2="26" y2="82" stroke="#52525b" />
                  <line x1="50" y1="50" x2="12" y2="38" stroke="#52525b" />
                </g>

                {/* Ventilated Brake Disc */}
                <circle cx="50" cy="50" r="23" fill="none" stroke="#71717a" strokeWidth="2" />
                {/* Brake ventilation cooling slots */}
                <circle cx="50" cy="50" r="21" fill="none" stroke="#3f3f46" strokeWidth="0.75" strokeDasharray="1.5, 3" />
                <circle cx="50" cy="50" r="18" fill="none" stroke="#3f3f46" strokeWidth="0.75" strokeDasharray="2, 2" />

                {/* Hub and central bolt layout */}
                <circle cx="50" cy="50" r="9" fill="#18181b" stroke="#52525b" strokeWidth="1" />
                <circle cx="50" cy="50" r="5" fill="#27272a" />
                <circle cx="50" cy="50" r="2" fill="var(--color-accent-red)" />
              </motion.svg>

              {/* 2. Static segment (Attached to chassis/fork - DOES NOT ROTATE) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                {/* Sleek metallic shock absorber fork leg segment */}
                <line x1="50" y1="50" x2="28" y2="0" stroke="#71717a" strokeWidth="3" strokeLinecap="round" className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]" />
                <line x1="49" y1="48" x2="29" y2="0" stroke="#a1a1aa" strokeWidth="1" strokeLinecap="round" />

                {/* Brembo-style racing red brake calliper clamped on the disc */}
                <path
                  d="M 29,28 A 23,23 0 0,1 39,17 L 35,13 A 28,28 0 0,0 23,26 Z"
                  fill="var(--color-primary)"
                  className="drop-shadow-[0_0_12px_var(--color-primary)]"
                />
                {/* Calliper detailing bolts */}
                <circle cx="34" cy="20" r="0.75" fill="#fafafa" />
                <circle cx="28" cy="25" r="0.75" fill="#fafafa" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-20"
      >
        <ChevronDown className="w-6 h-6 text-text-secondary" />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-base to-transparent pointer-events-none z-20" />
    </section>
  );
}
