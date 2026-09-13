import Link from 'next/link';
export default function NotFound() { return <main id="main" className="panel"><p className="eyebrow">404 / NOT FOUND</p><h1>ไม่พบหน้าที่คุณค้นหา</h1><p>หน้านี้อาจยังไม่เปิดใช้งาน กรุณากลับไปดูข้อมูลที่หน้าแรก</p><Link href="/" className="button">กลับหน้าแรก</Link></main>; }
