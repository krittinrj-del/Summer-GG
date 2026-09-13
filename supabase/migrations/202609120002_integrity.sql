begin;
-- Only the validated homepage DTO can be publicly exposed in this phase.
alter table public.site_settings add constraint public_setting_allowlist check (not is_public or key = 'homepage');
alter table public.application_snapshots add constraint snapshot_application_pair unique (id, application_id);
alter table public.application_documents add constraint document_snapshot_application
  foreign key (snapshot_id, application_id) references public.application_snapshots(id, application_id);

create function private.validate_terms_hash() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.content_hash <> encode(sha256(convert_to(new.content, 'UTF8')), 'hex') then
    raise exception 'Terms content hash does not match';
  end if;
  return new;
end $$;
create trigger terms_hash before insert or update on public.terms_versions
  for each row execute function private.validate_terms_hash();

create function private.validate_consent_terms() returns trigger
language plpgsql set search_path = '' as $$
begin
  if not exists (select 1 from public.terms_versions t where t.id = new.terms_version_id
      and t.content_hash = new.terms_content_hash and t.status = 'published'
      and t.archived_at is null and t.effective_at <= new.accepted_at) then
    raise exception 'Consent terms are not available';
  end if;
  return new;
end $$;
create trigger consent_terms before insert on public.application_consents
  for each row execute function private.validate_consent_terms();

-- Every status change has a durable history row. Applicant mutations remain closed until 1C/1D.
create function private.record_application_status() returns trigger
language plpgsql security definer set search_path = '' as $$
declare actor uuid;
begin
  select id into actor from public.profiles where id = auth.uid();
  if tg_op = 'INSERT' then
    insert into public.application_status_history(application_id, to_status, actor_id)
      values (new.id, new.status, actor);
  elsif new.status is distinct from old.status then
    insert into public.application_status_history(application_id, from_status, to_status, actor_id)
      values (new.id, old.status, new.status, actor);
  end if;
  return new;
end $$;
create trigger application_status_history after insert or update on public.applications
  for each row execute function private.record_application_status();

-- Metadata is intentionally empty. Never copy row bodies, health data or tokens into audits.
create function private.audit_change() returns trigger
language plpgsql security definer set search_path = '' as $$
declare actor uuid;
begin
  select id into actor from public.profiles where id = auth.uid();
  insert into public.audit_logs(actor_id,action,resource_type,resource_id)
    values (actor, lower(tg_op), tg_table_name, case when tg_op = 'DELETE' then old.id else new.id end);
  if tg_op = 'DELETE' then return old; end if;
  return new;
end $$;
do $$ declare relation text; begin
  foreach relation in array array['profiles','programs','program_highlights','itineraries','program_faqs',
    'terms_versions','applications','application_notes','application_documents','preparation_items',
    'gallery_items','contact_messages','site_settings'] loop
    execute format('create trigger audit_change after insert or update or delete on public.%I for each row execute function private.audit_change()', relation);
  end loop;
end $$;
-- Add explicit hero storage publication without granting a public bucket.
create policy published_hero_read on storage.objects for select to anon, authenticated using (
  bucket_id = 'site-media' and exists (
    select 1 from public.site_settings s where s.key = 'homepage' and s.is_public and s.archived_at is null
      and s.value->>'heroPath' = name
  )
);
commit;
