"use client";

import { useTranslations } from "next-intl";
import { MessageCircle, Phone } from "lucide-react";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-bg-dark to-bg-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-6">
          <span className="gradient-text">{t("title")}</span>
        </h2>
        <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/201110782513"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-whatsapp hover:bg-whatsapp/90 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-whatsapp/20"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            {t("whatsapp")}
          </a>
          <a
            href="tel:01005804463"
            className="group flex items-center gap-3 px-8 py-4 border border-border hover:border-primary rounded-xl text-text-secondary hover:text-text-primary font-medium text-lg transition-all duration-300"
          >
            <Phone className="w-5 h-5 group-hover:text-primary transition-colors" />
            {t("call")}
          </a>
        </div>
      </div>
    </section>
  );
}
