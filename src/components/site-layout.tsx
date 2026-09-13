import Link from 'next/link';
import { Navigation } from './navigation';
export function Brand({ name = 'GG SUMMER' }: { name?: string }) { return <Link href="/" className="brand" aria-label={`${name} — หน้าแรก`}><span className="seal" aria-hidden>G</span><span className="brand-name">{name}<small>LEARN. EXPLORE. GROW.</small></span></Link>; }
export function Header({ name }: { name: string }) { return <header className="site-header"><div className="wrap header-inner"><Brand name={name} /><Navigation /></div></header>; }
export function Footer({ name, address }: { name: string; address: string | null }) {
  return <footer className="site-footer wrap"><div className="footer-top"><div><Brand name={name} /><p>{address || 'ข้อมูลบริษัทและที่อยู่: รอข้อมูลจากเจ้าของเว็บไซต์'}</p></div><nav className="footer-nav" aria-label="เมนูท้ายเว็บไซต์"><Link href="/#programs">โปรแกรม Summer</Link><Link href="/#preparation">เตรียมตัวก่อนเดินทาง</Link><Link href="/#contact">ติดต่อ</Link><Link href="/admin/login">สำหรับทีมงาน</Link></nav></div><div id="legal" className="footer-bottom"><span>© {new Date().getFullYear()} {name}</span><span>Terms & Conditions · Privacy Notice — รอฉบับตรวจสอบก่อนเปิดรับสมัคร</span></div></footer>;
}
