import { Analytics } from '@vercel/analytics/next';
import type { Viewport } from 'next';
import { Commissioner } from 'next/font/google';
import './promo.css';

const commissioner = Commissioner({
  subsets: ['latin', 'greek'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0B0B0D',
  width: 'device-width',
  initialScale: 1,
};

export default function PromoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`promo-root ${commissioner.className}`}>
      {children}
      <Analytics />
    </div>
  );
}
