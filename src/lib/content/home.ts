import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '@/lib/config';
import { gallerySchema, homeSettingsSchema, preparationSchema, programSchema, type HomepageContent } from './schema';
import { sampleHome } from './sample';

const empty = (mode: HomepageContent['mode']): HomepageContent => ({ mode, settings: homeSettingsSchema.parse({}), programs: [], preparation: [], gallery: [], heroUrl: null });
export async function getHomepageContent(): Promise<HomepageContent> {
  const config = supabaseConfig();
  if (!config) return process.env.DEMO_CONTENT === 'true' ? sampleHome : empty('unconfigured');
  // Cookie-free anon client: homepage cannot inherit a staff session or read draft content.
  const db = createClient(config.url, config.key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store', signal: AbortSignal.timeout(8000) }) } });
  try {
    const results = await Promise.all([
      db.from('site_settings').select('value,is_sample').eq('key', 'homepage').eq('is_public', true).is('archived_at', null).maybeSingle(),
      db.from('programs').select('id,slug,title,country,city,summary,cover_path,cover_alt,departure_date,return_date,age_min,age_max,price,currency,registration_status,is_sample').eq('status', 'published').eq('featured', true).is('archived_at', null).order('sort_order').limit(2),
      db.from('preparation_items').select('id,title,description').eq('status', 'published').is('archived_at', null).order('sort_order').limit(3),
      db.from('gallery_items').select('id,image_path,alt,caption,year').eq('status', 'published').eq('featured', true).is('archived_at', null).order('sort_order').limit(3),
    ]);
    if (results.some(({ error }) => error)) return empty('unavailable');
    const settings = homeSettingsSchema.parse(results[0].data?.value ?? {});
    const programs = programSchema.array().parse(results[1].data ?? []);
    const preparation = preparationSchema.array().parse(results[2].data ?? []);
    const gallery = gallerySchema.array().parse(results[3].data ?? []);
    async function media(path: string | null) {
      if (!path) return null;
      if (/^\/assets\/images\/[a-zA-Z0-9/_-]+\.(svg|webp|png|jpg)$/.test(path)) return path;
      // Object paths only. No arbitrary remote URL fetching.
      if (path.includes('..') || path.startsWith('/') || path.includes(':')) return null;
      const { data } = await db.storage.from('site-media').createSignedUrl(path, 3600);
      return data?.signedUrl ?? null;
    }
    return { mode: results[0].data?.is_sample ? 'demo' : 'live', settings, preparation, heroUrl: await media(settings.heroPath),
      programs: await Promise.all(programs.map(async (p) => ({ ...p, imageUrl: await media(p.cover_path) }))),
      gallery: await Promise.all(gallery.map(async (g) => ({ ...g, imageUrl: await media(g.image_path) }))),
    };
  } catch { return empty('unavailable'); }
}
