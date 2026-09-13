import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';

test('migration executes and database roles enforce publication and privacy', async () => {
  const db = new PGlite();
  try {
    // Minimal Supabase platform interfaces for a real embedded PostgreSQL engine.
    await db.exec(`create role anon; create role authenticated;
      create schema auth; create table auth.users (id uuid primary key);
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
      grant usage on schema auth to anon, authenticated;
      grant execute on function auth.uid() to anon, authenticated;
      create schema storage;
      create table storage.buckets (id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
      create table storage.objects (id uuid primary key default gen_random_uuid(), bucket_id text,name text);
      alter table storage.objects enable row level security;
      grant usage on schema storage to anon, authenticated;
      grant select, insert, update, delete on storage.objects to anon, authenticated;`);
    await db.exec(await readFile(new URL('../supabase/migrations/202609120001_foundation.sql', import.meta.url), 'utf8'));
    await db.exec(await readFile(new URL('../supabase/migrations/202609120002_integrity.sql', import.meta.url), 'utf8'));
    await db.exec(await readFile(new URL('../supabase/seed.sql', import.meta.url), 'utf8'));
    await db.exec(`insert into auth.users values ('00000000-0000-4000-8000-000000000001'),('00000000-0000-4000-8000-000000000002'),('00000000-0000-4000-8000-000000000003'),('00000000-0000-4000-8000-000000000004');
      insert into public.profiles(id,role,active) values ('00000000-0000-4000-8000-000000000001','admin',true),('00000000-0000-4000-8000-000000000002','staff',true),('00000000-0000-4000-8000-000000000003','viewer',true),('00000000-0000-4000-8000-000000000004','admin',false);
      insert into public.programs(slug,title,country,city) values ('draft-hidden','Secret draft','test','test');`);
    await db.exec(`set role anon`);
    assert.equal((await db.query('select * from public.programs')).rows.length, 2, 'anon sees only published programs');
    assert.deepEqual((await db.query('select key from public.site_settings')).rows.map(r => r.key), ['homepage']);
    for (const table of ['profiles','applications','application_consents','application_snapshots','application_documents','application_notes','application_status_history','contact_messages','audit_logs']) {
      await assert.rejects(db.query(`select * from public.${table}`), /permission denied/);
    }
    await assert.rejects(db.query(`insert into public.programs(slug,title,country,city) values ('unauthorized','x','x','x')`), /permission denied/);
    await db.exec(`reset role; set role authenticated; select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000003',false)`);
    assert.equal((await db.query('select * from public.programs')).rows.length, 3, 'viewer sees drafts');
    assert.equal((await db.query(`update public.programs set title='changed' returning id`)).rows.length, 0);
    await assert.rejects(db.query(`update public.profiles set role='admin'`), /permission denied/);
    await db.exec(`select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000002',false)`);
    await db.exec(`update public.programs set title='Staff edited' where slug='draft-hidden'`);
    assert.equal((await db.query(`select title from public.programs where slug='draft-hidden'`)).rows[0].title, 'Staff edited');
    assert.equal((await db.query(`update public.site_settings set value='{}' where key='consent_policy' returning key`)).rows.length, 0);
    await db.exec(`select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000004',false)`);
    assert.equal((await db.query('select * from public.programs')).rows.length, 2, 'inactive admin gets public access only');
    await db.exec(`reset role`);
    await assert.rejects(db.query(`update public.site_settings set is_public=true where key='consent_policy'`), /public_setting_allowlist/);
    await db.exec(`insert into public.terms_versions(version,title,content,content_hash,status,published_at,effective_at)
      values ('test-v1','Test terms','Example',encode(sha256(convert_to('Example','UTF8')),'hex'),'published',now(),now());`);
    await assert.rejects(db.query(`update public.terms_versions set content='Changed' where version='test-v1'`), /Create a new terms version|hash/);
    await assert.rejects(db.query(`delete from public.terms_versions where version='test-v1'`), /immutable/);
    await assert.rejects(db.query(`update public.audit_logs set metadata='{}'`), /append-only/);
    assert.equal((await db.query(`select count(*)::int as n from public.audit_logs where metadata <> '{}'`)).rows[0].n, 0);
    const tables = await db.query(`select count(*)::int as n from pg_tables where schemaname='public' and rowsecurity=true`);
    assert.equal(tables.rows[0].n, 17);
  } finally { await db.close(); }
});
