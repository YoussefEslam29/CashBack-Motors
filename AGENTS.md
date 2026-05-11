# AGENTS.md — CashBack Moto

> Read this entire file before writing a single line of code. No exceptions.

---

## ⚠️ Stack Warning

This is **Next.js 16 + React 19 + Tailwind v4 + shadcn (radix-nova style)**. These are bleeding-edge versions with breaking changes from what your training data likely knows. Conventions, APIs, and file structure all differ. Before writing any code, read the relevant source in `node_modules/next/dist/docs/` and check `node_modules/next-intl/` for the v4 API.

---

## Project Context

This is the website for **Cash Back Moto**, an Egyptian motorcycle & scooter shop. The site is a **bilingual (EN/AR) product showcase + inquiry site**. No e-commerce yet — the conversion action is a WhatsApp or phone inquiry.

Read these files in full before doing anything:
- `CLAUDE.md` → full rules, architecture, and task list
- `developer-guide.md` → technical rules, patterns, what to avoid
- `design-system/01-colours.md` → colour tokens
- `design-system/02-typography.md` → fonts (Barlow Condensed EN, Cairo AR)
- `design-system/03-spacing-radius-shadow.md` → spacing, radius, shadows
- `design-system/04-components.md` → component reference implementations
- `design-system/05-tone-of-voice.md` → copy rules for EN and AR
- `idea.md` → full project plan, brand info, locations, social links

---

## Verified Stack Details

From `package.json` and `components.json`:

```
next: 16.2.4
react: 19.2.4
next-intl: ^4.11.0
tailwindcss: ^4
shadcn style: radix-nova
shadcn rsc: true
shadcn tsx: true
aliases: @/components, @/lib, @/components/ui, @/hooks
globals.css path: src/app/globals.css
i18n config: src/i18n/request.ts  ← already exists, do not recreate
```

The shadcn `rtl` flag in `components.json` is `false` — RTL is handled manually via `dir` attribute on `<html>`, not via shadcn.

---

## What Exists Already

```
src/
  i18n/request.ts        ✅ exists — do not touch
  app/globals.css        ✅ exists — extend, do not replace
messages/                ✅ folder exists — add en.json and ar.json
design-system/           ✅ full design docs committed
developer-guide.md       ✅ committed
idea.md                  ✅ committed
next.config.ts           ✅ next-intl wired correctly
components.json          ✅ shadcn configured
```

---

## What Does NOT Exist (Build These)

```
src/
  app/
    [locale]/
      layout.tsx          ← root layout with lang/dir/fonts
      page.tsx            ← Home page
      catalog/
        page.tsx          ← Catalog listing with filters
        [slug]/
          page.tsx        ← Individual bike page
      about/
        page.tsx
      contact/
        page.tsx
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      LanguageSwitcher.tsx
      WhatsAppButton.tsx  ← sticky floating button
    ui/
      Button.tsx
      Badge.tsx
      SectionHeading.tsx
    features/
      catalog/
        BikeCard.tsx
        FilterBar.tsx
        CatalogGrid.tsx
      home/
        Hero.tsx
        FeaturedBikes.tsx
        BrandStrip.tsx
      contact/
        LocationMap.tsx
        ContactInfo.tsx
  lib/
    constants.ts          ← all hardcoded values
    whatsapp.ts           ← WhatsApp link builder
    utils.ts              ← cn(), slugify()
  types/
    index.ts              ← all TypeScript types
  data/
    bikes.ts              ← product data array
    brands.ts             ← brand metadata

messages/
  en.json                 ← English translations
  ar.json                 ← Arabic translations

middleware.ts             ← locale detection + redirect
.env.example
```

---

## Build Order

Follow this exact sequence — later steps depend on earlier ones:

