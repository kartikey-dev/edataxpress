import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.edataxpress.com';
  return ['', '/about', '/contact', '/services/publishing', '/services/printing', '/services/marketing'].map((path) => ({ url: `${base}${path}`, changeFrequency: 'monthly', priority: path === '' ? 1 : 0.7 }));
}
