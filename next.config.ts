import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iaict.pythonanywhere.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
