# Branding: NordicAnglers

## Colors

### Primary Palette
| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Navy | `#0A2E4D` | `text-navy`, `bg-navy` | Primary text, headers, backgrounds |
| Navy Light | `#0F3D66` | `text-navy-light`, `bg-navy-light` | Hover states |
| Navy Dark | `#071E33` | `text-navy-dark`, `bg-navy-dark` | Darker accents |

### Background Palette
| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Ice White | `#F8FAFB` | `bg-ice`, `bg-background` | Page background |
| Ice Dark | `#EEF2F5` | `bg-ice-dark` | Section backgrounds, cards |

### Accent Palette
| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Copper | `#E67E50` | `bg-copper`, `text-copper` | CTAs, buttons, highlights |
| Copper Light | `#F09A73` | `bg-copper-light` | Hover light |
| Copper Dark | `#D96D3F` | `bg-copper-dark` | Hover dark, active states |

### Neutral Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Stone 900 | `#1F2937` | Body text |
| Stone 500 | `#6B7280` | Muted text, placeholders |

---

## Typography

### Fonts
- **Display Font:** Bebas Neue (`font-display`) - Headlines, hero text
- **Body Font:** Inter (`font-sans`) - All body text, UI elements

### Scale
| Element | Classes |
|---------|---------|
| Hero H1 | `text-5xl sm:text-6xl lg:text-7xl font-display tracking-wide` |
| Section H2 | `text-3xl sm:text-4xl font-display` |
| Subheadline | `text-lg sm:text-xl font-medium` |
| Body | `text-base` |
| Small/Caption | `text-sm` |
| Eyebrow | `text-sm font-semibold uppercase tracking-[0.2em]` |

---

## Components

### Buttons
```tsx
// Primary CTA
<button className="h-12 rounded-lg bg-copper px-8 text-base font-semibold text-white hover:bg-copper-dark hover:-translate-y-0.5 transition-all">
  Find Guides
</button>

// Secondary
<button className="h-12 rounded-lg border border-navy px-8 text-base font-semibold text-navy hover:bg-navy hover:text-white transition-all">
  Learn More
</button>
```

### Cards
```tsx
<div className="rounded-2xl bg-white p-5" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
  {/* content */}
</div>
```

### Badges/Pills
```tsx
// Trust badge
<div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-2">
  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
  <span className="text-sm font-medium text-white">5.0 | 500+ Anglers</span>
</div>

// Species tag
<span className="rounded-full bg-ice-dark px-3 py-1 text-sm text-navy">Salmon</span>
```

### Form Inputs
```tsx
<select className="w-full h-12 appearance-none rounded-lg border border-gray-200 bg-white pl-4 pr-10 text-base text-navy focus:outline-none focus:ring-2 focus:ring-copper/40">
```

---

## Overlays & Effects

### Hero Gradient
```tsx
style={{
  background: "linear-gradient(to bottom, rgba(10,46,77,0.3), rgba(10,46,77,0.6))"
}}
```

### Card Shadows
```tsx
style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
```

### Transitions
- Use `transition-all` for smooth animations
- Hover lift: `hover:-translate-y-0.5`

---

## Aesthetic Guidelines

- **Clean, Nordic, minimalist, premium, technical**
- Use "n" as minimalist icon for small UI elements
- Generous whitespace between sections
- Rounded corners: `rounded-lg` for inputs, `rounded-2xl` for cards
- Subtle hover effects on interactive elements
- Backdrop blur for overlays: `backdrop-blur-sm`
