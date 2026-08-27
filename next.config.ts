import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    return [
      {
        source: "/become-a-host",
        destination: "https://spotlyparking.gr/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
