import { z } from 'zod';
export const homeSettingsSchema = z.object({
  siteName: z.string().default('GG Summer'),
  headline: z.string().default('เปิดโลกใบใหม่ ในซัมเมอร์ของคุณ'),
  supportingText: z.string().default('เรียนรู้ภาษา สัมผัสวัฒนธรรม และเติบโตผ่านประสบการณ์นอกห้องเรียน'),
  previousYearStudents: z.number().int().nonnegative().nullable().default(null),
  previousYear: z.number().int().nullable().default(null),
  heroPath: z.string().nullable().default(null), heroAlt: z.string().default(''),
  lineUrl: z.url().nullable().default(null), phone: z.string().nullable().default(null),
  email: z.email().nullable().default(null), address: z.string().nullable().default(null),
  businessHours: z.string().nullable().default(null),
});
export type HomeSettings = z.infer<typeof homeSettingsSchema>;
export const programSchema = z.object({
  id: z.string(), slug: z.string(), title: z.string(), country: z.string(), city: z.string(), summary: z.string(),
  cover_path: z.string().nullable(), cover_alt: z.string(), departure_date: z.string().nullable(), return_date: z.string().nullable(),
  age_min: z.number().nullable(), age_max: z.number().nullable(), price: z.number().nullable(), currency: z.string(),
  registration_status: z.enum(['open','nearly_full','waitlist','closed']), is_sample: z.boolean(),
});
export type Program = z.infer<typeof programSchema> & { imageUrl?: string | null };
export const preparationSchema = z.object({ id: z.string(), title: z.string(), description: z.string() });
export const gallerySchema = z.object({ id: z.string(), image_path: z.string(), alt: z.string(), caption: z.string(), year: z.number().nullable() });
export type HomepageContent = {
  settings: HomeSettings; programs: Program[];
  preparation: z.infer<typeof preparationSchema>[];
  gallery: (z.infer<typeof gallerySchema> & { imageUrl?: string | null })[];
  heroUrl: string | null;
  mode: 'demo' | 'live' | 'unconfigured' | 'unavailable';
};
