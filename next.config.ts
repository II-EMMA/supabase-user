import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows external job logos/images if present
      },
    ],
  },
};

export default nextConfig;
