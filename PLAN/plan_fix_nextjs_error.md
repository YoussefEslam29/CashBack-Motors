# plan_fix_nextjs_error.md — CashBack Moto

> Read `AGENTS.md`, `developer-guide.md`, and this file in full before touching any code.
> Fix these issues in the order listed. Do not skip steps.

---

## Error Summary

**Type:** React Hydration Mismatch (Console Error)
**Where:** `src/app/[locale]/layout.tsx` line 86 — at `<Navbar />`
**Symptom:** The server-rendered HTML does not match what React expects on the client. React bails out and does not patch the mismatch — the UI may be broken or inconsistent.

---

## Root Cause Analysis

The error trace shows **two distinct causes** happening simultaneously. Both must be fixed.

---

### Cause 1 — Dark Reader browser extension injecting attributes (NOT a code bug)

Lines in the diff like these are all from the **Dark Reader** browser extension running on the developer's machine:

```
- data-darkreader-mode="dynamic"
- data-darkreader-scheme="dark"
- data-darkreader-proxy-injected="true"
- data-darkreader-inline-stroke=""
- style={{--darkreader-inline-stroke:"currentColor"}}
- data-darkreader-inline-color=""
- style={{--darkreader-inline-color: "transparent"}}
```

Dark Reader injects these attributes into the DOM after the server renders the page, before React hydrates. React then sees a mismatch between the server HTML (no Dark Reader attributes) and the client DOM (Dark Reader attributes injected).

**This is NOT a bug in the codebase.** However, React in Next.js 16 + React 19 is stricter about hydration mismatches than older versions — it now throws a visible error for this instead of silently patching it.

**Fix:** Suppress React's hydration warning for the `<html>` element and known Dark Reader injection points by adding `suppressHydrationWarning` to the `<html>` tag in `layout.tsx`. This is the official, documented solution for browser extension interference.

---

### Cause 2 — `next/image` inline style mismatch (real code bug)

Every `BikeCard`'s `<img>` element shows this in the diff:

```diff
+  left: 0         ← client expects number 0
-  left: "0px"     ← server rendered string "0px"
+  top: 0
-  top: "0px"
+  right: 0
-  right: "0px"
+  bottom: 0
-  bottom: "0px"
+  objectFit: undefined
+  objectPosition: undefined
```

This is a **real hydration mismatch** caused by how `next/image` with `fill` prop serializes inline styles between the server and client in Next.js 16 + React 19. The server renders pixel strings (`"0px"`) but the client expects numbers (`0`). This is a known breaking change in this version range.

**Fix:** There are two options — apply both for belt-and-suspenders:

**Option A** — Add `suppressHydrationWarning` to the `<img>` wrapper `<div>` in `BikeCard.tsx`.

**Option B** (preferred) — Switch from `fill` prop to explicit `width` and `height` on all `next/image` usages in `BikeCard.tsx`. This avoids the fill-mode style serialization entirely and is better for performance anyway (avoids layout shift).

---

## Files to Edit

```
src/app/[locale]/layout.tsx          ← Fix 1: suppressHydrationWarning on <html>
src/components/features/catalog/BikeCard.tsx   ← Fix 2: next/image fill → width/height
```

---

## Exact Changes Required

### Fix 1 — `src/app/[locale]/layout.tsx`

Find the `<html>` tag (around line 84–86 based on the error trace) and add `suppressHydrationWarning`:

```tsx
// BEFORE
<html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className={...}>

// AFTER
<html
  lang={locale}
  dir={isRTL ? 'rtl' : 'ltr'}
  className={...}
  suppressHydrationWarning   {/* ← ADD THIS */}
>
```

`suppressHydrationWarning` tells React to ignore attribute mismatches on this element only (it does NOT suppress mismatches in child components). It is the correct, documented fix for browser extension interference on the root `<html>` element.

---

### Fix 2 — `src/components/features/catalog/BikeCard.tsx`

Replace `fill` prop usage on `next/image` with explicit dimensions. The card image container uses `aspect-[4/3]` which means we know the ratio — use fixed width/height and let CSS handle the sizing.

```tsx
// BEFORE — causes fill-mode style serialization mismatch
<div className="relative aspect-[4/3] overflow-hidden bg-bg-elevated">
  <Image
    src={bike.images[0]}
    alt={bike.name}
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-500"
  />
</div>

// AFTER — explicit dimensions, no fill, no mismatch
<div className="relative aspect-[4/3] overflow-hidden bg-bg-elevated">
  <Image
    src={bike.images[0] ?? '/images/placeholder.jpg'}
    alt={bike.name}
    width={560}
    height={420}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  />
</div>
```

**Why 560×420?** — 4:3 ratio, reasonable resolution for a catalog grid card. `next/image` will generate responsive srcSet from this. The `w-full h-full` Tailwind classes make it fill its container visually.

Apply the same fix to **every other `<Image fill>` usage** in the codebase — check:
- `src/components/features/home/Hero.tsx` (if it uses fill for a background image)
- `src/components/features/catalog/[slug]/page.tsx` (product image gallery)

---

## Also Check — WhatsApp Floating Button

The error trace shows `<WhatsAppButton>` rendering two `<a>` tags side by side (one per branch — Cairo and Alexandria). Confirm that `WhatsAppButton.tsx` has `'use client'` at the top — it is a client component. If it is missing, add it. A missing `'use client'` on an interactive component that renders differently server vs client is another common hydration source.

```tsx
// src/components/layout/WhatsAppButton.tsx — first line must be:
'use client';
```

---

## What NOT to Do

- Do **not** add `suppressHydrationWarning` to every element in the tree — only the `<html>` tag.
- Do **not** remove Dark Reader from the browser — it is not the developer's job to manage user extensions; fix the code to be robust against them.
- Do **not** wrap the entire layout in `dynamic(() => import(...), { ssr: false })` — that would kill SSR for the whole app.
- Do **not** add `'use client'` to `layout.tsx` — it must stay a Server Component.

---

## Verification Steps

After making the changes:

1. Run `npm run build` — must complete with zero errors and zero warnings about hydration.
2. Open the site in Chrome **with Dark Reader enabled** — no console errors.
3. Open the site in Chrome **without Dark Reader** — no console errors.
4. Navigate to `/en/catalog` and `/ar/catalog` — bike cards render correctly in both locales.
5. Check that bike images load and scale on hover in both catalog and home page.

---

## Summary

| # | File | Change | Cause |
|---|---|---|---|
| 1 | `layout.tsx` | Add `suppressHydrationWarning` to `<html>` | Dark Reader extension attribute injection |
| 2 | `BikeCard.tsx` | Replace `<Image fill>` with `width={560} height={420}` | next/image fill style serialization mismatch in Next.js 16 + React 19 |
| 3 | `WhatsAppButton.tsx` | Confirm `'use client'` is present | Client component rendering on server |
| 4 | Any other `<Image fill>` | Apply same fix as BikeCard | Same root cause |
