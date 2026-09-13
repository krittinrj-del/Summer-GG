# GG Summer Website — Master Prompt for Codex

คัดลอกข้อความตั้งแต่หัวข้อ “เริ่ม Prompt” ไปให้ Codex ใช้งานได้ทันที

---

## เริ่ม Prompt

คุณคือ Senior Full-stack Developer, Product Designer และ Security-minded Engineer

ให้สร้างเว็บไซต์สมัคร Summer Program สำหรับนักเรียนและผู้ปกครอง โดยเว็บไซต์ต้องใช้งานได้จริง มีฐานข้อมูล แบบฟอร์มสมัครออนไลน์ การยอมรับ Terms & Conditions และ Admin Dashboard ไม่ใช่เพียง UI mockup

โปรเจกต์นี้แบ่งเป็น 2 Phase:

- Phase 1: สร้างเว็บไซต์ ระบบสมัคร Terms & Conditions ฐานข้อมูล และ Admin Dashboard ให้เสร็จและใช้งานได้ก่อน
- Phase 2: เชื่อม Google Drive API เพื่อนำ PDF ใบสมัครไปจัดเก็บ โดยยังไม่ต้อง implement ในรอบนี้

ห้ามเชื่อม Google Drive ใน Phase 1 แต่ต้องออกแบบโครงสร้างให้เพิ่มภายหลังได้โดยไม่ต้องรื้อระบบสมัครหรือฐานข้อมูล

## 1. วิธีเริ่มงาน

ก่อนแก้โค้ด:

1. ตรวจ repository, `AGENTS.md`, package manager, framework, routes, database และไฟล์ที่มีอยู่
2. ถ้ามีโปรเจกต์อยู่แล้ว ให้รักษา architecture, dependencies, lockfile และ coding conventions เดิม
3. ถ้า repository ว่าง ให้เริ่มด้วย Next.js App Router, TypeScript และ Tailwind CSS
4. สรุป architecture, route map, database schema, assumptions และ implementation plan แบบกระชับ
5. ถ้าไม่มี blocker ให้เริ่ม implement ต่อได้โดยไม่ต้องรออนุมัติทุกขั้น
6. ห้ามแก้ไฟล์ที่ไม่เกี่ยวข้อง
7. ห้ามเพิ่ม dependency ถ้า native API หรือ dependency ที่มีอยู่ทำงานได้เพียงพอ
8. ทำทีละ Phase ย่อย และรัน typecheck/build หลังแต่ละส่วนสำคัญ

## 2. เป้าหมายของเว็บไซต์

ผู้ใช้งานทั่วไปต้องสามารถ:

1. ดูภาพรวม Summer Program
2. ดูโปรแกรมที่เปิดรับสมัคร
3. อ่านรายละเอียดแต่ละโปรแกรม
4. อ่านและยอมรับ Terms & Conditions
5. กรอกใบสมัครออนไลน์
6. ตรวจสอบข้อมูลก่อนส่ง
7. ได้รับเลขอ้างอิงเมื่อสมัครสำเร็จ
8. ดูขั้นตอนเตรียมตัวก่อนเดินทาง
9. ดูภาพกิจกรรมจากปีก่อน
10. ติดต่อทีมงานได้ง่าย

Admin และ Staff ต้องสามารถ Login เพื่อ:

1. ดู Dashboard
2. จัดการ Summer Programs
3. ดูและจัดการใบสมัคร
4. เปลี่ยนสถานะใบสมัคร
5. จัดการ Terms & Conditions เป็น Version
6. จัดการ Preparation content
7. จัดการ Gallery
8. จัดการ Contact messages
9. แก้ข้อมูลบนหน้าเว็บไซต์
10. Export รายการใบสมัครเป็น CSV
11. ดาวน์โหลด PDF ใบสมัคร หรือ Generate PDF on demand ใน Phase 1

## 3. Technology Stack

ใช้เทคโนโลยีต่อไปนี้ เว้นแต่ repository เดิมมี stack ที่เทียบเท่าและมีเหตุผลชัดเจนที่ควรรักษาไว้:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL
- Supabase Authentication สำหรับ Admin/Staff
- Supabase Storage สำหรับ Gallery และไฟล์เว็บไซต์ตามความจำเป็น
- Server Components เป็นค่าเริ่มต้น
- Client Components เฉพาะส่วนที่ต้อง interactive
- Server Actions หรือ Route Handlers สำหรับ mutation
- Zod สำหรับ validation ฝั่ง Server
- React Hook Form ใช้เฉพาะเมื่อช่วยลดความซับซ้อนของ multi-step form
- รองรับการ Deploy บน Vercel

ข้อกำหนด:

- ใช้ Supabase Row Level Security
- ห้ามใช้ Supabase service-role key ใน browser
- Secrets ต้องอยู่ใน environment variables
- เพิ่ม `.env.example` โดยไม่มี secret จริง
- ห้าม commit `.env` หรือ credentials
- Database ต้องเป็น Source of Truth
- ห้ามใช้ `localStorage` เป็นที่เก็บใบสมัครหรือข้อมูลส่วนบุคคลถาวร

## 4. Visual Direction

