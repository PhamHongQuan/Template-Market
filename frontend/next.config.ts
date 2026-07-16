import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tempmarket-dev-539562792509.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
