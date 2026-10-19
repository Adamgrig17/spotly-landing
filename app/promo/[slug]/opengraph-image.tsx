import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { getPromo } from '@/lib/promo';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function PromoOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const promo = getPromo(slug);
  const title = promo?.title ?? 'Spotly';
  const subtitle = promo?.subtitle ?? 'Κλείσε θέση σε ιδιωτικό γκαράζ.';
  const [latin, greek, icon] = await Promise.all([
    readFile(join(process.cwd(), 'app/promo/fonts/commissioner-latin-700.woff')),
    readFile(join(process.cwd(), 'app/promo/fonts/commissioner-greek-700.woff')),
    readFile(join(process.cwd(), 'public/logo.png')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0B0B0D',
          padding: '72px 80px',
          fontFamily: 'Commissioner',
        }}
      >
        <img
          src={`data:image/jpeg;base64,${icon.toString('base64')}`}
          alt=""
          width={96}
          height={96}
          style={{ borderRadius: 22 }}
        />
        <div
          style={{
            marginTop: 40,
            fontSize: 68,
            lineHeight: 1.12,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            display: 'flex',
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            lineHeight: 1.35,
            color: '#62E38A',
            display: 'flex',
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Commissioner', data: latin, weight: 700 as const, style: 'normal' as const },
        { name: 'Commissioner', data: greek, weight: 700 as const, style: 'normal' as const },
      ],
    },
  );
}
