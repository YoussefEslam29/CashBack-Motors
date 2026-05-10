"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Users,
  Send,
  Navigation,
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
      value: t("twoBranches"),
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

  const branches = [
    {
      name: t("branchAlex"),
      mapsLink: "https://maps.app.goo.gl/omChfM4oFsqhCepE7",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.123!2d29.9!3d31.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDEyJzAwLjAiTiAyOcKwNTQnMDAuMCJF!5e0!3m2!1sen!2seg!4v1",
    },
    {
      name: t("branchCairo"),
      mapsLink: "https://maps.app.goo.gl/USLPyWr7Mjdbr9x1A",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.123!2d31.2!3d30.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAwJzAwLjAiTiAzMcKwMTInMDAuMCJF!5e0!3m2!1sen!2seg!4v1",
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
                    <p className="text-text-primary text-sm font-medium">
                      {card.value}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form + Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
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

          {/* Quick CTA Card */}
          <div className="flex flex-col gap-8">
            <div className="glass-card rounded-2xl p-8 hover:transform-none flex-1 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                {t("quickContact")}
              </h2>
              <p className="text-text-secondary mb-6">
                {t("quickContactDesc")}
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/201110782513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-whatsapp hover:bg-whatsapp/90 rounded-xl text-white font-bold transition-all duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t("whatsapp")}
                </a>
                <a
                  href="tel:01005804463"
                  className="flex items-center justify-center gap-3 px-6 py-4 border border-border hover:border-primary rounded-xl text-text-secondary hover:text-primary font-bold transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  {t("callUs")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Maps Section — Two Branches */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-text-primary mb-10">
            <span className="gradient-text">{t("mapTitle")}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {branches.map((branch) => (
              <div
                key={branch.name}
                className="glass-card rounded-2xl overflow-hidden hover:transform-none"
              >
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-text-primary">
                        {branch.name}
                      </h3>
                    </div>
                    <a
                      href={branch.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all duration-300"
                    >
                      <Navigation className="w-4 h-4" />
                      {t("getDirections")}
                    </a>
                  </div>
                </div>
                <div className="h-72">
                  <iframe
                    src={branch.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={branch.name}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
