'use client';

import { useEffect, useState } from 'react';

export function SharedSpotOpen({
  spotId,
  appStoreUrl,
  playStoreUrl,
}: {
  spotId: string;
  appStoreUrl: string;
  playStoreUrl: string;
}) {
  const [showStores, setShowStores] = useState(false);

  useEffect(() => {
    const appUrl = `spotly://s/${spotId}`;
    const started = Date.now();
    window.location.href = appUrl;
    const timer = window.setTimeout(() => {
      if (document.hidden || Date.now() - started > 2500) return;
      setShowStores(true);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [spotId]);

  return (
    <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
      <a
        href={`spotly://s/${spotId}`}
        className="rounded-full bg-[#00E676] px-5 py-3 text-base font-semibold text-black"
      >
        Άνοιξε τη θέση
      </a>
      {showStores ? (
        <>
          <a
            href={appStoreUrl}
            className="rounded-full border border-white/20 px-5 py-3 text-base text-white"
          >
            App Store
          </a>
          <a
            href={playStoreUrl}
            className="rounded-full border border-white/20 px-5 py-3 text-base text-white"
          >
            Google Play
          </a>
        </>
      ) : null}
    </div>
  );
}
