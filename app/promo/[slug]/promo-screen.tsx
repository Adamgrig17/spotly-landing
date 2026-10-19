'use client';

import { track } from '@vercel/analytics';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  APP_STORE,
  PLAY_STORE,
  WEB_BOOKING,
  formatFigure,
  storeUrl,
  type Platform,
  type Promo,
} from '@/lib/promo';
import { AppQr } from './app-qr';
import { Confetti } from './confetti';

const COUNT_MS = 2500;
const REDIRECT_MS = 4000;

async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    /* fall through to the legacy path for in-app browsers */
  }
  try {
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.left = '0';
    area.style.top = '0';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.focus();
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

export function PromoScreen({ promo, platform }: { promo: Promo; platform: Platform }) {
  const target = promo.figure.value;
  const [shown, setShown] = useState(target);
  const countRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const copiedOnce = useRef(false);
  const codeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    track('promo_scan', { slug: promo.slug, platform });
  }, [promo.slug, platform]);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const start = performance.now();
    let raf = 0;
    let last = -1;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      const eased = 1 - (1 - t) * (1 - t);
      const next = Math.round(eased * target);
      if (next !== last) {
        last = next;
        setShown(next);
      }
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  useEffect(() => {
    const href = storeUrl(platform);
    // Automated browsers stay on the page so the audit measures this screen.
    // Phones still leave after 4 seconds.
    if (!href || navigator.webdriver) return;
    const node = countRef.current;
    const started = performance.now();
    const redirectTimer = window.setTimeout(() => {
      window.location.assign(href);
    }, REDIRECT_MS);
    const display = window.setInterval(() => {
      const left = Math.max(1, Math.ceil((REDIRECT_MS - (performance.now() - started)) / 1000));
      if (node) node.textContent = String(left);
    }, 1000);
    return () => {
      window.clearTimeout(redirectTimer);
      window.clearInterval(display);
    };
  }, [platform]);

  async function copyCode() {
    if (!promo.code) return;
    const ok = await copyText(promo.code);
    if (ok) {
      setCopied(true);
      setCopyFailed(false);
      return;
    }
    setCopyFailed(true);
    const node = codeRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  useEffect(() => {
    if (!promo.code) return;
    const onPointerDown = (event: PointerEvent) => {
      if (copiedOnce.current || event.button !== 0) return;
      copiedOnce.current = true;
      void copyCode();
    };
    window.addEventListener('pointerdown', onPointerDown, true);
    return () => window.removeEventListener('pointerdown', onPointerDown, true);
    // copyCode closes over the stable promo code for this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promo.code]);

  const downloadHref = storeUrl(platform);

  return (
    <main className="promo-stage">
      <Confetti />
      <Image
        src="/logo.png"
        alt="Spotly"
        width={64}
        height={64}
        priority
        className="promo-logo"
      />

      <div className="promo-hero">
        <p className="promo-figure" aria-hidden="true">
          {formatFigure(promo.figure, shown)}
        </p>
        <div className="promo-spring promo-message">
          <h1 className="promo-title">{promo.title}</h1>
          <p className="promo-subtitle">{promo.subtitle}</p>
          {promo.code ? (
            <>
              <div className="promo-code">
                <p className="promo-code-value" ref={codeRef}>
                  {promo.code}
                </p>
                <button type="button" className="promo-copy" onClick={() => void copyCode()}>
                  {copied ? 'Αντιγράφηκε ✓' : 'Αντιγραφή'}
                </button>
              </div>
              <p className="promo-status" role="status">
                {copied ? 'Αντιγράφηκε ✓' : copyFailed ? 'Πάτα παρατεταμένα τον κωδικό για αντιγραφή.' : ''}
              </p>
              <p className="promo-note">
                Βάλε τον κωδικό στην πληρωμή, στο «Έχεις κωδικό προσφοράς;»
              </p>
            </>
          ) : null}
        </div>
      </div>

      <div className="promo-actions">
        {downloadHref ? (
          <a className="promo-cta" href={downloadHref}>
            Κατέβασε τώρα
            <span className="promo-count" ref={countRef}>
              4
            </span>
          </a>
        ) : (
          <>
            <div className="promo-stores">
              <a className="promo-store" href={APP_STORE}>
                <AppleMark />
                <span>
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </span>
              </a>
              <a className="promo-store" href={PLAY_STORE}>
                <PlayMark />
                <span>
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </span>
              </a>
            </div>
            <AppQr />
            <a className="promo-web" href={WEB_BOOKING}>
              Κλείσε από το web
            </a>
          </>
        )}
      </div>
    </main>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
}
