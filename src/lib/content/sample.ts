import { homeSettingsSchema, type HomepageContent } from './schema';

export const HERO_IMAGE = '/assets/images/summer-china-hero.png';
export const HERO_ALT = 'กลุ่มนักเรียนนานาชาติยิ้มร่วมกัน ท่ามกลางสถาปัตยกรรมและภูเขาจีน';

// Clearly labelled editorial examples, not real offers or travel records.
export const sampleHome: HomepageContent = {
  mode: 'demo',
  settings: homeSettingsSchema.parse({
    siteName: 'GG Summer', headline: 'เปิดโลกใบใหม่ ในซัมเมอร์ของคุณ',
    supportingText: 'เรียนรู้ภาษาจีนผ่านเรื่องราวนอกห้องเรียน ออกเดินทางพบวัฒนธรรม มิตรภาพ และตัวคุณในมุมที่ไม่เคยรู้จัก',
    previousYearStudents: 120, previousYear: 2025,
    heroPath: HERO_IMAGE, heroAlt: HERO_ALT,
  }),
  heroUrl: HERO_IMAGE,
  programs: [
    { id: 'sample-beijing', slug: 'sample-beijing', title: 'ปักกิ่ง — เรียนรู้โลกอีกใบ', country: 'จีน', city: 'ปักกิ่ง',
      summary: 'จากบทสนทนาแรกในห้องเรียน สู่เรื่องเล่าของเมืองเก่า เรียนภาษาไปพร้อมกับการค้นพบวัฒนธรรมด้วยตัวเอง',
      cover_path: HERO_IMAGE, cover_alt: HERO_ALT, imageUrl: HERO_IMAGE,
      departure_date: '2027-04-04', return_date: '2027-04-17', age_min: 13, age_max: 17,
      price: null, currency: 'THB', registration_status: 'closed', is_sample: true },
    { id: 'sample-hangzhou', slug: 'sample-hangzhou', title: 'หางโจว — เปิดรับมุมมองใหม่', country: 'จีน', city: 'หางโจว',
      summary: 'ค่อย ๆ ทำความรู้จักภาษา ผู้คน และวิถีชีวิต ผ่านกิจกรรมสร้างสรรค์ที่เปลี่ยนทุกวันให้เป็นบทเรียนใหม่',
      cover_path: HERO_IMAGE, cover_alt: HERO_ALT, imageUrl: HERO_IMAGE,
      departure_date: '2027-04-18', return_date: '2027-05-01', age_min: 13, age_max: 17,
      price: null, currency: 'THB', registration_status: 'closed', is_sample: true },
  ],
  preparation: [
    { id: '1', title: 'ค้นหาซัมเมอร์ที่เป็นคุณ', description: 'เริ่มจากสิ่งที่อยากเรียนรู้ พูดคุยกับครอบครัว และเลือกเส้นทางที่เหมาะกับความสนใจและช่วงวัย' },
    { id: '2', title: 'เตรียมพร้อมทีละก้าว', description: 'วางแผนเอกสาร การเดินทาง และของใช้จำเป็น พร้อมเรียนรู้วัฒนธรรมเล็ก ๆ น้อย ๆ ก่อนออกเดินทาง' },
    { id: '3', title: 'พาความกล้าออกเดินทาง', description: 'เปิดใจให้บทสนทนาแรก เพื่อนใหม่ และประสบการณ์ที่ไม่คุ้นเคย ทุกก้าวคือโอกาสของการเติบโต' },
  ],
  gallery: [
    { id: 'sample-culture', image_path: HERO_IMAGE, imageUrl: HERO_IMAGE, alt: HERO_ALT, caption: 'เมื่อวัฒนธรรมอยู่ใกล้กว่าหน้าหนังสือ', year: 2025 },
    { id: 'sample-friends', image_path: HERO_IMAGE, imageUrl: HERO_IMAGE, alt: HERO_ALT, caption: 'มิตรภาพเริ่มต้นจากคำทักทาย', year: 2025 },
  ],
};
