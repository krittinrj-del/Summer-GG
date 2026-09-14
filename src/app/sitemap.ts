import type { MetadataRoute } from 'next';
import { publicOrigin } from '@/lib/public-metadata';
import { getPublicContent } from '@/lib/content/public-source';
export default function sitemap(): MetadataRoute.Sitemap {
  // Demo offers are intentionally omitted from search discovery.
  if (getPublicContent().isDemo) return [];
  return ['/', '/programs', '/preparation', '/gallery', '/contact'].map(path => ({ url: `${publicOrigin()}${path}` }));
}
