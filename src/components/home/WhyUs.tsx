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
      gradient: "from-yellow-500/20 to-yellow-900/20",
      iconColor: "text-yellow-400",
    },
    {
      icon: ShieldCheck,
      title: t("quality.title"),
      desc: t("quality.desc"),
      gradient: "from-blue-500/20 to-blue-900/20",
      iconColor: "text-blue-400",
    },
    {
      icon: Headphones,
      title: t("support.title"),
      desc: t("support.desc"),
      gradient: "from-purple-500/20 to-purple-900/20",
      iconColor: "text-purple-400",
    },
    {
      icon: LayoutGrid,
      title: t("variety.title"),
      desc: t("variety.desc"),
      gradient: "from-red-500/20 to-red-900/20",
      iconColor: "text-red-400",
    },
  ];

  return (
    <section className="py-20 relative noise-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="glass-card rounded-2xl p-8 flex items-start gap-6"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center`}
              >
                <reason.icon className={`w-8 h-8 ${reason.iconColor}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {reason.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
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
