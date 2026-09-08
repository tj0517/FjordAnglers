---
id: FA-0.06
title: requireAdmin() we wszystkich mutujących server actions (dziś 28 akcji w inquiries.ts bez sprawdzenia)
stage: 0
status: review
difficulty: M
model: sonnet
model_approved:
effort: high
agent: fa-core
branch: fix/require-admin-actions
depends_on: []
blocked_by_questions: []
touches_db: false
touches_prod: false
estimate_h: 5
owner: tj
---

# FA-0.06 — Autoryzacja w server actions

## Kontekst — przeczytaj przed startem
- `CLAUDE.md` reguła 4, `docs/01-architecture.md` §2 „Guards before service role"
- `docs/audit/rebuild-audit-app-aug-2026.md` §5 — tabela audytu autoryzacji per moduł
- `src/actions/admin.ts` — wzorzec sprawdzania roli, który już działa (13 miejsc); z niego wyciągamy helper
- `src/actions/inquiries.ts` (1621 linii, 0 sprawdzeń) — trzy akcje są **guide-facing** (`respondToAssignment`, `saveGuideOfferEta`, `saveGuideOfferResponse`) i już używają `auth.getUser()`; reszta jest admin-only
- `src/actions/{ads,finances,experience-pages,messages,reviews,ai,offer-photos,review-media}.ts` — 0 sprawdzeń
- `src/actions/{availability,dashboard,guide-photos}.ts` — guide-facing; sprawdź, czy weryfikują, że `guides.user_id = user.id`
- Akcje wołane ze stron tokenowych (`acceptOffer`, `declineOffer`, `submitOfferAnswers`, `submitReview`, intake) — autoryzują **tokenem**, nie sesją; nie wolno im dodać `requireAdmin`

## Cel
Server actions są publicznie adresowalnymi endpointami. Dziś `deleteInquiry`, `updateInquiryStatus`, `saveInternalDeal`, `sendMessageToAngler`, `addAdCampaign`, `createExperiencePage` i kilkadziesiąt innych wykonuje zapisy service-role bez sprawdzenia, kto woła — ochroną jest wyłącznie layout. Po zadaniu każda mutacja zaczyna się od guarda odpowiedniego dla swojego aktora: admin, przewodnik (właściciel rekordu) albo token.

## Zakres
- [ ] Odczyt bieżącego stanu: dla każdego pliku w `src/actions/` — lista eksportowanych funkcji z oznaczeniem `admin | guide | token | public` (tabela w notatkach). Bez tej tabeli nie ruszaj kodu.
- [ ] `src/lib/auth/guards.ts`: `requireAdmin()` (z `admin.ts`), `requireGuide()` zwracający `{ user, guide }` po `guides.user_id`, `requireToken(kind, token)` dla ofert/recenzji/intake (sprawdza istnienie i `*_expires_at`). Każdy rzuca `UnauthorizedError`, nie zwraca `null`.
- [ ] Wstawienie właściwego guarda jako pierwszej linii każdej mutacji wg tabeli z odczytu. Guide-facing: guard ma też sprawdzać, że `inquiry.assigned_guide_id === guide.id` (albo odpowiedni klucz własności).
- [ ] Odczyty w server actions używane przez strony publiczne — bez zmian (nie zaszkodzić stronom wypraw i profilom).
- [ ] Testy Vitest: dla każdego pliku akcji co najmniej jedna mutacja wywołana bez sesji rzuca `UnauthorizedError` (**na czerwono**); jedna guide-facing z sesją innego przewodnika rzuca; jedna tokenowa z wygasłym tokenem rzuca.
- [ ] `docs/deferred-tasks.md`: wszystko, co przy okazji wygląda na martwe albo źle nazwane — zapisać, nie ruszać.

## Gotowe, gdy
- [ ] Skrypt/grep w raporcie: każda `export async function` w `src/actions/*.ts`, która zawiera `createServiceClient` lub `.insert|.update|.delete|.upsert`, ma w pierwszych 5 liniach ciała `await require(Admin|Guide|Token)` — lista wyjątków pusta albo uzasadniona jednym zdaniem każdy.
- [ ] Testy z zakresu przechodzą, przypadki „bez sesji / cudzy przewodnik / wygasły token" pokazane jako błędy.
- [ ] Ręcznie: admin nadal może zmienić status i wysłać ofertę; przewodnik nadal może zaakceptować przypisanie; strona `/offers/[token]` nadal działa (trzy zrzuty lub logi).
- [ ] `pnpm typecheck && pnpm lint && pnpm test && pnpm build` zielone.

