"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Bike, Zap, Gauge } from "lucide-react";

export default function CategoryStrip() {
  const t = useTranslations("categories");

  const categories = [
    {
      icon: Bike,
      label: t("motorcycles"),
      href: "/catalog?type=motorcycle",
      iconColor: "text-primary",
      borderColor: "group-hover:border-primary/50",
    },
    {
      icon: Gauge,
      label: t("scooters"),
      href: "/catalog?type=scooter",
      iconColor: "text-warning",
      borderColor: "group-hover:border-warning/50",
    },
    {
      icon: Zap,
      label: t("electric"),
      href: "/catalog?type=electric",
      iconColor: "text-success",
      borderColor: "group-hover:border-success/50",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.01] via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl md:text-5xl font-black mb-12 font-display uppercase tracking-wider">
          <span className="gradient-text">{t("title")}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="glass-card rounded-lg p-8 text-center group cursor-pointer hover:border-primary hover:shadow-glow-red transition-all duration-300"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-md bg-bg-elevated border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${cat.borderColor}`}
              >
                <cat.icon className={`w-8 h-8 ${cat.iconColor} transition-transform duration-300 group-hover:rotate-6`} />
              </div>
              <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-300 uppercase tracking-wide">
                {cat.label}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
