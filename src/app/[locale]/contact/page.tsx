"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Users,
  Send,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

export default function ContactPage() {
  const t = useTranslations("contact");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const contactCards = [
    {
      icon: Phone,
      title: t("callUs"),
      desc: t("callDesc"),
      action: "tel:01005804463",
      value: "010 05804463",
      color: "text-primary",
      borderColor: "hover:border-primary",
    },
    {
      icon: MessageCircle,
      title: t("whatsapp"),
      desc: t("whatsappDesc"),
      action: "https://wa.me/201110782513",
      value: "+20 11 10782513",
      color: "text-whatsapp",
      borderColor: "hover:border-whatsapp",
      external: true,
    },
    {
      icon: MapPin,
      title: t("visitUs"),
      desc: t("visitDesc"),
      value: t("addressTBD"),
      color: "text-yellow-400",
      borderColor: "hover:border-yellow-400",
    },
    {
      icon: Users,
      title: t("followUs"),
      desc: t("followDesc"),
      color: "text-purple-400",
      borderColor: "hover:border-purple-400",
      socials: true,
    },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Name: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`;
    const url = `https://wa.me/201110782513?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

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

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className={`glass-card rounded-2xl p-8 ${card.borderColor} hover:transform-none`}
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center">
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary mb-1">
                    {card.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-3">
                    {card.desc}
                  </p>
                  {card.action ? (
                    <a
                      href={card.action}
                      target={card.external ? "_blank" : undefined}
                      rel={card.external ? "noopener noreferrer" : undefined}
                      className={`text-lg font-bold ${card.color} hover:underline`}
                    >
                      {card.value}
                    </a>
                  ) : card.socials ? (
                    <div className="flex items-center gap-3 mt-2">
                      {socials.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="w-10 h-10 rounded-full bg-bg-dark border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-300"
                        >
                          <social.icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-text-muted text-sm">{card.value}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="glass-card rounded-2xl p-8 hover:transform-none">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {t("formTitle")}
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              {t("formSubtitle")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  {t("nameLabel")}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder={t("namePlaceholder")}
                  required
                  className="w-full px-4 py-3 bg-bg-dark border border-border rounded-xl text-text-primary placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  {t("phoneLabel")}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  placeholder={t("phonePlaceholder")}
                  required
                  className="w-full px-4 py-3 bg-bg-dark border border-border rounded-xl text-text-primary placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  {t("messageLabel")}
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder={t("messagePlaceholder")}
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-bg-dark border border-border rounded-xl text-text-primary placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-whatsapp hover:bg-whatsapp/90 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-whatsapp/20"
              >
                <Send className="w-5 h-5" />
                {t("send")}
              </button>
            </form>
          </div>

          {/* Map placeholder */}
          <div className="glass-card rounded-2xl p-8 hover:transform-none flex flex-col">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {t("mapTitle")}
            </h2>
            <div className="flex-1 mt-4 bg-bg-elevated rounded-xl border border-border flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-text-muted mx-auto mb-4 animate-float" />
                <p className="text-text-muted text-lg font-medium">
                  {t("addressTBD")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
