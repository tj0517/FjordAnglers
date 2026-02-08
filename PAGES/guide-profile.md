# GUIDE PROFILE PAGE (`app/guides/[id]/page.tsx`)

> Frontend-only guide profile. Use mock data, no API calls.

---

## Layout

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR                                                     │
├────────────────────────────────────────────────────────────┤
│ HERO IMAGE (full width, guide photo)                       │
│    + Guide name overlay                                    │
├────────────────────────────────────────────────────────────┤
│                           │                                │
│   GUIDE INFO              │   BOOKING WIDGET               │
│   (Bio, details)          │   (Sticky sidebar)             │
│                           │                                │
├───────────────────────────┴────────────────────────────────┤
│ GALLERY (thumbnails)                                       │
├────────────────────────────────────────────────────────────┤
│ REVIEWS                                                    │
├────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└────────────────────────────────────────────────────────────┘
```

---

## Sections

### 1. HERO
- Full-width guide cover photo
- Gradient overlay from bottom
- Guide name + location
- Rating badge
- Tier badge (LISTING / BOOKABLE)

### 2. GUIDE INFO (Left column)
- **Bio** - Long description
- **Species** - Pills/tags
- **Techniques** - Pills
- **Languages** - Icons + text
- **Experience** - "X years guiding"
- **Season** - "March - October"

### 3. BOOKING WIDGET (Right sidebar, sticky)
- Price: "From €XXX / day"
- Date picker (placeholder)
- Number of guests selector
- Total price calculation
- CTA: "Request to Book" (bookable) or "Contact Guide" (listing)

### 4. GALLERY
- 4-6 thumbnail images
- Lightbox on click (optional)

### 5. REVIEWS
- Average rating + count
- 2-3 review cards with:
  - Reviewer name
  - Date
  - Rating stars
  - Comment text

---

## Mock Data

```ts
const guide = {
  id: "1",
  name: "Erik Lindström",
  location: "Lofoten, Norway",
  country: "Norway",
  bio: "With over 15 years of experience guiding in the pristine waters of Lofoten, I specialize in salmon and halibut fishing. My intimate knowledge of the local fjords ensures unforgettable experiences for anglers of all skill levels.",
  species: ["Salmon", "Halibut", "Cod"],
  techniques: ["Fly Fishing", "Trolling", "Spinning"],
  waterTypes: ["Fjord", "Ocean"],
  languages: ["English", "Norwegian", "German"],
  yearsExperience: 15,
  seasonStart: "March",
  seasonEnd: "October",
  pricePerDay: 320,
  tier: "bookable",
  rating: 4.9,
  reviewCount: 47,
  photos: [
    "/guides/erik-1.jpg",
    "/guides/erik-2.jpg",
    "/guides/erik-3.jpg",
    "/guides/erik-4.jpg"
  ]
};

const reviews = [
  {
    name: "Thomas M.",
    date: "August 2025",
    rating: 5,
    comment: "Erik is an exceptional guide. Caught my first salmon thanks to his expertise!"
  },
  {
    name: "Anna K.",
    date: "July 2025", 
    rating: 5,
    comment: "Amazing experience in the fjords. Highly recommend!"
  }
];
```

---

## Components

| File | Description |
|------|-------------|
| `app/guides/[id]/page.tsx` | Main page |
| `components/GuideHero.tsx` | Cover photo + name |
| `components/GuideInfo.tsx` | Bio + details |
| `components/BookingWidget.tsx` | Price + booking form |
| `components/PhotoGallery.tsx` | Thumbnails |
| `components/ReviewCard.tsx` | Single review |
| `components/ReviewSection.tsx` | All reviews |
