# docs-text-fix.md — Text & Icon Visibility Fix

**Date:** 2026-05-25
**Plan:** `plan-text-fix.md`
**Status:** ✅ Complete

---

## Problem Summary

Across the entire site, text elements and SVG icons were rendering as **dark grey / black** against the **near-black background**, making them invisible. This affected the Navbar logo, Hero heading, Brand strip labels, Featured Models cards (hover state), View All buttons, Footer icons, About page icons/numbers, and more.

---

## Root Cause

**The shadcn CSS variables in `:root` were set to light-mode defaults** (white background, near-black foreground). The `@layer base` block applied `text-foreground` to `<body>`, which cascaded down and caused all elements without explicit text colour to inherit near-black (`oklch(0.145 0 0)`) text on a dark background.

Additionally, the `.gradient-text` utility used a **red-to-red** gradient (`#CC0000` → `#FF4444` → primary-light), which was barely visible on the dark background — it needed to start from white.

---

## Fixes Applied

### 1. `src/app/globals.css` — Root Cause Fix (CRITICAL)

| Change | Detail |
|---|---|
| `:root` shadcn variables | Replaced all light-mode defaults with dark-mode values matching `.dark` class — `--foreground: oklch(0.985 0 0)` (near-white), `--background: oklch(0.145 0 0)` (near-black), etc. |
| `.gradient-text` class | Changed gradient from `#CC0000 → #FF4444 → primary-light` to `#fafafa → #CC0000 → primary-light` — white-to-red gradient for clear legibility |

### 2. `src/components/features/home/Hero.tsx`

| Change | Detail |
|---|---|
| Main tagline `<h1>` | Removed `text-primary` (solid red), added `gradient-text` class for white-to-red gradient text |

### 3. `src/components/features/home/FeaturedBikes.tsx`

| Change | Detail |
|---|---|
| Card `<h3>` (bike name) | Changed from `text-primary` to `text-zinc-50` — white by default, red on hover |
| "Details" `<Link>` | Added explicit `text-zinc-300` and `border-zinc-700` — visible on dark card |

### 4. `src/components/features/catalog/BikeCard.tsx`

| Change | Detail |
|---|---|
| "View Details" `<Link>` | Added `text-zinc-300` and `border-zinc-700` for visibility |

### 5. `src/components/home/FeaturedRides.tsx` (legacy)

| Change | Detail |
|---|---|
| Card `<h3>` | Changed `text-text-primary` → `text-zinc-50` — explicit white |
| "View Specs" `<Link>` | Added `text-zinc-300` and `border-zinc-700` |

### 6. `src/components/home/BrandsStrip.tsx` (legacy)

| Change | Detail |
|---|---|
| Brand name `<p>` | Changed `text-text-secondary` → `text-zinc-50` — white text, red on hover |

### 7. `src/components/home/HeroSection.tsx` (legacy)

| Change | Detail |
|---|---|
| Contact CTA `<Link>` | Changed `border-border text-text-secondary` → `border-zinc-700 text-zinc-300` |

### 8. `src/components/home/CTASection.tsx`

| Change | Detail |
|---|---|
| Cairo call `<a>` | `text-text-secondary border-border` → `text-zinc-300 border-zinc-700` |
| Alexandria call `<a>` | Same fix |

### 9. `src/components/catalog/ProductDetailClient.tsx`

| Change | Detail |
|---|---|
| Cairo call `<a>` | `text-text-secondary border-border` → `text-zinc-300 border-zinc-700` |
| Alexandria call `<a>` | Same fix |

### 10. `src/app/[locale]/contact/page.tsx`

| Change | Detail |
|---|---|
| Quick Contact — Cairo call `<a>` | `text-text-secondary border-border` → `text-zinc-300 border-zinc-700` |
| Quick Contact — Alexandria call `<a>` | Same fix |

---

## What Was NOT Changed

- ✅ Overall dark theme preserved (`bg-zinc-950`, glassmorphism)
- ✅ Red accent colour usage unchanged — no new red added
- ✅ Component structure / JSX hierarchy unchanged
- ✅ Translation keys untouched
- ✅ Logic, data fetching, TypeScript types untouched
- ✅ Navbar component — already had correct `text-text-primary` and `text-primary` classes
- ✅ Footer component — already had correct icon colours (`text-primary`, `text-whatsapp`)
- ✅ About page — already had correct icon colours (`text-primary`) and number styling
- ✅ Contact page icons — already had correct colours (`text-primary`, `text-[#25D366]`, `text-yellow-400`, `text-purple-400`)

---

## Verification

- All pages return HTTP 200 (Home, Catalog, About, Contact)
- Dev server compiles without errors
- Text elements now use explicit white/light colours that contrast against dark backgrounds
- Interactive elements (buttons, links) have visible borders and text in default state
- Hover states transition correctly (to red/white as appropriate)