ออกแบบเว็บไซต์สไตล์ “Premium Editorial × Chinese Brush Art” ตามภาพ Reference ที่ผู้ใช้ให้ไว้

ภาพ Reference ประกอบด้วย:

- Hero ภาพกลุ่มนักเรียนนานาชาติยืนรวมกัน โดยมีสถาปัตยกรรมจีนอยู่ด้านหลัง
- Layout แนว Editorial ใช้ตัวอักษรขนาดใหญ่
- Chinese brush texture และพื้นผิวกระดาษ
- Composition ที่มีพื้นที่ว่างมากและดู Premium

แนวทางออกแบบ:

- พื้นหลักเป็นสีขาวนวลหรือสีคล้ายกระดาษ
- Accent color ใช้ Chinese red, deep navy, muted gold และ charcoal
- หลีกเลี่ยงสีจำนวนมากเกินไป
- Headline ใช้ Display Serif หรือรูปแบบที่ให้ความรู้สึก Editorial
- เนื้อหาภาษาไทยใช้ Sans-serif ที่อ่านง่ายและ Render ภาษาไทยได้ดี
- ใช้พื้นที่ว่างอย่างตั้งใจ
- ใช้เส้น กรอบ หรือ brush stroke เป็น accent เท่านั้น
- Card ไม่ควรดูเหมือน Dashboard template ทั่วไป
- ไม่ใช้ gradient มากเกินไป
- Animation ใช้ fade, reveal, number counter และ subtle parallax อย่างสุภาพ
- รองรับ `prefers-reduced-motion`
- ห้ามใส่ข้อความสำคัญลงไปในรูป Hero โดยตรง
- Headline และ CTA ต้องเป็น HTML เพื่อให้ Responsive, SEO-friendly และแก้ไขได้
- Mobile ต้องยังคงลำดับชั้นของข้อความและภาพที่ชัดเจน

ใช้รูปที่แนบมาเป็น Hero และ visual reference โดยวางไฟล์ไว้ใน:

- `/public/assets/references/`
- `/public/assets/images/`

ใช้ Next Image พร้อม `sizes`, dimension หรือ aspect ratio ที่ชัดเจนเพื่อป้องกัน layout shift

## 5. ภาษาและเนื้อหา

Phase 1 ใช้ภาษาไทยเป็นหลัก แต่โครงสร้าง component และ database ต้องไม่ปิดกั้นการเพิ่มภาษาอังกฤษภายหลัง

ถ้ายังไม่มีข้อมูลจริง:

- ใช้ Sample content ภาษาไทยจำนวนเล็กน้อย
- ระบุใน Code หรือ Admin ว่าเป็นข้อมูลตัวอย่าง
- ห้ามแต่งชื่อบริษัท ที่อยู่ ราคา หรือข้อมูลติดต่อเสมือนเป็นข้อมูลจริง
- รวม placeholder ที่ต้องเปลี่ยนไว้ในเอกสารส่งมอบ

## 6. Sitemap และ Routes

สร้าง Route อย่างน้อย:

- `/` หน้า Overview / Landing Page
- `/programs` รายการ Summer Programs
- `/programs/[slug]` หน้ารายละเอียดแต่ละโปรแกรม
- `/apply/[programSlug]` แบบฟอร์มสมัคร
- `/apply/[programSlug]/success` หน้า Confirmation
- `/preparation` ขั้นตอนเตรียมตัว
- `/gallery` ภาพกิจกรรมปีก่อน
- `/contact` ติดต่อ
- `/terms` Terms & Conditions ฉบับที่มีผล
- `/privacy` Privacy Notice placeholder
- `/admin/login` หน้า Login
- `/admin` Dashboard
- `/admin/programs`
- `/admin/applications`
- `/admin/applications/[id]`
- `/admin/terms`
- `/admin/preparation`
- `/admin/gallery`
- `/admin/contacts`
- `/admin/settings`

เพิ่ม `not-found`, loading, empty และ error states ที่เหมาะสม

## 7. Global Navigation

Header ประกอบด้วย:

- Logo หรือชื่อเว็บไซต์
- ภาพรวม
- โปรแกรม Summer
- เตรียมตัวก่อนเดินทาง
- ภาพกิจกรรม
- ติดต่อ
- ปุ่ม “สมัครเลย”
- Mobile menu ที่ใช้ keyboard ได้

Footer ประกอบด้วย:

- ข้อมูลบริษัทแบบ placeholder
- Navigation
- LINE, โทรศัพท์, Email
- Social links แบบ optional
- Terms & Conditions
- Privacy Notice
- Copyright

## 8. หน้า Overview

สร้าง Landing Page แบบ Interactive ประกอบด้วย:

### Hero

- ภาพกลุ่มนักเรียนนานาชาติและสถาปัตยกรรมจีน
- Headline ภาษาไทยที่แก้ไขจาก Admin ได้ภายหลัง
- Supporting text สั้นและชัดเจน
- ปุ่ม “ดูโปรแกรม”
- ปุ่ม “สมัครเลย”
- Entrance animation แบบสุภาพ

### Previous Year Statistics

- แสดงจำนวนนักเรียนที่เดินทางในปีที่ผ่านมา
- ใช้ animated number counter เมื่อ section เข้ามาใน viewport
- ข้อมูลมาจาก Site Settings
- ห้าม hard-code ใน component เมื่อมี database พร้อมใช้งาน

