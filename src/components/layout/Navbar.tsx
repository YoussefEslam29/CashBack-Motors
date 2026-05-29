'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const t = useTranslations('nav');
  const tLang = useTranslations('languageSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/catalog' as const, label: t('catalog') },
    { href: '/about' as const, label: t('about') },
    { href: '/contact' as const, label: t('contact') },
  ];

  const switchLocale = locale === 'en' ? 'ar' : 'en';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
        ? 'bg-bg-base/90 backdrop-blur-md border-b border-border shadow-lg shadow-black/20'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpg"
              alt="Cash Back Moto"
              width={120}
              height={48}
              className="object-contain h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-1 md:gap-2 lg:gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${isActive
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-white'
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Language Switch + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link
              href={pathname}
              locale={switchLocale}
              className="px-3 py-1.5 text-xs font-bold border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300 text-text-secondary"
            >
              {tLang(switchLocale)}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden flex items-center justify-center size-touch text-text-secondary hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-bg-base/98 backdrop-blur-xl border-t border-border px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`min-h-12 flex items-center px-4 rounded-lg text-sm font-medium transition-all duration-300 ${isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-text-secondary hover:text-primary hover:bg-bg-elevated'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
