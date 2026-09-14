import type { Metadata, Viewport } from 'next';
import { siteOrigin } from '@/lib/config';
import './globals.css';
const origin = siteOrigin();
// Matches the logo-derived primary token in brand-tokens.css.
export const viewport: Viewport = { themeColor: '#162c56' };
export const metadata: Metadata = {
  icons: { icon: '/assets/brand/logo.png', apple: '/assets/brand/logo.png' },
  metadataBase: origin ? new URL(origin) : undefined,
  title: { default: 'On Point Summer Programs — เรียนรู้ เปิดโลก เติบโต', template: '%s | On Point Summer Programs' },
  description: 'เรียนรู้ภาษา สัมผัสวัฒนธรรม และค้นพบประสบการณ์ใหม่กับ Summer Program',
  robots: process.env.DEMO_CONTENT === 'true' || !origin ? { index: false, follow: false } : undefined,
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body><a className="skip" href="#main">ข้ามไปเนื้อหาหลัก</a>{children}</body></html>;
}
