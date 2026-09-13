import { test } from 'node:test';
import assert from 'node:assert/strict';
import { siteOrigin, supabaseConfig } from '../src/lib/config.ts';
test('invalid and missing auth configuration fails closed', () => {
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  assert.equal(supabaseConfig(), null);
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'javascript:alert(1)';
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'test';
  assert.equal(supabaseConfig(), null);
});
test('redirect origin is configured, restricted to HTTPS or local HTTP', () => {
  for (const value of ['', 'javascript:alert(1)', 'http://untrusted.example', 'https://user:pass@example.com']) {
    process.env.SITE_URL = value;
    assert.equal(siteOrigin(), null);
  }
  process.env.SITE_URL = 'https://example.com/path?next=evil';
  assert.equal(siteOrigin(), 'https://example.com');
  process.env.SITE_URL = 'http://localhost:3000';
  assert.equal(siteOrigin(), 'http://localhost:3000');
});
