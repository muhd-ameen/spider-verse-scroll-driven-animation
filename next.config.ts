import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-img.thesouledstore.com",
      },
    ],
  },
};

export default nextConfig;
