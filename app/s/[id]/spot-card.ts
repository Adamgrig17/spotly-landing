import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';

const SPOT_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type SharedSpotCard = {
  name: string;
  address: string;
  imageUrl: string | null;
};

export const loadSharedSpotCard = cache(async (id: string): Promise<SharedSpotCard | null> => {
  const spotId = id.trim();
  if (!SPOT_ID.test(spotId)) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.rpc('shared_spot_card', { p_spot_id: spotId });
  if (error || !Array.isArray(data) || data.length === 0) return null;

  const row = data[0] as { name?: string | null; address?: string | null; image_url?: string | null };
  const image = typeof row.image_url === 'string' ? row.image_url.trim() : '';
  return {
    name: (row.name ?? '').trim(),
    address: (row.address ?? '').trim(),
    imageUrl: image.startsWith('https://') ? image : null,
  };
});
