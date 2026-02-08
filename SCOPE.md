# FJORDANGLERS - SCOPE OF WORK

Version: 1.0 | Date: Feb 8, 2026

---

## PROJECT OVERVIEW

**What:** Discovery platform for finding fishing guides in Scandinavia (Norway, Sweden, Iceland)

**Core Value:** "Find the perfect fishing guide using advanced filters" (species, location, technique, etc.)

**Model:** Hybrid marketplace
- Tier 1: LISTING (guide profile + contact form) 
- Tier 2: BOOKABLE (+ booking system + 10% commission)

**Timeline:** 3-4 weeks to launch

**Success Metrics (Month 1):**
- 1000 unique visitors
- 30 guides onboarded
- 5 confirmed bookings minimum

---

## MVP FEATURES (Build These)

### 1. HOMEPAGE
```
✅ Hero (fjord photo + headline + search bar)
✅ Search bar: Country, Species, Dates
✅ Featured guides (4 cards)
✅ How it works (3 steps)
✅ Trust bar (guide count, ratings)
✅ Email signup CTA
✅ Footer
```

### 2. SEARCH/BROWSE PAGE (MOST IMPORTANT!)
```
✅ LEFT SIDEBAR - Filters:
   □ Country (Norway, Sweden, Iceland) - checkboxes
   □ Species (20+ options) - checkboxes + search
   □ Technique (Fly, Spinning, Trolling) - checkboxes
   □ Water type (River, Lake, Fjord, Ocean) - checkboxes
   □ Price range (€0-€500) - slider
   □ Language - checkboxes
   □ Skill level (Beginner/Intermediate/Expert) - radio
   □ Region (text search)

✅ RESULTS GRID:
   □ Guide cards (3 col desktop, 1 mobile)
   □ Each card: Photo, Name, Location, Species tags, Price, Tier badge
   □ Sort: Relevance, Price, Rating, Newest
   □ Pagination (12 per page)

✅ ANALYTICS:
   □ Log every search query
   □ Track filter usage
   □ Find patterns (what people search most)
```

### 3. GUIDE PROFILE PAGE
```
✅ Photo gallery (main + thumbnails)
✅ Guide info: Name, location, languages, bio, species, techniques
✅ Pricing section
✅ Season availability

IF TIER = LISTING:
   □ Contact form (name, email, phone, dates, message)
   □ Email sent to guide
   □ No payment, no commission

IF TIER = BOOKABLE:
   □ Booking widget (dates, people, price calc)
   □ "Request to Book" button
   □ 20% deposit via Stripe
   □ 10% commission
   □ Dashboard access for guide
```

### 4. GUIDE ONBOARDING
```
✅ Signup form:
   □ Email, password, name, country
   □ Choose tier: LISTING or BOOKABLE
   
✅ Profile creation (self-service):
   □ Basic info, bio, location
   □ Species, techniques (multi-select)
   □ Upload photos (1-10)
   □ Pricing (if bookable)
   
✅ Admin approval (manual):
   □ You review profile
   □ Activate (is_active = true)
   □ Guide appears in search
```

### 5. BOOKING FLOW (Bookable tier only)
```
✅ Step 1: Request booking from profile
✅ Step 2: Checkout page
   □ Booking summary
   □ Customer form (name, email, phone, message)
   □ 20% deposit payment (Stripe)
   □ Terms checkbox
   
✅ Step 3: Confirmation
   □ Email to customer + guide
   □ Status: pending (guide must approve)
   
✅ Guide Dashboard:
   □ View pending requests
   □ Approve/Decline
   □ View confirmed bookings
   □ Edit profile
```

### 6. ADMIN PANEL (Simple)
```
✅ /admin/guides - List, approve, activate
✅ /admin/bookings - View all bookings
✅ /admin/analytics - Basic stats:
   □ Visitors
   □ Guide signups
   □ Searches (top queries)
   □ Booking requests
   □ Confirmations
```

### 7. AUTH
```
✅ Email/password signup
✅ Login
✅ Password reset
✅ Roles: Customer, Guide, Admin
✅ Protected routes
```

---

## OUT OF SCOPE (Do NOT Build)

```
❌ Guide verification system (manual for MVP)
❌ In-app messaging (email only)
❌ Professional photography service
❌ Real-time chat
❌ Calendar sync
❌ Instant booking only (guide chooses)
❌ Maps integration (add later)
❌ Multi-language (English only)
❌ Multi-currency (EUR only)
❌ Automated refunds
❌ Review moderation
❌ Mobile app
❌ Blog/CMS
❌ Advanced analytics
❌ A/B testing
```

---

## USER ROLES

### Customer
- Browse guides (no login required)
- Search & filter
- Create account to book/contact
- Submit booking requests
- View booking history
- Leave reviews (after completed trip)

### Guide  
- Create profile
- Choose tier (listing or bookable)
- If bookable: Dashboard, approve bookings
- Edit profile, upload photos
- View earnings

### Admin (You)
- Approve guides
- View all bookings
- View analytics
- Manual actions (refunds, etc.)

---

## DATABASE SCHEMA

### users
```sql
id, email, role (customer|guide), created_at
```

### guides
```sql
id, user_id, name, bio, phone, email, website, whatsapp
country, region, specific_location, latitude, longitude
species (JSONB), techniques (JSONB), water_types (JSONB)
languages (JSONB), years_experience
price_per_day (cents), currency
season_start, season_end
tier ('listing' | 'bookable'), commission_rate
total_bookings, total_leads, average_rating, profile_views
is_active, is_verified, stripe_account_id
created_at, updated_at
```

### guide_photos
```sql
id, guide_id, url, display_order, caption
```

### leads (for listing tier)
```sql
id, guide_id, customer_name, customer_email, customer_phone
desired_dates, number_of_people, species_interest, message
sent_to_guide_at, created_at
```

