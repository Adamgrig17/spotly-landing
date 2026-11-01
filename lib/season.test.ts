// @ts-nocheck — Node's runner needs a .ts import, which this tsconfig rejects.
import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';

import { getSeason, seasonalFaviconPath, seasonalMarkPath } from './season.ts';

const originalFetch = globalThis.fetch;
const originalEnv = process.env.BRAND_API_URL;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalEnv === undefined) delete process.env.BRAND_API_URL;
  else process.env.BRAND_API_URL = originalEnv;
});

describe('getSeason', () => {
  it('is default when BRAND_API_URL is unset', async () => {
    delete process.env.BRAND_API_URL;
    let called = false;
    globalThis.fetch = async () => {
      called = true;
      return new Response('{}');
    };
    assert.equal(await getSeason(), 'default');
    assert.equal(called, false);
  });

  it('reads season.json and revalidates for 600 seconds', async () => {
    process.env.BRAND_API_URL = 'https://staging-api.parkspotly.gr/';
    globalThis.fetch = async (input, init) => {
      assert.equal(String(input), 'https://staging-api.parkspotly.gr/brand/season.json');
      const next = (init as { next?: { revalidate?: number } } | undefined)?.next;
      assert.equal(next?.revalidate, 600);
      return Response.json({ season: 'christmas' });
    };
    assert.equal(await getSeason(), 'christmas');
  });

  it('falls back on HTTP errors, bad payloads, and network failures', async () => {
    process.env.BRAND_API_URL = 'https://api.parkspotly.gr';
    globalThis.fetch = async () => new Response('nope', { status: 500 });
    assert.equal(await getSeason(), 'default');

    globalThis.fetch = async () => Response.json({ season: 'halloween' });
    assert.equal(await getSeason(), 'default');

    globalThis.fetch = async () => Response.json({});
    assert.equal(await getSeason(), 'default');

    globalThis.fetch = async () => {
      throw new Error('offline');
    };
    assert.equal(await getSeason(), 'default');
  });
});

describe('seasonal marks', () => {
  const november = new Date('2026-11-01T12:00:00+02:00');
  const newYear = new Date('2026-12-28T12:00:00+02:00');
  const january = new Date('2027-01-03T12:00:00+02:00');
  const later = new Date('2028-01-03T12:00:00+02:00');

  it('keeps the default files outside a season', () => {
    assert.equal(seasonalMarkPath('default', november), '/logo.png');
    assert.equal(seasonalFaviconPath('default', november), '/icon.png');
  });

  it('points fixed seasons at their icon', () => {
    assert.equal(seasonalMarkPath('christmas', november), '/brand/seasonal/christmas/icon.png');
    assert.equal(seasonalFaviconPath('easter', november), '/brand/seasonal/easter/icon.png');
    assert.equal(seasonalMarkPath('march-25', november), '/brand/seasonal/march-25/icon.png');
    assert.equal(seasonalMarkPath('october-28', november), '/brand/seasonal/october-28/icon.png');
  });

  it('uses new-year-<year+1> and falls back when that file is missing', () => {
    assert.equal(seasonalMarkPath('new-year', november), '/brand/seasonal/new-year-2027/icon.png');
    assert.equal(seasonalMarkPath('new-year', newYear), '/brand/seasonal/new-year-2027/icon.png');
    assert.equal(seasonalMarkPath('new-year', january), '/brand/seasonal/new-year-2027/icon.png');
    assert.equal(seasonalMarkPath('new-year', later), '/logo.png');
    assert.equal(seasonalFaviconPath('new-year', later), '/icon.png');
  });
});
