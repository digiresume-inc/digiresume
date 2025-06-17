import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'erqkxzwrpahhrddhnwjh.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com'
      },
      {
        protocol: 'https',
        hostname: 'www.google.com'
      },
      {
        protocol: 'https',
        hostname: 'flagsapi.com'
      },
      {
        protocol: 'https',
        hostname: 'assets.linkfolio.space',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      }
    ],
  },
  devIndicators: false,
};

export default nextConfig;
