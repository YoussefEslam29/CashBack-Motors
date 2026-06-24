# plan-full-site-audit.md — Cash Back Moto

> You are Claude Opus 4.6 working inside Antigravity on the CashBack-Motors repo.
> Read this entire file before touching any code.
> Then read: `AGENTS.md` → `developer-guide.md` → `design-system/01-colours.md` through `05-tone-of-voice.md` → `idea.md`
> Implement every fix in the order listed. Do not skip steps. Do not change anything not listed here.
> After all fixes, run `npm run build` and resolve every error before finishing.

---

## Live site audited
- https://cashback-motors.vercel.app/en
- https://cashback-motors.vercel.app/en/catalog
- https://cashback-motors.vercel.app/en/about
- https://cashback-motors.vercel.app/en/contact

---

## Fix order overview

| # | Category | Problem | Files affected |
|---|---|---|---|
| 1 | Critical | Hero text is black-on-dark — completely invisible | `Hero.tsx` |
| 2 | Critical | `hero-bg.jpg` missing from `/public` — hero is blank | `Hero.tsx`, `/public/` |
| 3 | Critical | Every bike shows `placeholder.jpg` — no real images | `BikeCard.tsx`, `/public/` |
| 4 | Critical | React hydration mismatch error on every page | `layout.tsx`, `BikeCard.tsx`, `WhatsAppButton.tsx` |
| 5 | Design | Dark theme not applied — background is not `#0A0A0A` | `globals.css`, `tailwind.config.ts` |
| 6 | Design | Wrong fonts — Barlow Condensed and Cairo not loading | `layout.tsx`, `globals.css` |
| 7 | Design | Bike cards look generic — no brand identity | `BikeCard.tsx` |
| 8 | Design | Navbar shows plain text logo — no image, no identity | `Navbar.tsx` |
| 9 | Design | About page has no visual hierarchy or styling | `about/page.tsx` |
| 10 | Design | Contact page has no map iframes rendering | `contact/page.tsx`, `about/page.tsx` |
| 11 | Content | Brand name typo — "ZONTOS" should be "ZONTES" | `data/bikes.ts`, `data/brands.ts`, `messages/en.json`, `messages/ar.json` |
| 12 | Content | Brand name shown twice on every bike card | `BikeCard.tsx` |
| 13 | Content | Cairo map embed uses fake placeholder coordinates | `lib/constants.ts`, `contact/page.tsx`, `about/page.tsx` |
| 14 | Scope | Undocumented AI chat widget — verify it's not leaking API keys | Check component + `.env` |
| 15 | Housekeeping | README is still default Next.js boilerplate | `README.md` |

---

## Step 1 — Fix invisible hero text

**Problem:** The hero headline "FIND YOUR RIDE" and all body text in the hero section are black or dark-coloured, rendered on top of a dark background image. Nothing is readable.

**Root cause:** Missing overlay between the `<Image>` background and the text layer. Text colour classes are not set to white.

**Fix in `src/components/features/home/Hero.tsx`:**

1. Add a dark overlay `<div>` as the first child inside the hero container, directly after the background `<Image>`:
```tsx
<div className="absolute inset-0 bg-black/65 z-10" />
```

2. Make sure the text content wrapper has `relative z-20` so it sits above the overlay.

3. Force all text to white:
   - Hero eyebrow/tagline: `className="text-[#CC0000] uppercase tracking-widest text-sm font-semibold"`
   - Main `<h1>`: `className="text-white font-bold uppercase"` using Barlow Condensed
   - Subheading paragraph: `className="text-[#A0A0A0]"`
   - CTA buttons: primary = `bg-[#CC0000] text-white`, secondary = `border border-white text-white hover:bg-white hover:text-black`

4. The hero container itself must be `relative overflow-hidden` with a black fallback background:
```tsx
<section className="relative min-h-screen bg-[#0A0A0A] overflow-hidden flex items-center">
```

---

## Step 2 — Fix the missing hero background image

**Problem:** The site requests `/_next/image?url=%2Fhero-bg.jpg` but the file `/public/hero-bg.jpg` does not exist. The hero section renders with no background — just a blank dark void.

**Fix — two parts:**

