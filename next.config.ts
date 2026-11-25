import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  // Keep `next dev` artifacts separate so a production build cannot replace
  // chunks that a running development server still has in memory.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/services/:service.html', destination: '/services/:service', permanent: true },
    ];
  },
};

export default nextConfig;
