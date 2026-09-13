import type { Metadata } from 'next';
import { siteOrigin } from '@/lib/config';
import './globals.css';
const origin = siteOrigin();
export const metadata: Metadata = {
  metadataBase: origin ? new URL(origin) : undefined,
  title: { default: 'GG Summer — เรียนรู้ เปิดโลก เติบโต', template: '%s | GG Summer' },
  description: 'เรียนรู้ภาษา สัมผัสวัฒนธรรม และค้นพบประสบการณ์ใหม่กับ Summer Program',
  robots: process.env.DEMO_CONTENT === 'true' || !origin ? { index: false, follow: false } : undefined,
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body><a className="skip" href="#main">ข้ามไปเนื้อหาหลัก</a>{children}</body></html>;
}
