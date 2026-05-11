'use client';

import { useTranslations, useLocale } from 'next-intl';
import {
  Bike,
  Zap,
  Truck,
  Wrench,
  MapPin,
  Phone,
  MessageCircle,
  Users,
  Award,
  Calendar,
  Package,
  Navigation,
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { BRANDS, LOCATIONS, SOCIAL_LINKS } from '@/lib/constants';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Locale } from '@/types';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale() as Locale;

  const offerings = [
    { icon: Bike, text: t('mission1') },
    { icon: Zap, text: t('mission2') },
    { icon: Truck, text: t('mission3') },
    { icon: Wrench, text: t('mission4') },
  ];

  const stats = [
    { icon: Package, value: '500+', label: t('statBikes') },
    { icon: Users, value: '400+', label: t('statCustomers') },
    { icon: Calendar, value: '3+', label: t('statYears') },
    { icon: Award, value: '30+', label: t('statModels') },
  ];

  const socials = [
    { icon: FaFacebookF, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
    { icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
    { icon: FaTiktok, href: SOCIAL_LINKS.tiktok, label: 'TikTok' },
  ];

  const branches = [
    {
      key: 'alexandria' as const,
      name: t('branchAlex'),
      location: LOCATIONS.alexandria,
    },
    {
      key: 'cairo' as const,
      name: t('branchCairo'),
      location: LOCATIONS.cairo,
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 font-display uppercase">
              {t('storyTitle')}
            </h2>
            <div className="red-line mb-6" />
            <p className="text-text-secondary leading-relaxed mb-4">
              {t('storyP1')}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {t('storyP2')}
            </p>
          </div>

          {/* What We Offer */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 font-display uppercase">
              {t('missionTitle')}
            </h2>
            <div className="red-line mb-6" />
            <div className="space-y-4">
              {offerings.map((item, index) => (
                <div
                  key={index}
                  className="bg-bg-surface border border-border rounded-lg p-5 flex items-center gap-4 hover:border-primary transition-all duration-300"
                >
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-text-primary font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brands Section */}
        <div className="mb-20">
          <SectionHeading title={t('brandsTitle')} />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {BRANDS.map((brand) => (
              <div
                key={brand}
                className="bg-bg-surface border border-border rounded-lg p-4 text-center hover:border-primary transition-all duration-300"
              >
                <p className="text-sm font-bold text-primary">{brand}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-20">
          <SectionHeading title={t('statsTitle')} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-bg-surface border border-border rounded-lg p-6 text-center hover:border-primary transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-black text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-text-secondary text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary font-display uppercase">
                {t('locationTitle')}
              </h2>
            </div>
            <p className="text-text-secondary">{t('locationDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {branches.map((branch) => (
              <div
                key={branch.key}
                className="bg-bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300"
              >
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-text-primary">
                        {branch.name}
                      </h3>
                    </div>
                    <a
                      href={branch.location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-all duration-300"
                    >
                      <Navigation className="w-4 h-4" />
                      {t('getDirections')}
                    </a>
                  </div>
                </div>
                <div className="h-64">
                  <iframe
                    src={branch.location.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={branch.name}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-bg-surface border border-border rounded-lg p-8">
          <h2 className="text-xl font-bold text-text-primary mb-4 font-display uppercase">
            {t('contactTitle')}
          </h2>
          <p className="text-text-secondary mb-6">{t('contactDesc')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Cairo */}
            <div className="space-y-3">
              <p className="text-xs text-text-muted uppercase tracking-wider font-bold">
                {t('branchCairo')}
              </p>
              <a
                href={`tel:${LOCATIONS.cairo.phone}`}
                className="flex items-center gap-3 p-3 bg-bg-elevated rounded-lg border border-border hover:border-primary transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-text-primary font-medium">
                  {LOCATIONS.cairo.phone}
                </span>
              </a>
              <a
                href={buildWhatsAppLink('cairo')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-bg-elevated rounded-lg border border-border hover:border-[#25D366] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span className="text-text-primary font-medium">
                  {LOCATIONS.cairo.phone}
                </span>
              </a>
            </div>
            {/* Alexandria */}
            <div className="space-y-3">
              <p className="text-xs text-text-muted uppercase tracking-wider font-bold">
                {t('branchAlex')}
              </p>
              <a
                href={`tel:${LOCATIONS.alexandria.phone}`}
                className="flex items-center gap-3 p-3 bg-bg-elevated rounded-lg border border-border hover:border-primary transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-text-primary font-medium">
                  {LOCATIONS.alexandria.phone}
                </span>
              </a>
              <a
                href={buildWhatsAppLink('alexandria')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-bg-elevated rounded-lg border border-border hover:border-[#25D366] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span className="text-text-primary font-medium">
                  {LOCATIONS.alexandria.phone}
                </span>
              </a>
            </div>
          </div>
          {/* Social */}
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-11 h-11 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
