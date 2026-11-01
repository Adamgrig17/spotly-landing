'use client';

import { createContext, useContext } from 'react';

const BrandMarkContext = createContext('/logo.png');

/** Server-resolved S mark. The default matches today's /logo.png so the first paint does not swap. */
export function BrandMarkProvider({
  src,
  children,
}: {
  src: string;
  children: React.ReactNode;
}) {
  return <BrandMarkContext.Provider value={src}>{children}</BrandMarkContext.Provider>;
}

export function useBrandMark(): string {
  return useContext(BrandMarkContext);
}