### Featured Programs

- แสดงเฉพาะโปรแกรมที่เป็น Featured และ Published
- Card แสดง Cover, ประเทศ, เมือง, ช่วงอายุ, วันที่, ระยะเวลา และราคาเริ่มต้น
- แสดงสถานะ เปิดรับสมัคร, ใกล้เต็ม, Waitlist หรือปิดรับสมัคร
- กดเข้าสู่หน้ารายละเอียดได้

### Preparation Preview

- แสดงขั้นตอนเตรียมตัวแบบย่อ
- มี CTA ไปหน้ารายละเอียด

### Previous Year Gallery

- แสดงภาพที่ถูกเลือกเป็น Featured
- มี CTA ไป Gallery ทั้งหมด

### Contact CTA

- ปุ่ม LINE
- โทรศัพท์
- Email
- ไปหน้าติดต่อ

## 9. หน้า Programs

แสดงรายการโปรแกรมที่ Published โดยมี:

- Search ตามชื่อโปรแกรม ประเทศ หรือเมือง
- Filter ตามประเทศ ช่วงอายุ และสถานะ เมื่อมีหลายโปรแกรมเพียงพอ
- Server-side pagination หากข้อมูลมีจำนวนมาก
- Empty state เมื่อไม่มีโปรแกรมเปิดรับ
- Program card ที่อ่านง่ายบนมือถือ

อย่าเพิ่ม Filter ที่ไม่มีประโยชน์กับจำนวนข้อมูลจริง

## 10. หน้ารายละเอียด Summer Program

แต่ละโปรแกรมดึงข้อมูลตาม `slug` และแสดง:

- Cover image
- ชื่อโปรแกรม
- ประเทศและเมือง
- คำอธิบายสั้นและรายละเอียด
- วันเดินทางและวันกลับ
- ระยะเวลา
- ช่วงอายุ
- จำนวนที่รับ
- จำนวนที่นั่งคงเหลือ
- ราคาและสกุลเงิน
- สิ่งที่รวมในราคา
- สิ่งที่ไม่รวมในราคา
- Highlights
- Itinerary
- ข้อมูลที่พัก
- โรงเรียนหรือสถาบัน
- FAQ ของโปรแกรม
- Gallery ของโปรแกรม
- สถานะการรับสมัคร
- Sticky CTA “สมัครโปรแกรมนี้” บน Mobile และ Desktop โดยไม่รบกวนเนื้อหา

ถ้าปิดรับสมัคร:

- ปิดปุ่มสมัคร
- แสดงสถานะชัดเจน
- ถ้าเปิด Waitlist ให้เปลี่ยน CTA เป็น “ลงทะเบียน Waiting List”

## 11. Capacity และ Application Rules

แต่ละโปรแกรมมี:

- `capacity`
- `registration_open_at`
- `registration_close_at`
- `status`
- `waitlist_enabled`

ระบบต้อง:

- คำนวณจำนวนที่นั่งจากใบสมัครสถานะที่กำหนด
- ไม่เปิดเผยรายชื่อหรือข้อมูลผู้สมัคร
- ตรวจสอบสถานะและจำนวนที่นั่งซ้ำฝั่ง Server ตอน Submit
- รองรับกรณีที่โปรแกรมเต็มระหว่างผู้ใช้กำลังกรอก
- เปลี่ยนใบสมัครเป็น Waitlist ตาม Business Rule
- ป้องกันการสมัครซ้ำในโปรแกรมเดียวกันด้วย Email และเบอร์โทรศัพท์
- ป้องกัน Submit ซ้ำด้วย idempotency key
- สร้าง Reference Number ที่คาดเดาได้ยาก เช่น `APP-2027-A8X4K2`

สถานะใบสมัคร:

- `new`
- `reviewing`
- `awaiting_documents`
- `awaiting_payment`
- `waitlisted`
- `confirmed`
- `rejected`
- `cancelled`

ทุกการเปลี่ยนสถานะต้องบันทึกเวลาและผู้ดำเนินการ

## 12. Terms & Conditions ก่อนสมัคร

ผู้ใช้ต้องอ่านและยอมรับ Terms & Conditions ก่อนเข้าสู่หรือก่อนส่งแบบฟอร์มสมัคร

Flow:

1. แสดง Terms title, version และ effective date
2. แสดงเนื้อหาที่อ่านง่ายบนมือถือ
3. ผู้ใช้เลือกประเภทผู้ยอมรับ: นักเรียนหรือผู้ปกครอง
4. กรอกชื่อผู้ยอมรับ
5. ถ้าเป็นผู้ปกครอง ให้กรอกความสัมพันธ์กับนักเรียน
6. กรอก Email หรือเบอร์โทรสำหรับยืนยัน
7. พิมพ์ชื่อเป็น Typed Signature
8. Checkbox ยอมรับ Terms ซึ่งต้องไม่ถูกเลือกไว้ล่วงหน้า
9. Checkbox รับทราบ Privacy Notice ซึ่งต้องไม่ถูกเลือกไว้ล่วงหน้า
10. Marketing Consent เป็น Optional และต้องไม่ถูกเลือกไว้ล่วงหน้า

