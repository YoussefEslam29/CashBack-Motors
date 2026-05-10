# Spacing, Radius & Shadow — Cash Back Moto

Consistent spacing and shape rules prevent the UI from looking "randomly assembled." This system uses an **8px base grid**. Radius is kept sharp — this is not a soft, rounded brand.

---

## Spacing Scale (8px grid)

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | Micro gaps (icon to label, badge padding) |
| `--space-2` | `8px` | Tight internal padding |
| `--space-3` | `12px` | Input padding, small gaps |
| `--space-4` | `16px` | Default component padding |
| `--space-5` | `24px` | Card padding, section inner gaps |
| `--space-6` | `32px` | Between components in a section |
| `--space-8` | `48px` | Section top/bottom padding (mobile) |
| `--space-10` | `64px` | Section top/bottom padding (desktop) |
| `--space-16` | `96px` | Hero vertical padding |
| `--space-20` | `128px` | Max section separation |

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-8:  48px;
  --space-10: 64px;
  --space-16: 96px;
  --space-20: 128px;
}
```

---

## Border Radius

Sharp. Not pill-shaped. This is a motorsport brand, not a fintech app.

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `2px` | Badges, tags |
| `--radius-md` | `4px` | Buttons, inputs |
| `--radius-lg` | `8px` | Cards |
| `--radius-xl` | `12px` | Modals, panels |
| `--radius-full` | `9999px` | Pills (WhatsApp button only) |

```css
:root {
  --radius-sm:   2px;
  --radius-md:   4px;
  --radius-lg:   8px;
  --radius-xl:   12px;
  --radius-full: 9999px;
}
```

**Rule:** Product cards use `--radius-lg`. Buttons use `--radius-md`. Never use `--radius-full` on rectangular buttons — it looks out of place with the aggressive brand identity.

---

## Shadows & Glow

On dark backgrounds, traditional drop shadows are invisible. We use **glow effects** instead for emphasis.

```css
:root {
  /* Subtle card lift */
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.6);

  /* Red glow — CTAs, hero buttons, featured cards */
  --shadow-glow-red: 0 0 24px rgba(204, 0, 0, 0.4);

  /* Stronger glow on hover */
  --shadow-glow-red-hover: 0 0 40px rgba(204, 0, 0, 0.6);

  /* White glow — for selected/active states */
  --shadow-glow-white: 0 0 16px rgba(255, 255, 255, 0.1);
}
```

### Usage
- **Primary CTA button** → `box-shadow: var(--shadow-glow-red)` on hover
- **Featured product card** → subtle `var(--shadow-glow-red)` always-on
- **Regular cards** → `var(--shadow-card)` on hover only
- **Active nav link** → `var(--shadow-glow-white)`

---

## Layout & Container

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-5); /* 24px horizontal padding */
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-6); /* 32px on tablet+ */
  }
}
```

### Grid
- Product catalog: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
- 2-column layout: `grid-template-columns: 1fr 1fr`
- 3-column layout: `grid-template-columns: repeat(3, 1fr)`
- Always use `gap: var(--space-5)` (24px) between cards

---

## Z-Index Scale

```css
:root {
  --z-base:    0;
  --z-card:    10;
  --z-sticky:  100;   /* Sticky header */
  --z-overlay: 200;   /* Drawers, sidebars */
  --z-modal:   300;   /* Modals */
  --z-toast:   400;   /* Notifications */
  --z-whatsapp: 500;  /* WhatsApp floating button — always on top */
}
```
