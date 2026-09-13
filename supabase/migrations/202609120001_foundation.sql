-- Phase 1A foundation. Apply to a fresh Supabase project before configuring the app.
-- Application submission RPC, capacity transaction and admin mutations belong to later phases.
begin;
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create type public.app_role as enum ('admin', 'staff', 'viewer');
create type public.content_status as enum ('draft', 'published', 'archived');
create type public.registration_status as enum ('open', 'nearly_full', 'waitlist', 'closed');
create type public.application_status as enum ('new', 'reviewing', 'awaiting_documents', 'awaiting_payment', 'waitlisted', 'confirmed', 'rejected', 'cancelled');
create type public.document_status as enum ('pending', 'generating', 'ready', 'uploading', 'completed', 'failed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'viewer',
  display_name text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);
-- No signup trigger: authentication alone never grants a back-office role.
create function private.current_role() returns public.app_role
language sql stable security definer set search_path = ''
as $$ select role from public.profiles where id = (select auth.uid()) and active and archived_at is null $$;
revoke all on function private.current_role() from public;
grant execute on function private.current_role() to authenticated;

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  locale text not null default 'th',
  country text not null, city text not null,
  summary text not null default '', description text not null default '',
  cover_path text, cover_alt text not null default '',
  departure_date date, return_date date,
  age_min integer check (age_min >= 0), age_max integer,
  capacity integer not null default 0 check (capacity >= 0),
  registration_open_at timestamptz, registration_close_at timestamptz,
  registration_status public.registration_status not null default 'closed',
  waitlist_enabled boolean not null default false,
  price numeric(12,2) check (price >= 0), currency text not null default 'THB' check (length(currency) = 3),
  inclusions jsonb not null default '[]', exclusions jsonb not null default '[]',
  accommodation text not null default '', institution text not null default '',
  featured boolean not null default false, sort_order integer not null default 0,
  status public.content_status not null default 'draft',
  is_sample boolean not null default false,
  check (return_date >= departure_date), check (age_max >= age_min),
  check (registration_close_at > registration_open_at),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.program_highlights (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  title text not null, description text not null default '', sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.itineraries (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  day_number integer not null check (day_number > 0), title text not null,
  description text not null default '', unique (program_id, day_number),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.program_faqs (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  question text not null, answer text not null, sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.terms_versions (
  id uuid primary key default gen_random_uuid(),
  version text not null unique, title text not null,
  locale text not null default 'th', content text not null,
  content_hash text not null check (length(content_hash) = 64),
  effective_at timestamptz, published_at timestamptz,
  status public.content_status not null default 'draft',
  created_by uuid references public.profiles(id) on delete set null,
  check (status <> 'published' or (effective_at is not null and published_at is not null)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id),
  reference_number text not null unique,
  idempotency_key uuid not null unique,
  status public.application_status not null default 'new',
  student_name_th text not null, student_name_en text not null,
  nickname text, birth_date date not null, gender text, nationality text not null,
  school text not null, grade text not null,
  email text not null check (email = lower(btrim(email))),
  phone text not null check (phone ~ '^\+[0-9]{8,15}$'), line_id text,
  address jsonb not null, guardian jsonb not null,
  health jsonb not null, emergency_contact jsonb not null,
  retention_until timestamptz,
  unique (program_id, email, phone),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.application_snapshots (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id),
  revision integer not null check (revision > 0),
  data jsonb not null, consent_snapshot jsonb not null,
  content_hash text not null check (length(content_hash) = 64),
  unique (application_id, revision),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.application_consents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id),
  terms_version_id uuid not null references public.terms_versions(id),
  terms_content_hash text not null check (length(terms_content_hash) = 64),
  acceptor_type text not null check (acceptor_type in ('student','guardian')),
  acceptor_name text not null, relationship text, verification_contact text not null,
  typed_signature text not null,
  terms_accepted boolean not null check (terms_accepted),
  privacy_acknowledged boolean not null check (privacy_acknowledged),
  privacy_version text not null, privacy_content_hash text not null check (length(privacy_content_hash) = 64),
  marketing_consent boolean not null default false,
  guardian_age_threshold integer not null check (guardian_age_threshold between 1 and 25),
  accepted_at timestamptz not null default now(),
  check (acceptor_type <> 'guardian' or nullif(btrim(relationship), '') is not null),
  unique (application_id, terms_version_id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.application_notes (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id),
  author_id uuid references public.profiles(id) on delete set null,
  body text not null check (length(body) between 1 and 10000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.application_status_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id),
  from_status public.application_status, to_status public.application_status not null,
  actor_id uuid references public.profiles(id) on delete set null,
  changed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id),
  snapshot_id uuid not null references public.application_snapshots(id),
  document_type text not null default 'application_pdf', revision integer not null check (revision > 0),
  status public.document_status not null default 'pending',
  storage_provider text, external_file_id text, external_folder_id text,
  filename text not null, checksum text,
  generated_at timestamptz, uploaded_at timestamptz,
  retry_count integer not null default 0 check (retry_count >= 0), last_error_code text,
  unique (application_id, document_type, revision),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.preparation_items (
  id uuid primary key default gen_random_uuid(),
  title text not null, description text not null,
  locale text not null default 'th', icon text,
  download_path text, sort_order integer not null default 0,
  status public.content_status not null default 'draft', is_sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  program_id uuid references public.programs(id) on delete set null,
  year integer not null check (year between 2000 and 2200),
  image_path text not null, alt text not null, caption text not null default '',
  featured boolean not null default false, sort_order integer not null default 0,
  status public.content_status not null default 'draft',
  publication_rights_confirmed boolean not null default false,
  is_sample boolean not null default false,
  check (status <> 'published' or publication_rights_confirmed),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, phone text,
  subject text not null, message text not null,
  privacy_acknowledged boolean not null check (privacy_acknowledged),
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique, value jsonb not null,
  is_public boolean not null default false,
  description text not null default '', is_sample boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null, resource_type text not null, resource_id uuid,
  metadata jsonb not null default '{}' check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create index programs_public on public.programs (sort_order, created_at desc) where status = 'published' and archived_at is null;
create index applications_program_status on public.applications (program_id, status) where archived_at is null;
create index applications_inbox on public.applications (created_at desc, id);
create index applications_status_date on public.applications (status, created_at desc);
create index application_consents_terms on public.application_consents (terms_version_id);
create index application_notes_parent on public.application_notes (application_id, created_at desc);
create index application_history_parent on public.application_status_history (application_id, changed_at desc);
create index application_documents_queue on public.application_documents (status, updated_at) where status in ('pending','failed');
create index gallery_public on public.gallery_items (year desc, sort_order) where status = 'published' and archived_at is null;
create index contacts_inbox on public.contact_messages (status, created_at desc);
create index audit_resource on public.audit_logs (resource_type, resource_id, created_at desc);
create index program_highlights_parent on public.program_highlights (program_id, sort_order);
create index program_faqs_parent on public.program_faqs (program_id, sort_order);

create function private.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end $$;

-- Published legal text is immutable even before its first acceptance; only archive status may change.
create function private.protect_terms() returns trigger
language plpgsql set search_path = '' as $$
begin
  if old.published_at is not null then
    if tg_op = 'DELETE' then raise exception 'Published terms are immutable'; end if;
    if row(new.version, new.title, new.locale, new.content, new.content_hash, new.effective_at, new.published_at)
      is distinct from row(old.version, old.title, old.locale, old.content, old.content_hash, old.effective_at, old.published_at)
      or new.status = 'draft' then raise exception 'Create a new terms version'; end if;
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end $$;
create trigger protect_terms before update or delete on public.terms_versions for each row execute function private.protect_terms();

create function private.immutable_evidence() returns trigger
language plpgsql set search_path = '' as $$ begin raise exception 'Evidence is append-only'; end $$;
alter table public.profiles enable row level security;
revoke all on public.profiles from anon, authenticated;
create trigger touch_updated_at before update on public.profiles for each row execute function private.touch_updated_at();
alter table public.programs enable row level security;
revoke all on public.programs from anon, authenticated;
create trigger touch_updated_at before update on public.programs for each row execute function private.touch_updated_at();
alter table public.program_highlights enable row level security;
revoke all on public.program_highlights from anon, authenticated;
create trigger touch_updated_at before update on public.program_highlights for each row execute function private.touch_updated_at();
alter table public.itineraries enable row level security;
revoke all on public.itineraries from anon, authenticated;
create trigger touch_updated_at before update on public.itineraries for each row execute function private.touch_updated_at();
alter table public.program_faqs enable row level security;
revoke all on public.program_faqs from anon, authenticated;
create trigger touch_updated_at before update on public.program_faqs for each row execute function private.touch_updated_at();
alter table public.terms_versions enable row level security;
revoke all on public.terms_versions from anon, authenticated;
create trigger touch_updated_at before update on public.terms_versions for each row execute function private.touch_updated_at();
alter table public.applications enable row level security;
revoke all on public.applications from anon, authenticated;
create trigger touch_updated_at before update on public.applications for each row execute function private.touch_updated_at();
alter table public.application_snapshots enable row level security;
revoke all on public.application_snapshots from anon, authenticated;
create trigger immutable_evidence before update or delete on public.application_snapshots for each row execute function private.immutable_evidence();
alter table public.application_consents enable row level security;
revoke all on public.application_consents from anon, authenticated;
create trigger immutable_evidence before update or delete on public.application_consents for each row execute function private.immutable_evidence();
alter table public.application_notes enable row level security;
revoke all on public.application_notes from anon, authenticated;
create trigger touch_updated_at before update on public.application_notes for each row execute function private.touch_updated_at();
alter table public.application_status_history enable row level security;
revoke all on public.application_status_history from anon, authenticated;
create trigger immutable_evidence before update or delete on public.application_status_history for each row execute function private.immutable_evidence();
alter table public.application_documents enable row level security;
revoke all on public.application_documents from anon, authenticated;
create trigger touch_updated_at before update on public.application_documents for each row execute function private.touch_updated_at();
alter table public.preparation_items enable row level security;
revoke all on public.preparation_items from anon, authenticated;
create trigger touch_updated_at before update on public.preparation_items for each row execute function private.touch_updated_at();
alter table public.gallery_items enable row level security;
revoke all on public.gallery_items from anon, authenticated;
create trigger touch_updated_at before update on public.gallery_items for each row execute function private.touch_updated_at();
alter table public.contact_messages enable row level security;
revoke all on public.contact_messages from anon, authenticated;
create trigger touch_updated_at before update on public.contact_messages for each row execute function private.touch_updated_at();
alter table public.site_settings enable row level security;
revoke all on public.site_settings from anon, authenticated;
create trigger touch_updated_at before update on public.site_settings for each row execute function private.touch_updated_at();
alter table public.audit_logs enable row level security;
revoke all on public.audit_logs from anon, authenticated;
create trigger immutable_evidence before update or delete on public.audit_logs for each row execute function private.immutable_evidence();
grant select on public.programs to anon, authenticated;
create policy public_read on public.programs for select to anon, authenticated using (status = 'published' and archived_at is null);
grant select on public.terms_versions to anon, authenticated;
create policy public_read on public.terms_versions for select to anon, authenticated using (status = 'published' and archived_at is null and effective_at <= now());
grant select on public.preparation_items to anon, authenticated;
create policy public_read on public.preparation_items for select to anon, authenticated using (status = 'published' and archived_at is null);
grant select on public.gallery_items to anon, authenticated;
create policy public_read on public.gallery_items for select to anon, authenticated using (status = 'published' and archived_at is null);
grant select on public.program_highlights to anon, authenticated;
create policy public_read on public.program_highlights for select to anon, authenticated using (archived_at is null and exists (select 1 from public.programs p where p.id = program_id and p.status = 'published' and p.archived_at is null));
grant select on public.itineraries to anon, authenticated;
create policy public_read on public.itineraries for select to anon, authenticated using (archived_at is null and exists (select 1 from public.programs p where p.id = program_id and p.status = 'published' and p.archived_at is null));
grant select on public.program_faqs to anon, authenticated;
create policy public_read on public.program_faqs for select to anon, authenticated using (archived_at is null and exists (select 1 from public.programs p where p.id = program_id and p.status = 'published' and p.archived_at is null));
grant select on public.site_settings to anon, authenticated;
create policy public_read on public.site_settings for select to anon, authenticated using (is_public and archived_at is null);
grant select on public.profiles to authenticated;
create policy own_profile on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy admin_profiles_read on public.profiles for select to authenticated using ((select private.current_role()) = 'admin');
-- Role administration is deliberately reserved for trusted server/database administration in 1A.
grant select on public.programs to authenticated;
create policy team_read on public.programs for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
grant insert, update on public.programs to authenticated;
create policy team_insert on public.programs for insert to authenticated with check ((select private.current_role()) in ('admin','staff'));
create policy team_update on public.programs for update to authenticated using ((select private.current_role()) in ('admin','staff')) with check ((select private.current_role()) in ('admin','staff'));
grant select on public.program_highlights to authenticated;
create policy team_read on public.program_highlights for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
grant insert, update on public.program_highlights to authenticated;
create policy team_insert on public.program_highlights for insert to authenticated with check ((select private.current_role()) in ('admin','staff'));
create policy team_update on public.program_highlights for update to authenticated using ((select private.current_role()) in ('admin','staff')) with check ((select private.current_role()) in ('admin','staff'));
grant select on public.itineraries to authenticated;
create policy team_read on public.itineraries for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
grant insert, update on public.itineraries to authenticated;
create policy team_insert on public.itineraries for insert to authenticated with check ((select private.current_role()) in ('admin','staff'));
create policy team_update on public.itineraries for update to authenticated using ((select private.current_role()) in ('admin','staff')) with check ((select private.current_role()) in ('admin','staff'));
grant select on public.program_faqs to authenticated;
create policy team_read on public.program_faqs for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
grant insert, update on public.program_faqs to authenticated;
create policy team_insert on public.program_faqs for insert to authenticated with check ((select private.current_role()) in ('admin','staff'));
create policy team_update on public.program_faqs for update to authenticated using ((select private.current_role()) in ('admin','staff')) with check ((select private.current_role()) in ('admin','staff'));
grant select on public.terms_versions to authenticated;
create policy team_read on public.terms_versions for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
grant insert, update on public.terms_versions to authenticated;
create policy team_insert on public.terms_versions for insert to authenticated with check ((select private.current_role()) in ('admin'));
create policy team_update on public.terms_versions for update to authenticated using ((select private.current_role()) in ('admin')) with check ((select private.current_role()) in ('admin'));
grant select on public.applications to authenticated;
create policy team_read on public.applications for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
grant select on public.application_snapshots to authenticated;
create policy team_read on public.application_snapshots for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
grant select on public.application_consents to authenticated;
create policy team_read on public.application_consents for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
grant select on public.application_notes to authenticated;
create policy team_read on public.application_notes for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
grant select on public.application_status_history to authenticated;
create policy team_read on public.application_status_history for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
grant select on public.application_documents to authenticated;
create policy team_read on public.application_documents for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
grant select on public.preparation_items to authenticated;
create policy team_read on public.preparation_items for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
grant insert, update on public.preparation_items to authenticated;
create policy team_insert on public.preparation_items for insert to authenticated with check ((select private.current_role()) in ('admin','staff'));
create policy team_update on public.preparation_items for update to authenticated using ((select private.current_role()) in ('admin','staff')) with check ((select private.current_role()) in ('admin','staff'));
grant select on public.gallery_items to authenticated;
create policy team_read on public.gallery_items for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
grant insert, update on public.gallery_items to authenticated;
create policy team_insert on public.gallery_items for insert to authenticated with check ((select private.current_role()) in ('admin','staff'));
create policy team_update on public.gallery_items for update to authenticated using ((select private.current_role()) in ('admin','staff')) with check ((select private.current_role()) in ('admin','staff'));
grant select on public.contact_messages to authenticated;
create policy team_read on public.contact_messages for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));
create policy admin_read on public.site_settings for select to authenticated using ((select private.current_role()) = 'admin');
grant insert, update on public.site_settings to authenticated;
create policy team_insert on public.site_settings for insert to authenticated with check ((select private.current_role()) in ('admin'));
create policy team_update on public.site_settings for update to authenticated using ((select private.current_role()) in ('admin')) with check ((select private.current_role()) in ('admin'));
grant select on public.audit_logs to authenticated;
create policy team_read on public.audit_logs for select to authenticated using ((select private.current_role()) in ('admin','staff','viewer'));

-- Storage remains private by default. Public gallery objects must be explicitly published.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', false, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
create policy published_media_read on storage.objects for select to anon, authenticated using (
  bucket_id = 'site-media' and (
    exists (select 1 from public.gallery_items g where g.image_path = name and g.status = 'published' and g.archived_at is null)
    or exists (select 1 from public.programs p where p.cover_path = name and p.status = 'published' and p.archived_at is null)
  )
);
create policy team_media_read on storage.objects for select to authenticated using (bucket_id = 'site-media' and (select private.current_role()) in ('admin','staff','viewer'));
create policy team_media_insert on storage.objects for insert to authenticated with check (bucket_id = 'site-media' and (select private.current_role()) in ('admin','staff'));
-- No direct overwrite/delete: later media management must preserve published references.
commit;
