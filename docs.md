# CashBack Motors — Project Documentation

> Running changelog of all work done on the Cash Back Moto website.
> Each entry references the relevant plan/fix doc for deep details.

---

## Session Log

---

### 2026-05-11 — Hydration Mismatch Fix

**Plan:** `plan_fix_nextjs_error.md`
**Details:** `docs_fix_nextjs_error.md`

**Problem:** React 19 hydration error on every page, surfacing at `<Navbar />` in `layout.tsx`. Two simultaneous root causes:

1. **Dark Reader browser extension** injecting `data-darkreader-*` attributes and CSS custom property inline styles into the DOM before React hydrated. React 19 is stricter than React 18 and raises a visible error for this instead of silently patching it.
2. **`next/image` fill-mode style serialization mismatch** — in Next.js 16 + React 19, `<Image fill>` serializes `left`, `top`, `right`, `bottom` as numbers on the client but as `"0px"` strings on the server.

**Fixes applied:**

| File | Change |
|---|---|
| `src/app/[locale]/layout.tsx` | Added `suppressHydrationWarning` to `<html>` |
| `src/components/features/catalog/BikeCard.tsx` | Replaced `fill` with `width={560} height={420}` + `w-full h-full` classes |
| `src/components/features/home/FeaturedBikes.tsx` | Same fill → explicit dimensions fix |
| `src/components/catalog/ProductDetailClient.tsx` | `fill` → `width={800} height={600}` |
| `src/components/features/home/Hero.tsx` | Added `suppressHydrationWarning` to image wrapper div (fill kept for full-bleed) |
| `src/components/home/HeroSection.tsx` | Same as Hero.tsx (legacy component) |
| `src/components/home/FeaturedRides.tsx` | Same fill → explicit dimensions fix (legacy component) |

**`WhatsAppButton.tsx`** was confirmed to already have `'use client'` — no change needed.

---

## Architecture Overview

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.4 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| i18n | next-intl v4 (EN + AR, RTL support) |
| Icons | lucide-react |
| Images | next/image |

### Locale Routing

- Default locale: `en`
- Supported locales: `en`, `ar`
- All pages under `src/app/[locale]/`
- RTL direction set via `dir="rtl"` on `<html>` for `locale === 'ar'`
- Fonts: Barlow Condensed + DM Sans (EN) / Cairo (AR)

### Key Directories

```
src/app/[locale]/      → Pages
src/components/
  layout/              → Navbar, Footer, WhatsAppButton, LanguageSwitcher
  ui/                  → Button, Badge, SectionHeading
  features/catalog/    → BikeCard, FilterBar, CatalogGrid
  features/home/       → Hero, FeaturedBikes, BrandStrip
  features/contact/    → LocationMap, ContactInfo
src/data/              → bikes.ts, brands.ts
src/lib/               → constants.ts, whatsapp.ts, utils.ts
src/types/             → index.ts
messages/              → en.json, ar.json
```

### Contact Constants (from `lib/constants.ts`)

| Branch | Phone | WhatsApp number | Google Maps |
|---|---|---|---|
| Cairo | `01005804463` | `201005804463` | [Link](https://maps.app.goo.gl/USLPyWr7Mjdbr9x1A) |
| Alexandria | `+20 11 10782513` | `201110782513` | [Link](https://maps.app.goo.gl/nHStDGwekLnKUJAK7) |

### Brands Carried

ZONTOS · SYM · KEEWAY · HOGAN · DAYUN · BENELLI · VIGOREY

### Pricing Strategy

All prices are hidden. Every product shows **"Ask for Price"** with dual WhatsApp CTAs (one per branch — Cairo and Alexandria).

---

## Design System Summary

Full docs in `design-system/` directory.

| Token | Value |
|---|---|
| Background | `#0A0A0A` |
| Primary red | `#CC0000` |
| Text primary | `#FFFFFF` |
| Text secondary | `#A0A0A0` |
| Border | `#1F1F1F` |
| WhatsApp green | `#25D366` |
| Radius (cards) | `8px` |
| Radius (buttons) | `4px` |
| Radius (badges) | `2px` |
| CTA glow hover | `box-shadow: 0 0 24px rgba(204,0,0,0.4)` |

Fonts loaded via `next/font/google` — never via `<link>` tags.

---

## Rules Snapshot

- Never use `<img>` — always `next/image`
- Never hardcode UI strings — always `useTranslations()`
- Never inline hex values — use design token class names
- Never add `any` TypeScript type
- Default to Server Components — `'use client'` only when strictly needed
- All contact info sourced from `lib/constants.ts`
- All WhatsApp links built via `lib/whatsapp.ts`
- External links always have `rel="noopener noreferrer"`
