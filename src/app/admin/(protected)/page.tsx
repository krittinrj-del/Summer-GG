import type { Metadata } from 'next';
import Link from 'next/link';
import { requirePermission } from '@/lib/auth/require-role';
import { signOut } from './sign-out';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'พื้นที่ทีมงาน', robots: { index: false, follow: false } };
export default async function AdminPage() {
  const { role } = await requirePermission('read');
  return <main id="main" className="panel"><p className="eyebrow">ON POINT / TEAM</p><h1 className="text-3xl">ยินดีต้อนรับทีมงาน</h1><p>สิทธิ์ของคุณ: <strong>{role}</strong></p><p className="sample-note">Foundation พร้อมแล้ว ส่วน Dashboard และการจัดการข้อมูลจะพัฒนาใน Phase 1D</p><div className="actions"><Link href="/" className="button secondary">ดูหน้าเว็บไซต์</Link><form action={signOut}><button className="button">ออกจากระบบ</button></form></div></main>;
}
