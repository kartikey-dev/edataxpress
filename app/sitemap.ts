import type { MetadataRoute } from 'next';
import { buildSitemapEntries } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries();
}
