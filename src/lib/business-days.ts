export interface BusinessDay {
  year:  number
  month: number  // 1-based
  day:   number
}

function localDateStr(date: Date, tz: string): string {
  return date.toLocaleDateString('en-CA', { timeZone: tz })
}

function parseDate(str: string): BusinessDay {
  const [y, m, d] = str.split('-').map(Number)
  return { year: y, month: m, day: d }
}

function addOneDay(d: BusinessDay): BusinessDay {
  const js = new Date(Date.UTC(d.year, d.month - 1, d.day + 1))
  return { year: js.getUTCFullYear(), month: js.getUTCMonth() + 1, day: js.getUTCDate() }
}

function isWeekend(d: BusinessDay): boolean {
  const wd = new Date(Date.UTC(d.year, d.month - 1, d.day)).getUTCDay()
  return wd === 0 || wd === 6
}

/**
 * Returns the BusinessDay that is `n` business days (Mon–Fri) after `date` in `tz`.
 * If `date` falls on a weekend it first snaps forward to Monday, then advances `n` more days.
 * No holiday calendar — only Mon–Fri is excluded.
 *
 * Examples (all Europe/Warsaw):
 *   Friday 15:00  + 2  →  Tuesday
 *   Saturday      + 2  →  Wednesday  (snap to Mon, then +Tue +Wed)
 *   Wednesday     + 2  →  Friday
 */
export function addBusinessDays(date: Date, n: number, tz: string): BusinessDay {
  let cur = parseDate(localDateStr(date, tz))
  while (isWeekend(cur)) cur = addOneDay(cur)
  for (let i = 0; i < n; i++) {
    cur = addOneDay(cur)
    while (isWeekend(cur)) cur = addOneDay(cur)
  }
  return cur
}

/** Formats a BusinessDay as e.g. "Tuesday, 15 September". */
export function formatBusinessDay(d: BusinessDay): string {
  const js       = new Date(Date.UTC(d.year, d.month - 1, d.day))
  const weekday  = js.toLocaleDateString('en-GB', { timeZone: 'UTC', weekday: 'long' })
  const dayMonth = js.toLocaleDateString('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'long' })
  return `${weekday}, ${dayMonth}`
}
