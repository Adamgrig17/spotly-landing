import type { Metadata } from 'next';

import { loadSharedSpotCard } from './spot-card';
import { SharedSpotOpen } from './shared-spot-open';

const APP_STORE = 'https://apps.apple.com/gr/app/spotly/id6792035342';
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.spotly.mobile';
const SITE = 'https://www.parkspotly.gr';
const FALLBACK_IMAGE = `${SITE}/logo.png`;
const SHARE_TITLE = 'Κλείσε αυτή τη θέση σε 10 δευτερόλεπτα';
const SHARE_DESCRIPTION =
  'Ιδιωτικό πάρκινγκ, χωρίς ψάξιμο. Ανοίγεις την πόρτα από το κινητό και μπαίνεις κατευθείαν.';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const card = await loadSharedSpotCard(id);
  const pageUrl = `${SITE}/s/${id}`;
  const image = card?.imageUrl
    ? {
        url: `${pageUrl}/preview.jpg`,
        width: 1200,
        height: 630,
        alt: SHARE_TITLE,
        type: 'image/jpeg' as const,
      }
    : { url: FALLBACK_IMAGE, alt: 'Spotly' };

  return {
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: SHARE_TITLE,
      description: SHARE_DESCRIPTION,
      url: pageUrl,
      siteName: 'Spotly',
      type: 'website',
      locale: 'el_GR',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: SHARE_TITLE,
      description: SHARE_DESCRIPTION,
      images: [image.url],
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
