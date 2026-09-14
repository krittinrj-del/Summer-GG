import Link from 'next/link';
import { PublicFrame, PageHero } from '@/components/public-frame';
import { FAQList } from '@/components/public-content';
import { getPublicContent } from '@/lib/content/public-source';
import { confirmationLabel } from '@/lib/content/public';
import { publicMetadata } from '@/lib/public-metadata';
export const metadata = publicMetadata('ติดต่อและปรึกษาโปรแกรม', 'ข้อมูลติดต่อ On Point Summer Programs และคำถามก่อนวางแผนโปรแกรมสำหรับครอบครัว', '/contact');
export default function ContactPage() {
  const { contact, faq } = getPublicContent();
  const channels = [['LINE', contact.line], ['โทรศัพท์', contact.phone], ['Email', contact.email], ['เวลาทำการ', contact.hours], ['ที่อยู่', contact.address]];
  return <PublicFrame><main id="main"><PageHero number="04" title="ทุกการเดินทางเริ่มจากบทสนทนา" english="Let’s talk summer." description="รวบรวมคำถาม ความสนใจ และความพร้อมของครอบครัว เพื่อวางแผนซัมเมอร์ที่เหมาะกับคุณ" /><div className="edition-wrap"><section className="public-section public-two-column"><div><h2>ช่องทางติดต่อ</h2><p>{contact.notice}</p></div><dl className="contact-directory">{channels.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || confirmationLabel}</dd></div>)}</dl></section><section className="public-section public-two-column"><div><p className="edition-kicker">A FEW FIRST QUESTIONS</p><h2>คำถามเบื้องต้น</h2></div><FAQList items={faq} /></section><section className="public-cta"><h2>เตรียมเรื่องที่อยากปรึกษา</h2><p>เริ่มจากเลือกเมืองที่สนใจ และทบทวนข้อมูลที่ควรเตรียมก่อนสมัคร ช่องทางพูดคุยกับทีมงานจะเปิดเมื่อยืนยันข้อมูลแล้ว</p><div className="actions"><Link className="button" href="/apply">เตรียมข้อมูลเพื่อปรึกษาโปรแกรม ↗</Link><Link className="edition-text-link" href="/programs">สำรวจโปรแกรม →</Link></div></section></div></main></PublicFrame>;
}
