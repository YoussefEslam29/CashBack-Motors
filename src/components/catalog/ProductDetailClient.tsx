"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Product } from "@/data/products";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Phone,
  Zap,
  Fuel,
  Gauge,
  Calendar,
  Tag,
  Settings,
} from "lucide-react";

export default function ProductDetailClient({
  product,
}: {
  product: Product;
}) {
  const t = useTranslations("catalog");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const name = isRtl ? product.nameAr : product.name;
  const description = isRtl ? product.descriptionAr : product.description;

  const specs = [
    {
      icon: Settings,
      label: t("engine"),
      value: product.specs.engine,
    },
    {
      icon: Zap,
      label: t("power"),
      value: product.specs.power,
    },
    {
      icon: Gauge,
      label: t("topSpeed"),
      value: product.specs.topSpeed,
    },
    {
      icon: product.fuel === "electric" ? Zap : Fuel,
      label: t("fuelType"),
      value: product.fuel === "electric" ? t("fuelElectric") : t("fuelGas"),
    },
    {
      icon: Calendar,
      label: t("year"),
      value: product.specs.year.toString(),
    },
    {
      icon: Tag,
      label: t("category"),
      value:
        product.category === "motorcycle"
          ? t("filterMotorcycle")
          : t("filterScooter"),
    },
  ];

  const whatsappMsg = encodeURIComponent(
    isRtl
      ? `مرحبا، أنا مهتم بـ ${product.nameAr}. هل هي متاحة؟`
      : `Hello, I'm interested in the ${product.name}. Is it available?`
  );

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8 group"
        >
          {isRtl ? (
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          ) : (
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          )}
          {t("backToCatalog")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
            <Image
              src={product.images[0]}
              alt={name}
              fill
              className="object-cover"
              priority
            />
            {/* Fuel badge */}
            <div className="absolute top-4 right-4">
              <span
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold ${
                  product.fuel === "electric"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                }`}
              >
                {product.fuel === "electric" ? (
                  <Zap className="w-4 h-4" />
                ) : (
                  <Fuel className="w-4 h-4" />
                )}
                {product.fuel === "electric" ? t("fuelElectric") : t("fuelGas")}
              </span>
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              {name}
            </h1>

            {/* Price */}
            <p className="text-3xl font-black text-primary mb-6">
              {product.price
                ? `EGP ${product.price.toLocaleString()}`
                : t("askPrice")}
            </p>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-text-primary mb-3">
                {t("description")}
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {description}
              </p>
            </div>

            {/* Specs */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-text-primary mb-4">
                {t("specifications")}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="glass-card rounded-xl p-4 hover:transform-none"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <spec.icon className="w-4 h-4 text-primary" />
                      <span className="text-xs text-text-muted font-medium">
                        {spec.label}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-text-primary">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/201110782513?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-whatsapp hover:bg-whatsapp/90 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-whatsapp/20"
              >
                <MessageCircle className="w-5 h-5" />
                {t("inquire")}
              </a>
              <a
                href="tel:01005804463"
                className="flex items-center justify-center gap-3 px-6 py-4 border border-border hover:border-primary rounded-xl text-text-secondary hover:text-primary font-medium transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                010 05804463
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
