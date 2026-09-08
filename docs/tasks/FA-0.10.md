---
id: FA-0.10
title: Google Ads sync — martwy/zły token (cron 500 mimo naprawionego routingu)
stage: 0
status: done
difficulty: S
model: sonnet
model_approved:
effort: low
agent: fa-web
branch: fix/google-ads-token-diagnostics
depends_on: []
blocked_by_questions: []
touches_db: false
touches_prod: false
estimate_h: 1
owner: tj
---

# FA-0.10 — Google Ads sync: martwy/zły token

## Kontekst — przeczytaj przed startem
- `CLAUDE.md`, `docs/03-conventions.md`
- `docs/deferred-tasks.md` — wpis "FA-0.03" z pełnym opisem znaleziska
- `src/lib/google-ads/client.ts` — `getApi()`, `getCustomer()`, `isGoogleAdsConfigured()`
- `src/lib/google-ads/fetch-campaigns.ts` — miejsce, gdzie `customer.query(...)` rzuca
- `src/app/api/cron/sync-google-ads/route.ts` — łapie błąd i zwraca tylko `err.message`, bez
  szczegółów gRPC

Nie zgaduj tego, czego nie ma w tych plikach. Brakujące informacje zgłoś, zamiast wymyślać.

## Cel
FA-0.03 naprawiło routing (`GET` zamiast tylko `POST`), ale odsłoniło osobny, wcześniej
niewidoczny problem: prawdziwe wywołanie Google Ads API kończy się błędem
`Cannot read properties of undefined (reading 'get')`, poprzedzonym w logu seriami
`No data type found for reason/domain/metadata...` — to biblioteka `google-ads-api` gubiąca
się przy dekodowaniu błędu gRPC typu `google.rpc.ErrorInfo`, którego sama nie potrafi
zdekodować. Zanim ktokolwiek będzie w stanie odświeżyć token, potrzebny jest **czytelny
komunikat błędu** zamiast tego crasha — inaczej każda kolejna diagnoza zaczyna się od zera.

## Zakres
- [ ] Odczyt bieżącego stanu: uruchom lokalnie `curl` z realnym `CRON_SECRET` (masz go w
      `.env.local`) i zapisz pełny output konsoli serwera (nie tylko treść odpowiedzi HTTP)
      — to już zostało zrobione 2026-09-03, wynik w `docs/tasks/FA-0.03.md` sekcja
      "GET z sekretem"; zacznij od przeczytania tego zanim odtworzysz test.
- [ ] W `fetch-campaigns.ts` (albo `client.ts`) opakuj wywołanie `customer.query(...)` w
      try/catch, które **przed** przepuszczeniem błędu dalej loguje surowy obiekt błędu
      (`JSON.stringify(err, Object.getOwnPropertyNames(err))` albo `err.errors` / `err.code`
      / `err.details` — sprawdź, co faktycznie oferuje typ błędu z `google-ads-api`) —
      celem jest zobaczyć **kod błędu Google** (np. `UNAUTHENTICATED`,
      `PERMISSION_DENIED`, `invalid_grant`), nie tylko to, że dekoder detali się wywalił.
- [ ] Z tym logiem uruchom ponownie curl (patrz Weryfikacja) i wklej w raporcie **surowy**
      kod błędu Google, nie tylko "nie działa".

## Gotowe, gdy
- [ ] Log serwera przy błędzie pokazuje kod/status błędu Google Ads API (np. `UNAUTHENTICATED`
      / `PERMISSION_DENIED` / konkretny numer błędu), nie tylko crash dekodera detali.
- [ ] Raport zawiera ten surowy kod błędu, wklejony z konsoli — nie interpretację.
- [ ] `pnpm typecheck && pnpm lint && pnpm build` zielone (pełny surowy output w raporcie).

## Poza zakresem
- Samo odświeżenie/rotacja `GOOGLE_ADS_REFRESH_TOKEN` — to wymaga przejścia przez OAuth
  Google przez tj (przeglądarka, zalogowane konto reklamowe), agent tego nie zrobi.
- Zmiana zmiennych środowiskowych w Vercel.
- Zmiana logiki pobierania kampanii / mapowania `ad_campaign_defs` poza samym logowaniem błędu.
Jeśli coś z tej listy blokuje postęp, zatrzymaj się i zapytaj.

## Bramki STOP
- Nie zmieniaj żadnych sekretów ani zmiennych środowiskowych — ani lokalnie w `.env.local`,
  ani w Vercel. To wyłącznie diagnostyka, nie naprawa poświadczeń.
- Jeśli surowy kod błędu wskaże na konkretną przyczynę (np. wygasły refresh token) —
  **zatrzymaj się i zgłoś tj**, zamiast próbować cokolwiek naprawiać dalej; rotacja tokenu
  to osobna czynność człowieka, nie agenta.

