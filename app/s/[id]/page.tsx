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
        url: `${pageUrl}/card.jpg`,
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
  const photo = card?.imageUrl ? `/s/${id}/card.jpg` : null;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        <section className="relative h-[46vh] min-h-[300px] max-h-[520px] overflow-hidden">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt={card?.name || 'Θέση Spotly'}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123d28,transparent_55%),#050505]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-[#050505]" />
          <div className="relative flex h-full flex-col justify-between p-5">
            <div className="flex w-fit items-center gap-2.5 rounded-full bg-black/45 py-1.5 pr-3 pl-1.5 backdrop-blur-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" className="h-8 w-8 rounded-full" />
              <span className="text-sm font-semibold tracking-[0.22em]">SPOTLY</span>
            </div>
            <p className="w-fit rounded-full border border-[#00E676]/40 bg-black/55 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#00E676] backdrop-blur-md">
              Η θέση σε περιμένει
            </p>
          </div>
        </section>

        <section className="flex flex-1 flex-col px-5 pb-8">
          <h1 className="text-[2rem] font-semibold leading-[1.12] tracking-tight">
            Κλείσε αυτή τη θέση σε 10 δευτερόλεπτα
          </h1>
          {card?.name ? (
            <p className="mt-3 text-lg font-medium text-white/90">{card.name}</p>
          ) : null}
          {card?.address ? (
            <p className="mt-1 text-sm leading-relaxed text-white/55">{card.address}</p>
          ) : null}

          <ul className="mt-6 flex flex-col gap-2">
            {[
              'Κλείνεις σε 10 δευτερόλεπτα',
              'Ανοίγεις την πόρτα από το κινητό',
              'Χωρίς γύρισμα στο τετράγωνο',
            ].map((line) => (
              <li
                key={line}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/85"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#00E676]" />
                {line}
              </li>
            ))}
          </ul>

          <SharedSpotOpen spotId={id} appStoreUrl={APP_STORE} playStoreUrl={play} />
          <p className="mt-4 text-center text-xs leading-relaxed text-white/40">
            Αν έχεις ήδη το Spotly, η θέση ανοίγει μόνη της. Αλλιώς την κατεβάζεις και μπαίνεις κατευθείαν.
          </p>
        </section>
      </div>
    </main>
  );
}
