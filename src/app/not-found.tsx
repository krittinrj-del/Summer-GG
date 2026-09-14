import Link from 'next/link';
import { PublicFrame, PageHero } from '@/components/public-frame';
export default function NotFound() { return <PublicFrame><main id="main"><PageHero number="404" title="ไม่พบหน้าที่คุณค้นหา" english="A different path." description="เส้นทางนี้อาจเปลี่ยนไปแล้ว ลองกลับไปเลือกโปรแกรมและเริ่มค้นพบเรื่องราวใหม่อีกครั้ง" /><div className="edition-wrap public-cta"><Link href="/programs" className="button">สำรวจโปรแกรม ↗</Link></div></main></PublicFrame>; }
