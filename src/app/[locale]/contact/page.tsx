'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Users,
  Send,
  Navigation,
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { LOCATIONS, SOCIAL_LINKS } from '@/lib/constants';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Locale } from '@/types';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale() as Locale;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [selectedBranch, setSelectedBranch] = useState<'cairo' | 'alexandria'>('cairo');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Name: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`;
    const url = buildWhatsAppLink(selectedBranch, msg);
    window.open(url, '_blank');
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        {/* Contact Cards Grid — Both Branches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Cairo Branch */}
          <div className="bg-bg-surface border border-border rounded-lg p-8 hover:border-primary hover:shadow-glow-red transition-all duration-300 group">
            <h3 className="text-lg font-bold text-text-primary mb-4 font-display uppercase">
              {t('cairoBranch')}
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${LOCATIONS.cairo.phone}`}
                className="flex items-center gap-4 p-3 bg-bg-elevated rounded-lg border border-border hover:border-primary transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-text-muted">{t('callUs')}</p>
                  <p className="text-text-primary font-medium">{LOCATIONS.cairo.phone}</p>
                </div>
              </a>
              <a
                href={buildWhatsAppLink('cairo')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 bg-bg-elevated rounded-lg border border-border hover:border-whatsapp transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-whatsapp" />
                <div>
                  <p className="text-xs text-text-muted">{t('whatsapp')}</p>
                  <p className="text-text-primary font-medium">{LOCATIONS.cairo.phone}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Alexandria Branch */}
          <div className="bg-bg-surface border border-border rounded-lg p-8 hover:border-primary hover:shadow-glow-red transition-all duration-300 group">
            <h3 className="text-lg font-bold text-text-primary mb-4 font-display uppercase">
              {t('alexBranch')}
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${LOCATIONS.alexandria.phone}`}
                className="flex items-center gap-4 p-3 bg-bg-elevated rounded-lg border border-border hover:border-primary transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-text-muted">{t('callUs')}</p>
                  <p className="text-text-primary font-medium">{LOCATIONS.alexandria.phone}</p>
                </div>
              </a>
              <a
                href={buildWhatsAppLink('alexandria')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 bg-bg-elevated rounded-lg border border-border hover:border-whatsapp transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-whatsapp" />
                <div>
                  <p className="text-xs text-text-muted">{t('whatsapp')}</p>
                  <p className="text-text-primary font-medium">{LOCATIONS.alexandria.phone}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Visit Us */}
          <div className="bg-bg-surface border border-border rounded-lg p-8 hover:border-primary transition-all duration-300">
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-14 h-14 rounded-lg bg-bg-elevated border border-border flex items-center justify-center">
                <MapPin className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  {t('visitUs')}
                </h3>
                <p className="text-text-secondary text-sm mb-3">
                  {t('visitDesc')}
                </p>
                <p className="text-text-primary text-sm font-medium">
                  {t('twoBranches')}
                </p>
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div className="bg-bg-surface border border-border rounded-lg p-8 hover:border-primary transition-all duration-300">
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-14 h-14 rounded-lg bg-bg-elevated border border-border flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  {t('followUs')}
                </h3>
                <p className="text-text-secondary text-sm mb-3">
                  {t('followDesc')}
                </p>
                <div className="flex items-center gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-bg-dark border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-300"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form + Quick Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Form */}
          <div className="bg-bg-surface border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-2 font-display uppercase">
              {t('formTitle')}
            </h2>
            <p className="text-text-secondary text-sm mb-6">
              {t('formSubtitle')}
            </p>

            {/* Branch selector */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setSelectedBranch('cairo')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  selectedBranch === 'cairo'
                    ? 'bg-primary text-white'
                    : 'bg-bg-elevated border border-border text-text-secondary hover:border-primary'
                }`}
              >
                {t('branchCairo')}
              </button>
              <button
                onClick={() => setSelectedBranch('alexandria')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  selectedBranch === 'alexandria'
                    ? 'bg-primary text-white'
                    : 'bg-bg-elevated border border-border text-text-secondary hover:border-primary'
                }`}
              >
                {t('branchAlex')}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  {t('nameLabel')}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder={t('namePlaceholder')}
                  required
                  className="w-full px-4 py-3 bg-bg-base border border-border rounded-md text-text-primary placeholder-text-muted focus:border-primary focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  {t('phoneLabel')}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  placeholder={t('phonePlaceholder')}
                  required
                  className="w-full px-4 py-3 bg-bg-base border border-border rounded-md text-text-primary placeholder-text-muted focus:border-primary focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  {t('messageLabel')}
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder={t('messagePlaceholder')}
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-bg-base border border-border rounded-md text-text-primary placeholder-text-muted focus:border-primary focus:outline-none transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-whatsapp hover:bg-whatsapp/90 rounded-md text-white font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-whatsapp/20"
              >
                <Send className="w-5 h-5" />
                {t('send')}
              </button>
            </form>
          </div>

          {/* Quick Contact */}
          <div className="flex flex-col gap-8">
            <div className="bg-bg-surface border border-border rounded-lg p-8 flex-1 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-text-primary mb-4 font-display uppercase">
                {t('quickContact')}
              </h2>
              <p className="text-text-secondary mb-6">
                {t('quickContactDesc')}
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={buildWhatsAppLink('cairo')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-whatsapp hover:bg-whatsapp/90 rounded-md text-white font-bold transition-all duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('whatsapp')} — {t('branchCairo')}
                </a>
                <a
                  href={buildWhatsAppLink('alexandria')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-whatsapp hover:bg-whatsapp/90 rounded-md text-white font-bold transition-all duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('whatsapp')} — {t('branchAlex')}
                </a>
                <a
                  href={`tel:${LOCATIONS.cairo.phone}`}
                  className="flex items-center justify-center gap-3 px-6 py-4 border border-border hover:border-primary rounded-md text-text-secondary hover:text-primary font-bold transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  {t('callUs')} — {LOCATIONS.cairo.phone}
                </a>
                <a
                  href={`tel:${LOCATIONS.alexandria.phone}`}
                  className="flex items-center justify-center gap-3 px-6 py-4 border border-border hover:border-primary rounded-md text-text-secondary hover:text-primary font-bold transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  {t('callUs')} — {LOCATIONS.alexandria.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Maps Section */}
        <div>
          <SectionHeading title={t('mapTitle')} />
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
                      className="flex items-center min-h-12 gap-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-all duration-300"
                    >
                      <Navigation className="w-4 h-4" />
                      {t('getDirections')}
                    </a>
                  </div>
                </div>
                <div className="h-72">
                  <iframe
                    src={branch.location.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '0 0 8px 8px', filter: 'invert(90%) hue-rotate(180deg)' }}
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
      </div>
    </div>
  );
}
