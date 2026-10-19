import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { detectPlatform, getPromo, SITE } from '@/lib/promo';
import { PromoScreen } from './promo-screen';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const promo = getPromo(slug);
  if (!promo) return { title: 'Spotly' };

  const url = `${SITE}/promo/${promo.slug}`;
  const image = `/promo/${promo.slug}/opengraph-image`;
  return {
    title: promo.title,
    description: promo.subtitle,
    alternates: { canonical: url },
    openGraph: {
      title: promo.title,
      description: promo.subtitle,
      url,
      siteName: 'Spotly',
      locale: 'el_GR',
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: promo.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: promo.title,
      description: promo.subtitle,
      images: [image],
    },
  };
}

export default async function PromoPage({ params }: Props) {
  const { slug } = await params;
  const promo = getPromo(slug);
  if (!promo) redirect('/app');

  const headerList = await headers();
  const platform = detectPlatform(headerList.get('user-agent') ?? '');
  return <PromoScreen promo={promo} platform={platform} />;
}