ข้อกำหนด:

- Terms, Privacy acknowledgement และ Marketing consent เป็นคนละรายการ
- การไม่ยอมรับ Marketing consent ต้องไม่ขัดขวางการสมัคร
- ถ้าผู้สมัครอายุต่ำกว่าเกณฑ์ที่กำหนด ต้องให้ผู้ปกครองเป็นผู้ยอมรับ
- ทำ Age threshold เป็น Configuration
- ใส่หมายเหตุว่าต้องให้ผู้เชี่ยวชาญด้านกฎหมายตรวจสอบ Age rule และข้อความจริงก่อน Production
- ตรวจ Consent ฝั่ง Server ไม่ใช่ตรวจเฉพาะ Client
- เก็บ Terms version และ content hash ที่ผู้ใช้ยอมรับ
- Terms ที่ Publish แล้วและมีผู้ยอมรับแล้วห้ามแก้ทับ ให้สร้าง Version ใหม่
- เก็บเวลา Accepted เป็น UTC และแสดงผลตาม `Asia/Bangkok`
- พิจารณาเก็บ IP/User Agent เฉพาะเมื่อมีเหตุผลและระบุใน Privacy Notice แล้ว

## 13. แบบฟอร์มสมัครออนไลน์

Phase 1 ผู้สมัครไม่ต้องสร้าง Account

สร้าง Multi-step Form:

1. Terms & Consent
2. ข้อมูลนักเรียน
3. ข้อมูลผู้ปกครอง
4. ข้อมูลสุขภาพและข้อควรระวัง
5. Emergency Contact
6. ตรวจสอบข้อมูล
7. ส่งใบสมัคร

ข้อมูลนักเรียน:

- ชื่อและนามสกุลภาษาไทย
- ชื่อและนามสกุลภาษาอังกฤษ
- ชื่อเล่น
- วันเกิด
- เพศแบบ Optional
- สัญชาติ
- โรงเรียน
- ระดับชั้น
- โทรศัพท์
- Email
- LINE ID แบบ Optional
- ที่อยู่

ข้อมูลผู้ปกครอง:

- ชื่อและนามสกุล
- ความสัมพันธ์
- โทรศัพท์
- Email
- LINE ID แบบ Optional
- ที่อยู่ หากต่างจากนักเรียน

ข้อมูลสุขภาพ:

- โรคประจำตัว
- ประวัติแพ้ยา
- ประวัติแพ้อาหาร
- ยาที่ใช้ประจำ
- ข้อจำกัดด้านอาหาร
- ข้อมูลที่ทีมงานจำเป็นต้องทราบ
- ให้ผู้ใช้ตอบ “ไม่มี” ได้อย่างชัดเจน

Emergency Contact:

- ชื่อและนามสกุล
- ความสัมพันธ์
- โทรศัพท์
- เบอร์สำรองแบบ Optional

ข้อกำหนด UX:

- แสดง Progress ชัดเจน
- Back/Next ต้องไม่ทำข้อมูลหาย
- Validate ตอนเปลี่ยน Step และตอน Submit ฝั่ง Server
- Error แสดงใกล้ช่องกรอก
- Focus ไปยัง Error แรก
- รองรับ Keyboard
- ป้องกัน Double Submit
- แสดง Loading ระหว่างส่ง
- ห้ามเก็บข้อมูลสุขภาพใน `localStorage`
- ก่อนส่งต้องมีหน้า Review
- หลังส่งสำเร็จแสดง Reference Number
- ถ้าบันทึกไม่สำเร็จ ต้องไม่แสดงว่า Success
- ถ้าเกิด Error ให้รักษาข้อมูลใน Form เท่าที่ปลอดภัย

Phase 1 ยังไม่ต้อง Upload Passport หรือเอกสารสุขภาพ แต่เตรียม schema และ UI architecture ให้เพิ่มใน Phase ถัดไปได้

## 14. Confirmation และ Notification

หลังส่งใบสมัครสำเร็จ:

- แสดงหน้า Confirmation
- แสดง Reference Number
- แสดงชื่อโปรแกรม
- แสดงวันที่สมัคร
- บอกขั้นตอนถัดไป
- มีปุ่มกลับหน้า Programs
- มีปุ่มติดต่อเจ้าหน้าที่

เตรียม Transactional Email interface สำหรับ:

- ได้รับใบสมัครแล้ว
- ต้องส่งเอกสารเพิ่ม
- รอชำระเงิน
- Confirmed
- Waitlist
- Cancelled

ถ้ายังไม่กำหนด Email provider ให้สร้าง provider abstraction และ development logger โดยห้ามใส่ข้อมูลสุขภาพหรือข้อมูลละเอียดอ่อนลง Log

Email failure ต้องไม่ทำให้ใบสมัครที่บันทึกแล้วสูญหาย

## 15. PDF ใน Phase 1

สร้าง PDF ใบสมัครแบบ Server-side หรือ Generate on demand จาก Admin ได้ แต่ยังไม่ต้องอัปโหลด Google Drive

หลักการ:

