import Link from 'next/link';
import Image from 'next/image';
import type { FAQ, PublicProgram } from '@/lib/content/public';
export function FAQList({ items }: { items: FAQ[] }) {
  return <div className="public-accordion">{items.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>;
}
const statuses = { demo: 'ข้อมูลตัวอย่าง', open: 'เปิดรับสมัคร', upcoming: 'เร็ว ๆ นี้', closed: 'ปิดรับสมัคร' };
export function ProgramCard({ program }: { program: PublicProgram }) {
  return <article className="public-program-card"><Link href={`/programs/${program.slug}`} className="edition-program-art" aria-label={`ดูรายละเอียด ${program.title}`}><Image src={program.image} alt={program.alt} fill sizes="(max-width: 760px) 100vw, 46vw" /><span className="program-place" lang="en">{program.englishName}</span><span className="program-arrow" aria-hidden="true">↗</span></Link><div className="edition-program-meta"><span>{program.country} / {program.city}</span><span>{statuses[program.status]}</span></div><h2>{program.title}</h2><p>{program.summary}</p><p className="public-facts">อายุ {program.ageMin}–{program.ageMax} ปี · {program.durationDays} วัน · {statuses[program.status]}</p><div className="actions"><Link className="edition-text-link" href={`/programs/${program.slug}`}>ดูรายละเอียด ↗</Link><Link className="edition-text-link" href={`/apply?program=${program.slug}`}>สมัครโปรแกรมนี้ →</Link></div></article>;
}
