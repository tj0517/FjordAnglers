import { getCustomer } from './client'

export interface GoogleCampaignMetrics {
  campaignId: string
  campaignName: string
  status: string
  spendEur: number
  impressions: number
  clicks: number
  avgCpcEur: number
}

/**
 * Fetches campaign-level metrics from Google Ads for a given date.
 * @param date ISO date string (YYYY-MM-DD). Defaults to yesterday.
 */
export async function fetchGoogleAdsCampaigns(
  date?: string,
): Promise<GoogleCampaignMetrics[]> {
  const targetDate = date ?? getYesterday()
  const customer = getCustomer()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rows: any[]
  try {
    rows = await customer.query(`
      SELECT
        campaign.id,
        campaign.name,
        campaign.status,
        metrics.cost_micros,
        metrics.impressions,
        metrics.clicks
      FROM campaign
      WHERE segments.date = '${targetDate}'
        AND campaign.status IN ('ENABLED', 'PAUSED')
    `)
  } catch (err) {
    // Log the raw Google Ads error before re-throwing so the caller can see
    // the actual gRPC status code (UNAUTHENTICATED, PERMISSION_DENIED, etc.)
    // rather than only the secondary crash from the error decoder.
    console.error(
      '[fetchGoogleAdsCampaigns] Google Ads raw error:',
      JSON.stringify(err, Object.getOwnPropertyNames(err)),
    )
    if (err != null && typeof err === 'object') {
      const e = err as Record<string, unknown>
      if (e.errors !== undefined)    console.error('[fetchGoogleAdsCampaigns] errors:',     e.errors)
      if (e.code !== undefined)      console.error('[fetchGoogleAdsCampaigns] code:',       e.code)
      if (e.details !== undefined)   console.error('[fetchGoogleAdsCampaigns] details:',    e.details)
      if (e.request_id !== undefined) console.error('[fetchGoogleAdsCampaigns] request_id:', e.request_id)
    }
    throw err
  }

  return rows.map((row) => {
    const campaign = row.campaign!
    const metrics = row.metrics!
    const costMicros = Number(metrics.cost_micros ?? 0)
    const clicks = Number(metrics.clicks ?? 0)
    const spendEur = Math.round((costMicros / 1_000_000) * 100) / 100
    const avgCpcEur = clicks > 0 ? Math.round((spendEur / clicks) * 100) / 100 : 0
    return {
      campaignId: String(campaign.id ?? ''),
      campaignName: String(campaign.name ?? ''),
      status: String(campaign.status ?? ''),
      spendEur,
      impressions: Number(metrics.impressions ?? 0),
      clicks,
      avgCpcEur,
    }
  })
}

function getYesterday(): string {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() - 1)
  return d.toISOString().slice(0, 10)
}
