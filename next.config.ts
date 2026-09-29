import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sharp'],
  outputFileTracingIncludes: {
    '/s/[id]/preview.jpg': [
      './node_modules/sharp/**/*',
      './node_modules/@img/sharp-linux-x64/**/*',
      './node_modules/@img/sharp-linux-arm64/**/*',
      './node_modules/@img/sharp-libvips-linux-x64/**/*',
      './node_modules/@img/sharp-libvips-linux-arm64/**/*',
    ],
  },
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
