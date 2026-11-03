const APEX_HOST = 'parkspotly.gr';
const WWW_HOST = 'www.parkspotly.gr';
const WWW_ORIGIN = 'https://www.parkspotly.gr';

/** Same exclusion as the host redirect in next.config.ts. */
export const APEX_REDIRECT_SOURCE = '/:path((?!\\.well-known(?:/|$)).*)';

/** Digital Asset Links and Universal Links must be served on the apex with no redirect. */
export function isWellKnownPath(pathname: string): boolean {
  return pathname === '/.well-known' || pathname.startsWith('/.well-known/');
}

export function hostnameOf(host: string): string {
  return host.split(',')[0]?.trim().split(':')[0]?.toLowerCase() ?? '';
}

/**
 * Host used for the apex check. www wins when both headers are present so a
 * www request is never sent around again. The forwarded host covers the case
 * where the platform Host header is the deployment hostname.
 */
export function redirectHost(host: string | null, forwardedHost: string | null): string {
  const names = [host, forwardedHost]
    .filter((value): value is string => Boolean(value))
    .map(hostnameOf);
  if (names.includes(WWW_HOST)) return WWW_HOST;
  if (names.includes(APEX_HOST)) return APEX_HOST;
  return names[0] ?? '';
}

function canonicalPath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

/**
 * 308 target that drops a trailing slash on any host.
 * Null for /, files without a slash, and /.well-known.
 */
export function slashlessRedirect(host: string, pathname: string, search = ''): string | null {
  if (pathname.length <= 1 || !pathname.endsWith('/') || isWellKnownPath(pathname)) return null;
  const hostname = hostnameOf(host);
  if (!hostname) return null;
  const origin = hostname === APEX_HOST ? WWW_ORIGIN : `https://${hostname}`;
  return `${origin}${pathname.slice(0, -1)}${search}`;
}

/**
 * 307 target when the apex host should canonicalise to www.
 * Returns null for every other host, and for /.well-known on the apex.
 * A trailing slash is removed so the first response already points at the
 * canonical www URL instead of a same-host slash redirect.
 */
export function apexRedirectUrl(host: string, pathname: string, search = ''): string | null {
  if (hostnameOf(host) !== APEX_HOST) return null;
  if (isWellKnownPath(pathname)) return null;
  return `${WWW_ORIGIN}${canonicalPath(pathname)}${search}`;
}
