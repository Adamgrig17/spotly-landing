const APEX_HOST = 'parkspotly.gr';
const WWW_ORIGIN = 'https://www.parkspotly.gr';

/** Digital Asset Links and Universal Links must be served on the apex with no redirect. */
export function isWellKnownPath(pathname: string): boolean {
  return pathname === '/.well-known' || pathname.startsWith('/.well-known/');
}

/**
 * 307 target when the apex host should canonicalise to www.
 * Returns null for every other host, and for /.well-known on the apex.
 */
export function apexRedirectUrl(host: string, pathname: string, search = ''): string | null {
  const hostname = host.split(':')[0]?.toLowerCase() ?? '';
  if (hostname !== APEX_HOST) return null;
  if (isWellKnownPath(pathname)) return null;
  return `${WWW_ORIGIN}${pathname}${search}`;
}
