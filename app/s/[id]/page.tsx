import type { Metadata } from 'next';

import { loadSharedSpotCard } from './spot-card';
import { SharedSpotOpen } from './shared-spot-open';

const APP_STORE = 'https://apps.apple.com/gr/app/spotly/id6792035342';
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.spotly.mobile';
const SITE = 'https://www.parkspotly.gr';
const FALLBACK_IMAGE = `${SITE}/logo.png`;

export const revalidate = 60;

function imageType(url: string): string | undefined {
  const path = url.split('?')[0]?.toLowerCase() ?? '';
  if (path.endsWith('.png')) return 'image/png';
  if (path.endsWith('.webp')) return 'image/webp';
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg';
  return undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const card = await loadSharedSpotCard(id);
  const title = card?.name ? `${card.name} · Spotly` : 'Μια θέση στο Spotly';
  const description = card?.address || 'Άνοιξε τη θέση στην εφαρμογή Spotly.';
  const image = card?.imageUrl || FALLBACK_IMAGE;
  const pageUrl = `${SITE}/s/${id}`;

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Spotly',
      type: 'website',
      locale: 'el_GR',
      images: [
        {
          url: image,
          alt: card?.name || 'Spotly',
          type: imageType(image),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function SharedSpotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = await loadSharedSpotCard(id);
  const play = `${PLAY_STORE}&referrer=${encodeURIComponent(`spot_id=${id}`)}`;
  const title = card?.name || 'Αυτή η θέση σε περιμένει στην εφαρμογή';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#07140e] px-6 py-10 text-center text-white">
      <p className="text-sm font-semibold tracking-[0.18em] text-[#00E676]">SPOTLY</p>
      {card?.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={card.imageUrl}
          alt={card.name || 'Θέση Spotly'}
          className="mt-6 h-56 w-full max-w-md rounded-3xl object-cover"
        />
      ) : null}
      <h1 className="mt-6 max-w-md text-3xl font-semibold leading-tight">{title}</h1>
      {card?.address ? (
        <p className="mt-3 max-w-sm text-base text-white/80">{card.address}</p>
      ) : null}
      <p className="mt-3 max-w-sm text-base text-white/70">
        Αν έχεις ήδη το Spotly, ανοίγει κατευθείαν. Αλλιώς κατέβασέ το και η θέση ανοίγει μόλις μπεις.
      </p>
      <SharedSpotOpen spotId={id} appStoreUrl={APP_STORE} playStoreUrl={play} />
    </main>
  );
}
