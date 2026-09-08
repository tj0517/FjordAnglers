/**
 * Data-layer functions for ad campaigns and campaign definitions.
 *
 * These functions call the service-role Supabase client directly.
 * They carry NO authorization guard and NO revalidatePath — they are
 * pure data access, safe to call from cron routes that have no session.
 *
 * Admin-facing mutations must go through src/actions/ads.ts which wraps
 * these functions with requireAdmin() + revalidatePath('/admin/ads').
 */

import { createServiceClient } from '@/lib/supabase/server'

// ─── Types (canonical definitions — re-exported from src/actions/ads.ts) ──────

export interface AdCampaignInsert {
  date: string
  platform: string
  campaign_name: string
  spend: number
  impressions: number
  clicks: number
  avg_cpc: number
}

export interface CampaignDefRow {
  id: string
  created_at: string
  key: string
  name: string
  platform: 'google_ads' | 'meta'
  sort_order: number
  active: boolean
  google_campaign_id?: string | null
}

// ─── listActiveCampaignDefs ────────────────────────────────────────────────────

/**
 * Returns all active campaign definitions ordered by sort_order.
 * Used by the cron route to map Google campaign IDs to internal keys.
 */
export async function listActiveCampaignDefs(): Promise<CampaignDefRow[]> {
  const svc = createServiceClient()
  const { data } = await svc
    .from('ad_campaign_defs')
    .select('id, created_at, key, name, platform, sort_order, active, google_campaign_id')
    .eq('active', true)
    .order('sort_order', { ascending: true })
  return (data ?? []) as CampaignDefRow[]
}

// ─── upsertAdCampaignRows ─────────────────────────────────────────────────────

/**
 * Upserts a batch of ad campaign metric rows.
 * No-op when rows is empty.
 */
export async function upsertAdCampaignRows(
  rows: AdCampaignInsert[],
): Promise<{ success: boolean; error?: string }> {
  if (rows.length === 0) return { success: true }
  const svc = createServiceClient()
  const { error } = await svc
    .from('ad_campaigns')
    .upsert(rows, { onConflict: 'date,campaign_name' })
  if (error) return { success: false, error: error.message }
  return { success: true }
}
