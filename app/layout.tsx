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
    description: 'Βρες πάρκινγκ σε ιδιωτικά γκαράζ στην Αθήνα.',
    url: 'https://www.parkspotly.gr',
    siteName: 'Spotly',
    images: [
      {
        url: '/logo.png', // Η εικόνα που φαίνεται στο WhatsApp/Facebook
        width: 800,
        height: 600,
      },
    ],
    locale: 'el_GR',
    type: 'website',
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
      </body>
    </html>
  );
}
