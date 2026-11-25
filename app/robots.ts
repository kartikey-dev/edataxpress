import type { MetadataRoute } from 'next';
import { buildRobotsConfig } from '@/lib/content';

export default function robots(): MetadataRoute.Robots {
  return buildRobotsConfig();
}
