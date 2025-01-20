import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add your other configuration options here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Allows all paths from Unsplash
        search: '',
      },
    ],
  },
};

export default nextConfig;

