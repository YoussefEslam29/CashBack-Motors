"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getFeaturedProducts } from "@/data/products";
import { ArrowRight, MessageCircle, Zap, Fuel } from "lucide-react";

export default function FeaturedRides() {
  const t = useTranslations("featured");
  const locale = useLocale();
  const featured = getFeaturedProducts();

  return (
    <section className="py-20 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="red-line mx-auto mt-6" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product, index) => (
            <div
              key={product.id}
              className="glass-card rounded-2xl overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={locale === "ar" ? product.nameAr : product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />

                {/* Fuel badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      product.fuel === "electric"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    }`}
                  >
                    {product.fuel === "electric" ? (
                      <Zap className="w-3 h-3" />
                    ) : (
                      <Fuel className="w-3 h-3" />
                    )}
                    {product.fuel === "electric" ? "Electric" : "Gas"}
                  </span>
                </div>

                {/* Brand badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30">
                    {product.brand}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                  {locale === "ar" ? product.nameAr : product.name}
                </h3>

                {/* Ask for Price */}
                <p className="text-2xl font-black text-primary mb-4">
                  {t("askPrice")}
                </p>

                {/* Quick Specs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2 py-1 bg-bg-elevated rounded-md text-xs text-text-secondary">
                    {product.specs.engine}
                  </span>
                  <span className="px-2 py-1 bg-bg-elevated rounded-md text-xs text-text-secondary">
                    {product.specs.topSpeed}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/catalog/${product.slug}`}
                    className="flex-1 py-2.5 text-center text-sm font-medium border border-border rounded-lg hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    {t("specs")}
                  </Link>
                  <a
                    href={`https://wa.me/201110782513?text=${encodeURIComponent(
                      locale === "ar"
                        ? `مرحبا، أنا مهتم بـ ${product.nameAr}. هل هي متاحة؟ وكم سعرها؟`
                        : `Hello, I'm interested in the ${product.name}. Is it available? What's the price?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 text-center text-sm font-medium bg-whatsapp/10 text-whatsapp border border-whatsapp/20 rounded-lg hover:bg-whatsapp/20 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t("inquire")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary rounded-xl font-medium hover:bg-primary hover:text-white transition-all duration-300 group"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
