"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useState, useMemo } from "react";
import { products } from "@/data/products";
import {
  Search,
  SlidersHorizontal,
  MessageCircle,
  Zap,
  Fuel,
  Eye,
  X,
} from "lucide-react";

type FilterType = "all" | "motorcycle" | "scooter";
type FuelFilter = "all" | "gas" | "electric";

export default function CatalogPage() {
  const t = useTranslations("catalog");
  const locale = useLocale();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [fuelFilter, setFuelFilter] = useState<FuelFilter>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameAr.includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      result = result.filter((p) => p.category === typeFilter);
    }

    // Fuel filter
    if (fuelFilter !== "all") {
      result = result.filter((p) => p.fuel === fuelFilter);
    }

    return result;
  }, [search, typeFilter, fuelFilter]);

  const typeButtons: { key: FilterType; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "motorcycle", label: t("filterMotorcycle") },
    { key: "scooter", label: t("filterScooter") },
  ];

  const fuelButtons: { key: FuelFilter; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "gas", label: t("fuelGas") },
    { key: "electric", label: t("fuelElectric") },
  ];

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setFuelFilter("all");
  };

  const hasActiveFilters = search || typeFilter !== "all" || fuelFilter !== "all";

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">{t("title")}</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="red-line mx-auto mt-6" />
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-12 pr-4 py-3 bg-bg-card border border-border rounded-xl text-text-primary placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle (mobile) */}
          <div className="flex justify-center md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg text-text-secondary hover:border-primary hover:text-primary transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filters */}
          <div
            className={`flex flex-col md:flex-row items-center justify-center gap-4 ${
              showFilters ? "block" : "hidden md:flex"
            }`}
          >
            {/* Type Filter */}
            <div className="flex items-center gap-2 bg-bg-card rounded-xl p-1 border border-border">
              {typeButtons.map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setTypeFilter(btn.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    typeFilter === btn.key
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Fuel Filter */}
            <div className="flex items-center gap-2 bg-bg-card rounded-xl p-1 border border-border">
              {fuelButtons.map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setFuelFilter(btn.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    fuelFilter === btn.key
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Clear */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:text-primary-light transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                {t("resetFilters")}
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg mb-4">
              {t("noResults")}
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
            >
              {t("resetFilters")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product, index) => (
              <div
                key={product.id}
                className="glass-card rounded-2xl overflow-hidden group"
                style={{ animationDelay: `${index * 0.05}s` }}
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
                      {product.fuel === "electric"
                        ? t("fuelElectric")
                        : t("fuelGas")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
                    {locale === "ar" ? product.nameAr : product.name}
                  </h3>
                  <p className="text-sm text-text-muted mb-3">
                    {product.specs.engine} · {product.specs.topSpeed}
                  </p>

                  {/* Price */}
                  <p className="text-2xl font-black text-primary mb-5">
                    {product.price
                      ? `EGP ${product.price.toLocaleString()}`
                      : t("askPrice")}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/catalog/${product.slug}`}
                      className="flex-1 py-2.5 text-center text-sm font-medium border border-border rounded-lg hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      {t("viewDetails")}
                    </Link>
                    <a
                      href={`https://wa.me/201110782513?text=${encodeURIComponent(
                        locale === "ar"
                          ? `مرحبا، أنا مهتم بـ ${product.nameAr}. هل هي متاحة؟`
                          : `Hello, I'm interested in the ${product.name}. Is it available?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 text-sm font-medium bg-whatsapp/10 text-whatsapp border border-whatsapp/20 rounded-lg hover:bg-whatsapp/20 transition-all duration-300 flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
