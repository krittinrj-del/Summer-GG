# GG Summer — Phase 1A

Next.js App Router + TypeScript + Tailwind CSS + Supabase PostgreSQL/Auth. This delivery is **Foundation only**, not the completed application system. No deployment or Google Drive integration was performed.

## Inspection and scope

The initial workspace had no Git repository, source files, AGENTS.md, package manager or lockfile. A new project was created here with pnpm, the available package manager. Supabase configuration has not been supplied. The four owner-supplied image assets were added during the GitHub handoff. `public/assets/images/landscape-study.svg` remains the temporary illustration used by the initial Phase 1A preview, not a photograph of actual participants.

Implemented in the requested order: repository inspection → design tokens → migrations → authentication/roles → shared navigation/layout → coherent homepage. Homepage sections use in-page anchors until public routes arrive in Phase 1B; signup CTA explains availability instead of pretending to accept an application.

## Local setup

Node **24 LTS recommended** (22.18+ required for native TypeScript test execution); pnpm 11.19.0.

```sh
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

On PowerShell use `Copy-Item .env.example .env.local`. Open http://localhost:3000.

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm start
```

Use the commands above for a fresh checkout. Machine-specific runtime paths, package stores and local environment files are not part of the published source.

## Source documents and asset paths

The original requirements are preserved at `docs/GG-Summer-Website-Master-Prompt.md`. Only Phase 1A is implemented; instructions for later phases in that document are not authorization to implement them now.

The requested image layout is:

- `public/assets/brand/logo.png`
- `public/assets/images/summer-china-hero.png`
- `public/assets/references/editorial-reference-1.png`
- `public/assets/references/editorial-reference-2.png`

All four original PNG files are included unchanged. `logo.png` is the supplied On Point brand asset; the hero depicts a student group with Chinese architecture. The editorial references are design references only. They are stored for the next visual integration pass; this source-upload handoff does not redesign the Phase 1A preview. The preview illustration remains at `public/assets/images/landscape-study.svg`.

`.gitignore` excludes environment files (except the credential-free `.env.example` template), dependencies, build output, local credential material and private-data directories. Tests and seed contain synthetic fixtures only.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL; HTTPS except local development |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable API key; no service-role key is used in Phase 1A |
| `DEMO_CONTENT` | Set `true` to render explicitly marked sample fixtures when Supabase is unconfigured; defaults off |
| `SITE_URL` | Trusted origin for metadata and Magic Link callbacks; required for login, e.g. `http://localhost:3000` locally |

A configured but unreachable database renders a safe unavailable state. It never silently falls back to sample programs. Configured data marked `is_sample` remains visibly labelled. No PII is stored in browser storage. Demo/unconfigured-origin pages are noindex.

## Routes and architecture

| Route | Phase 1A behavior |
| --- | --- |
| `/` | Server-rendered homepage: hero, statistics, featured programs, preparation preview, gallery, contact |
| `/admin/login` | Magic Link request for existing accounts only; unavailable until configured |
| `/auth/callback` | PKCE code exchange with fixed, trusted redirect |
| `/admin` | Protected foundation landing, current role, sign-out; no fake dashboard data |

Next.js 16 proxy refreshes auth cookies. `requirePermission()` verifies the user with Supabase Auth and reads the current active profile role on the server. Call it inside every future protected page AND mutation; do not rely only on a layout or proxy. Back-office responses are private/no-store. Unknown, inactive, missing and archived profiles fail closed. Public homepage queries use a cookie-free anonymous client and explicit publication filters.

