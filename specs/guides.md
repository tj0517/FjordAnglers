# GUIDES PAGE (`app/guides/page.tsx`)

> Search & browse fishing guides. Frontend-only with mock filter logic.

---

## Layout

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR                                                     │
├──────────────┬─────────────────────────────────────────────┤
│              │                                             │
│   FILTERS    │           RESULTS GRID                      │
│   SIDEBAR    │           (3 col desktop)                   │
│   (Left)     │                                             │
│              │                                             │
│              │                                             │
│              │                                             │
│              ├─────────────────────────────────────────────┤
│              │           PAGINATION                        │
└──────────────┴─────────────────────────────────────────────┘
```

---

## 1. PAGE HEADER
```
□ Page title: "Find Your Guide"
□ Subtitle: "X guides available" (show count)
□ Sort dropdown: Relevance, Price (Low-High), Rating, Newest
```

---

## 2. FILTERS SIDEBAR (Left)

| Filter | Type | Options |
|--------|------|---------|
| Country | Checkboxes | Norway, Sweden, Iceland |
| Species | Checkboxes + search | Salmon, Brown Trout, Sea Trout, Arctic Char, Pike, Perch, Zander, Cod, Halibut, Grayling |
| Technique | Checkboxes | Fly Fishing, Spinning, Trolling, Baitcasting, Ice Fishing |
| Water Type | Checkboxes | River, Lake, Fjord, Ocean, Stream |
| Price Range | Slider | €0 - €500 |
| Language | Checkboxes | English, Norwegian, Swedish, German |
| Skill Level | Radio | Beginner, Intermediate, Expert |
| Region | Text search | Free text input |

```tsx
// Filter section example
<div className="space-y-6">
  <div>
    <h3 className="font-semibold text-navy mb-3">Country</h3>
    <div className="space-y-2">
      {countries.map(c => (
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-gray-300" />
          <span>{c}</span>
        </label>
      ))}
    </div>
  </div>
</div>
```

---

## 3. RESULTS GRID

```
□ 3 columns desktop, 2 tablet, 1 mobile
□ 12 results per page
□ Use GuideCard component (same as homepage)
□ Empty state: "No guides match your filters"
```

---

## 4. GUIDE CARD (Reuse from homepage)
```
□ Photo
□ Name, Location
□ Species tags (2-3)
□ Price "From €XXX/day"
□ Tier badge: LISTING | BOOKABLE
□ Rating stars
□ Link to /guides/[id]
```

---

## 5. PAGINATION
```
□ Page numbers: 1, 2, 3, ..., 10
□ Previous / Next buttons
□ "Showing 1-12 of 45 guides"
```

---

## Mock Data (12 guides minimum)

```ts
const mockGuides = [
  { id: "1", name: "Erik Lindström", location: "Lofoten, Norway", country: "Norway", species: ["Salmon", "Halibut"], techniques: ["Fly Fishing"], waterTypes: ["Fjord", "Ocean"], price: 320, rating: 4.9, tier: "bookable", languages: ["English", "Norwegian"] },
  { id: "2", name: "Magnus Björnsson", location: "Reykjavik, Iceland", country: "Iceland", species: ["Arctic Char", "Brown Trout"], techniques: ["Fly Fishing", "Spinning"], waterTypes: ["River", "Lake"], price: 280, rating: 4.8, tier: "listing", languages: ["English"] },
  { id: "3", name: "Olaf Henriksen", location: "Gothenburg, Sweden", country: "Sweden", species: ["Pike", "Perch"], techniques: ["Spinning", "Baitcasting"], waterTypes: ["Lake"], price: 200, rating: 4.7, tier: "bookable", languages: ["English", "Swedish"] },
  { id: "4", name: "Lars Haugen", location: "Tromsø, Norway", country: "Norway", species: ["Cod", "Salmon"], techniques: ["Trolling"], waterTypes: ["Ocean", "Fjord"], price: 350, rating: 5.0, tier: "bookable", languages: ["English", "Norwegian", "German"] },
  // ... add 8 more for pagination demo
];
```

---

## Components to Create

| File | Description |
|------|-------------|
| `components/FiltersSidebar.tsx` | All filter controls |
| `components/GuidesGrid.tsx` | Results grid with cards |
| `components/Pagination.tsx` | Page navigation |
| `components/SortDropdown.tsx` | Sort options |

---

## Responsive Behavior

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Sidebar | Fixed left, 280px | Collapsible drawer | Bottom sheet or modal |
| Grid | 3 columns | 2 columns | 1 column |
| Filters | Always visible | Toggle button | Toggle button |

---

## Mobile Filters
```
□ "Filters" button in header
□ Opens full-screen modal or bottom sheet
□ "Apply Filters" button to close
□ Show active filter count on button
```
