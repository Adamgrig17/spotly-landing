'use client';

import { useEffect, useState } from 'react';

type StoreTarget = 'ios' | 'android' | 'both';

function detectStoreTarget(): StoreTarget {
  if (typeof navigator === 'undefined') return 'both';
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'both';
}

export function SharedSpotOpen({
  spotId,
  appStoreUrl,
  playStoreUrl,
}: {
  spotId: string;
  appStoreUrl: string;
  playStoreUrl: string;
}) {
  const [target, setTarget] = useState<StoreTarget>('both');
  const [showStores, setShowStores] = useState(false);

  useEffect(() => {
    const next = detectStoreTarget();
    setTarget(next);
    if (next === 'both') {
      setShowStores(true);
      return;
    }

    const appUrl = `spotly://s/${spotId}`;
    const started = Date.now();
    window.location.href = appUrl;
    const timer = window.setTimeout(() => {
      if (document.hidden || Date.now() - started > 2500) return;
      setShowStores(true);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [spotId]);

  const stores =
    target === 'ios'
      ? [{ href: appStoreUrl, label: 'App Store', kind: 'apple' as const }]
      : target === 'android'
        ? [{ href: playStoreUrl, label: 'Google Play', kind: 'play' as const }]
        : [
            { href: appStoreUrl, label: 'App Store', kind: 'apple' as const },
            { href: playStoreUrl, label: 'Google Play', kind: 'play' as const },
          ];

  return (
    <div className="mt-8 flex w-full flex-col gap-3">
      <a
        href={`spotly://s/${spotId}`}
        className="flex h-14 items-center justify-center rounded-full bg-[#00E676] text-base font-bold text-black shadow-[0_0_32px_rgba(0,230,118,0.35)]"
      >
        Άνοιξε την εφαρμογή
      </a>
      {showStores ? (
        <div className={stores.length > 1 ? 'grid grid-cols-2 gap-3' : 'flex'}>
          {stores.map((store) => (
            <a
              key={store.kind}
              href={store.href}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 text-sm font-semibold text-white"
            >
              {store.kind === 'apple' ? <AppleMark /> : <PlayMark />}
              {store.label}
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-white/50">Ανοίγει η εφαρμογή…</p>
      )}
    </div>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 384 512" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#00E676" d="M3.5 2.8v18.4c0 .7.8 1.1 1.4.7l10.2-6.1-3.4-3.4L3.5 2.8z" />
      <path fill="#34A853" d="M14.7 15.8 5.2 21.5c-.3.2-.6.1-.8-.1l8.6-8.6 1.7 3z" />
      <path fill="#FBBC04" d="M18.9 10.6 16 8.9l-2.8 2.8 2.8 2.8 2.9-1.7c.8-.5.8-1.7 0-2.2z" />
      <path fill="#EA4335" d="M4.4 2.6c.2-.2.5-.3.8-.1l9.5 5.7-1.7 1.7L4.4 2.6z" />
    </svg>
  );
}