### bookings (for bookable tier)
```sql
id, guide_id, customer_id
start_date, end_date, number_of_days
price_per_day, total_price, commission_amount, deposit_amount
number_of_people, customer_message
customer_name, customer_email, customer_phone
stripe_payment_intent_id, payment_status
status (pending|confirmed|completed|cancelled)
created_at, confirmed_at, completed_at
```

### reviews
```sql
id, booking_id, guide_id, customer_id
rating (1-5), comment, photos (JSONB)
created_at
```

### search_queries (ANALYTICS GOLDMINE!)
```sql
id, country, species (JSONB), techniques (JSONB)
water_types (JSONB), region_text, price_min, price_max
skill_level, languages (JSONB)
results_count, user_id, session_id, created_at
```

---

## BUSINESS RULES

### Pricing
- Guides set price_per_day in EUR
- Stored as CENTS (€200 = 20000)
- Customer pays 20% deposit at booking
- Commission: 10% default (8% for first 50 guides)
- Free tier: No commission, no booking system

### Booking Flow
- Minimum: 1 day
- Maximum: 14 days per booking
- Advance booking: Tomorrow minimum (no same-day)
- Status: pending → confirmed → completed
- Cancellations: Manual (email support)

### Reviews
- Only after status = completed
- Rating 1-5 required
- Comment optional (max 500 chars)
- One review per booking

### Search
- Filters = AND logic (all must match)
- Within multi-select = OR (Salmon OR Pike)
- Default sort: Relevance
- 12 results per page

---

## TECH STACK (LOCKED)

```
Frontend: Next.js 14+ (App Router, TypeScript)
Styling: Tailwind CSS
UI: shadcn/ui + Lucide icons
Database: Supabase (Postgres)
Auth: Supabase Auth
Storage: Supabase Storage
Payments: Stripe Connect
Hosting: Vercel
Email: Resend
Analytics: Vercel Analytics + Google Analytics 4
```

---

## ANALYTICS TO TRACK

**Weekly Metrics:**
1. Unique visitors (Goal: 1000 Month 1)
2. Guide signups (Goal: 30 total)
3. Search queries (analyze patterns!)
4. Booking requests
5. Booking confirmations (Goal: 5 Month 1)

**Search Analysis (Critical!):**
- Most searched species
- Most searched countries
- Popular regions
- Price ranges
- Common filter combinations
→ Use this data to recruit guides that match demand!

---

## LAUNCH PLAN

### Week 1: Foundation
- Setup Next.js + Supabase + Stripe
- Database schema
- Auth (signup/login)
- Basic UI (homepage, search skeleton)

### Week 2: Core Features
- Search page with ALL filters
- Guide profile pages
- Guide signup flow
- Photo upload
- Admin approval system

### Week 3: Polish
- Contact forms (listing tier)
- Booking widget (bookable tier)
- Email notifications
- Analytics tracking
- Onboard first 10 guides manually

### Week 4: Launch
- Reach 30 guides total
- Final testing
- Deploy production
- Announce launch

### Post-Launch (Month 1)
- Monitor daily: visitors, searches, bookings
- Talk to guides (get feedback)
- Analyze search data
- Iterate based on data

---

## SUCCESS CRITERIA

**Minimum (Go/No-Go):**
- 1000 unique visitors Month 1
- 5 confirmed bookings
- Positive guide feedback
- Zero critical bugs

**If YES:** Continue to Month 2 (optimize & scale)  
**If NO:** Analyze why (traffic? conversion? supply?) and pivot

---

## PAYMENT MODEL (To Be Finalized)

**Current thinking:**
- Month 1-3: All tiers FREE (build supply fast)
- Month 4+: Introduce fees
  - Listing: €15/month OR 3% per lead
  - Bookable: 10% commission
  - First 100 guides: Grandfathered free

**Alternative:** Launch with commission-only (10%) from Day 1

**Decision:** Make after talking to first 20 guides

---

## VALIDATION RULES

### Guide Profile
```
name: 3-50 chars (required)
bio: 50-1000 chars
phone: valid format
country: enum (Norway|Sweden|Iceland) (required)
species: min 1, max 10 (required)
techniques: min 1, max 5 (required)
languages: min 1 (required)
price_per_day: €50-€1000 (required for bookable)
photos: min 1, max 10, <5MB each
```

### Booking
```
start_date: >= tomorrow (required)
end_date: > start_date, max 14 days (required)
number_of_people: 1-6 (required)
customer_name: 2-100 chars (required)
customer_email: valid email (required)
```

---

## ANTI-PATTERNS (Don't Do This)

```
❌ Add features not in scope
❌ Over-engineer (keep it simple)
❌ Premature optimization
❌ Build for 1M users (build for 1000)
❌ Ignore validation rules
❌ Skip error handling
❌ Hardcode values
❌ Commit secrets to git
```

---

## RISKS & MITIGATION

**Risk: No supply (guides won't join)**
- Mitigation: Talk to 20 guides BEFORE building
- Pre-commit 10 guides before launch
- Make listing FREE Month 1-3

**Risk: No demand (customers won't book)**
- Mitigation: Collect 100 email signups before launch
- Small paid ads test (€200)
- Focus ONE segment first (Germans seeking salmon)

---

## DEFINITION OF DONE

```
✅ All pages load without errors
✅ Search works with all filter combinations
✅ 30 guide profiles live (mix of tiers)
✅ Contact form sends emails
✅ Booking flow works (test payment)
✅ Mobile responsive
✅ No console errors
✅ Deployed to fjordanglers.com
✅ SSL active
✅ Analytics tracking
✅ Admin can approve guides
```

---

**If it's not in this document, don't build it. Ship MVP fast, iterate later.**
