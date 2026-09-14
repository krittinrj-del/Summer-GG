import type { ReactNode } from 'react';
import { PublicFrame } from '@/components/public-frame';
import { publicMetadata } from '@/lib/public-metadata';
export const metadata = publicMetadata('เข้าสู่ระบบทีมงาน', 'พื้นที่เข้าสู่ระบบสำหรับทีมงาน GG Summer', '/admin/login');
export default function LoginLayout({ children }: { children: ReactNode }) {
  return <PublicFrame>{children}</PublicFrame>;
}
