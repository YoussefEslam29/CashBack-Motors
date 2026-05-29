"use client";

import { useTranslations } from "next-intl";
import { DollarSign, ShieldCheck, Headphones, LayoutGrid } from "lucide-react";

export default function WhyUs() {
  const t = useTranslations("whyUs");

  const reasons = [
    {
      icon: DollarSign,
      title: t("price.title"),
      desc: t("price.desc"),
      iconColor: "text-amber-500",
      borderColor: "group-hover:border-amber-500/40",
    },
    {
      icon: ShieldCheck,
      title: t("quality.title"),
      desc: t("quality.desc"),
      iconColor: "text-blue-500",
      borderColor: "group-hover:border-blue-500/40",
    },
    {
      icon: Headphones,
      title: t("support.title"),
      desc: t("support.desc"),
      iconColor: "text-purple-500",
      borderColor: "group-hover:border-purple-500/40",
    },
    {
      icon: LayoutGrid,
      title: t("variety.title"),
      desc: t("variety.desc"),
      iconColor: "text-primary",
      borderColor: "group-hover:border-primary/40",
    },
  ];

  return (
    <section className="py-20 relative noise-bg">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.01] via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 font-display uppercase tracking-wider">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="red-line mx-auto mt-6 shadow-[0_0_8px_var(--color-primary)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="glass-card rounded-lg p-8 flex items-start gap-6 group hover:border-primary hover:shadow-glow-red transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`shrink-0 w-16 h-16 rounded-md bg-bg-elevated border border-border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${reason.borderColor}`}
              >
                <reason.icon className={`w-8 h-8 ${reason.iconColor}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2 uppercase tracking-wide">
                  {reason.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
