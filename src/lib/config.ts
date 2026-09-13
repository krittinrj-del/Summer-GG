export function supabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && ['127.0.0.1', 'localhost'].includes(parsed.hostname))) return null;
    return { url, key };
  } catch { return null; }
}

export function siteOrigin() {
  if (!process.env.SITE_URL) return null;
  try {
    const url = new URL(process.env.SITE_URL);
    if (url.username || url.password) return null;
    if (url.protocol === 'https:' || (url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname))) return url.origin;
  } catch { /* Invalid configuration fails closed. */ }
  return null;
}
