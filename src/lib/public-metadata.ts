import type { Metadata } from 'next';
import { siteOrigin } from './config';
import { getPublicContent } from './content/public-source';
import { HERO_IMAGE } from './content/public';
export const publicOrigin = () => siteOrigin() || 'https://summer-gg.vercel.app';
export function publicMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: `${publicOrigin()}${path}` },
    robots: getPublicContent().isDemo || path === '/apply' ? { index: false, follow: true } : undefined,
    openGraph: { title: `${title} | On Point Summer Programs`, description, type: 'website', locale: 'th_TH', url: `${publicOrigin()}${path}`, images: [{ url: `${publicOrigin()}${HERO_IMAGE}`, width: 1672, height: 941, alt: 'On Point Summer Programs — ภาพประกอบแนวคิด' }] },
  };
}
