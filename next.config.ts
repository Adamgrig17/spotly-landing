import type { NextConfig } from "next";

import { APEX_REDIRECT_SOURCE } from "./lib/apexRedirect";

const nextConfig: NextConfig = {
  // The built-in slash redirect is a relative 308, so /promo/spartak/ on the
  // apex would stay on parkspotly.gr. The host redirect below handles it.
  skipTrailingSlashRedirect: true,
  experimental: {
    inlineCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
      {
        // HTML differs by device (mobile redirects, desktop does not).
        source: "/promo/:slug",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/become-a-host",
        destination: "https://spotlyparking.gr/",
        permanent: true,
      },
      {
        source: "/host-guide/:code",
        destination: "https://api.parkspotly.gr/host-guide/:code",
        permanent: false,
      },
      {
        // /.well-known stays on the apex for app links.
        source: APEX_REDIRECT_SOURCE,
        has: [{ type: "host", value: "parkspotly.gr" }],
        destination: "https://www.parkspotly.gr/:path",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "host", value: "parkspotly.gr" }],
        destination: "https://www.parkspotly.gr/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
