-- FA-0.15 — Cookie-consent-independent funnel telemetry
--
-- web_events: one row per event (page_view / form_open / form_submit).
-- No personal identifier stored: path + destination country + device class +
-- campaign params from the page URL only. Server derives device class from
-- request headers; headers are never persisted.
--
-- Insert path: POST /api/events (service-role client — bypasses RLS).
-- Read path:   admin via service-role or direct psql SELECT only.
-- All anon / authenticated access is blocked by RLS default-deny (no policies).

CREATE TABLE IF NOT EXISTS "public"."web_events" (
  "id"             bigserial        PRIMARY KEY,
  "created_at"     timestamptz      NOT NULL DEFAULT now(),
  "event"          text             NOT NULL
                     CHECK (event IN ('page_view', 'form_open', 'form_submit')),
  "path"           text             NOT NULL,
  "country"        text,
  "utm_campaign"   text,
  "utm_content"    text,
  "device"         text
                     CHECK (device IN ('mobile', 'desktop', 'tablet', 'unknown')),
  "referrer_host"  text
);

COMMENT ON TABLE "public"."web_events" IS
  'Cookie-consent-independent funnel telemetry (FA-0.15). '
  'No personal identifier stored (no address, no browser fingerprint, no ad-click id). '
  'Inserted only by the service-role route handler (POST /api/events). '
  'All anon/authenticated access blocked by RLS default-deny (no policies).';

COMMENT ON COLUMN "public"."web_events"."country" IS
  'Destination country of the page as stored in experience_pages.country — '
  'full name, e.g. ''Iceland'', ''New Zealand'', ''Norway''. '
  'Passed from the server, not the visitor''s geolocation.';

COMMENT ON COLUMN "public"."web_events"."utm_campaign" IS
  'utm_campaign from window.location.search at the moment of page_view only. '
  'NULL for form_open and form_submit.';

COMMENT ON COLUMN "public"."web_events"."utm_content" IS
  'utm_content from window.location.search at the moment of page_view only. '
  'NULL for form_open and form_submit.';

-- Index to support web_funnel_daily aggregation
CREATE INDEX "web_events_path_created_at_idx"
  ON "public"."web_events" ("path", "created_at");

-- RLS enabled; no permissive policies → anon and authenticated see nothing
-- and cannot insert. Service role bypasses RLS entirely.
ALTER TABLE "public"."web_events" ENABLE ROW LEVEL SECURITY;

-- web_funnel_daily: aggregated funnel per path per calendar day.
-- Columns: day, path, page_views, form_opens, form_submits
CREATE OR REPLACE VIEW "public"."web_funnel_daily" AS
SELECT
  date_trunc('day', created_at)::date           AS day,
  path,
  COUNT(*) FILTER (WHERE event = 'page_view')   AS page_views,
  COUNT(*) FILTER (WHERE event = 'form_open')   AS form_opens,
  COUNT(*) FILTER (WHERE event = 'form_submit') AS form_submits
FROM "public"."web_events"
GROUP BY 1, 2;

-- security_invoker: the view runs with the caller's role and therefore
-- inherits the RLS default-deny on web_events (anon/authenticated see nothing).
-- Without this the baseline DEFAULT PRIVILEGES grant on tables leaks through.
ALTER VIEW "public"."web_funnel_daily" SET (security_invoker = true);

-- Belt-and-suspenders: revoke any table-level privilege that DEFAULT PRIVILEGES
-- may have already granted for future objects when this migration ran.
REVOKE ALL ON "public"."web_events"       FROM anon, authenticated;
REVOKE ALL ON "public"."web_funnel_daily" FROM anon, authenticated;
