import 'server-only';
import { shouldShowDemoContent } from './demo';
import { supabaseConfig } from '../config';
import { demoPrograms, demoGallery, preparationSteps, contactInformation, commonFAQ, type PublicProgram, type GalleryItem } from './public';

// UI-facing contract. A future published-content adapter can replace this source.
// Phase 1B does not connect these pages (including /apply) to any database.
export function getPublicContent() {
  const isDemo = shouldShowDemoContent(process.env.DEMO_CONTENT, Boolean(supabaseConfig()));
  return {
    isDemo, programs: isDemo ? demoPrograms : [] as PublicProgram[],
    gallery: isDemo ? demoGallery : [] as GalleryItem[],
    preparation: preparationSteps, contact: contactInformation, faq: commonFAQ,
  };
}
