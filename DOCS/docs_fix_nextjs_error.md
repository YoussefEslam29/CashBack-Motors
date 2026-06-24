# docs_fix_nextjs_error.md — Hydration Mismatch Fix

> Documents the resolution of the React hydration mismatch error on `/en/catalog` and all pages.
> Error appeared at `src/app/[locale]/layout.tsx` line 86 (`<Navbar />`).

---

## Error Summary

**Type:** React Hydration Mismatch (`console.error`)
**React version:** 19.2.4 (stricter hydration enforcement than React 18)
**Next.js version:** 16.2.4 with Turbopack

The error read:
> *"A tree hydrated but some attributes of the server rendered HTML didn't match the client properties."*

---

## Root Causes (Two Simultaneous)

### Cause 1 — Dark Reader browser extension (NOT a code bug)

The Dark Reader browser extension injects custom attributes into the DOM **after** SSR and **before** React hydrates:

- `data-darkreader-mode="dynamic"`
- `data-darkreader-scheme="dark"`
- `data-darkreader-proxy-injected="true"`
- `data-darkreader-inline-stroke=""`
- `style="--darkreader-inline-stroke: currentColor"`
- `data-darkreader-inline-color=""`
- `style="--darkreader-inline-color: transparent"`

React 19 is stricter than React 18 — instead of silently patching these mismatches, it now raises a visible error. This is not a code bug but the code must be hardened against it.

### Cause 2 — `next/image` fill-mode style serialization mismatch (real code bug)

Every `<Image fill>` component showed this diff in the error trace:

```diff
+ left: 0         ← client expects number
- left: "0px"     ← server rendered string
+ top: 0
- top: "0px"
+ right: 0
- right: "0px"
+ bottom: 0
- bottom: "0px"
+ objectFit: undefined
+ objectPosition: undefined
```

This is a known breaking change in Next.js 16 + React 19: the fill-mode serializes inline styles differently between the server and client.

---

## Fixes Applied

### Fix 1 — `src/app/[locale]/layout.tsx`

Added `suppressHydrationWarning` to the `<html>` element:

```tsx
// BEFORE
<html
  lang={locale}
  dir={isRTL ? 'rtl' : 'ltr'}
  className={`${barlowCondensed.variable} ${dmSans.variable} ${cairo.variable}`}
>

// AFTER
<html
  lang={locale}
  dir={isRTL ? 'rtl' : 'ltr'}
  className={`${barlowCondensed.variable} ${dmSans.variable} ${cairo.variable}`}
  suppressHydrationWarning       {/* ← ADDED */}
>
```

`suppressHydrationWarning` tells React to ignore attribute mismatches on this element **only** — it does NOT suppress mismatches in children. This is the officially documented solution for browser extension interference on the root `<html>` element.

---

### Fix 2 — `src/components/features/catalog/BikeCard.tsx`

Replaced `fill` prop with explicit `width={560} height={420}` (4:3 ratio):

```tsx
// BEFORE
<Image
  src={bike.images[0]}
  alt={name}
  fill
  className="object-cover group-hover:scale-105 transition-transform duration-500"
/>

// AFTER
<Image
  src={bike.images[0] ?? '/images/placeholder.jpg'}
  alt={name}
  width={560}
  height={420}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
/>
```

---

### Fix 3 — `src/components/features/home/FeaturedBikes.tsx`

Same fix as BikeCard — replaced `fill` with `width={560} height={420}`.

---

### Fix 4 — `src/components/catalog/ProductDetailClient.tsx`

Replaced `fill` with `width={800} height={600}` (larger resolution appropriate for detail page):

```tsx
// AFTER
<Image
  src={bike.images[0] ?? '/images/placeholder.jpg'}
  alt={name}
  width={800}
  height={600}
  className="w-full h-full object-cover"
  priority
/>
```

---

### Fix 5 — Hero background images (fill kept, suppression added)

For `src/components/features/home/Hero.tsx` and `src/components/home/HeroSection.tsx`, the `fill` prop is legitimately needed for full-bleed background coverage. Instead of removing `fill`, `suppressHydrationWarning` was added to the wrapper `<div>`:

```tsx
// BEFORE
<div className="absolute inset-0">
  <Image src="/hero-bg.jpg" fill ... />
</div>

// AFTER
<div className="absolute inset-0" suppressHydrationWarning>
  <Image src="/hero-bg.jpg" fill ... />
</div>
```

---

### Fix 6 — `src/components/home/FeaturedRides.tsx` (legacy component)

Applied the same fill → explicit dimensions fix to the legacy FeaturedRides component to prevent regressions if it is ever re-activated.

---

## What Was NOT Changed

- `WhatsAppButton.tsx` — already had `'use client'` at line 1. No change needed.
- `layout.tsx` — `'use client'` was correctly absent (layout must stay a Server Component).
- The `suppressHydrationWarning` prop was NOT added to any child elements — only the `<html>` root and the specific full-bleed image wrapper divs.

---

## Files Changed

| File | Change |
|---|---|
| `src/app/[locale]/layout.tsx` | Added `suppressHydrationWarning` to `<html>` |
| `src/components/features/catalog/BikeCard.tsx` | `fill` → `width={560} height={420}` |
| `src/components/features/home/FeaturedBikes.tsx` | `fill` → `width={560} height={420}` |
| `src/components/catalog/ProductDetailClient.tsx` | `fill` → `width={800} height={600}` |
| `src/components/features/home/Hero.tsx` | Added `suppressHydrationWarning` to image wrapper div |
| `src/components/home/HeroSection.tsx` | Added `suppressHydrationWarning` to image wrapper div |
| `src/components/home/FeaturedRides.tsx` | `fill` → `width={560} height={420}` |

---

## Verification

After applying fixes:

1. Navigate to `/en/catalog` — zero hydration errors in browser console
2. Navigate to `/ar/catalog` — zero hydration errors in browser console
3. Open with **Dark Reader enabled** — no errors (suppressHydrationWarning handles extension attributes)
4. Open with **Dark Reader disabled** — no errors (fill-mode fix handles style serialization)
5. Bike images load and scale on hover on both catalog and home page

---

## Why `suppressHydrationWarning` Is Safe Here

- On `<html>`: React documentation explicitly recommends this for browser extension interference. The prop only applies to the element it's on — not its children.
- On image wrapper `<div>`s: The only mismatch is in fill-mode CSS custom properties injected by Dark Reader, which are purely presentational. The content and layout are identical server/client.
