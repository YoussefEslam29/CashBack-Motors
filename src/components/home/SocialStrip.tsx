"use client";

import { useTranslations } from "next-intl";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

export default function SocialStrip() {
  const t = useTranslations("social");

  const socials = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/Cashbackmotoo",
      label: "Facebook",
      color: "hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:border-[#1877F2]/30",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/cashbackmoto",
      label: "Instagram",
      color: "hover:bg-[#E4405F]/10 hover:text-[#E4405F] hover:border-[#E4405F]/30",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@cashbackmoto",
      label: "TikTok",
      color: "hover:bg-[#00f2ea]/10 hover:text-[#00f2ea] hover:border-[#00f2ea]/30",
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="text-text-secondary text-sm max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex items-center justify-center gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`group flex items-center gap-3 px-6 py-3 rounded-xl bg-bg-card border border-border text-text-secondary transition-all duration-300 ${social.color}`}
            >
              <social.icon className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
