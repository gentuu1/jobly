import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-workbench.99static.com'
      },
      {
        protocol: 'https',
        hostname: ''
      }
    ]
  }
};

export default nextConfig;
