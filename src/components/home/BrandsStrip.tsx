"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { brands } from "@/data/products";

export default function BrandsStrip() {
  const t = useTranslations("brands");

  return (
    <section className="py-16 relative noise-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="text-text-secondary text-sm max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {brands.map((brand, index) => (
            <Link
              key={brand}
              href={`/catalog?brand=${brand}`}
              className="group glass-card rounded-xl px-8 py-5 text-center hover:border-primary transition-all duration-300"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <p className="text-lg font-black text-text-secondary group-hover:text-primary transition-colors duration-300 tracking-wide">
                {brand}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
