import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github-readme-stats.vercel.app'
      },
      {
        protocol: 'https',
        hostname: 'github-readme-activity-graph.vercel.app'
      }
    ]
  }
};

export default nextConfig;