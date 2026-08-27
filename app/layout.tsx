import type { Metadata, Viewport } from "next";
import { LanguageProvider } from './context/LanguageContext';
import "./globals.css";
// --- ΠΡΟΗΓΜΕΝΑ METADATA ΓΙΑ GOOGLE & SOCIAL MEDIA ---
export const metadata: Metadata = {
  title: "Spotly | Βρες Πάρκινγκ Σε 10 Δευτερόλεπτα",
  description: "Η πρώτη και μοναδική πλατφόρμα που μετατρέπει τα κλειστά ιδιωτικά γκαράζ σε δικές σου θέσεις στάθμευσης. Κλείσε θέση εύκολα και γρήγορα.",
  metadataBase: new URL('https://www.parkspotly.gr'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // Αυτό βοηθάει τη Google να καταλάβει ότι το site είναι App
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Spotly",
  },
  openGraph: {
    title: 'Spotly | Park Smart. Earn Easy.',
    description: 'Κλείσε θέση σε ιδιωτικό γκαράζ, οπουδήποτε στην Ελλάδα, και άνοιξε την πόρτα από το κινητό σου. Έχεις γκαράζ που μένει άδειο; Βγάλε έσοδα από αυτό.',
    url: 'https://www.parkspotly.gr',
    siteName: 'Spotly',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Spotly — κλείσε θέση σε ιδιωτικό γκαράζ σε όλη την Ελλάδα',
      },
    ],
    locale: 'el_GR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121212",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <head>
        {/* Schema.org - JSON-LD: Λέμε στη Google ακριβώς τι είναι το Spotly */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Spotly",
              "operatingSystem": "iOS, Android, Web",
              "applicationCategory": "TravelApplication",
              "url": "https://www.parkspotly.gr",
              "description": "Smart Parking Marketplace in Greece",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "120"
              }
            }),
          }}
        />
      </head>
      <body className="antialiased bg-[#121212]">
        {/* ΕΔΩ ΜΠΑΙΝΕΙ Ο LANGUAGE PROVIDER */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  function revealAll(els){ els.forEach(function(el){ el.classList.add('visible'); }); }
  function init(){
    var els = [].slice.call(document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale'));
    if (!els.length) return false;
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealAll(els); return true;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    els.forEach(function(el){ if (!el.classList.contains('visible')) io.observe(el); });
    return true;
  }
  if (init()) return;
  var n = 0;
  (function tick(){
    if (init() || ++n > 120) return;
    requestAnimationFrame(tick);
  })();
})();
`,
          }}
        />
      </body>
    </html>
  );
}
