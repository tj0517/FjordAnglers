# HOMEPAGE (`app/page.tsx`)

> Frontend-only landing page. Use mock data, no API calls.

---

## Structure

### 1. HERO ✅ (Already built: `src/components/Hero.tsx`)
- Full-width fjord background
- Gradient overlay (navy)
- Trust badge (5.0 rating)
- Headline + subheadline
- Search bar: Destination, Dates, Species
- "Find Guides" CTA button

### 2. FEATURED GUIDES
```
□ Section title: "Featured Guides"
□ 4 cards grid (4 col desktop, 2 tablet, 1 mobile)
□ Each card:
  - Photo (placeholder)
  - Name, Location
  - Species tags (2-3 pills)
  - Price "From €XXX/day"
  - Tier badge: LISTING (gray) | BOOKABLE (copper)
  - Rating stars
□ "View All Guides" button
```

**Mock data:**
```ts
const guides = [
  { name: "Erik Lindström", location: "Lofoten, Norway", species: ["Salmon", "Halibut"], price: 320, rating: 4.9, tier: "bookable" },
  { name: "Magnus Björnsson", location: "Reykjavik, Iceland", species: ["Arctic Char", "Brown Trout"], price: 280, rating: 4.8, tier: "listing" },
  { name: "Olaf Henriksen", location: "Gothenburg, Sweden", species: ["Pike", "Perch"], price: 200, rating: 4.7, tier: "bookable" },
  { name: "Lars Haugen", location: "Tromsø, Norway", species: ["Cod", "Salmon"], price: 350, rating: 5.0, tier: "bookable" }
];
```

### 3. HOW IT WORKS
```
□ Section title: "How It Works"  
□ 3 step cards:
  1. Search icon + "Search" + "Filter by species, location, technique"
  2. MessageCircle icon + "Connect" + "Contact guides or request booking"
  3. Fish icon + "Fish" + "Enjoy your fishing adventure"
□ Use Lucide icons: Search, MessageCircle, Fish
```

### 4. TRUST BAR
```
□ Muted background (bg-ice-dark)
□ 3 stats inline:
  - "150+" + "Verified Guides"
  - "4.9" + "Average Rating"  
  - "500+" + "Successful Trips"
□ Use icons: Users, Star, Trophy
```

### 5. EMAIL SIGNUP CTA
```
□ Gradient or accent background
□ Headline: "Get Early Access"
□ Subheadline: "Be first to discover new guides and exclusive offers"
□ Email input + "Subscribe" button (non-functional)
```

### 6. FOOTER
```
□ Logo: "NordicAnglers" with "n" icon
□ Nav links: Browse Guides, For Guides, About, Contact
□ Social: Instagram, Facebook
□ Copyright: "© 2026 NordicAnglers"
□ Legal: Privacy Policy, Terms of Service
```

---

## Components to Create

| File | Description |
|------|-------------|
| `components/FeaturedGuides.tsx` | Section with 4 guide cards |
| `components/GuideCard.tsx` | Individual card component |
| `components/HowItWorks.tsx` | 3-step section |
| `components/TrustBar.tsx` | Stats section |
| `components/EmailSignup.tsx` | Newsletter CTA |
| `components/Footer.tsx` | Footer |
| `components/Navbar.tsx` | Navigation bar |

---

## Responsive Breakpoints

| Section | Desktop (lg) | Tablet (md) | Mobile |
|---------|--------------|-------------|--------|
| Hero | Full screen | Smaller padding | Stacked |
| Featured | 4 cols | 2 cols | 1 col |
| How It Works | 3 cols | 3 cols | Stacked |
| Trust Bar | Inline | Inline | Stacked |
| Footer | Multi-col | 2 cols | Stacked |
