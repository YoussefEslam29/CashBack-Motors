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
  Navigation,
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

  const branches = [
    {
      name: t("branchAlex"),
      mapsLink: "https://maps.app.goo.gl/omChfM4oFsqhCepE7",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.123!2d29.9!3d31.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDEyJzAwLjAiTiAyOcKwNTQnMDAuMCJF!5e0!3m2!1sen!2seg!4v1",
    },
    {
      name: t("branchCairo"),
      mapsLink: "https://maps.app.goo.gl/USLPyWr7Mjdbr9x1A",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.123!2d31.2!3d30.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAwJzAwLjAiTiAzMcKwMTInMDAuMCJF!5e0!3m2!1sen!2seg!4v1",
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

        {/* Brands Section */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-text-primary mb-10">
            <span className="gradient-text">{t("brandsTitle")}</span>
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {["ZONTOS", "SYM", "KEEWAY", "HOGAN", "DAYUN", "BENELLI", "VIGOREY"].map(
              (brand) => (
                <div
                  key={brand}
                  className="glass-card rounded-xl p-4 text-center hover:transform-none"
                >
                  <p className="text-sm font-bold text-primary">{brand}</p>
                </div>
              )
            )}
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

        {/* Locations — Two Branches */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                {t("locationTitle")}
              </h2>
            </div>
            <p className="text-text-secondary">{t("locationDesc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {branches.map((branch) => (
              <div
                key={branch.name}
                className="glass-card rounded-2xl overflow-hidden hover:transform-none"
              >
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-text-primary">
                        {branch.name}
                      </h3>
                    </div>
                    <a
                      href={branch.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all duration-300"
                    >
                      <Navigation className="w-4 h-4" />
                      {t("getDirections")}
                    </a>
                  </div>
                </div>
                <div className="h-64">
                  <iframe
                    src={branch.embedUrl}
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
  );
}
