import type { Metadata } from 'next';
import Link from 'next/link';
import { siteOrigin, supabaseConfig } from '@/lib/config';
import { LoginForm } from './login-form';
export const metadata: Metadata = { title: 'เข้าสู่ระบบทีมงาน', robots: { index: false, follow: false } };
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const { state } = await searchParams;
  const enabled = Boolean(supabaseConfig() && siteOrigin());
  const message = state === 'denied' ? 'บัญชีนี้ไม่มีสิทธิ์เข้าถึงพื้นที่ทีมงาน กรุณาติดต่อผู้ดูแล' : state === 'session' ? 'กรุณาเข้าสู่ระบบใหม่เพื่อใช้งานต่อ' : state === 'invalid' ? 'ลิงก์นี้ไม่ถูกต้องหรือหมดอายุ กรุณาขอลิงก์ใหม่' : '';
  return <main id="main" className="panel"><Link href="/" className="eyebrow">← ON POINT</Link><h1 className="mt-6 text-3xl">พื้นที่ทีมงาน</h1><p>เข้าสู่ระบบเพื่อดูพื้นที่จัดการเว็บไซต์</p>{!enabled && <p className="sample-note">ยังไม่ได้ตั้งค่า Supabase และ URL เว็บไซต์ ระบบเข้าสู่ระบบจึงยังไม่เปิดใช้งาน</p>}{message && <p role="status" className="sample-note">{message}</p>}<LoginForm enabled={enabled} /></main>;
}
