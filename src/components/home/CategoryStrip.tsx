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
      color: "from-red-500/20 to-red-900/20",
      iconColor: "text-red-400",
    },
    {
      icon: Gauge,
      label: t("scooters"),
      href: "/catalog?type=scooter",
      color: "from-orange-500/20 to-orange-900/20",
      iconColor: "text-orange-400",
    },
    {
      icon: Zap,
      label: t("electric"),
      href: "/catalog?type=electric",
      color: "from-green-500/20 to-green-900/20",
      iconColor: "text-green-400",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
          <span className="gradient-text">{t("title")}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="glass-card rounded-2xl p-8 text-center group cursor-pointer"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <cat.icon className={`w-10 h-10 ${cat.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-300">
                {cat.label}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
