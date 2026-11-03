// Offer pages linked from printed QR codes:
//   https://www.parkspotly.gr/promo/welcome3
//   https://www.parkspotly.gr/promo/spartak
// Slugs are matched case-insensitively. parkspotly.gr (no www) 307s to www
// and keeps the path, except /.well-known (see middleware.ts).

export const SITE = 'https://www.parkspotly.gr';

// Same targets as app/app/route.ts (/app).
export const APP_STORE = 'https://apps.apple.com/gr/app/id6792035342';
export const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.spotly.mobile';
export const WEB_BOOKING = 'https://app.parkspotly.gr';
export const APP_LINK = `${SITE}/app`;

export type Platform = 'ios' | 'android' | 'desktop';

export type PromoFigure =
  | { kind: 'euro'; value: number }
  | { kind: 'percent'; value: number };

export type Promo = {
  slug: 'welcome3' | 'spartak';
  title: string;
  subtitle: string;
  figure: PromoFigure;
  code?: string;
};

const PROMOS: Record<Promo['slug'], Promo> = {
  welcome3: {
    slug: 'welcome3',
    title: 'Συγχαρητήρια! Κέρδισες 3€',
    subtitle: 'έκπτωση στην επόμενη κράτησή σου',
    figure: { kind: 'euro', value: 3 },
    code: 'WELCOME3',
  },
  spartak: {
    slug: 'spartak',
    title: '−10% στο Spartak Parking',
    subtitle: '−10% στο app · −5% στο web',
    figure: { kind: 'percent', value: 10 },
  },
};

export function getPromo(slug: string): Promo | null {
  const key = decodeURIComponent(slug).trim().toLowerCase();
  if (key === 'welcome3' || key === 'spartak') return PROMOS[key];
  return null;
}

// Mirrors app/app/route.ts: iPhone/iPad/iPod → App Store, Android → Play,
// everything else (including iPadOS that identifies as Macintosh) → desktop.
export function detectPlatform(ua: string): Platform {
  const isIos = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua) && !/Windows Phone/i.test(ua);
  if (isIos) return 'ios';
  if (isAndroid) return 'android';
  return 'desktop';
}

export function storeUrl(platform: Platform): string | null {
  if (platform === 'ios') return APP_STORE;
  if (platform === 'android') return PLAY_STORE;
  return null;
}

export function formatFigure(figure: PromoFigure, value: number): string {
  if (figure.kind === 'euro') return `${value}€`;
  return `−${value}%`;
}
