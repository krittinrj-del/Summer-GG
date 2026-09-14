import Link from 'next/link';
import { PublicFrame, PageHero } from '@/components/public-frame';
import { getPublicContent } from '@/lib/content/public-source';
import { preparationNotice } from '@/lib/content/public';
import { publicMetadata } from '@/lib/public-metadata';
export const metadata = publicMetadata('เตรียมตัวก่อนเดินทาง', 'คู่มือเตรียมคำถามและเช็กลิสต์สำหรับนักเรียนและผู้ปกครองก่อนเดินทาง', '/preparation');
export default function PreparationPage() {
  return <PublicFrame><main id="main"><PageHero number="02" title="เตรียมพร้อมทีละก้าว" english="Before you go." description="สิบเรื่องที่ชวนทบทวนกับครอบครัว เพื่อเริ่มต้นการเดินทางอย่างเข้าใจและมั่นใจ" /><section className="edition-wrap public-section" aria-label="คู่มือก่อนเดินทาง"><p className="public-demo-note">{preparationNotice}</p><p>เลือกหัวข้อเพื่อเปิดอ่านและเช็กสิ่งที่เตรียมแล้ว เครื่องหมายถูกใช้ทบทวนในหน้านี้เท่านั้น ไม่มีการบันทึกหรือส่งข้อมูล</p><div className="public-accordion">{getPublicContent().preparation.map((step, index) => <details key={step.id}><summary>{String(index + 1).padStart(2, '0')} / {step.title}</summary><div><p>{step.description}</p><ul className="preparation-checklist">{step.items.map((item, itemIndex) => <li key={item}><label htmlFor={`${step.id}-${itemIndex}`}><input id={`${step.id}-${itemIndex}`} type="checkbox" />{item}</label></li>)}</ul></div></details>)}</div><div className="public-cta"><Link className="button" href="/contact">สอบถามการเตรียมตัว ↗</Link></div></section></main></PublicFrame>;
}
