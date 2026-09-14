import type { ReactNode } from 'react';
import { Header, Footer } from './site-layout';
import { getPublicContent } from '@/lib/content/public-source';
import '@/app/home.css';
import '@/app/public.css';
export function PublicFrame({ children }: { children: ReactNode }) {
  return <div className="public-home"><Header />{children}<Footer address={null} isDemo={getPublicContent().isDemo} /></div>;
}
export function PageHero({ number, title, english, description }: { number: string; title: string; english: string; description: string }) {
  return <header className="public-page-hero edition-wrap"><p className="edition-kicker">{number} / ON POINT SUMMER PROGRAMS</p><h1>{title}<em lang="en">{english}</em></h1><p className="page-intro">{description}</p></header>;
}