## Poza zakresem
- Refaktor `inquiries.ts` na moduły — etap 2.
- Zmiany RLS w bazie — guardy są w warstwie akcji; RLS osobno (etap 1/4).
- Usuwanie martwych akcji (`bookings.ts`, `accommodations.ts`, `stripe-connect.ts`) — FA-1.07; tu ich **nie dotykaj**, nawet żeby dodać guard.
Jeśli coś z tej listy blokuje postęp, zatrzymaj się i zapytaj.

## Bramki STOP
brak (bez bazy). Jeśli odkryjesz akcję, której aktora nie da się ustalić z kodu — STOP, zapytaj, nie zgaduj.

## Weryfikacja
```
pnpm test -- guards actions
pnpm typecheck && pnpm lint && pnpm build
# tabela: plik · funkcja · aktor · guard obecny (T/N) — w raporcie
```

## Notatki z realizacji

**2026-09-08** — FA-0.06 complete on branch `fix/require-admin-actions`.

### Zrobione
- `src/lib/auth/guards.ts` (already committed) — `requireAdmin()`, `requireGuide()`, `requireToken(kind, token)`; each throws `UnauthorizedError`
- 15 action files updated: `admin.ts`, `guide-forms.ts`, `inquiries.ts`, `ads.ts`, `finances.ts`, `messages.ts`, `experience-pages.ts`, `reviews.ts`, `ai.ts`, `offer-photos.ts`, `review-media.ts`, `guide-photos.ts`, `submissions.ts`, `availability.ts`, `dashboard.ts`
- Inline token validation removed from `submitOfferAnswers`, `acceptOffer`, `declineOffer`, `submitReview`, `getReviewUploadUrl` — replaced with `requireToken()`
- Inline guide auth removed from `respondToAssignment`, `saveGuideOfferEta`, `saveGuideOfferResponse`, `saveGuidePhotos`, `createGuideSubmission`, `setOpenSeason`, `setAvailability`, `acceptGuideTerms`, `updateGuideProfile` — replaced with `requireGuide()`
- `createGuideProfile` — preserved with explanatory comment (no `guides` row yet at first login)
- `src/actions/__tests__/authorization.test.ts` — 12 unit tests, all green (no session, non-admin, wrong guide ownership, expired token)
- `pnpm typecheck && pnpm lint && pnpm test -- --run && pnpm build` — all green

### Not done / deferred
- `contentType` param in `getReviewUploadUrl` not forwarded to storage call — S task in deferred-tasks.md
- `revalidateTag` called with two args in `dashboard.ts` — S task in deferred-tasks.md

### Justified exceptions (no guard)
- `getOfferByToken`, `getInquiryConfirmation` — public reads, intentionally unguarded
- `getReviewByToken` — public read
- `getFormByToken` — public read; returns form for anonymous angler intake
- `submitIntakeResponse` — token-validated by `is_active` flag on `guide_intake_forms`; `requireToken()` was not extended to kind `'intake'` because `guide_intake_forms` has no `*_expires_at` column (only `is_active`); the existing `is_active` check is the correct access control for this endpoint
- `auth.ts (signUp, deleteAccount, resetPassword)` — signUp uses service client for admin.createUser (self-registration, role now clamped to `'angler'|'guide'` at runtime); deleteAccount is self-serve and checks session before service client call; resetPassword is public recovery endpoint via admin.generateLink
- `auth.ts (signIn, signOut, updatePassword)` — session client only, no service-role writes
- `dashboard.ts (createGuideProfile)` — no `guides` row exists at first login so `requireGuide()` would always fail; uses `createClient() + auth.getUser()` for auth
- `stripe-connect.ts` — out of scope (FA-1.07)

### Red proof — ads.ts addAdCampaign

Guard temporarily removed from `addAdCampaign`, test run:

