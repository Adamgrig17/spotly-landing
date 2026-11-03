import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { apexRedirectUrl } from '@/lib/apexRedirect';

/**
 * Canonicalise parkspotly.gr → www, except /.well-known.
 * Android App Links and iOS Universal Links require those files on both
 * hosts with status 200 and no redirect.
 *
 * This does not run for the apex while Vercel Domains is set to redirect
 * parkspotly.gr to www. That edge 307 happens before middleware and covers
 * every path, including /.well-known. Turn that domain redirect off after
 * this is deployed; this middleware keeps the 307 for everything else.
 */
export function middleware(request: NextRequest) {
  const target = apexRedirectUrl(
    request.headers.get('host') ?? request.nextUrl.host,
    request.nextUrl.pathname,
    request.nextUrl.search,
  );
  if (!target) return NextResponse.next();
  return NextResponse.redirect(target, 307);
}

export const config = {
  matcher: ['/', '/((?!\\.well-known(?:/|$)).*)'],
};
