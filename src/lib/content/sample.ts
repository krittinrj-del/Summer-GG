import { homeSettingsSchema, type HomepageContent } from './schema';
// Explicit sample fixtures, never a silent fallback after a configured DB failure.
export const sampleHome: HomepageContent = {
  mode: 'demo',
  settings: homeSettingsSchema.parse({
    siteName: 'GG Summer', headline: 'เปิดโลกใบใหม่ ในซัมเมอร์ของคุณ',
    supportingText: 'ออกเดินทางไปเรียนรู้ภาษาจีน สัมผัสวัฒนธรรม และค้นพบตัวเอง ผ่านประสบการณ์ที่กว้างกว่าห้องเรียน',
    previousYearStudents: 120, previousYear: 2025,
  }),
  heroUrl: '/assets/images/landscape-study.svg',
  programs: [{ id: 'sample-beijing', slug: 'sample-beijing', title: 'ปักกิ่ง เรียนรู้ภาษาผ่านวัฒนธรรม', country: 'จีน', city: 'ปักกิ่ง', summary: 'ตัวอย่างแนวทางโปรแกรม ผสมผสานห้องเรียนภาษาและการเรียนรู้นอกสถานที่', cover_path: null, cover_alt: 'ภาพประกอบภูเขาและสถาปัตยกรรมจีน ไม่ใช่ภาพสถานที่จริง', imageUrl: '/assets/images/landscape-study.svg', departure_date: null, return_date: null, age_min: 13, age_max: 17, price: null, currency: 'THB', registration_status: 'closed', is_sample: true },
    { id: 'sample-hangzhou', slug: 'sample-hangzhou', title: 'หางโจว ค้นพบมุมมองใหม่', country: 'จีน', city: 'หางโจว', summary: 'ตัวอย่างแนวทางโปรแกรม เรียนภาษา ทำกิจกรรม และแลกเปลี่ยนมุมมองกับเพื่อนใหม่', cover_path: null, cover_alt: 'ภาพประกอบภูเขาและสถาปัตยกรรมจีน ไม่ใช่ภาพสถานที่จริง', imageUrl: '/assets/images/landscape-study.svg', departure_date: null, return_date: null, age_min: 13, age_max: 17, price: null, currency: 'THB', registration_status: 'closed', is_sample: true }],
  preparation: [{ id: '1', title: 'เลือกประสบการณ์ที่ใช่', description: 'พูดคุยกับครอบครัวถึงเป้าหมายการเรียนรู้ และเลือกโปรแกรมให้เหมาะกับช่วงวัย' }, { id: '2', title: 'เตรียมพร้อมไปด้วยกัน', description: 'ตรวจสอบเอกสารและวางแผนการเดินทาง ตามคำแนะนำของทีมงาน' }, { id: '3', title: 'เปิดใจให้โลกใบใหม่', description: 'เตรียมภาษาและทำความรู้จักวัฒนธรรม เพื่อเริ่มต้นซัมเมอร์อย่างมั่นใจ' }],
  gallery: [],
};
