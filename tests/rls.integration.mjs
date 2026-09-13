// Against an explicitly configured disposable Supabase project after migration.
// Non-mutating: verifies that the direct anonymous API cannot read private tables.
import { test } from 'node:test';
import assert from 'node:assert/strict';
const url = process.env.TEST_SUPABASE_URL;
const key = process.env.TEST_SUPABASE_PUBLISHABLE_KEY;
test('direct anonymous Supabase API denies private applicant data', { skip: !url || !key }, async () => {
  for (const table of ['applications','application_consents','application_snapshots','application_notes','application_documents','contact_messages']) {
    const response = await fetch(`${url}/rest/v1/${table}?select=*&limit=1`, { headers: { apikey: key }, signal: AbortSignal.timeout(10000) });
    assert.ok([401, 403].includes(response.status), `${table}: expected permission denial, got ${response.status}`);
  }
});