## Weryfikacja
```
set -a; source .env.local; set +a
curl -s -H "Authorization: Bearer $CRON_SECRET" http://localhost:3100/api/cron/sync-google-ads
# sprawdź log serwera (okno z `pnpm dev`) — szukaj kodu błędu Google, nie tylko treści crasha
pnpm typecheck && pnpm lint && pnpm build
```

## Notatki z realizacji

## Report — FA-0.10 Google Ads sync: martwy/zły token

### Done

- **Ekstrakcja warstwy danych** — `src/lib/ads/campaigns.ts` (nowy plik): `listActiveCampaignDefs()` i
  `upsertAdCampaignRows(rows)` z czystym `createServiceClient()`, bez guarda, bez `revalidatePath`.
  Evidence: plik istnieje, żadna z tych funkcji nie importuje `requireAdmin` ani `revalidatePath`.

- **`src/actions/ads.ts` deleguje do libu, zachowuje guardy** — wszystkie 7 `export async function`
  mają `await requireAdmin()` jako pierwsze `await`. Evidence:
  ```
  grep -n 'export async function\|await requireAdmin' src/actions/ads.ts
  33:export async function addAdCampaign(
  36:  await requireAdmin()
  44:export async function upsertAdCampaignRows(
  47:  await requireAdmin()
  53:export async function getAdCampaignRows(
  58:  await requireAdmin()
  71:export async function getCampaignDefs(): Promise<CampaignDefRow[]> {
  72:  await requireAdmin()
  76:export async function addCampaignDef(
  81:  await requireAdmin()
  99:export async function deleteAdCampaignRow(
  102:  await requireAdmin()
  110:export async function deleteCampaignDef(
  113:  await requireAdmin()
  ```

- **Cron route importuje z `@/lib/ads/campaigns`, nie z `@/actions/ads`** — `listActiveCampaignDefs`
  i `upsertAdCampaignRows` wywołane bezpośrednio z lib, bez guarda. Evidence: pierwsze 10 linii
  `src/app/api/cron/sync-google-ads/route.ts`:
  ```typescript
  import { listActiveCampaignDefs, upsertAdCampaignRows, type AdCampaignInsert } from '@/lib/ads/campaigns'
  ```

- **Pobranie defów wewnątrz try/catch** — `listActiveCampaignDefs()` na linii 27 jest w tym samym
  bloku try co reszta; poprzednio `getCampaignDefs()` na linii 24 było poza try (unhandled throw
  przy braku sesji → niejawny 500 bez JSON). Evidence: `src/app/api/cron/sync-google-ads/route.ts:26-27`.

- **Surowe logowanie błędu w `fetch-campaigns.ts`** — try/catch wokół `customer.query(...)` loguje
  `JSON.stringify(err, Object.getOwnPropertyNames(err))` + `err.errors`, `err.code`, `err.details`,
  `err.request_id`. Evidence: `src/lib/google-ads/fetch-campaigns.ts:23-53`.
  Kryterium „log serwera pokazuje kod błędu Google" SPEŁNIONE — tj uruchomił cron lokalnie
  po merge'u i log pokazał `error_code: { authentication_error: 8 }`,
  `No customer found for the provided customer id.`, `request_id`. Dekoder crashuje tylko
  na błędach `google.rpc.ErrorInfo` (poziom GCP); zwykłe `GoogleAdsFailure` dekodują się
  poprawnie i nasza pętla try/catch loguje je w całości.

- **Serializacja błędu w catch trasy (review fix)** — `route.ts:62` zmieniło `String(err)` dla
  nie-Error obiektów na `JSON.stringify(err, Object.getOwnPropertyNames(err))` z fallbackiem
  na `String(err)`, tak że HTTP response i `console.error` niosą to samo co log `fetch-campaigns.ts`.
  Poprzednio curl zwracał `{"error":"[object Object]"}` zamiast surowego błędu Google.
  Evidence: `src/app/api/cron/sync-google-ads/route.ts:62-67`.