- Database เป็น Source of Truth
- เก็บ immutable application snapshot และ consent snapshot เมื่อ Submit
- PDF ต้องรองรับภาษาไทยและ Embed ฟอนต์ที่จำเป็น
- ใช้ A4
- มี Header, Footer และเลขหน้า
- แสดง Reference Number
- แสดงข้อมูลนักเรียน ผู้ปกครอง Emergency Contact และข้อมูลใบสมัคร
- แสดง Terms title/version, ผู้ยอมรับ, accepted timestamp และ Typed Signature
- แสดง Privacy acknowledgement และ Marketing consent
- Escape ข้อมูลก่อน Render
- ห้ามสร้าง PDF ใน Browser ด้วย Print dialog
- Admin ดาวน์โหลด PDF ได้
- ถ้าแก้ข้อมูลภายหลัง ให้สร้าง Revision ใหม่ ไม่เขียนทับหลักฐานเดิม

ถ้าการสร้าง PDF เพิ่มความซับซ้อนจนทำให้ Core Application Flow ไม่เสร็จ ให้จัดเป็นงานสุดท้ายของ Phase 1 แต่ต้องมี schema/interface รองรับไว้

## 16. Google Drive — Phase 2 เท่านั้น

ยังไม่ต้อง implement Google Drive ในรอบนี้

ให้เตรียม interface เช่น:

- `DocumentStorageProvider`
- `uploadApplicationPdf()`
- `getApplicationDocument()`
- `retryApplicationDocumentUpload()`

สถานะเอกสาร:

- `pending`
- `generating`
- `ready`
- `uploading`
- `completed`
- `failed`

เพิ่ม field รองรับภายหลัง:

- `storage_provider`
- `external_file_id`
- `external_folder_id`
- `filename`
- `revision`
- `checksum`
- `generated_at`
- `uploaded_at`
- `retry_count`
- `last_error_code`

ห้ามเพิ่ม Google credentials และห้ามเรียก Google Drive API ใน Phase 1

## 17. Preparation Page

แสดงเป็น Timeline หรือ Checklist โดยมีหัวข้อตัวอย่าง:

- หลังสมัคร
- การชำระเงิน
- Passport และ Visa
- เอกสารผู้ปกครอง
- การเตรียมเสื้อผ้า
- การเตรียมยา
- Orientation
- วันนัดหมายสนามบิน
- Emergency Contact ระหว่างเดินทาง

แต่ละรายการมี:

- ชื่อ
- คำอธิบาย
- ลำดับ
- Icon
- ไฟล์ดาวน์โหลดแบบ Optional
- Published status

Admin เพิ่ม แก้ไข ลบ จัดลำดับ และ Publish ได้

## 18. Gallery

- แยกตามปีและโปรแกรม
- Responsive grid หรือ masonry ที่ไม่ทำให้ layout shift
- Lightbox
- Lazy loading
- Caption และ Alt text
- Admin Upload หลายภาพได้
- Admin เลือกปี โปรแกรม และ Featured ได้
- Optimize image ก่อนแสดง
- ใช้ Private/Public storage policy ให้เหมาะกับประเภทไฟล์
- Gallery ภาพกิจกรรมที่ตั้งใจเผยแพร่สามารถเป็น Public ได้
- ต้องตรวจสิทธิ์การใช้ภาพและ Consent ของผู้ปรากฏในภาพก่อนนำขึ้นจริง

## 19. Contact Page

แสดง:

- LINE Official Account
- โทรศัพท์
- Email
- ที่อยู่
- เวลาทำการ
- Google Maps แบบ Optional
- Contact form

Contact form:

- ชื่อ
- Email
- โทรศัพท์
- หัวข้อ
- ข้อความ
- Consent ที่จำเป็น
- Server-side validation
- Rate limiting
- Spam protection ที่เปิดเพิ่มได้
- สถานะ `new`, `contacted`, `closed`
- Success และ Error state ชัดเจน

## 20. Admin Authentication และ Authorization

- ใช้ Supabase Authentication
- Email/password หรือ Magic Link ตามที่ทีมเลือก
- ไม่มี Public Admin Registration
- Admin account ต้องสร้างผ่านกระบวนการที่ปลอดภัย
- ตรวจ Authentication และ Role ฝั่ง Server ทุกหน้าและทุก Mutation
- การซ่อนเมนูฝั่ง Client ไม่ถือเป็น Security
- Session หมดอายุต้อง Redirect ไป Login อย่างเหมาะสม

Roles:

- `admin`: จัดการทุกอย่างและผู้ใช้งานหลังบ้าน
- `staff`: จัดการ Programs, Applications, Preparation, Gallery และ Contacts แต่จัดการ Admin ไม่ได้
- `viewer`: อ่านและ Export ตามสิทธิ์ แต่แก้ไขไม่ได้

## 21. Admin Dashboard

Dashboard แสดง:

- จำนวนใบสมัครทั้งหมด
- ใบสมัครใหม่
- ใบสมัครตาม Status
- ใบสมัครตาม Program
- โปรแกรมที่เปิดรับสมัคร
- จำนวนที่นั่งคงเหลือ
- ข้อความติดต่อใหม่
- ใบสมัครล่าสุด
- Export/PDF failures ถ้ามี

### Programs Management

