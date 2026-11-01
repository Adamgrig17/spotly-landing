import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Season comes from GET ${BRAND_API_URL}/brand/season.json.
 * Production: https://api.parkspotly.gr
 * Preview: https://staging-api.parkspotly.gr
 * Set BRAND_API_URL in the host. It is not committed.
 */
export const SEASONS = ['christmas', 'new-year', 'march-25', 'easter', 'october-28', 'default'] as const;

export type Season = (typeof SEASONS)[number];

const PAGE_MARK = '/logo.png';
const FAVICON = '/icon.png';

const FOLDER = /^(christmas|march-25|easter|october-28|new-year-\d{4})$/;

export function isSeason(value: unknown): value is Season {
  return typeof value === 'string' && (SEASONS as readonly string[]).includes(value);
}

/** Server season. Any missing config, bad response, or network error is "default". */
export async function getSeason(): Promise<Season> {
  const base = process.env.BRAND_API_URL?.trim().replace(/\/+$/, '');
  if (!base) return 'default';
  try {
    const response = await fetch(`${base}/brand/season.json`, {
      next: { revalidate: 600 },
    });
    if (!response.ok) return 'default';
    const body: unknown = await response.json();
    const season =
      body && typeof body === 'object' && 'season' in body
        ? (body as { season?: unknown }).season
        : undefined;
    return isSeason(season) ? season : 'default';
  } catch {
    return 'default';
  }
}

function athensYearMonth(now: Date): { year: number; month: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Athens',
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(now);
  const num = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  return { year: num('year'), month: num('month') };
}

function iconFileExists(folder: string): boolean {
  if (!FOLDER.test(folder)) return false;
  return existsSync(join(process.cwd(), 'public', 'brand', 'seasonal', folder, 'icon.png'));
}

/**
 * new-year artwork lives in public/brand/seasonal/new-year-<year>/.
 * December uses the upcoming year. If that file is missing, try new-year-<calendar year + 1>
 * (the bundled folder). If that is missing too, the caller uses the default mark.
 */
export function newYearFolder(now: Date): string | null {
  const { year, month } = athensYearMonth(now);
  const assetYear = month === 12 ? year + 1 : year;
  const candidates = [`new-year-${assetYear}`, `new-year-${year + 1}`];
  const seen = new Set<string>();
  for (const folder of candidates) {
    if (seen.has(folder)) continue;
    seen.add(folder);
    if (iconFileExists(folder)) return folder;
  }
  return null;
}

/** On-page S mark. Default and missing art stay on /logo.png. */
export function seasonalMarkPath(season: Season, now = new Date()): string {
  if (season === 'default') return PAGE_MARK;
  const folder = season === 'new-year' ? newYearFolder(now) : season;
  if (!folder || !iconFileExists(folder)) return PAGE_MARK;
  return `/brand/seasonal/${folder}/icon.png`;
}

/** Favicon and apple touch icon. Default and missing art stay on /icon.png. */
export function seasonalFaviconPath(season: Season, now = new Date()): string {
  const mark = seasonalMarkPath(season, now);
  return mark === PAGE_MARK ? FAVICON : mark;
}
