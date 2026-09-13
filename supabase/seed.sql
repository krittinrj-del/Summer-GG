-- DEVELOPMENT ONLY. All sample programs remain closed for registration.
begin;
insert into public.site_settings (key,value,is_public,is_sample,description) values
('homepage','{"siteName":"GG Summer","headline":"เปิดโลกใบใหม่ ในซัมเมอร์ของคุณ","supportingText":"เรียนรู้ภาษา สัมผัสวัฒนธรรม และเติบโตผ่านประสบการณ์นอกห้องเรียน","previousYearStudents":120,"previousYear":2025,"heroPath":"/assets/images/landscape-study.svg","heroAlt":"ภาพประกอบชั่วคราว ไม่ใช่ภาพกิจกรรมจริง"}',true,true,'Development example: replace before publishing'),
('consent_policy','{"guardianAgeThreshold":20,"legalReviewRequired":true}',false,true,'Example age only; legal review required before applications'),
('retention_policy','{"applicationDays":null,"healthDays":null,"legalReviewRequired":true}',false,true,'Unset: configure legally reviewed retention policy before collection')
on conflict (key) do nothing;
insert into public.programs (slug,title,country,city,summary,cover_path,cover_alt,age_min,age_max,featured,status,is_sample) values
('sample-beijing','ปักกิ่ง เรียนรู้ภาษาผ่านวัฒนธรรม','จีน','ปักกิ่ง','ตัวอย่างแนวทางโปรแกรม ยังไม่เปิดรับสมัคร','/assets/images/landscape-study.svg','ภาพประกอบชั่วคราว',13,17,true,'published',true),
('sample-hangzhou','หางโจว ค้นพบมุมมองใหม่','จีน','หางโจว','ตัวอย่างแนวทางโปรแกรม ยังไม่เปิดรับสมัคร','/assets/images/landscape-study.svg','ภาพประกอบชั่วคราว',13,17,true,'published',true)
on conflict (slug) do nothing;
insert into public.preparation_items (id,title,description,sort_order,status,is_sample) values
('a0000000-0000-4000-8000-000000000001','เลือกประสบการณ์ที่ใช่','พูดคุยกับครอบครัวถึงเป้าหมายการเรียนรู้',1,'published',true),
('a0000000-0000-4000-8000-000000000002','เตรียมพร้อมไปด้วยกัน','วางแผนเอกสารและการเดินทางตามคำแนะนำของทีมงาน',2,'published',true),
('a0000000-0000-4000-8000-000000000003','เปิดใจให้โลกใบใหม่','เตรียมภาษาและทำความรู้จักวัฒนธรรมก่อนเดินทาง',3,'published',true)
on conflict (id) do nothing;
commit;
