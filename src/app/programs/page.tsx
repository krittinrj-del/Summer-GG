import Link from 'next/link';
import { PublicFrame, PageHero } from '@/components/public-frame';
import { ProgramCard } from '@/components/public-content';
import { getPublicContent } from '@/lib/content/public-source';
import { filterPrograms } from '@/lib/content/public';
import { publicMetadata } from '@/lib/public-metadata';
export const metadata = publicMetadata('โปรแกรม Summer', 'สำรวจแนวคิดโปรแกรมภาษาและวัฒนธรรมจีนในปักกิ่งและหางโจว', '/programs');
export default async function ProgramsPage({ searchParams }: { searchParams: Promise<{ city?: string | string[] }> }) {
  const content = getPublicContent();
  const query = (await searchParams).city;
  const city = typeof query === 'string' && content.programs.some(program => program.slug === query) ? query : 'all';
  const programs = filterPrograms(content.programs, city);
  return <PublicFrame><main id="main"><PageHero number="01" title="ค้นหาซัมเมอร์ที่เป็นคุณ" english="Find your world." description="ภาษา วัฒนธรรม และมิตรภาพ เลือกเส้นทางที่ตรงกับความสนใจ แล้วชวนครอบครัวมาวางแผนการเรียนรู้ร่วมกัน" /><section className="edition-wrap public-section" aria-label="เลือกโปรแกรม">{content.isDemo && <p className="public-demo-note">ข้อมูลตัวอย่าง · อายุและระยะเวลาเป็นแนวคิดโปรแกรม ราคา วันเดินทาง และเงื่อนไขยังรอยืนยัน ยังไม่เปิดรับสมัคร</p>}<div className="public-filter"><span>เลือกเมือง</span><nav className="public-tabs" aria-label="กรองโปรแกรมตามเมือง"><Link href="/programs" aria-current={city === 'all' ? 'true' : undefined}>ทุกเมือง</Link>{content.programs.map(program => <Link key={program.slug} href={`/programs?city=${program.slug}`} aria-current={city === program.slug ? 'true' : undefined}>{program.city}</Link>)}</nav><span>{programs.length} โปรแกรม</span></div><div className="public-program-grid">{programs.map(program => <ProgramCard key={program.slug} program={program} />)}</div>{!programs.length && <p>รายละเอียดโปรแกรมอยู่ระหว่างการยืนยัน คุณสามารถอ่านคู่มือเตรียมตัวก่อนวางแผนการเดินทาง</p>}</section><div className="edition-wrap public-cta"><Link className="edition-text-link" href="/preparation">เตรียมพร้อมก่อนออกเดินทาง →</Link></div></main></PublicFrame>;
}
