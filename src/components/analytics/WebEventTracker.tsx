'use client'

/**
 * WebEventTracker — fires a page_view event on mount.
 *
 * Place once inside a server-component page layout. Fires independently
 * of cookie consent — no personal identifier is sent.
 *
 * path:    window.location.pathname (client reads it on mount)
 * country: destination country passed from the server (experience_pages.country),
 *          NOT the visitor's geolocation.
 * utm_campaign / utm_content: read from window.location.search on this
 *          page load only. Only utm_campaign and utm_content — other params intentionally excluded.
 */

import { useEffect } from 'react'
import { sendWebEvent } from '@/lib/web-events'

interface Props {
  /** Destination country of the page, e.g. 'IS', 'NZ'. Not visitor geolocation. */
  country?: string
}

export function WebEventTracker({ country }: Props) {
  useEffect(() => {
    const path   = window.location.pathname
    const params = new URLSearchParams(window.location.search)

    // utm_campaign and utm_content from the current page URL only.
    // Only utm_campaign and utm_content — other attribution params intentionally excluded.
    const utm_campaign = params.get('utm_campaign') ?? undefined
    const utm_content  = params.get('utm_content')  ?? undefined

    sendWebEvent({ event: 'page_view', path, country, utm_campaign, utm_content })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally empty dep array — fire once on mount only

  return null
}
