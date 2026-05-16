'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { bikes } from '@/data/bikes';
import { bikeInquiryLink } from '@/lib/whatsapp';
import { getFeaturedBikes } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import SectionHeading from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';
import type { Locale } from '@/types';

export default function FeaturedBikes() {
  const locale = useLocale() as Locale;
  const isArabic = locale === 'ar';
  const featured = getFeaturedBikes(bikes);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow={isArabic ? 'مختارات' : 'Our Selection'}
            title={isArabic ? 'موديلات مميزة' : 'Featured Models'}
            subtitle={isArabic ? 'اكتشف أبرز موتوسيكلات وسكوترات متاحة عندنا' : 'Discover the top motorcycles and scooters available at our showroom'}
          />
        </motion.div>

        {/* Product Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featured.map((bike) => {
            const name = isArabic ? bike.name.ar : bike.name.en;

            return (
              <motion.div
                variants={itemVariants}
                key={bike.id}
                className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-lg overflow-hidden hover:border-zinc-600 hover:shadow-lg hover:bg-zinc-800/50 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-bg-elevated">
                  <Image
                    src={bike.images[0] ?? '/images/placeholder.jpg'}
                    alt={name}
                    width={560}
                    height={420}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent" />

                  {/* Brand badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary">{bike.make}</Badge>
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="primary">
                      {bike.type === 'scooter' ? (isArabic ? 'سكوتر' : 'Scooter') : (isArabic ? 'موتوسيكل' : 'Motorcycle')}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-primary-hover transition-colors">
                    {name}
                  </h3>

                  {/* Contact for pricing */}
                  <p className="text-sm text-text-muted mb-5 leading-relaxed">
                    {isArabic
                      ? 'تواصل معنا لمعرفة السعر الحالي وتفاصيل التوافر.'
                      : 'Contact us for current pricing and availability.'}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/catalog/${bike.slug}`}
                      className="flex-1 py-2.5 text-center text-sm font-medium border border-border rounded-md hover:border-primary hover:text-primary transition-all duration-300"
                    >
                      {isArabic ? 'التفاصيل' : 'Details'}
                    </Link>
                    <a
                      href={bikeInquiryLink(name, 'cairo', locale)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 text-center text-sm font-medium bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-md hover:bg-[#25D366]/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {isArabic ? 'استفسار' : 'Inquire'}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary rounded-md font-medium hover:bg-primary hover:text-white transition-all duration-300 group"
          >
            {isArabic ? 'عرض الكل' : 'View All'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
