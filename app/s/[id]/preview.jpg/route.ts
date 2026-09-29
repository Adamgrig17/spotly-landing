import { NextResponse } from 'next/server';

import { loadSharedSpotCard } from '../spot-card';

export const runtime = 'nodejs';
export const revalidate = 86400;

async function originalImage(imageUrl: string): Promise<NextResponse> {
  const source = await fetch(imageUrl);
  if (!source.ok) return new NextResponse(null, { status: 404 });
  const bytes = new Uint8Array(await source.arrayBuffer());
  return new NextResponse(bytes, {
    headers: {
      'Content-Type': source.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const card = await loadSharedSpotCard(id);
  const imageUrl = card?.imageUrl;
  const storageHost = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!imageUrl || !storageHost || !imageUrl.startsWith(`${storageHost}/storage/`)) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const sharp = (await import('sharp')).default;
    const source = await fetch(imageUrl);
    if (!source.ok) return new NextResponse(null, { status: 404 });
    const input = Buffer.from(await source.arrayBuffer());
    const output = await sharp(input, { failOn: 'none' })
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82 })
      .toBuffer();
    return new NextResponse(new Uint8Array(output), {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch {
    return originalImage(imageUrl);
  }
}
