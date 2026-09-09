/**
 * Client-side funnel telemetry helper — FA-0.15.
 *
 * Sends events to POST /api/events via navigator.sendBeacon (preferred,
 * survives page unload) with a fetch keepalive fallback.
 *
 * No cookie consent required — no personal identifier is read or sent
 * by this module (no ad-click ids, no browser storage, no session id).
 */

type WebEventName = 'page_view' | 'form_open' | 'form_submit'

interface WebEventPayload {
  event:         WebEventName
  path:          string
  country?:      string
  utm_campaign?: string
  utm_content?:  string
}

/**
 * Fire-and-forget event beacon to /api/events.
 * Uses sendBeacon (Blob, application/json) so the event survives navigation;
 * falls back to fetch keepalive when sendBeacon returns false or is unavailable.
 */
export function sendWebEvent(payload: WebEventPayload): void {
  const data = JSON.stringify(payload)
  const blob = new Blob([data], { type: 'application/json' })

  // Primary: sendBeacon — browser queues it even if the page is closing
  if (typeof navigator !== 'undefined' && navigator.sendBeacon('/api/events', blob)) {
    return
  }

  // Fallback: fetch with keepalive — keeps the request alive past page unload
  void fetch('/api/events', {
    method:    'POST',
    headers:   { 'Content-Type': 'application/json' },
    body:      data,
    keepalive: true,
  }).catch(() => undefined) // fire and forget — telemetry loss is acceptable
}
