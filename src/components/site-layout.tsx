import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from './navigation';

export function Brand({ name = 'GG Summer' }: { name?: string }) {
  return <Link href="/" className="edition-brand" aria-label={`${name} โดย On Point — หน้าแรก`}>
    <span className="edition-logo"><Image src="/assets/brand/logo.png" alt="On Point" width={1920} height={1080} sizes="220px" /></span>
    <span className="edition-brand-divider" aria-hidden="true" />
    <span className="edition-brand-name">{name}<small>SUMMER JOURNEYS</small></span>
  </Link>;
}
export function Header({ name }: { name: string }) {
  return <header className="edition-header"><div className="edition-wrap edition-header-inner"><Brand name={name} /><Navigation /></div></header>;
}
export function Footer({ name, address, isDemo = false }: { name: string; address: string | null; isDemo?: boolean }) {
  return <footer className="edition-footer edition-wrap">
    <div className="edition-footer-top"><div><Brand name={name} /><p>{address || 'เรียนรู้โลกกว้าง เติบโตในแบบของคุณ'}</p></div>
      <nav className="edition-footer-nav" aria-label="เมนูท้ายเว็บไซต์"><Link href="/">ภาพรวม</Link><Link href="/programs">โปรแกรม Summer</Link><Link href="/preparation">เตรียมตัวก่อนเดินทาง</Link><Link href="/gallery">ภาพกิจกรรม</Link><Link href="/contact">ติดต่อ</Link><Link href="/apply">สมัครเลย</Link><Link href="/admin/login">สำหรับทีมงาน</Link></nav>
    </div>
    <div className="edition-footer-bottom"><span>© {new Date().getFullYear()} {name}</span><span>{isDemo ? 'ฉบับตัวอย่าง · ภาพประกอบและเรื่องราวเพื่อแนะนำแนวคิดโปรแกรม' : 'LEARN. EXPLORE. BECOME.'}</span><a href="#main">กลับขึ้นด้านบน ↑</a></div>
  </footer>;
}