**Part A — Immediate temporary fix (do this first):**
In `Hero.tsx`, replace the broken `<Image>` background with a CSS gradient so the page is not broken while we wait for a real photo:
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A0000] to-[#2D0000]" />
```
Remove or comment out the `<Image src="/hero-bg.jpg" ...>` line until a real image is provided.

**Part B — Real image (do after Part A):**
Create `/public/hero-bg.jpg` by downloading a high-quality dark motorcycle stock photo (search Unsplash or Pexels for "motorcycle dark dramatic"). Name it `hero-bg.jpg`, place it in `/public/`, then restore the `<Image>` tag in `Hero.tsx`:
```tsx
<Image
  src="/hero-bg.jpg"
  alt="Cash Back Moto hero background"
  fill
  className="object-cover object-center"
  priority
  quality={90}
/>
```
Keep the `bg-black/65` overlay from Step 1 on top.

---

## Step 3 — Fix all bikes showing placeholder.jpg

**Problem:** Every single bike card in the catalog and home page shows a broken or generic `placeholder.jpg`. The `/public/bikes/` folder is empty or missing. The bike data in `data/bikes.ts` points to paths that don't exist.

**Fix — three parts:**

**Part A — Create a real branded placeholder:**
Create `/public/placeholder.jpg` — a dark-branded image (simple black rectangle with the Cash Back Moto logo centered, exported as JPEG). This is the fallback for any bike without a real photo. Minimum size: 800×600px.

**Part B — Add real bike images:**
For each brand, download representative stock photos:
- Name each file to match the slug in `data/bikes.ts`: e.g. `zontes-k368.jpg`, `keeway-rkv250.jpg`
- Place all files in `/public/bikes/`
- Update `images[0]` in each bike entry in `data/bikes.ts` to point to `/bikes/[slug].jpg`

If real manufacturer photos are not available yet, use a single high-quality motorcycle silhouette per category:
- `/bikes/motorcycle-placeholder.jpg` — for motorcycles
- `/bikes/scooter-placeholder.jpg` — for scooters
- `/bikes/electric-placeholder.jpg` — for electric models

Then in `data/bikes.ts`, set each bike's `images[0]` to the appropriate category placeholder.

**Part C — Update BikeCard.tsx to handle missing images gracefully:**
```tsx
<Image
  src={bike.images[0] ?? '/placeholder.jpg'}
  alt={bike.name}
  width={560}
  height={420}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.jpg'; }}
/>
```

---

## Step 4 — Fix the React hydration mismatch error

**Problem:** Console throws this on every page:
> "A tree hydrated but some attributes of the server rendered HTML didn't match the client properties."

Two causes confirmed from the error trace:
1. Dark Reader browser extension injecting `data-darkreader-*` attributes onto `<html>` and SVG elements
2. `next/image` with `fill` prop serializes inline styles differently between server (`"0px"`) and client (`0`)

**Fix 1 — `src/app/[locale]/layout.tsx`:**
Add `suppressHydrationWarning` to the `<html>` tag:
```tsx
<html
  lang={locale}
  dir={isRTL ? 'rtl' : 'ltr'}
  className={...}
  suppressHydrationWarning
>
```

**Fix 2 — `src/components/features/catalog/BikeCard.tsx`:**
Replace every `<Image fill ...>` with explicit width/height:
```tsx
// BEFORE
<div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
  <Image src={...} alt={...} fill className="object-cover ..." />
</div>

// AFTER
<div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
  <Image
    src={bike.images[0] ?? '/placeholder.jpg'}
    alt={bike.name}
    width={560}
    height={420}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  />
</div>
```

Apply the same `fill` → `width/height` replacement to any other `next/image` usages with `fill` across the codebase (check `Hero.tsx` — if Step 2 Part B restored it with `fill`, that is the exception where `fill` is correct for a full-bleed background, but wrap it in `suppressHydrationWarning` on its container `div`).

**Fix 3 — `src/components/layout/WhatsAppButton.tsx`:**
Confirm `'use client'` is the very first line of this file. If missing, add it:
```tsx
'use client';
```

---

## Step 5 — Apply the dark brand theme

**Problem:** The site does not look dark. The background is not `#0A0A0A`. The brand red `#CC0000` is barely visible. The design system colour tokens exist in `design-system/01-colours.md` but are not wired into Tailwind or `globals.css`.

**Fix in `tailwind.config.ts`:**
Ensure these custom colour tokens exist under `theme.extend.colors`:
```ts
colors: {
  bg: {
    base:     '#0A0A0A',
    surface:  '#111111',
    elevated: '#1A1A1A',
    subtle:   '#222222',
  },
  primary: {
    DEFAULT: '#CC0000',
    hover:   '#E60000',
    muted:   '#7A0000',
  },
  accent:  '#FF1A1A',
  border: {
    DEFAULT: '#2A2A2A',
    active:  '#CC0000',
  },
  text: {
    primary:   '#FFFFFF',
    secondary: '#A0A0A0',
    disabled:  '#4A4A4A',
    inverse:   '#0A0A0A',
  },
  whatsapp: '#25D366',
}
```

**Fix in `src/app/globals.css`:**
Set the base body background and text colour — if Tailwind's base layer isn't doing it:
```css
body {
  background-color: #0A0A0A;
  color: #FFFFFF;
}
```
Also add all CSS custom properties from `design-system/01-colours.md` into `:root {}`.

**Fix in every page and layout:**
The root `<body>` in `layout.tsx` should have `className="bg-bg-base text-text-primary"`. If it does not, add it:
```tsx
<body className={`${fonts} bg-bg-base text-text-primary antialiased`}>
```

---

## Step 6 — Load the correct fonts

**Problem:** The site is using the default Geist/system font. Barlow Condensed (EN headings) and Cairo (Arabic) from `design-system/02-typography.md` are not loaded.

**Fix in `src/app/[locale]/layout.tsx`:**

```tsx
import { Barlow_Condensed, DM_Sans, Cairo } from 'next/font/google';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-arabic',
  display: 'swap',
});
```

Apply all three to the `<html>` element's className:
```tsx
<html
  lang={locale}
  dir={isRTL ? 'rtl' : 'ltr'}
  className={`${barlowCondensed.variable} ${dmSans.variable} ${cairo.variable}`}
  suppressHydrationWarning
>
```

**Fix in `tailwind.config.ts`** — map the CSS variables to Tailwind font families:
```ts
fontFamily: {
  display: ['var(--font-display)', 'sans-serif'],
  body:    ['var(--font-body)', 'sans-serif'],
  arabic:  ['var(--font-arabic)', 'sans-serif'],
},
```

**Fix in `globals.css`** — apply fonts by language:
```css
[lang="en"] body { font-family: var(--font-body, 'DM Sans', sans-serif); }
[lang="ar"] body { font-family: var(--font-arabic, 'Cairo', sans-serif); }

h1, h2, h3 {
  font-family: var(--font-display, 'Barlow Condensed', sans-serif);
}
[lang="ar"] h1,
[lang="ar"] h2,
[lang="ar"] h3 {
  font-family: var(--font-arabic, 'Cairo', sans-serif);
  letter-spacing: 0;
}
```

---

## Step 7 — Redesign bike cards

**Problem:** Cards are visually generic — flat white borders, no dark theme, no glow, no hover effects, no brand identity.

**Fix in `src/components/features/catalog/BikeCard.tsx`:**

Replace the outer container classnames:
```tsx
<div className="
  bg-bg-surface border border-border rounded-lg overflow-hidden
  hover:border-primary hover:shadow-[0_0_24px_rgba(204,0,0,0.2)]
  transition-all duration-300 cursor-pointer group
">
```

Image container:
```tsx
<div className="relative aspect-[4/3] overflow-hidden bg-bg-elevated">
```

Badge positioning (top-left, above image):
```tsx
<div className="absolute top-3 left-3 z-10 flex gap-2">
  {bike.isElectric && (
    <span className="bg-accent text-bg-base text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
      ⚡ Electric
    </span>
  )}
  {bike.isNew && (
    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
      New
    </span>
  )}
</div>
```

Card body:
```tsx
<div className="p-5">
  <p className="text-text-secondary text-xs uppercase tracking-[0.2em] mb-1">{bike.brand}</p>
  <h3 className="text-white font-bold text-lg leading-tight mb-1">{bike.name}</h3>
  <p className="text-text-secondary text-sm mb-4 capitalize">{bike.type} · {bike.fuel}</p>
  <div className="flex gap-2">
    <a href={cairoWhatsApp} target="_blank" rel="noopener noreferrer"
      className="flex-1 text-center py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-md transition-colors duration-200">
      Cairo
    </a>
    <a href={alexWhatsApp} target="_blank" rel="noopener noreferrer"
      className="flex-1 text-center py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-md transition-colors duration-200">
      Alex
    </a>
  </div>
</div>
```

---

## Step 8 — Fix the navbar

**Problem:** The navbar shows the text "CASH BACKMOTO" as a plain text string, no logo image, no visual identity. The brand exists — `cashback motors.jpg` is in the repo root.

**Fix in `src/components/layout/Navbar.tsx`:**

**Part A — Move and rename the logo file:**
Copy `cashback motors.jpg` from the repo root to `/public/cashback-moto-logo.jpg` (remove the space from the filename).

**Part B — Use the logo image in Navbar:**
Replace the text logo with:
```tsx
import Image from 'next/image';

// Inside the navbar brand link:
<Link href={`/${locale}`} className="flex items-center">
  <Image
    src="/cashback-moto-logo.jpg"
    alt="Cash Back Moto"
    width={120}
    height={48}
    className="object-contain h-10 w-auto"
    priority
  />
</Link>
```

**Part C — Style the navbar background:**
The navbar container must be:
```tsx
<nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#2A2A2A]">
```

**Part D — Style nav links:**
```tsx
className="text-[#A0A0A0] hover:text-white text-sm font-medium uppercase tracking-wider transition-colors duration-200"
```
Active link: `text-[#CC0000]`

---

## Step 9 — Improve the About page visual hierarchy

**Problem:** The About page is a wall of plain text with no visual weight, no section separation, no brand styling. It reads like an unstyled HTML document.

**Fix in `src/app/[locale]/about/page.tsx`:**

Apply these structural improvements:

1. **Page hero** — replace the plain `<h2>About Cash Back Moto</h2>` with a proper dark hero banner:
```tsx
<section className="bg-bg-elevated border-b border-border py-16 text-center">
  <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-3">Who We Are</p>
  <h1 className="text-white font-display text-5xl font-bold uppercase">About Cash Back Moto</h1>
  <p className="text-text-secondary mt-4 max-w-xl mx-auto">
    Your trusted destination for motorcycles & scooters in Egypt
  </p>
</section>
```

2. **Stats row** — the 4 numbers ("500+ Bikes Sold" etc.) must be styled prominently:
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {stats.map(stat => (
    <div key={stat.label} className="bg-bg-surface border border-border rounded-lg p-6 text-center">
      <p className="text-primary font-display text-4xl font-bold">{stat.value}</p>
      <p className="text-text-secondary text-sm mt-1">{stat.label}</p>
    </div>
  ))}
</div>
```

3. **Brands section** — brand names in a dark pill grid:
```tsx
<div className="flex flex-wrap gap-3">
  {brands.map(brand => (
    <span key={brand} className="bg-bg-elevated border border-border text-text-secondary text-sm font-medium px-4 py-2 rounded-md uppercase tracking-widest">
      {brand}
    </span>
  ))}
</div>
```

4. **Section headings** throughout — use the standard pattern from `design-system/04-components.md`:
```tsx
<p className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-3">{eyebrow}</p>
<h2 className="text-white font-display text-4xl font-bold uppercase">{title}</h2>
```

---

## Step 10 — Fix map iframes

**Problem:** Two separate map problems:
- **Cairo map:** Uses fake placeholder coordinates `(31.2, 30.0)` — renders a random point in the middle of nowhere
- **Alexandria map:** Uses `maps.google.com/maps?q=31.225298,29.936758` — the coordinates may be correct but the embed format is outdated

Both maps appear on `/about` and `/contact`.

**Fix in `src/lib/constants.ts`:**

Replace both `embedUrl` values with proper Google Maps embed URLs.

For **Alexandria** (coordinates 31.225298, 29.936758 — verify this is the actual branch location):
```ts
embedUrl: 'https://maps.google.com/maps?q=31.225298,29.936758&hl=en&z=15&output=embed',
```

For **Cairo** — the current embed URL (`!2d31.2!3d30.0`) is clearly fake. Replace with the real location from the Maps link `https://maps.app.goo.gl/USLPyWr7Mjdbr9x1A`:

To extract the real embed URL:
1. Open https://maps.app.goo.gl/USLPyWr7Mjdbr9x1A in a browser
2. Click Share → Embed a map
3. Copy the `src="..."` value from the iframe code
4. Paste it as `cairo.embedUrl` in `constants.ts`

**Until the real Cairo embed URL is confirmed**, use this temporary construction that at least renders Cairo city centre rather than fake coordinates:
```ts
cairo: {
  embedUrl: 'https://maps.google.com/maps?q=30.0444,31.2357&hl=en&z=13&output=embed',
}
```

**Fix in map components** (`LocationMap.tsx` or wherever the iframe renders):
```tsx
<iframe
  src={location.embedUrl}
  width="100%"
  height="300"
  style={{ border: 0, borderRadius: '8px', filter: 'invert(90%) hue-rotate(180deg)' }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title={`${location.label} branch location`}
/>
```
Note: the `filter: invert(90%) hue-rotate(180deg)` CSS trick makes the Google Maps iframe match the dark theme. It is widely used and works reliably.

---

## Step 11 — Fix brand name typo: ZONTOS → ZONTES

**Problem:** The brand is referred to as "ZONTOS" in the codebase but the actual brand name is **Zontes** (a real Chinese manufacturer). This is a misspelling throughout.

**Files to update — find and replace `ZONTOS` with `ZONTES` and `Zontos` with `Zontes`:**

- `src/data/bikes.ts` — all bike entries with `brand: 'ZONTOS'`
- `src/data/brands.ts` — brand metadata entry
- `src/types/index.ts` — the `Brand` union type: `'ZONTOS'` → `'ZONTES'`
- `messages/en.json` — any translation key that references the brand name
- `messages/ar.json` — same
- `src/lib/constants.ts` — the `BRANDS` array

**Also check all bike slugs** — if any slug contains `zontos` (e.g. `zontos-k368`), rename to `zontes-k368`. This requires:
- Updating `slug` in `data/bikes.ts`
- Verifying no static routes break (check `catalog/[slug]/page.tsx`)

---

## Step 12 — Fix brand name shown twice on bike cards

**Problem:** Every bike card in the catalog displays the brand name twice — once as a badge/pill at the top and once as a text label in the card body. This is a rendering bug, not intentional design.

**Fix in `src/components/features/catalog/BikeCard.tsx`:**

Audit the JSX and identify both render locations. Keep only one — the badge in the card image area (top-left overlay). Remove the duplicate text label in the card body.

The card body should only show:
1. Brand name (once — as the small uppercase eyebrow above the bike name)
2. Bike name (h3)
3. Type + fuel info (small text)
4. WhatsApp CTA buttons

If the badge is already showing brand at top-left of the image, remove the `<p>{bike.brand}</p>` from the card body text section entirely, or keep only one.

---

## Step 13 — Fix the Cairo map fake coordinates

This is covered in Step 10 above. The specific fake embed URL to replace is:
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.123!2d31.2!3d30.0...
```
This renders coordinates `(30.0, 31.2)` — which is in the middle of the Cairo governorate but not the actual branch location. Replace it as described in Step 10.

---

## Step 14 — Verify the AI chat widget

**Problem:** A floating AI chat widget ("CashBack Moto AI — Online — Ask me anything") appears on every page. This widget is not in `idea.md`, `AGENTS.md`, or any planning document. It may be:
- Calling the Anthropic API with a hardcoded or exposed key
- Adding unnecessary JavaScript bundle weight
- Confusing users who expect to talk to a human

**Investigation steps:**
1. Find the component — search the codebase for "CashBack Moto AI" or "Online — Ask me anything"
2. Check if it contains any API calls — look for `fetch`, `axios`, Anthropic SDK imports
3. Check `.env.local` and `.env.example` — confirm any API key is in environment variables, not hardcoded in the component

**Decision:**
- **If it contains a hardcoded API key** → remove the key immediately, rotate it in the Anthropic console, then move it to `.env.local` as `ANTHROPIC_API_KEY`
- **If it is calling the API from the client side** → this is a security issue. Move API calls to a Next.js API route (`app/api/chat/route.ts`) and never expose the key to the browser
- **If the feature is unplanned and not needed yet** → remove the component entirely and add it to `idea.md` as a Phase 2 feature to plan properly before building

Add to `idea.md` under Phase 2:
```md
### AI Chat Assistant (Phase 2 — plan before building)
- Server-side only API calls via Next.js API route
- API key stored in environment variable, never client-side
- Define scope: what questions it answers, fallback to WhatsApp
```

---

## Step 15 — Update the README

**Problem:** `README.md` is the default Next.js boilerplate text (`"This is a Next.js project bootstrapped with create-next-app"`). It contains no project-specific information.

**Fix:** Replace the entire contents of `README.md` with the following:

```md
# Cash Back Moto — Website

Bilingual (EN/AR) motorcycle & scooter showcase website for Cash Back Moto,
an Egyptian shop selling gas and electric motorcycles and scooters from 7 brands.

## Stack
- Next.js 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui (radix-nova)
- next-intl v4 (EN + AR, RTL)
- Vercel deployment

## Getting Started
npm install
npm run dev

Open http://localhost:3000

## Folder structure
src/app/[locale]/     — All pages (Home, Catalog, About, Contact)
src/components/       — layout/, ui/, features/
src/lib/              — constants.ts, whatsapp.ts, utils.ts
src/types/index.ts    — All TypeScript types
src/data/             — bikes.ts, brands.ts
messages/             — en.json, ar.json
design-system/        — Visual rules — read before writing any UI
developer-guide.md    — Technical rules — read before writing any code
AGENTS.md             — AI agent instructions — read this first

## Adding a new bike
Edit src/data/bikes.ts and add a new entry following the Bike type.
The catalog page renders from this file automatically.

## Branches
- Alexandria: +20 11 10782513 | https://maps.app.goo.gl/omChfM4oFsqhCepE7
- Cairo: 010 05804463 | https://maps.app.goo.gl/USLPyWr7Mjdbr9x1A

## Social
Facebook: https://www.facebook.com/Cashbackmotoo
Instagram: https://www.instagram.com/cashbackmoto
TikTok: https://www.tiktok.com/@cashbackmoto
```

---

## Hard rules — do not violate these while implementing

- Do NOT touch `src/i18n/request.ts` — it works, leave it alone
- Do NOT touch `next.config.ts` unless required by a fix above
- Do NOT add new npm packages without a clear reason
- Do NOT remove or modify any bike data entries in `data/bikes.ts` except to fix the ZONTOS → ZONTES typo
- Do NOT hardcode any phone number, WhatsApp link, or social URL — all must come from `src/lib/constants.ts`
- Do NOT use `<img>` tags — always `next/image`
- Do NOT add inline hex colours — use Tailwind tokens from `tailwind.config.ts`
- Do NOT hardcode UI text strings — use `useTranslations()` from next-intl

---

## Verification checklist — run after all fixes

Before calling this done, verify every item:

- [ ] `npm run build` completes with zero errors
- [ ] `/en` — hero text is white and readable, background is dark
- [ ] `/en` — hero has a visible background (image or gradient, not blank)
- [ ] `/en/catalog` — at least some bikes show non-placeholder images
- [ ] `/en/catalog` — no bike card shows the brand name twice
- [ ] `/en/catalog` — brand is spelled "ZONTES" not "ZONTOS"
- [ ] `/en/catalog` — cards have dark background, red hover border, no white/grey boxes
- [ ] `/en/about` — Cairo map renders a real Cairo location
- [ ] `/en/about` — page has visual hierarchy, not a wall of plain text
- [ ] `/en/contact` — both maps render correctly
- [ ] All pages — background is dark (#0A0A0A), not white or grey
- [ ] All pages — headings use Barlow Condensed (EN) or Cairo (AR)
- [ ] All pages — navbar shows the logo image, not plain text
- [ ] All pages — no React hydration error in browser console
- [ ] All pages — WhatsApp floating button is visible and working
- [ ] AI chat widget — confirmed no API key is exposed client-side
- [ ] `README.md` — updated with project info, not default Next.js text
```