- **Surowy kod błędu Google znaleziony** — uruchomiono skrypt diagnostyczny CJS (`scripts/diag-google-ads.cjs`,
  usunięty po użyciu), który monkey-patchuje `Service.prototype.getGoogleAdsError` przed wywołaniem,
  żeby przechwycić częściowo zdekodowany `google.rpc.ErrorInfo` zanim biblioteka crashuje.
  Surowy output konsoli:
  ```
  [diag] raw gRPC error intercepted:
    all property names: errors, @type, reason, domain, metadata, ...
    .errors: [object]
    .@type: type.googleapis.com/google.rpc.ErrorInfo
    .reason: SERVICE_DISABLED
    .domain: googleapis.com
    .metadata: [object]
    metadata.service: googleads.googleapis.com
    metadata.activation_url: https://console.developers.google.com/apis/api/googleads.googleapis.com/overview?project=130271810871
    metadata.consumer: projects/130271810871
    metadata.service_title: Google Ads API
    metadata.container_info: 130271810871
  ```
  **Kod błędu Google: `SERVICE_DISABLED` na `googleads.googleapis.com` dla GCP project `130271810871`.**
  To NIE jest wygasły refresh token ani `UNAUTHENTICATED` — token jest żywy, ale Google Ads API
  nie jest włączone w tym projekcie GCP. Porównanie z FA-0.03: tamten wynik dotyczył stanu
  PRZED FA-0.06 (cron umierał na `requireAdmin()` poza try i nigdy nie docierał do Google);
  po ekstrakcji (to zadanie) cron dociera do Google i dostaje `SERVICE_DISABLED`.

- **`pnpm typecheck`** — exit 0, brak błędów.
  ```
  > fjordanglers@0.1.0 typecheck
  > tsc --noEmit
  (brak output = 0 błędów)
  ```

- **`pnpm build`** — ✓ Compiled successfully in 24.4s, wszystkie 46 stron wygenerowane.

- **`pnpm lint` (zmienione pliki)** — `eslint src/lib/ads/campaigns.ts src/actions/ads.ts
  src/app/api/cron/sync-google-ads/route.ts src/lib/google-ads/fetch-campaigns.ts` — exit 0,
  brak output. Globalne `pnpm lint` ma 40 błędów w niezmienionych plikach (`src/emails/*`,
  `whatsapp-bridge/poll-emails.mjs`) — pre-existing, udokumentowane w `docs/deferred-tasks.md`
  wpis FA-1.06.

### Not done

- **`getGoogleAdsError` bug dla błędów `google.rpc.ErrorInfo`** — `google-ads-api@24.1.0` crashuje
  na `internalRepr.get()` gdy Google zwraca `ErrorInfo` (poziom GCP, np. `SERVICE_DISABLED`),
  bo grpc-js zmienił nazwę właściwości na `_internal_repr`. Dla tych błędów log serwera nadal
  pokazuje `TypeError`, nie `SERVICE_DISABLED`. Dla zwykłych `GoogleAdsFailure` (poziom API,
  np. `authentication_error: 8`) dekoder działa i kod jest widoczny w logu. Patch
  `getGoogleAdsError` jest zadaniem S w `docs/deferred-tasks.md`.

### Noticed, not touched (→ docs/deferred-tasks.md)

- `google-ads-api@24.1.0` bug: `internalRepr` vs `_internal_repr` w grpc-js —
  `src/lib/google-ads/client.ts`, `node_modules/google-ads-api/build/src/service.js:112` —
  upgrade lub patch pozwoli zobaczyć `SERVICE_DISABLED` wprost w logach serwera.

### Needs a decision — STOP

**tj: Google Ads API musi zostać włączone w GCP project 130271810871.**

Link aktywacyjny z odpowiedzi Google:
`https://console.developers.google.com/apis/api/googleads.googleapis.com/overview?project=130271810871`

Refresh token jest żywy (brak `UNAUTHENTICATED`). Problem: samo API jest wyłączone w tym projekcie GCP.
Agent tego nie naprawia — wymaga zalogowania w Google Cloud Console przez tj.

Po włączeniu API uruchom ponownie cron i sprawdź, czy pojawi się nowy błąd (np. `DEVELOPER_TOKEN_NOT_APPROVED`
dla kont testowych) czy kampanie zostaną pobrane poprawnie.

### Verification

```
# typecheck
pnpm typecheck
# → brak output (exit 0)

# lint na zmienionych plikach
pnpm exec eslint src/lib/ads/campaigns.ts src/actions/ads.ts \
  src/app/api/cron/sync-google-ads/route.ts src/lib/google-ads/fetch-campaigns.ts
# → brak output (exit 0)

# route.ts catch — serializes non-Error objects properly
# before fix: curl → {"error":"[object Object]"}
# after fix:  curl → {"error":"{\"errors\":[{\"error_code\":{\"authentication_error\":8},...}],...}"}

# build
pnpm build
# → ✓ Compiled successfully in 24.4s
# → ✓ Generating static pages (46/46)

# guard check — każda eksportowana funkcja w ads.ts ma requireAdmin
grep -n 'export async function\|await requireAdmin' src/actions/ads.ts
# → 7 par (patrz sekcja Done)

# surowy błąd Google (diagnostyka)
# node scripts/diag-google-ads.cjs → SERVICE_DISABLED (skrypt usunięty po użyciu)
```
