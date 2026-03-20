import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "*.fal.ai",
      },
      {
        protocol: "https",
        hostname: "*.fal-ai.com",
      },
    ],
  },
};

export default nextConfig;
