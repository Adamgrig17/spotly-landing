// @ts-nocheck — Node's runner needs a .ts import, which this tsconfig rejects.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { apexRedirectUrl, isWellKnownPath, redirectHost, slashlessRedirect } from './apexRedirect.ts';

describe('apexRedirectUrl', () => {
  it('sends the apex site to www and keeps the query', () => {
    assert.equal(apexRedirectUrl('parkspotly.gr', '/', ''), 'https://www.parkspotly.gr/');
    assert.equal(
      apexRedirectUrl('parkspotly.gr', '/promo/spartak', '?lang=el'),
      'https://www.parkspotly.gr/promo/spartak?lang=el',
    );
    assert.equal(
      apexRedirectUrl('PARKSPOTLY.GR:443', '/terms', ''),
      'https://www.parkspotly.gr/terms',
    );
  });

  it('does not redirect app-link files on the apex', () => {
    assert.equal(isWellKnownPath('/.well-known/assetlinks.json'), true);
    assert.equal(isWellKnownPath('/.well-known/apple-app-site-association'), true);
    assert.equal(apexRedirectUrl('parkspotly.gr', '/.well-known/assetlinks.json'), null);
    assert.equal(
      apexRedirectUrl('parkspotly.gr', '/.well-known/apple-app-site-association', ''),
      null,
    );
  });

  it('sends a trailing slash straight to the www URL without the slash', () => {
    assert.equal(
      apexRedirectUrl('parkspotly.gr', '/promo/spartak/', '?x=1'),
      'https://www.parkspotly.gr/promo/spartak?x=1',
    );
    assert.equal(
      slashlessRedirect('www.parkspotly.gr', '/promo/spartak/', '?x=1'),
      'https://www.parkspotly.gr/promo/spartak?x=1',
    );
    assert.equal(slashlessRedirect('www.parkspotly.gr', '/promo/spartak'), null);
    assert.equal(slashlessRedirect('parkspotly.gr', '/.well-known/assetlinks.json/'), null);
  });

  it('uses the apex when the platform host is the deployment and the forwarded host is apex', () => {
    assert.equal(
      redirectHost('spotly-landing.vercel.app', 'parkspotly.gr'),
      'parkspotly.gr',
    );
    assert.equal(redirectHost('www.parkspotly.gr', 'parkspotly.gr'), 'www.parkspotly.gr');
    assert.equal(
      apexRedirectUrl(redirectHost('spotly-landing.vercel.app', 'parkspotly.gr'), '/promo/spartak'),
      'https://www.parkspotly.gr/promo/spartak',
    );
  });

  it('leaves www and other hosts alone, including their well-known paths', () => {
    assert.equal(apexRedirectUrl('www.parkspotly.gr', '/'), null);
    assert.equal(apexRedirectUrl('www.parkspotly.gr', '/.well-known/assetlinks.json'), null);
    assert.equal(apexRedirectUrl('staging.parkspotly.gr', '/'), null);
    assert.equal(apexRedirectUrl('localhost:3000', '/'), null);
  });
});
