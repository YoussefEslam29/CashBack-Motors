# Components — Cash Back Moto

Reference implementations for the core UI components. All components must respect the colour, typography, spacing, and radius tokens defined in the other files.

---

## 1. Buttons

### Primary CTA (e.g. "Ask for Price" / "اسأل عن السعر")
```tsx
// Usage: Main action, one per section
<button className="
  bg-primary hover:bg-primary-hover
  text-white font-semibold uppercase tracking-wider
  px-8 py-3 rounded-md
  transition-all duration-200
  hover:shadow-[0_0_24px_rgba(204,0,0,0.5)]
  active:scale-95
">
  Ask for Price
</button>
```

### WhatsApp Button (sticky + inline)
```tsx
<a
  href="https://wa.me/201110782513?text=Hello%2C%20I%27m%20interested%20in%20a%20motorcycle"
  target="_blank"
  className="
    flex items-center gap-2
    bg-[#25D366] hover:bg-[#1ebe5d]
    text-white font-semibold
    px-6 py-3 rounded-full
    transition-all duration-200
    shadow-lg
  "
>
  <WhatsAppIcon />
  WhatsApp Us
</a>
```

### Ghost / Secondary
```tsx
<button className="
  border border-border-active text-primary
  hover:bg-primary hover:text-white
  px-6 py-3 rounded-md
  transition-all duration-200
  font-medium
">
  View All Models
</button>
```

### Rules
- Always one primary CTA per section. Never two red buttons side by side.
- WhatsApp button uses `rounded-full` (pill) — the only exception to the sharp-radius rule.
- Disabled state: `opacity-40 cursor-not-allowed` — no colour change.

---

## 2. Product Card

```tsx
<div className="
  bg-bg-surface border border-border
  rounded-lg overflow-hidden
  hover:border-primary hover:shadow-[0_0_24px_rgba(204,0,0,0.2)]
  transition-all duration-300
  group
">
  {/* Image */}
  <div className="relative aspect-[4/3] overflow-hidden bg-bg-elevated">
    <Image
      src={bike.image}
      alt={bike.name}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
    />
    {/* Badges */}
    <div className="absolute top-3 left-3 flex gap-2">
      {bike.isElectric && (
        <span className="bg-accent text-black text-xs font-bold px-2 py-1 rounded-sm uppercase">
          Electric
        </span>
      )}
      {bike.isNew && (
        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">
          New
        </span>
      )}
    </div>
  </div>

  {/* Content */}
  <div className="p-5">
    <p className="text-text-secondary text-sm uppercase tracking-widest mb-1">
      {bike.brand}
    </p>
    <h3 className="text-white font-bold text-xl mb-4 leading-tight">
      {bike.name}
    </h3>
    <a
      href={whatsappLink(bike.name)}
      className="w-full flex items-center justify-center gap-2
        bg-primary hover:bg-primary-hover text-white
        py-2.5 rounded-md font-semibold transition-colors duration-200"
    >
      Ask for Price
    </a>
  </div>
</div>
```

---

## 3. Navigation

```tsx
<nav className="
  fixed top-0 left-0 right-0 z-[100]
  bg-bg-base/90 backdrop-blur-md
  border-b border-border
">
  <div className="container flex items-center justify-between h-16">
    <Logo />
    <ul className="hidden md:flex items-center gap-8">
      {navLinks.map(link => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-text-secondary hover:text-white
              text-sm font-medium uppercase tracking-wider
              transition-colors duration-200
              data-[active]:text-primary"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
    <div className="flex items-center gap-4">
      <LanguageSwitcher />
      <MobileMenuButton />
    </div>
  </div>
</nav>
```

---

## 4. Filter Bar (Catalog)

```tsx
<div className="flex flex-wrap gap-3 mb-8">
  {/* Brand filter */}
  <select className="
    bg-bg-surface border border-border text-text-primary
    px-4 py-2 rounded-md text-sm
    focus:border-primary focus:outline-none
    cursor-pointer
  ">
    <option value="">All Brands</option>
    {brands.map(b => <option key={b}>{b}</option>)}
  </select>

  {/* Type pills */}
  {['All', 'Motorcycle', 'Scooter'].map(type => (
    <button
      key={type}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
        ${active === type
          ? 'bg-primary text-white'
          : 'bg-bg-surface border border-border text-text-secondary hover:border-primary hover:text-white'
        }`}
    >
      {type}
    </button>
  ))}

  {/* Electric toggle */}
  <button className="px-4 py-2 rounded-md text-sm border border-border
    text-text-secondary hover:border-accent hover:text-accent transition-colors">
    ⚡ Electric Only
  </button>
</div>
```

---

## 5. WhatsApp Floating Button

Always visible, bottom-right on desktop, bottom-center on mobile. `z-index: 500`.

```tsx
<a
  href="https://wa.me/201110782513"
  target="_blank"
  aria-label="Chat on WhatsApp"
  className="
    fixed bottom-6 right-6 z-[500]
    flex items-center gap-2
    bg-[#25D366] text-white
    px-4 py-3 rounded-full
    shadow-[0_4px_24px_rgba(37,211,102,0.4)]
    hover:shadow-[0_4px_32px_rgba(37,211,102,0.6)]
    hover:scale-105
    transition-all duration-200
    font-semibold text-sm
  "
>
  <WhatsAppIcon size={20} />
  <span className="hidden sm:inline">Chat with us</span>
</a>
```

---

## 6. Section Heading Pattern

Consistent across all sections.

```tsx
<div className="text-center mb-12">
  <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-3">
    {eyebrow}  {/* e.g. "Our Fleet" */}
  </p>
  <h2 className="text-white font-display text-4xl md:text-5xl font-bold uppercase">
    {title}
  </h2>
  {subtitle && (
    <p className="text-text-secondary mt-4 max-w-xl mx-auto">
      {subtitle}
    </p>
  )}
</div>
```