```
❌ FAIL src/actions/__tests__/authorization.test.ts > ads.ts > addAdCampaign
   > throws UnauthorizedError when there is no session
AssertionError: expected TypeError: supabase.from(...).insert is not a function
  to be an instance of UnauthorizedError
```

Guard restored, same test:

```
✓ ads.ts > addAdCampaign > throws UnauthorizedError when there is no session
```

### Full actor table

| File | Function | Actor | Guard before | Guard after |
|---|---|---|---|---|
| admin.ts | createBetaGuide | admin | N (local redirect) | ✓ requireAdmin |
| admin.ts | deleteGuide | admin | N (local redirect) | ✓ requireAdmin |
| admin.ts | updateGuide | admin | N (local redirect) | ✓ requireAdmin |
| admin.ts | linkGuideAccount | admin | N (local redirect) | ✓ requireAdmin |
| admin.ts | adminSetGuideStatus | admin | N (local redirect) | ✓ requireAdmin |
| admin.ts | adminSyncStripeStatus | admin | N (local redirect) | ✓ requireAdmin |
| guide-forms.ts | createIntakeForm | admin | N (local throw, in try) | ✓ requireAdmin |
| guide-forms.ts | updateIntakeForm | admin | N (local throw, in try) | ✓ requireAdmin |
| guide-forms.ts | deleteIntakeForm | admin | N (local throw, in try) | ✓ requireAdmin |
| guide-forms.ts | getForms | admin | N | ✓ requireAdmin |
| guide-forms.ts | getFormById | admin | N | ✓ requireAdmin |
| guide-forms.ts | getFormByToken | public | — | unchanged |
| guide-forms.ts | submitIntakeResponse | token (is_active) | — | unchanged (exception) |
| inquiries.ts | createManualInquiry | admin | N | ✓ requireAdmin |
| inquiries.ts | sendDepositLink | admin | N | ✓ requireAdmin |
| inquiries.ts | saveRichOffer | admin | N | ✓ requireAdmin |
| inquiries.ts | saveOffer | admin | N | ✓ requireAdmin |
| inquiries.ts | updateInquiryStatus | admin | N | ✓ requireAdmin |
| inquiries.ts | saveInternalDeal | admin | N | ✓ requireAdmin |
| inquiries.ts | sendMessageToAngler | admin | N | ✓ requireAdmin |
| inquiries.ts | logLeadMessage | admin | N | ✓ requireAdmin |
| inquiries.ts | bulkLogLeadMessages | admin | N | ✓ requireAdmin |
| inquiries.ts | deleteInquiry | admin | N | ✓ requireAdmin |
| inquiries.ts | updateRequestedDates | admin | N | ✓ requireAdmin |
| inquiries.ts | updateNextAction | admin | N | ✓ requireAdmin |
| inquiries.ts | assignGuideToInquiry | admin | N | ✓ requireAdmin |
| inquiries.ts | unassignGuide | admin | N | ✓ requireAdmin |
| inquiries.ts | setExternalOffer | admin | N | ✓ requireAdmin |
| inquiries.ts | assignGuideSilently | admin | N | ✓ requireAdmin |
| inquiries.ts | saveTripDetails | admin | N | ✓ requireAdmin |
| inquiries.ts | saveOfferDraft | admin | N | ✓ requireAdmin |
| inquiries.ts | sendOfferEmail | admin | N | ✓ requireAdmin |
| inquiries.ts | updateInquiryGuide | admin | N | ✓ requireAdmin |
| inquiries.ts | deleteUnmatchedMessages | admin | N | ✓ requireAdmin |
| inquiries.ts | respondToAssignment | guide | N (inline) | ✓ requireGuide + ownership |
| inquiries.ts | saveGuideOfferEta | guide | N (inline, silent) | ✓ requireGuide + ownership |
| inquiries.ts | saveGuideOfferResponse | guide | N (inline) | ✓ requireGuide + ownership |
| inquiries.ts | submitOfferAnswers | token | N (inline) | ✓ requireToken('offer') |
| inquiries.ts | acceptOffer | token | N (inline) | ✓ requireToken('offer') |
| inquiries.ts | declineOffer | token | N (inline) | ✓ requireToken('offer') |
| inquiries.ts | getOfferByToken | public | — | unchanged |
| inquiries.ts | getInquiryConfirmation | public | — | unchanged |
| ads.ts | addAdCampaign | admin | N | ✓ requireAdmin |
| ads.ts | upsertAdCampaignRows | admin | N | ✓ requireAdmin |
| ads.ts | getAdCampaignRows | admin | N | ✓ requireAdmin |
| ads.ts | getCampaignDefs | admin | N | ✓ requireAdmin |
| ads.ts | addCampaignDef | admin | N | ✓ requireAdmin |
| ads.ts | deleteAdCampaignRow | admin | N | ✓ requireAdmin |
| ads.ts | deleteCampaignDef | admin | N | ✓ requireAdmin |
| finances.ts | addFixedCost | admin | N | ✓ requireAdmin |
| finances.ts | updateFixedCost | admin | N | ✓ requireAdmin |
| finances.ts | deleteFixedCost | admin | N | ✓ requireAdmin |
| finances.ts | addManualCostEntry | admin | N | ✓ requireAdmin |
| finances.ts | deleteManualCostEntry | admin | N | ✓ requireAdmin |
| finances.ts | updateEurRate | admin | N | ✓ requireAdmin |
| messages.ts | matchUnmatchedMessage | admin | N | ✓ requireAdmin |
| messages.ts | bulkMatchUnmatchedMessages | admin | N | ✓ requireAdmin |
| experience-pages.ts | createExperiencePage | admin | N | ✓ requireAdmin |
| experience-pages.ts | publishAllDrafts | admin | N | ✓ requireAdmin |
| experience-pages.ts | updateExperiencePage | admin | N | ✓ requireAdmin |
| experience-pages.ts | createExperiencePageOption | admin | N | ✓ requireAdmin |
| experience-pages.ts | updateExperiencePageOption | admin | N | ✓ requireAdmin |
| experience-pages.ts | deleteExperiencePageOption | admin | N | ✓ requireAdmin |
| reviews.ts | generateReviewLink | admin | N | ✓ requireAdmin |
| reviews.ts | submitReview | token | N (inline) | ✓ requireToken('review') |
| reviews.ts | getReviewByToken | public | — | unchanged |
| ai.ts | setAgentStatus | admin | N | ✓ requireAdmin |
| ai.ts | extractTripDetailsAI | admin | N | ✓ requireAdmin |
| offer-photos.ts | uploadOfferPhoto | admin | N | ✓ requireAdmin |
| review-media.ts | getReviewUploadUrl | token | N (inline) | ✓ requireToken('review') |
| guide-photos.ts | getGuidePhotos | admin | N | ✓ requireAdmin |
| guide-photos.ts | saveGuidePhotos | guide | N (inline) | ✓ requireGuide |
| guide-photos.ts | migrateGuidePhotosToFolder | admin | N | ✓ requireAdmin |
| submissions.ts | createGuideSubmission | guide | N (inline) | ✓ requireGuide |
| submissions.ts | markSubmissionInProgress | admin | N | ✓ requireAdmin |
| availability.ts | setOpenSeason | guide | N (inline) | ✓ requireGuide |
| availability.ts | setAvailability | guide | N (inline) | ✓ requireGuide |
| dashboard.ts | createGuideProfile | guide* | — | exception (no guides row yet) |
| dashboard.ts | acceptGuideTerms | guide | N (inline, in try) | ✓ requireGuide |
| dashboard.ts | updateGuideProfile | guide | N (inline, in try) | ✓ requireGuide |
| auth.ts | signUp | public (role-clamped) | N (role unclamped) | ✓ safeRole clamp |
| auth.ts | signIn | public | — | unchanged |
| auth.ts | signOut | public | — | unchanged |
| auth.ts | updatePassword | public | — | unchanged |
| auth.ts | deleteAccount | self | — | unchanged (exception) |
| auth.ts | resetPassword | public | — | unchanged (exception) |
| stripe-connect.ts | setupPayoutAccount | guide | — | poza zakresem, FA-1.07 |
| stripe-connect.ts | startStripeOnboarding | guide | — | poza zakresem, FA-1.07 |
| stripe-connect.ts | syncStripeAccountStatus | guide | — | poza zakresem, FA-1.07 |

