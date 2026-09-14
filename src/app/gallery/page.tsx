import { PublicFrame, PageHero } from '@/components/public-frame';
import { GalleryExplorer } from '@/components/gallery-explorer';
import { getPublicContent } from '@/lib/content/public-source';
import { publicMetadata } from '@/lib/public-metadata';
export const metadata = publicMetadata('ภาพและเรื่องราว', 'ภาพประกอบแนวคิดของภาษา วัฒนธรรม และมิตรภาพระหว่างการเดินทาง', '/gallery');
export default function GalleryPage() {
  return <PublicFrame><main id="main"><PageHero number="03" title="เรื่องราวระหว่างทาง" english="Moments to keep." description="บางความทรงจำเริ่มจากคำทักทาย บางมุมมองเกิดขึ้นเมื่อเราออกไปพบโลกด้วยตัวเอง" /><section className="edition-wrap public-section" aria-label="ภาพและเรื่องราว"><p className="public-demo-note">ภาพประกอบแนวคิด · ใช้เล่าแนวทางของโปรแกรมตัวอย่าง ไม่ใช่ภาพนักเรียนจากปีก่อนหรือหลักฐานการเดินทางจริง</p><GalleryExplorer items={getPublicContent().gallery} /></section></main></PublicFrame>;
}
