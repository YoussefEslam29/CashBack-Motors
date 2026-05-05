"use client";

import { useTranslations } from "next-intl";
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
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

export default function AboutPage() {
  const t = useTranslations("about");

  const offerings = [
    { icon: Bike, text: t("mission1") },
    { icon: Zap, text: t("mission2") },
    { icon: Truck, text: t("mission3") },
    { icon: Wrench, text: t("mission4") },
  ];

  const stats = [
    { icon: Package, value: "500+", label: t("statBikes") },
    { icon: Users, value: "400+", label: t("statCustomers") },
    { icon: Calendar, value: "3+", label: t("statYears") },
    { icon: Award, value: "30+", label: t("statModels") },
  ];

  const socials = [
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
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">{t("title")}</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="red-line mx-auto mt-6" />
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t("storyTitle")}
            </h2>
            <div className="red-line mb-6" />
            <p className="text-text-secondary leading-relaxed mb-4">
              {t("storyP1")}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {t("storyP2")}
            </p>
          </div>

          {/* What We Offer */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t("missionTitle")}
            </h2>
            <div className="red-line mb-6" />
            <div className="space-y-4">
              {offerings.map((item, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl p-5 flex items-center gap-4 hover:transform-none"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-text-primary font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-text-primary mb-10">
            <span className="gradient-text">{t("statsTitle")}</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 text-center hover:transform-none"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
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

        {/* Location + Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Location */}
          <div className="glass-card rounded-2xl p-8 hover:transform-none">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-text-primary">
                {t("locationTitle")}
              </h2>
            </div>
            <p className="text-text-secondary mb-6">{t("locationDesc")}</p>
            <div className="bg-bg-elevated rounded-xl p-6 border border-border text-center">
              <MapPin className="w-10 h-10 text-text-muted mx-auto mb-3" />
              <p className="text-text-muted text-sm">{t("addressTBD")}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="glass-card rounded-2xl p-8 hover:transform-none">
            <h2 className="text-xl font-bold text-text-primary mb-4">
              {t("contactTitle")}
            </h2>
            <p className="text-text-secondary mb-6">{t("contactDesc")}</p>
            <div className="space-y-4">
              <a
                href="tel:01005804463"
                className="flex items-center gap-4 p-4 bg-bg-elevated rounded-xl border border-border hover:border-primary transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-text-primary font-medium">
                  010 05804463
                </span>
              </a>
              <a
                href="https://wa.me/201110782513"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-bg-elevated rounded-xl border border-border hover:border-whatsapp transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-whatsapp" />
                <span className="text-text-primary font-medium">
                  +20 11 10782513
                </span>
              </a>
              <div className="flex items-center gap-3 pt-4">
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
      </div>
    </div>
  );
}