- Create
- Edit
- Duplicate
- Preview
- Publish/unpublish
- Archive
- Set Featured
- เปิด/ปิดรับสมัคร
- ตั้ง Capacity
- เปิด Waitlist
- จัดลำดับ
- Upload Cover/Gallery
- จัดการ Highlights, Itinerary, FAQ และราคา

### Applications Management

- Search ชื่อ, Email, เบอร์โทร และ Reference Number
- Filter ตาม Program, Status และช่วงวันที่
- Server-side sorting และ pagination
- เปิดรายละเอียด
- เพิ่ม Internal Note
- เปลี่ยน Status
- Export CSV ตาม Filter ปัจจุบัน
- Download/Generate PDF
- ห้ามโหลดใบสมัครทั้งหมดมาทำ Filter ใน Browser
- ป้องกัน CSV formula injection

### Terms Management

- Create Draft
- Preview
- Publish Version ใหม่
- Archive Version เก่า
- Published Version ที่มี Consent แล้วห้ามแก้ทับ
- ดูจำนวนใบสมัครที่ยอมรับแต่ละ Version

### Site Settings

- ชื่อเว็บไซต์
- Hero headline และ supporting text
- จำนวนเด็กที่เดินทางปีที่ผ่านมา
- LINE URL
- โทรศัพท์
- Email
- ที่อยู่
- เวลาทำการ
- Social links
- Default SEO title/description
- Age threshold configuration

## 22. Database Schema

ออกแบบ migrations อย่างน้อยสำหรับ:

- `profiles`
- `programs`
- `program_highlights`
- `itineraries`
- `program_faqs`
- `applications`
- `application_snapshots`
- `application_consents`
- `application_notes`
- `application_status_history`
- `application_documents`
- `terms_versions`
- `preparation_items`
- `gallery_items`
- `contact_messages`
- `site_settings`
- `audit_logs`

ทุกตารางควรมีตามความเหมาะสม:

- UUID primary key
- `created_at`
- `updated_at`
- Foreign keys
- Status
- Published flag/status
- Soft delete หรือ `archived_at`
- Index จาก Query pattern จริง

Constraints สำคัญ:

- Program slug ต้อง Unique
- Application reference number ต้อง Unique
- Terms version ต้อง Unique
- Application document revision ต้อง Unique ต่อ Application และ Document type
- Consent ต้องอ้างอิง Terms version ที่มีอยู่จริง

## 23. Row Level Security

สร้างและทดสอบ RLS Policies:

- Public อ่านได้เฉพาะ Programs, Terms, Preparation และ Gallery ที่ Published
- Public สร้าง Application และ Contact message ได้ผ่าน Server endpoint ที่ Validate แล้ว
- Public ห้ามอ่าน Applications, Consents, Notes, Documents และ Contact messages
- Staff อ่าน Application ได้ตามสิทธิ์
- Admin จัดการข้อมูลทั้งหมดได้
- เฉพาะ Admin จัดการ Roles และ Site Settings สำคัญได้
- Storage policies ต้องสอดคล้องกับ Database roles

เพิ่ม Security test ว่า Public user ไม่สามารถอ่านใบสมัครผ่าน Supabase API โดยตรง

## 24. Audit Log

บันทึกอย่างน้อยเมื่อ:

- เปลี่ยนสถานะใบสมัคร
- แก้ข้อมูลใบสมัคร
- เพิ่ม Internal Note
- Generate/Download PDF
- Export CSV
- Publish/unpublish Program
- Publish Terms Version
- ลบหรือ Archive ข้อมูล
- เปลี่ยน Settings
- เพิ่มหรือลบ Admin/Staff

Audit log มี:

- Actor
- Action
- Resource type
- Resource ID
- Timestamp
- Safe metadata

ห้ามบันทึก Password, Token, Passport, Health details หรือข้อมูลละเอียดอ่อนลง Audit log

## 25. Security

- Server-side validation ทุก Mutation
- Rate limiting สำหรับ Login, Application และ Contact form
- Bot protection/CAPTCHA ที่เปิดเพิ่มได้
- Content Security Policy
- Security headers
- Safe error messages
- ป้องกัน Open redirect
- จำกัด file type และ size เมื่อเปิด Upload
- ห้าม Log ข้อมูลสุขภาพหรือข้อมูลผู้เยาว์
- ห้ามส่ง Secret ไป Client bundle
- ตรวจ Authorization ใน Server Action/Route Handler ทุกตัว
- ใช้ Least privilege
- Dependency audit ก่อน Production
- Confirmation dialog ก่อน destructive action
- ใช้ Soft delete เมื่อเหมาะสม

## 26. Privacy และข้อมูลผู้เยาว์

- เก็บเฉพาะข้อมูลที่จำเป็น
- มี Privacy Notice placeholder
- ระบุวัตถุประสงค์การเก็บข้อมูล
- เก็บ Consent version และ timestamp
- แยก Marketing consent
- รองรับ Data correction/export/deletion request ในกระบวนการ Admin
- กำหนด Data retention period ผ่าน Configuration
- ไม่ใช้ข้อมูลจริงใน Development, Seed หรือ Test
- ไม่ส่ง PII ไป Analytics
- Terms, Privacy Notice, Age rule และ Retention policy ต้องผ่านผู้เชี่ยวชาญด้านกฎหมายก่อน Production

