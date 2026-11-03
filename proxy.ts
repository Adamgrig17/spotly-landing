import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { apexRedirectUrl, redirectHost, slashlessRedirect } from '@/lib/apexRedirect';

/**
 * Canonicalise parkspotly.gr → www, except /.well-known.
 * next.config.ts redirects the same paths earlier. This still runs when that
 * host rule does not see the apex (deployment Host header, trailing slash).
 */
export function proxy(request: NextRequest) {
  const host = redirectHost(
    request.headers.get('host') ?? request.nextUrl.host,
    request.headers.get('x-forwarded-host'),
  );
  const { pathname, search } = request.nextUrl;
  const apexTarget = apexRedirectUrl(host, pathname, search);
  if (apexTarget) return NextResponse.redirect(apexTarget, 307);
  const slashTarget = slashlessRedirect(host, pathname, search);
  if (slashTarget) return NextResponse.redirect(slashTarget, 308);
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!\\.well-known(?:/|$)).*)'],
};