1. `src/types/index.ts`
2. `src/lib/constants.ts`
3. `src/lib/utils.ts`
4. `src/lib/whatsapp.ts`
5. `src/data/brands.ts`
6. `src/data/bikes.ts`
7. `messages/en.json` + `messages/ar.json`
8. `middleware.ts`
9. `src/app/[locale]/layout.tsx` (fonts here)
10. `src/components/layout/` (Navbar, Footer, WhatsAppButton, LanguageSwitcher)
11. `src/components/ui/` (Button, Badge, SectionHeading)
12. `src/components/features/` (BikeCard, FilterBar, Hero, etc.)
13. Pages: Home → Catalog → Catalog/[slug] → About → Contact
14. `.env.example`

---

## Hard Rules

- **Never** use raw hex values in Tailwind classes — use design system token class names
- **Never** hardcode UI strings — use `useTranslations()` from `next-intl`
- **Never** use `<img>` — always `next/image`
- **Never** add `any` TypeScript type
- **Default to Server Components** — only add `'use client'` when strictly needed
- **All contact info** (phone, WhatsApp, social links, map URLs) must come from `lib/constants.ts`
- **All WhatsApp links** must be built via `lib/whatsapp.ts`, never inline
- **Prices are hidden** — every bike shows "Ask for Price" / "اسأل عن السعر" with a WhatsApp CTA
- **No e-commerce** — no cart, no checkout, no payment UI in Phase 1

---

## Contact Info (use in constants.ts)

Each branch has its own phone number. Both numbers support calls AND WhatsApp.

```ts
SOCIAL_LINKS = {
  facebook:  'https://www.facebook.com/Cashbackmotoo',
  instagram: 'https://www.instagram.com/cashbackmoto',
  tiktok:    'https://www.tiktok.com/@cashbackmoto',
}

LOCATIONS = {
  cairo: {
    label: 'Cairo',
    labelAr: 'القاهرة',
    phone: '01005804463',           // display format
    whatsapp: '201005804463',       // wa.me format — no + sign
    mapUrl: 'https://maps.app.goo.gl/USLPyWr7Mjdbr9x1A',
  },
  alexandria: {
    label: 'Alexandria',
    labelAr: 'الإسكندرية',
    phone: '+20 11 10782513',       // display format
    whatsapp: '201110782513',       // wa.me format — no + sign
    mapUrl: 'https://maps.app.goo.gl/omChfM4oFsqhCepE7',
  },
}
```

**Important:** When building WhatsApp CTAs, always ask the user which branch they want to contact, OR show two buttons — one per branch. Never use a single generic WhatsApp link. The `bikeInquiryLink()` function in `lib/whatsapp.ts` must accept a `branch: 'cairo' | 'alexandria'` parameter and pick the correct number from `LOCATIONS`.
```

---

## Brands (7 total)

| Brand | Scooter | Motorcycle | Electric |
|---|---|---|---|
| ZONTOS | ✅ | ✅ | ❌ |
| SYM | ✅ | ❌ | ❌ |
| KEEWAY | ✅ | ✅ | ✅ |
| HOGAN | ✅ | ✅ | ❌ |
| DAYUN | ✅ | ❌ | ❌ |
| BENELLI | ❌ | ✅ | ❌ |
| VIGOREY | ✅ | ✅ | ✅ |

---

## i18n Rules

- Locales: `en` (default) and `ar`
- Arabic uses RTL: set `dir="rtl"` on `<html lang="ar">`
- Font family switches per locale: English → Barlow Condensed + DM Sans, Arabic → Cairo
- Never letter-space Arabic text (`letter-spacing: 0` always for AR)
- Use `next-intl` v4 API — check `node_modules/next-intl/` for correct imports, the v4 API differs from v3

---

## Visual Brand

- Background: `#0A0A0A` (near-black)
- Primary red: `#CC0000`
- Text: `#FFFFFF` primary, `#A0A0A0` secondary
- Radius: sharp — `2px` badges, `4px` buttons, `8px` cards
- No soft rounded corners except the WhatsApp floating button (pill shape)
- Glow effect on hover for primary CTAs: `box-shadow: 0 0 24px rgba(204,0,0,0.4)`
- Full design token reference: `design-system/01-colours.md` through `05-tone-of-voice.md`