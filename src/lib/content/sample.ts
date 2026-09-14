import { homeSettingsSchema, type HomepageContent } from './schema';

export { HERO_IMAGE, HERO_ALT } from './public';
import { HERO_IMAGE, HERO_ALT, demoPrograms, demoGallery } from './public';

// Clearly labelled editorial examples, not real offers or travel records.
export const sampleHome: HomepageContent = {
  mode: 'demo',
  settings: homeSettingsSchema.parse({
    siteName: 'On Point Summer Programs', headline: 'เปิดโลกใบใหม่ ในซัมเมอร์ของคุณ',
    supportingText: 'เรียนรู้ภาษาจีนผ่านเรื่องราวนอกห้องเรียน ออกเดินทางพบวัฒนธรรม มิตรภาพ และตัวคุณในมุมที่ไม่เคยรู้จัก',
    previousYearStudents: 120, previousYear: 2025,
    heroPath: HERO_IMAGE, heroAlt: HERO_ALT,
  }),
  heroUrl: HERO_IMAGE,
  programs: demoPrograms.map(program => ({
    id: program.slug, slug: program.slug, title: program.title, country: program.country, city: program.city,
    summary: program.summary, cover_path: program.image, cover_alt: program.alt, imageUrl: program.image,
    departure_date: null, return_date: null, age_min: program.ageMin, age_max: program.ageMax,
    price: null, currency: 'THB', registration_status: 'closed', is_sample: true,
  })),
  preparation: [
    { id: '1', title: 'ค้นหาซัมเมอร์ที่เป็นคุณ', description: 'เริ่มจากสิ่งที่อยากเรียนรู้ พูดคุยกับครอบครัว และเลือกเส้นทางที่เหมาะกับความสนใจและช่วงวัย' },
    { id: '2', title: 'เตรียมพร้อมทีละก้าว', description: 'วางแผนเอกสาร การเดินทาง และของใช้จำเป็น พร้อมเรียนรู้วัฒนธรรมเล็ก ๆ น้อย ๆ ก่อนออกเดินทาง' },
    { id: '3', title: 'พาความกล้าออกเดินทาง', description: 'เปิดใจให้บทสนทนาแรก เพื่อนใหม่ และประสบการณ์ที่ไม่คุ้นเคย ทุกก้าวคือโอกาสของการเติบโต' },
  ],
  gallery: demoGallery.slice(0, 2).map(item => ({ id: item.id, image_path: item.src, imageUrl: item.src, alt: item.alt, caption: item.caption, year: item.year })),
};
