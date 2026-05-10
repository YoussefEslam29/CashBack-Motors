# Cash Back Moto — Website Project Plan

---

## 1. Project Overview

A bilingual (Arabic / English) motorcycle & scooter showcase website for **Cash Back Moto**, an Egyptian shop selling gas and electric motorcycles and scooters. The primary goal is to display inventory and drive customer inquiries via WhatsApp and phone calls. E-commerce may be added in a future phase.

---

## 2. Brand Identity

| Property | Value |
|---|---|
| Primary color | Red `#CC0000` |
| Background | Near-black `#0A0A0A` |
| Accent | White `#FFFFFF` |
| Vibe | Dark, aggressive, fast — inspired by the logo |
| Logo | Red sport-bike silhouette on black |
| Font direction | LTR (English) + RTL (Arabic) |

---

## 3. Target Audience

- **Commuters** looking for affordable scooters (gas or electric)
- **Young riders (18–30)** interested in sport bikes and style
- **Businesses** needing delivery scooters in bulk

---

## 4. Pages & Structure

### 4.1 Home `/`
- Full-screen hero section with logo, tagline, and a strong CTA ("Browse Bikes" / "تصفح الدراجات")
- Quick category strip: Motorcycles | Scooters | Electric
- Featured / new arrivals (3–6 cards)
- "Why Cash Back Moto?" trust section (short, punchy)
- WhatsApp floating button (sticky, always visible)
- Social media links strip

### 4.2 Catalog `/catalog`
- Filter bar: Type (motorcycle / scooter) · Fuel (gas / electric) · Price range
- Product grid — each card shows: photo, name, price (or "Ask for price"), fuel type badge, WhatsApp inquiry button
- Individual product page `/catalog/[slug]` with image gallery, specs table, and a direct WhatsApp / call CTA

### 4.3 About `/about`
- Shop story and mission
- What they sell (gas + electric, new models)
- Location placeholder (map embed ready, address TBD)
- Contact info: phone, WhatsApp, all socials

### 4.4 Contact `/contact`
- Click-to-call button: `010 05804463`
- WhatsApp deep link: `+20 11 10782513`
- Social links: Facebook, Instagram, TikTok
- Location map embed (placeholder until address is confirmed)
- Simple inquiry form (name, phone, message) — sends via WhatsApp or email

---

## 5. Key Features

| Feature | Priority | Notes |
|---|---|---|
| Bilingual EN / AR | High | RTL layout flip for Arabic; `next-intl` or `next-i18next` |
| WhatsApp CTA (sticky) | High | Pre-filled message per product |
| Dark theme | High | Matches brand |
| Product catalog (manual) | High | Admin adds bikes via JSON/CMS |
| Filter & search | Medium | Client-side filtering to start |
| Image gallery per product | Medium | Mix of real + stock photos |
| Location map | Low | Placeholder until address confirmed |
| E-commerce / checkout | Future | Phase 2 |

---

## 6. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| i18n | `next-intl` |
| Images | `next/image` with optimization |
| Deployment | Vercel (recommended) |
| Product data | JSON files to start (easy to migrate to a CMS later) |

### CMS Decision (Pending)
- **If the client wants to manage inventory themselves** → add [Sanity.io](https://sanity.io) or [Payload CMS](https://payloadcms.com) (both have free tiers, Arabic-friendly)
- **If you manage updates** → keep it as JSON files in the repo, no CMS needed

---

## 7. Social & Contact Info

| Channel | Link / Info |
|---|---|
| Facebook | https://www.facebook.com/Cashbackmotoo |
| Instagram | https://www.instagram.com/cashbackmoto |
| TikTok | https://www.tiktok.com/@cashbackmoto |
| Phone | 010 05804463 |
| WhatsApp | +20 11 10782513 |
| Location | TBD |

---

## 8. WhatsApp Integration Strategy

Every product card and the contact page will have a WhatsApp CTA that pre-fills a message, e.g.:

```
مرحبا، أنا مهتم بـ [اسم الدراجة]. هل هي متاحة؟
Hello, I'm interested in the [Bike Name]. Is it available?
```

This is the main conversion mechanism until e-commerce is built.

---

## 9. Phases

### Phase 1 — MVP (Now)
- All 4 pages built and responsive
- Bilingual support (EN/AR)
- Manual product catalog via JSON
- WhatsApp & phone CTAs
- Dark theme matching logo
- Deployed on Vercel

### Phase 2 — Growth
- CMS admin panel for client self-management
- Location page once address is confirmed
- Instagram feed embed (pull latest posts automatically)
- SEO optimization (Arabic + English keywords)

### Phase 3 — E-commerce
- Online payment (Fawry / Paymob for Egypt)
- Order management
- Customer accounts

---

## 10. Brands & Inventory

Cash Back Moto carries **7 brands**, each with specific categories:

| Brand | Scooter | Motorcycle | Electric |
|---|---|---|---|
| ZONTOS | ✅ | ✅ | ❌ |
| SYM | ✅ | ❌ | ❌ |
| KEEWAY | ✅ | ✅ | ✅ |
| HOGAN | ✅ | ✅ | ❌ |
| DAYUN | ✅ | ❌ | ❌ |
| BENELLI | ❌ | ✅ | ❌ |
| VIGOREY | ✅ | ✅ | ✅ |

### Catalog Filters (derived from brands above)
- **Type:** Scooter · Motorcycle
- **Fuel:** Gas · Electric
- **Brand:** All 7 brands (dropdown or pill filter)

---

## 11. Pricing Strategy

Prices are **hidden** on the website. Every product shows a **"Ask for Price"** CTA instead, routing the customer to WhatsApp or a phone call. This keeps pricing flexible and drives direct contact.

---

## 12. Locations

The shop has **two branches**:

| Branch | Google Maps |
|---|---|
| Alexandria | https://maps.app.goo.gl/omChfM4oFsqhCepE7 |
| Cairo | https://maps.app.goo.gl/USLPyWr7Mjdbr9x1A |

Both locations will be embedded as Google Maps iframes on the Contact page and About page, side by side on desktop, stacked on mobile.

---

## 13. Open Questions

- [ ] Will the client manage their own inventory? → Determines whether to add a CMS
- [ ] Do they have a preferred domain name already?
