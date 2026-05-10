# Colour Tokens — Cash Back Moto

The palette is built around the logo: **near-black backgrounds, crimson red as the dominant action colour, white for legibility.** Nothing soft. Nothing pastel. Every colour choice should feel like it belongs on a racetrack.

---

## Core Tokens

```css
:root {
  /* Backgrounds */
  --color-bg-base:       #0A0A0A;   /* Page background — deepest black */
  --color-bg-surface:    #111111;   /* Cards, panels */
  --color-bg-elevated:   #1A1A1A;   /* Modals, dropdowns, hover states */
  --color-bg-subtle:     #222222;   /* Dividers, skeleton loaders */

  /* Primary — Red */
  --color-primary:       #CC0000;   /* Main CTA, logo red */
  --color-primary-hover: #E60000;   /* Hover / focus */
  --color-primary-muted: #7A0000;   /* Disabled, ghost states */
  --color-primary-glow:  rgba(204, 0, 0, 0.25); /* Box-shadow / glow effect */

  /* Text */
  --color-text-primary:  #FFFFFF;   /* Headings, main body */
  --color-text-secondary:#A0A0A0;   /* Subtitles, meta, labels */
  --color-text-disabled: #4A4A4A;   /* Disabled inputs, inactive states */
  --color-text-inverse:  #0A0A0A;   /* Text on red backgrounds */

  /* Accent */
  --color-accent-white:  #FFFFFF;
  --color-accent-red:    #FF1A1A;   /* Badges, highlights — brighter than primary */

  /* Semantic */
  --color-success:       #22C55E;
  --color-warning:       #F59E0B;
  --color-error:         #EF4444;

  /* Borders */
  --color-border:        #2A2A2A;   /* Default borders */
  --color-border-active: #CC0000;   /* Focused inputs, selected cards */
}
```

---

## Usage Rules

- **Backgrounds** — always use `--color-bg-*` tokens, never raw hex. This keeps dark mode consistent.
- **Red is for action** — only use `--color-primary` on interactive elements (buttons, links, active states, badges). Don't splash it decoratively everywhere or it loses impact.
- **White on black** — the default text pairing. Never use off-white (`#F5F5F5`) on dark backgrounds; it looks murky. Use pure `#FFFFFF`.
- **Glow sparingly** — `--color-primary-glow` on box-shadow for hero CTAs and featured cards only. Overuse kills the effect.
- **No gradients from red to another hue** — if you gradient, do `#CC0000` → `#880000` (dark red), not red to orange or red to purple.

---

## Tailwind Config Mapping

```js
// tailwind.config.ts
theme: {
  extend: {
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
      accent: '#FF1A1A',
      border: {
        DEFAULT: '#2A2A2A',
        active:  '#CC0000',
      }
    }
  }
}
```
