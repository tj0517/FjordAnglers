'use server'

/**
 * getReviewUploadUrl
 *
 * Generates a Supabase Storage signed upload URL so the browser can upload
 * directly to object storage — no file bytes pass through the Next.js server.
 *
 * Accepts any image or video type. No size limit imposed on our side;
 * the raw file goes straight to Supabase Storage from the angler's browser.
 */

import { createServiceClient } from '@/lib/supabase/server'
import { requireToken } from '@/lib/auth/guards'

const BUCKET = 'review-media'

export async function getReviewUploadUrl(
  token: string,
  filename: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  contentType: string,
): Promise<{ signedUrl: string; publicUrl: string; path: string } | { error: string }> {
  const { id: reviewId } = await requireToken('review', token)

  const svc = createServiceClient()

  // Build a unique path inside the review's own folder
  const ext = filename.includes('.') ? filename.split('.').pop()!.toLowerCase() : 'bin'
  const path = `${reviewId}/${crypto.randomUUID()}.${ext}`

  const { data, error } = await svc.storage
    .from(BUCKET)
    .createSignedUploadUrl(path)

  if (error != null || data == null) {
    console.error('[getReviewUploadUrl] Storage error:', error)
    return { error: 'Could not prepare upload. Please try again.' }
  }

  const { data: { publicUrl } } = svc.storage
    .from(BUCKET)
    .getPublicUrl(path)

  return {
    signedUrl: data.signedUrl,
    publicUrl,
    path,
  }
}
