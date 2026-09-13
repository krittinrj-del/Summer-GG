import Image from 'next/image';
import { getHomepageContent } from '@/lib/content/home';
import { HERO_ALT, HERO_IMAGE } from '@/lib/content/sample';
import { Header, Footer } from '@/components/site-layout';
import { Counter } from '@/components/counter';
import { siteOrigin } from '@/lib/config';
import './home.css';

export const dynamic = 'force-dynamic';
export const metadata = { alternates: siteOrigin() ? { canonical: '/' } : undefined };
const statusLabels = { open: 'เปิดรับสมัคร', nearly_full: 'ใกล้เต็ม', waitlist: 'Waiting List', closed: 'แนะนำโปรแกรม' };
function localImage(value: string | null | undefined) {
  return value?.startsWith('/assets/images/') && !value.includes('..') ? value : HERO_IMAGE;
}
function safeLine(value: string | null) {
  if (!value) return null;
  try { const url = new URL(value); return url.protocol === 'https:' && ['line.me', 'lin.ee'].includes(url.hostname) ? url.href : null; }
  catch { return null; }
}

export default async function HomePage() {
  const { settings, programs, preparation, gallery, mode } = await getHomepageContent();
  const isDemo = mode === 'demo';
  const line = safeLine(settings.lineUrl);
  const phone = settings.phone?.replace(/[\s()-]/g, '');
  const hasPhone = Boolean(phone && /^\+?[0-9]{8,15}$/.test(phone));
  const hasContact = Boolean(line || hasPhone || settings.email);

  return <div className="public-home">
    <Header name={settings.siteName} />
    <main id="main">
      <section id="overview" className="editorial-hero" aria-labelledby="hero-title">
        <div className="editorial-hero-art"><Image id="summer-hero-image" src={HERO_IMAGE} alt={HERO_ALT} fill priority sizes="(max-width: 760px) 140vw, 100vw" /></div>
        <div className="edition-wrap editorial-hero-inner"><div className="editorial-hero-copy">
          <p className="edition-kicker"><span aria-hidden="true" className="edition-rule" /> CHINA SUMMER JOURNEYS</p>
          <h1 id="hero-title"><span lang="en">A summer</span><em lang="en">to become.</em><span className="hero-thai-title">{settings.headline}</span></h1>
          <p className="hero-description">{settings.supportingText}</p>
          <div className="actions"><a className="button" href="#programs">ดูโปรแกรม <span aria-hidden="true">↗</span></a><a className="edition-text-link" href="#registration">สมัครเลย <span aria-hidden="true">→</span></a></div>
          <div className="hero-footnote"><span className="hero-chinese" lang="zh" aria-hidden="true">学 · 行 · 成长</span><span>เรียนรู้ · ออกเดินทาง · เติบโต</span></div>
        </div></div>
        <div className="hero-margin-note" aria-hidden="true">THE WORLD IS YOUR CLASSROOM — 中国</div>
        <a className="hero-scroll" href="#journey">เริ่มต้นเรื่องราวของคุณ <span aria-hidden="true">↓</span></a>
      </section>

      <section id="journey" className="edition-intro edition-wrap" aria-labelledby="intro-title">
        <div><p className="edition-kicker">MORE THAN A SUMMER</p><h2 id="intro-title">บางบทเรียนที่ดีที่สุด<br />เริ่มต้นจากการออกเดินทาง</h2></div>
        <div className="edition-intro-note"><p>ภาษาใหม่ทำให้เราเข้าใจโลก<br />ประสบการณ์ใหม่ทำให้เราเข้าใจตัวเอง</p>{isDemo && <span className="edition-demo-label">ฉบับตัวอย่าง · โปรแกรมและสถิติสมมติ</span>}{mode === 'unavailable' && <p role="status">เชื่อมต่อข้อมูลล่าสุดไม่ได้ในขณะนี้ กรุณาลองใหม่ภายหลัง</p>}</div>
        <div className="edition-stat"><strong>{settings.previousYearStudents === null ? '学' : <Counter value={settings.previousYearStudents} />}</strong><span>{settings.previousYearStudents === null ? 'เรียนรู้ได้ทุกวัน' : `การเดินทางของนักเรียน · ${settings.previousYear ?? ''}`}{isDemo && <small>สถิติตัวอย่าง</small>}</span></div>
      </section>

      <section id="programs" className="edition-section edition-wrap" aria-labelledby="program-title">
        <div className="edition-section-head"><div><p className="edition-kicker"><span>01</span> / FIND YOUR SUMMER</p><h2 id="program-title">ออกไปเจอ<span className="serif-word" lang="en">your world.</span></h2></div><p>สองเส้นทาง สองมุมมอง<br />ค้นพบซัมเมอร์ในแบบของคุณ</p></div>
        <div className="edition-programs">{programs.map((program, i) => <article className="edition-program" key={program.id}>
          <a className="edition-program-art" href="#registration" aria-label={`ดูแนวทางสมัคร ${program.title}`}>
            <Image src={localImage(program.imageUrl)} alt={program.cover_alt || HERO_ALT} fill sizes="(max-width: 760px) 100vw, 46vw" />
            <span className="program-place" lang="en">{program.is_sample ? (i === 0 ? 'Beijing' : 'Hangzhou') : program.city}</span><span className="program-arrow" aria-hidden="true">↗</span>
          </a>
          <div className="edition-program-meta"><span>{program.country} / {program.city}</span><span>{program.is_sample ? 'โปรแกรมตัวอย่าง' : statusLabels[program.registration_status]}</span></div>
          <h3>{program.title}</h3><p>{program.summary}</p>
          <div className="edition-program-bottom"><span>{program.age_min !== null && program.age_max !== null ? `อายุ ${program.age_min}–${program.age_max} ปี` : 'เรียนรู้ผ่านประสบการณ์'} · {program.is_sample ? '14 วันแห่งการค้นพบ' : 'ภาษาและวัฒนธรรม'}</span><a className="edition-text-link" href="#registration">สำรวจเส้นทาง ↗</a></div>
        </article>)}</div>
        {!programs.length && <p className="edition-prose">การเดินทางเริ่มจากความสนใจของคุณ สำรวจแนวทางเตรียมตัวและค้นหาสิ่งที่อยากเรียนรู้จากซัมเมอร์ครั้งต่อไป</p>}
      </section>

      <section id="preparation" className="edition-preparation" aria-labelledby="preparation-title"><div className="edition-wrap edition-preparation-grid">
        <div className="edition-preparation-heading"><p className="edition-kicker"><span>02</span> / BEFORE YOU GO</p><p className="edition-display" lang="en">Great journeys<br />begin <em>here.</em></p><h2 id="preparation-title">เตรียมพร้อมให้ทุกก้าว<br />เป็นก้าวที่มั่นใจ</h2><a className="edition-text-link" href="#registration">เริ่มวางแผนการเดินทาง →</a></div>
        <ol className="edition-steps">{preparation.map((step, i) => <li key={step.id}><span className="step-number" aria-hidden="true">0{i + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
        {!preparation.length && <p className="edition-prose">เริ่มต้นจากการเลือกเป้าหมายการเรียนรู้ เตรียมเอกสาร และทำความรู้จักวัฒนธรรมก่อนออกเดินทาง</p>}
      </div></section>

      <section id="gallery" className="edition-section edition-wrap" aria-labelledby="gallery-title">
        <div className="edition-section-head"><div><p className="edition-kicker"><span>03</span> / THE MOMENTS BETWEEN</p><h2 id="gallery-title">เก็บโลกไว้<span className="serif-word" lang="en">in your heart.</span></h2></div><p>ระหว่างทางมีมากกว่าจุดหมาย<br />มีเรื่องราวที่กลายเป็นส่วนหนึ่งของเรา</p></div>
        <div className="edition-gallery">{(gallery.length ? gallery : [{ id: 'editorial-art', imageUrl: HERO_IMAGE, alt: HERO_ALT, caption: 'จินตนาการถึงซัมเมอร์ที่เต็มไปด้วยการเรียนรู้' }]).map((item, i) => <figure key={item.id}>
          <div className="edition-gallery-image"><Image src={localImage(item.imageUrl)} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 60vw" /><span className="gallery-word" lang="en" aria-hidden="true">{i === 0 ? 'Explore.' : 'Together.'}</span></div>
          <figcaption><span>0{i + 1} / {item.caption}</span><span>ภาพประกอบแนวคิด</span></figcaption>
        </figure>)}</div>
        <p className="edition-image-note">ภาพประกอบสำหรับเล่าแนวคิดการเดินทาง ไม่ใช่ภาพบันทึกกิจกรรมจากโปรแกรมจริง</p>
      </section>

      <section id="contact" className="edition-contact edition-wrap" aria-labelledby="contact-title">
        <p className="edition-kicker"><span>04</span> / YOUR NEXT CHAPTER</p>
        <h2 id="contact-title">ซัมเมอร์ถัดไปของคุณ<br /><em lang="en">starts with a little curiosity.</em></h2>
        <p>เริ่มจากสิ่งที่คุณอยากรู้ แล้วค่อย ๆ วางแผนการเดินทางไปด้วยกัน</p>
        <div className="actions">{line && <a className="button" href={line} rel="noopener noreferrer" target="_blank">พูดคุยทาง LINE ↗</a>}{hasPhone && <a className="button secondary" href={`tel:${phone}`}>{settings.phone}</a>}{settings.email && <a className="button secondary" href={`mailto:${settings.email}`}>พูดคุยทางอีเมล ↗</a>}{!hasContact && <a className="button" href="#registration">วางแผนซัมเมอร์ของคุณ <span aria-hidden="true">↗</span></a>}</div>
        <details id="registration" className="edition-registration"><summary>ก่อนเริ่มสมัคร <span aria-hidden="true">＋</span></summary><div><p>{isDemo ? 'คุณกำลังชมโปรแกรมตัวอย่างเพื่อค้นหาแนวทางการเดินทาง เว็บไซต์นี้ยังไม่รับใบสมัครหรือข้อมูลส่วนบุคคล' : 'การสมัครออนไลน์ยังไม่เปิดให้บริการ โปรดตรวจสอบรายละเอียดและเงื่อนไขก่อนวางแผนการเดินทาง'}</p><p>จดสิ่งที่อยากเรียนรู้ ช่วงเวลาที่สะดวก และคำถามที่อยากพูดคุยกับครอบครัว แล้วเลือกเส้นทางที่เหมาะกับคุณ</p><a className="edition-text-link" href="#programs">กลับไปสำรวจโปรแกรม ↑</a></div></details>
      </section>
    </main>
    <Footer name={settings.siteName} address={settings.address} isDemo={isDemo} />
  </div>;
}
