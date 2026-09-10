import { describe, it, expect } from 'vitest'
import { addBusinessDays, formatBusinessDay } from './business-days'

describe('addBusinessDays (Europe/Warsaw)', () => {
  // 2026-09-11 = Friday, 2026-09-12 = Saturday, 2026-09-09 = Wednesday

  it('Friday 15:00 → Tuesday', () => {
    const fri = new Date('2026-09-11T13:00:00Z') // 15:00 CEST (UTC+2)
    expect(formatBusinessDay(addBusinessDays(fri, 2, 'Europe/Warsaw'))).toBe('Tuesday, 15 September')
  })

  it('Saturday → Wednesday (snaps to Monday, then +Tue +Wed)', () => {
    const sat = new Date('2026-09-12T12:00:00Z')
    expect(formatBusinessDay(addBusinessDays(sat, 2, 'Europe/Warsaw'))).toBe('Wednesday, 16 September')
  })

  it('Wednesday → Friday', () => {
    const wed = new Date('2026-09-09T12:00:00Z')
    expect(formatBusinessDay(addBusinessDays(wed, 2, 'Europe/Warsaw'))).toBe('Friday, 11 September')
  })

  it('DST boundary — last Sunday of October 2026 (clocks back at 03:00 CEST → 02:00 CET)', () => {
    // Oct 25 2026 = Sunday; clocks go back at 01:00 UTC
    // Noon UTC = 13:00 CEST (before) / 12:00 CET (after) — either way: Sunday Oct 25 in Warsaw
    const dst = new Date('2026-10-25T10:00:00Z')
    // Sunday → snap to Monday Oct 26 → +Tue Oct 27 → +Wed Oct 28
    expect(formatBusinessDay(addBusinessDays(dst, 2, 'Europe/Warsaw'))).toBe('Wednesday, 28 October')
  })
})
