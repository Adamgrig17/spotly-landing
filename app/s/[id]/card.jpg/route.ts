import { NextResponse } from 'next/server';
import { decode, encode } from 'jpeg-js';

import { loadSharedSpotCard } from '../spot-card';

export const runtime = 'nodejs';
export const revalidate = 86400;

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;

function readOrientation(buf: Uint8Array): number {
  const view = buf;
  if (view[0] !== 0xff || view[1] !== 0xd8) return 1;
  let offset = 2;
  while (offset + 4 < view.length) {
    if (view[offset] !== 0xff) break;
    const marker = view[offset + 1];
    const size = (view[offset + 2] << 8) + view[offset + 3];
    if (marker === 0xe1 && offset + 10 < view.length) {
      const start = offset + 4;
      if (
        view[start] === 0x45 &&
        view[start + 1] === 0x78 &&
        view[start + 2] === 0x69 &&
        view[start + 3] === 0x66
      ) {
        const tiff = start + 6;
        const le = view[tiff] === 0x49;
        const u16 = (o: number) => (le ? view[o] + (view[o + 1] << 8) : (view[o] << 8) + view[o + 1]);
        const u32 = (o: number) =>
          le
            ? view[o] + (view[o + 1] << 8) + (view[o + 2] << 16) + (view[o + 3] << 24)
            : (view[o] << 24) + (view[o + 1] << 16) + (view[o + 2] << 8) + view[o + 3];
        const ifd = tiff + u32(tiff + 4);
        const count = u16(ifd);
        for (let i = 0; i < count; i++) {
          const entry = ifd + 2 + i * 12;
          if (u16(entry) === 0x0112) return u16(entry + 8) || 1;
        }
      }
    }
    if (size < 2) break;
    offset += 2 + size;
  }
  return 1;
}

function sourcePixel(
  orientation: number,
  ux: number,
  uy: number,
  srcW: number,
  srcH: number
): [number, number] {
  switch (orientation) {
    case 3:
      return [srcW - 1 - ux, srcH - 1 - uy];
    case 6:
      return [uy, srcH - 1 - ux];
    case 8:
      return [srcW - 1 - uy, ux];
    default:
      return [ux, uy];
  }
}

function orientedSize(orientation: number, width: number, height: number) {
  if (orientation === 6 || orientation === 8) return { width: height, height: width };
  return { width, height };
}

function uprightCard(input: Uint8Array): Uint8Array {
  const orientation = readOrientation(input);
  const raw = decode(input, {
    useTArray: true,
    maxResolutionInMP: 40,
    maxMemoryUsageInMB: 256,
  });
  const src = raw.data;
  const { width, height } = orientedSize(orientation, raw.width, raw.height);
  const scale = Math.max(CARD_WIDTH / width, CARD_HEIGHT / height);
  const cropW = CARD_WIDTH / scale;
  const cropH = CARD_HEIGHT / scale;
  const originX = Math.max(0, (width - cropW) / 2);
  const originY = Math.max(0, (height - cropH) / 2);
  const dst = new Uint8Array(CARD_WIDTH * CARD_HEIGHT * 4);

  for (let y = 0; y < CARD_HEIGHT; y++) {
    const sy = Math.min(height - 1, Math.floor(originY + (y * cropH) / CARD_HEIGHT));
    for (let x = 0; x < CARD_WIDTH; x++) {
      const sx = Math.min(width - 1, Math.floor(originX + (x * cropW) / CARD_WIDTH));
      const [ox, oy] = sourcePixel(orientation, sx, sy, raw.width, raw.height);
      const si = (oy * raw.width + ox) * 4;
      const di = (y * CARD_WIDTH + x) * 4;
      dst[di] = src[si];
      dst[di + 1] = src[si + 1];
      dst[di + 2] = src[si + 2];
      dst[di + 3] = 255;
    }
  }

  return encode({ data: dst, width: CARD_WIDTH, height: CARD_HEIGHT }, 82).data;
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

  const source = await fetch(imageUrl);
  if (!source.ok) return new NextResponse(null, { status: 404 });
  const input = new Uint8Array(await source.arrayBuffer());
  const isJpeg = input[0] === 0xff && input[1] === 0xd8;
  const output = isJpeg ? uprightCard(input) : input;

  return new NextResponse(Buffer.from(output), {
    headers: {
      'Content-Type': isJpeg ? 'image/jpeg' : source.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
