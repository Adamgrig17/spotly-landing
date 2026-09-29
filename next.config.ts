import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