## 27. Analytics

เตรียม Analytics events โดยไม่ส่ง PII:

- `view_home`
- `view_program_list`
- `view_program`
- `click_apply`
- `accept_terms`
- `start_application`
- `complete_application_step`
- `submit_application_success`
- `submit_application_error`
- `click_line`
- `submit_contact`

ห้ามส่งชื่อ, Email, โทรศัพท์, Passport, Health data หรือ Reference Number ไป Analytics

Analytics provider เป็น Optional และปิดไว้จนกว่าจะตั้งค่าและจัดการ Consent อย่างเหมาะสม

## 28. Accessibility และ Responsive

- Mobile-first
- Semantic HTML
- Keyboard navigation
- Visible focus state
- Form label ครบ
- Error association ด้วย `aria-describedby`
- Contrast อ่านง่าย
- Alt text สำหรับรูป
- Touch target เหมาะกับมือถือ
- รองรับ text zoom 200%
- รองรับ reduced motion
- ภาษาไทยต้องไม่ตัดคำหรือ Overflow
- ทดสอบอย่างน้อยที่ 360px, 768px, 1024px และ 1440px
- ไม่มี horizontal overflow

## 29. SEO และ Performance

- Metadata รายหน้า
- Dynamic metadata สำหรับ Program
- Canonical URL
- Sitemap
- `robots.txt`
- Organization structured data
- Program/Event structured data เมื่อข้อมูลเหมาะสม
- Next Image
- Lazy-load รูปนอก viewport
- Hero image มี priority เฉพาะเมื่อเป็น LCP
- Optimize font และลด layout shift
- Public page ไม่โหลด Admin JavaScript โดยไม่จำเป็น
- ใช้ Server Components เป็นค่าเริ่มต้น
- หลีกเลี่ยง animation library ขนาดใหญ่
- Analyze bundle เมื่อ Client JavaScript สูงผิดปกติ

เป้าหมาย:

- Lighthouse Performance อย่างน้อย 90 สำหรับหน้าสาธารณะหลักภายใต้เงื่อนไขทดสอบที่บันทึกไว้
- Accessibility อย่างน้อย 90
- Production build ไม่มี Error
- ไม่มี Console error ใน User flow หลัก

## 30. Error และ Empty States

ออกแบบอย่างน้อยสำหรับ:

- ไม่มีโปรแกรมเปิดรับ
- Program เต็ม
- Program ปิดระหว่างกรอก
- Duplicate application
- Database unavailable
- Submit ล้มเหลว
- Email ล้มเหลว
- PDF generation ล้มเหลว
- ไม่มี Gallery
- ไม่มี Search result
- Admin session หมดอายุ
- Permission denied
- 404
- Unexpected error

ข้อความ Error ต้องบอกว่าผู้ใช้ทำอะไรต่อได้ โดยไม่เปิดเผย Stack trace หรือรายละเอียดระบบ

## 31. Testing

เพิ่ม Test ที่จำเป็นและไม่มากเกินไป:

### Unit/Integration

- Form validation
- Terms version validation
- Consent requirement
- Age/guardian rule
- Reference number generation
- Duplicate prevention
- Capacity/Waitlist rule
- Application creation transaction
- Authorization
- CSV export safety

### End-to-End

- ดู Program → อ่าน Terms → สมัคร → Review → Submit → Success
- Submit ซ้ำไม่สร้าง Record ซ้ำ
- Program เต็มระหว่างกรอก
- Public เข้า Admin ไม่ได้
- Admin Login และดู Applications ได้
- Admin เปลี่ยน Status ได้
- Published content เท่านั้นที่แสดง Public
- PDF ภาษาไทย Generate ได้ หากรวมใน Phase 1

รัน:

- Formatter ตามโปรเจกต์
- Lint
- Typecheck
- Tests
- Production build

แก้ Error ที่เกี่ยวข้องให้หมดก่อนส่งงาน

## 32. README และการส่งมอบ

สร้าง README ที่มี:

- Project overview
- Technology stack
- Local setup
- Environment variables
- Supabase setup
- Database migrations
- Seed data สำหรับ Development
- วิธีสร้าง Admin คนแรก
- วิธี Run, Test และ Build
- วิธี Deploy
- RLS overview
- วิธีเปลี่ยน Sample content
- วิธีตั้ง Terms Version แรก
- Placeholder ที่ต้องเปลี่ยนก่อน Production
- Phase 2 Google Drive integration plan
- Backup และ rollback notes

## 33. Phase 1 Definition of Done

Phase 1 ถือว่าเสร็จเมื่อ:

- หน้า Overview ใช้งานได้และตรง Visual Direction
- Programs list/detail ทำงาน
- Terms แสดงและมี Version
- ผู้สมัครต้องยอมรับ Terms/Privacy ก่อนส่ง
- Online application บันทึก Database ได้จริง
- ได้รับ Reference Number
- Capacity/Waitlist rule ทำงาน
- Preparation, Gallery และ Contact ทำงาน
- Admin Login ถูกป้องกันฝั่ง Server
- Admin ดูและจัดการ Applications ได้
- Admin จัดการ Programs, Terms, Preparation, Gallery และ Settings ได้ตาม Scope
- Public อ่านข้อมูลใบสมัครไม่ได้
- RLS Policies ผ่าน Test
- CSV Export ใช้งานได้
- PDF Generate/Download ได้ หรือมี interface/schema ที่พร้อมและถูกระบุเป็นงานสุดท้ายของ Phase 1
- ไม่มีการเรียก Google Drive API
- Responsive, Accessibility และ Production build ผ่าน
- README ครบ