Auth reference: [Supabase SSR client guide](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs). Routing reference: [Next.js Proxy](https://nextjs.org/docs/app/getting-started/proxy).

## Database and Supabase setup

1. Create a development Supabase project. Apply the SQL files in `supabase/migrations/` in filename order using the SQL editor or your managed migration pipeline. Each migration is transactional. A fresh schema is assumed.
2. Optionally run `supabase/seed.sql` in development only. It uses synthetic content, no applicants and no users. Sample programs remain closed. Do not run this seed in production.
3. Configure Auth Site URL and allowlist the exact `${SITE_URL}/auth/callback`. Disable public signup. Use the standard PKCE-compatible Magic Link email template, confirm email delivery and configure custom SMTP before real use.
4. Supabase OTP resend and email rate limits are used by the login endpoint. Review project email limits/SMTP before deployment; add CAPTCHA if required by the operational threat model. Do not add a process-local limiter and assume it protects a serverless deployment.
5. Copy the project URL and publishable key into `.env.local`, set `SITE_URL`, then restart the server. No secret or production data is included in the repository.

17 public tables: `profiles`, `programs`, `program_highlights`, `itineraries`, `program_faqs`, `applications`, `application_snapshots`, `application_consents`, `application_notes`, `application_status_history`, `application_documents`, `terms_versions`, `preparation_items`, `gallery_items`, `contact_messages`, `site_settings`, `audit_logs`.

UUID/FK constraints, program/terms/reference/idempotency uniqueness, normalized application contact pair uniqueness, document revision uniqueness, timestamps, archival columns and query indexes are included. Snapshot and consent records are immutable; published Terms content cannot be overwritten. Content SHA-256 is verified. Application status writes create history records. Audit triggers store operation/resource/actor/time only, with no row data. A future explicit privacy-deletion maintenance procedure must handle immutable evidence; no bypass is exposed now.

RLS: anonymous clients read only published content and the validated public homepage setting. Private tables have no anonymous SELECT or INSERT grants. Signed-in users without a provisioned profile have no team privileges. Viewer reads only; staff edits content; admin edits terms/settings. Role writes and private application mutations deliberately remain unavailable through the Data API until audited transactional services are added in 1C/1D. Initial role provisioning uses the trusted SQL editor. No public application/contact endpoints exist yet.

Storage: `site-media` is a **private** 5 MB image-only bucket. Anonymous access is limited to objects referenced by published programs/gallery or the public hero setting. The server creates short-lived signed URLs as anonymous user; no service-role bypass. Gallery publication requires the rights-confirmed flag. Unpublished files remain private. Staff/admin can insert; overwriting/deleting objects is not exposed in this phase.

## First admin

Create/invite an email-confirmed user in Supabase Auth using the dashboard. Then, in the trusted SQL editor, substitute that user's UUID (never derive a role from signup metadata):

```sql
insert into public.profiles (id, role, display_name)
values ('REPLACE_WITH_AUTH_USER_UUID', 'admin', 'Administrator');
```

Visit `/admin/login`, request a Magic Link and open it in the same browser that requested it (PKCE verifier cookie). No public registration is provided. Provision staff/viewer through the same controlled process.

## Content and legal placeholders

- Replace draft brand name/logo, real company details, address, domain, business hours, LINE/email/phone.
- Integrate the supplied brand/hero assets in the next visual pass; keep the editorial reference screenshots as references rather than homepage content.
- Set `site_settings.homepage.value` to the shape documented by `src/lib/content/schema.ts`; replace synthetic statistics, headline and supporting text. Set `is_sample=false` after replacement. Disable `DEMO_CONTENT` on the real deployment.
- Add verified programs, dates, ages, prices, capacity, opening windows and waitlist rules. Phase 1A does not calculate seats or take applications.
- Gallery remains empty until approved photos exist. No participant images were invented.
- Terms, Privacy Notice, guardian age threshold and retention periods require owner/legal decisions before Phase 1C and before collecting data. The development age threshold of 20 is an example, not a legal conclusion. Retention is intentionally unset.
- To prepare the first Terms draft, insert version/title/content with `content_hash = encode(sha256(convert_to(content,'UTF8')),'hex')`. Publishing requires `published_at` and `effective_at`; accepted text is versioned, never edited. Management UI belongs to 1C/1D.

## Verification

`pnpm test` uses Node's test runner and PGlite (real PostgreSQL engine, ephemeral local data) to execute both migrations and seed, exercise anonymous/viewer/staff/inactive-admin permissions, verify public setting restrictions and immutable legal/audit records. Minimal auth/storage schemas stand in for Supabase's platform schemas. This does **not** replace real Supabase/Auth integration testing.

For a disposable Supabase project with migrations applied, set `TEST_SUPABASE_URL` and `TEST_SUPABASE_PUBLISHABLE_KEY`, then run `pnpm test:rls`. It checks direct anonymous REST access to private tables is denied. Without those settings the test is explicitly skipped. Real Magic Link email/session lifecycle and Supabase Storage signing require a configured project and are not verified in this unconfigured delivery.

## Deployment, backup and next phases

No deployment is part of this request. Later, import this project into Vercel, use Node 24, set the environment, apply database migrations independently, verify SMTP/callback allowlists and run Phase 1E review. Security headers are included; nonce-based CSP, broader performance/accessibility checks, application rate limiting, operational monitoring and production audit remain Phase 1E work. Do not treat a successful production build as readiness to collect minors' data.

Before production migrations, take a Supabase database backup/snapshot and a storage inventory; test restore in staging. Roll back application releases using the prior deployment. These additive migrations have no destructive down migration; use a reviewed forward fix or verified backup restoration. Never automatically drop applicant/consent/audit tables.

Next: Phase 1B public list/detail, preparation, gallery and contact. Phase 1C adds atomic submission/consent/capacity/idempotency services. Phase 1D adds dashboard/CRUD/export/PDF. Phase 1E performs production review. **Stop after Phase 1A build; do not begin 1B without a new request.**

Phase 2: a future document-storage provider can consume immutable snapshots and `application_documents` (provider, external file/folder ID, checksum, revision, retry/status fields). Drive uploads must happen after committed application creation. No Drive SDK, credentials, API calls, sharing or provider implementation is included.
