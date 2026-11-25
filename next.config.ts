import type { NextConfig } from 'next';
import { LEGACY_REDIRECTS } from './lib/content/navigation';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  async redirects() {
    return [...LEGACY_REDIRECTS];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