## 34. สิ่งที่ไม่ทำใน Phase 1

ห้ามเพิ่มโดยไม่ได้รับคำสั่ง:

- Google Drive API integration
- Online payment
- Applicant account/portal
- Passport upload
- Visa document upload
- LINE Messaging API
- Full bilingual CMS
- Marketing automation

แต่ออกแบบ Database และ service boundaries ให้เพิ่มสิ่งเหล่านี้ภายหลังได้

## 35. ลำดับการพัฒนาเพื่อประหยัด Token

ทำตามลำดับ:

### Phase 1A — Foundation

- Repository inspection
- Design system
- Database schema/migrations
- Authentication/roles
- Shared layout/navigation
- Homepage first coherent version

จากนั้นรัน typecheck/build

### Phase 1B — Public Website

- Programs list/detail
- Preparation
- Gallery
- Contact
- Responsive/accessibility

จากนั้นรัน typecheck/build

### Phase 1C — Application

- Terms versioning
- Multi-step form
- Consent evidence
- Capacity/Waitlist
- Reference number
- Confirmation

จากนั้นรัน tests/typecheck/build

### Phase 1D — Admin

- Login/authorization
- Dashboard
- Programs CRUD
- Applications management
- Terms management
- Preparation/Gallery/Contacts/Settings
- CSV export
- PDF generation ถ้าอยู่ใน Phase 1

จากนั้นรัน tests/typecheck/build

### Phase 1E — Production Review

- Security/RLS review
- Accessibility
- Responsive
- Performance
- Error states
- README
- Final production build

## 36. รูปแบบรายงานจาก Codex

หลังจบแต่ละ Phase ให้รายงานสั้น ๆ เท่านั้น:

- สิ่งที่สร้างหรือแก้
- Routes/Tables ที่เพิ่ม
- Test/Build result
- Assumptions
- Placeholder
- Blocker ถ้ามี
- งานถัดไป

อย่าวาง Master Prompt ซ้ำในรายงาน และอย่าอธิบายโค้ดทุกไฟล์ถ้าไม่ได้ถาม

## 37. คำสั่งเริ่มต้นให้ Codex

เริ่มจาก Phase 1A เท่านั้น

ตรวจ repository ก่อน แล้วสร้าง Foundation, Design System, Database Schema, Authentication Architecture, Shared Layout และ Homepage เวอร์ชันแรกตาม Master Prompt

ยังไม่ต้องสร้าง Google Drive integration, Payment, Applicant Portal หรือ Document Upload

รักษา package manager และ architecture เดิม ถ้ามี

เมื่อเสร็จให้รัน Typecheck และ Production Build แก้ Error ที่เกิดจากงานนี้ให้หมด แล้วสรุปผลแบบกระชับก่อนเริ่ม Phase 1B

## จบ Prompt

---

## ข้อมูลจริงที่เจ้าของเว็บไซต์ต้องเตรียมเพิ่ม

Codex สามารถเริ่มด้วย Placeholder ได้ แต่ก่อนเปิด Production ต้องมี:

1. ชื่อแบรนด์และ Logo
2. Domain
3. รายละเอียดบริษัท ที่อยู่ และเวลาทำการ
4. LINE Official URL, โทรศัพท์ และ Email
5. รายละเอียด Summer Programs จริง
6. ราคา วันเดินทาง อายุ จำนวนที่รับ และเงื่อนไข Waitlist
7. Terms & Conditions ฉบับที่ผ่านการตรวจแล้ว
8. Privacy Notice
9. เกณฑ์อายุที่ต้องใช้ Consent ผู้ปกครอง
10. Retention period ของใบสมัครและข้อมูลสุขภาพ
11. รายชื่อ Admin/Staff และสิทธิ์
12. Email sender/domain สำหรับ Transactional Email
13. รูปภาพที่มีสิทธิ์ใช้งานและ Consent สำหรับเผยแพร่
14. Google Drive/Google Workspace account สำหรับ Phase 2

## Prompt สำหรับ Phase 2 ในอนาคต

เมื่อ Phase 1 เสถียรแล้ว ให้ใช้คำสั่งแยก:

> Implement Phase 2 Google Drive integration ตาม service interface และ application document schema ที่มีอยู่ ห้ามเปลี่ยน Application flow หรือ Database source of truth การบันทึกใบสมัครต้องสำเร็จก่อนเริ่ม PDF upload หาก Google Drive ล้มเหลว ให้ใบสมัครคงอยู่ ตั้งสถานะ failed และรองรับ retry แบบ idempotent เก็บ Drive file ID, folder ID, checksum, revision และ audit log ใช้ credentials เฉพาะฝั่ง Server และห้ามสร้าง public sharing link

