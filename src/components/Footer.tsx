"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Bike, Phone, MessageCircle } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/Cashbackmotoo",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/cashbackmoto",
      label: "Instagram",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@cashbackmoto",
      label: "TikTok",
    },
  ];

  return (
    <footer className="relative bg-bg-dark border-t border-border">
      {/* Red gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Bike className="w-8 h-8 text-primary" />
              <div>
                <span className="text-lg font-extrabold text-text-primary">
                  CASH BACK
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase block -mt-1">
                  MOTO
                </span>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary mb-4">
              {t("quickLinks")}
            </h3>
            <div className="red-line mb-4" />
            <ul className="space-y-3">
              {[
                { href: "/", label: tNav("home") },
                { href: "/catalog", label: tNav("catalog") },
                { href: "/about", label: tNav("about") },
                { href: "/contact", label: tNav("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary mb-4">
              {t("contactInfo")}
            </h3>
            <div className="red-line mb-4" />
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:01005804463"
                  className="flex items-center gap-3 text-text-secondary text-sm hover:text-primary transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  010 05804463
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201110782513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-secondary text-sm hover:text-whatsapp transition-colors duration-300"
                >
                  <MessageCircle className="w-4 h-4 text-whatsapp" />
                  +20 11 10782513
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary mb-4">
              {t("followUs")}
            </h3>
            <div className="red-line mb-4" />
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            © {currentYear} Cash Back Moto. {t("rights")}
          </p>
          <p className="text-text-muted text-xs">
            Built with ❤️ in Egypt
          </p>
        </div>
      </div>
    </footer>
  );
}
