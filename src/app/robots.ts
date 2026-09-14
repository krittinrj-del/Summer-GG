import type { MetadataRoute } from 'next';
import { publicOrigin } from '@/lib/public-metadata';
export default function robots(): MetadataRoute.Robots {
  // Crawlers may read the noindex metadata on demo pages.
  return { rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/auth', '/apply'] }, sitemap: `${publicOrigin()}/sitemap.xml` };
}
