# Admin authentication migration

The El Mar Fitness blog editor uses a server-validated session cookie. Do not
use a `NEXT_PUBLIC_` password or rely on localStorage as authentication.

## Before merging or deploying

1. Generate and configure a **new, unique** `ELMAR_ADMIN_PASSWORD` (at least
   16 characters) for the Vercel Production environment.
2. Generate a separate random `ELMAR_ADMIN_SESSION_SECRET` (at least
   32 characters) for Production. Do not commit either value.
3. Remove the old `NEXT_PUBLIC_ADMIN_PASSWORD` from Vercel after the new
   production build is successfully promoted. Treat the previous password as
   exposed because it was bundled into public JavaScript.
4. Confirm Supabase Row Level Security policies protect the `posts` table.
   Browser-accessible publishable/anon keys must never authorize unintended
   anonymous writes.
5. Exercise login/logout, the session endpoint, unauthorized POST/DELETE to
   blog APIs (expect 401), authorized post creation and deletion, and the
   public blog read path in a preview deployment.
6. Consider rate limiting login and monitoring failed attempts before
   exposing the admin panel to broad traffic.

Sessions expire after 12 hours. The session cookie is HttpOnly, SameSite=Strict,
and Secure on production. Changing the session secret invalidates all sessions.

The new endpoints deliberately fail closed when required Production variables
are missing. Do not merge before provisioning them, or the admin login will
be unavailable.

## Blog storage configuration

The former hard-coded project was Supabase `kinetic` (`wkkpykugeeydbmufvrtl`).
It is currently inactive. **Recover and back up its existing posts before
considering any replacement or migration.** Do not write sample data to it
until its contents and access policies have been checked.

Configure the following in Vercel (Preview first, then Production only after
review). Never commit credentials:

- `SUPABASE_URL`: verified project HTTPS API URL.
- `SUPABASE_PUBLISHABLE_KEY`: publishable key for public blog reads. The
  existing `NEXT_PUBLIC_SUPABASE_ANON_KEY` is supported as a legacy fallback.
- `SUPABASE_SECRET_KEY`: server-only Supabase secret key for blog writes
  (or `SUPABASE_SERVICE_ROLE_KEY` for a legacy service-role JWT). **Never**
  prefix this with `NEXT_PUBLIC_` or place it in browser code.
- `ELMAR_ADMIN_PASSWORD` and `ELMAR_ADMIN_SESSION_SECRET` as above.

`SUPABASE_URL` can fall back to `NEXT_PUBLIC_SUPABASE_URL` temporarily.
A missing/invalid storage config returns 503; an unreachable database or
failed upstream response returns 502. Neither is converted into published
sample posts. Unauthorized write requests still return 401 before accessing
the database. Writes return 201 only after the upstream supplies a created
record; DELETE returns 404 if no row was removed.

For RLS, allow public SELECT of intended published posts only. Do not grant
anonymous INSERT/UPDATE/DELETE. Server-only secret keys bypass RLS and must
remain protected behind authenticated API routes. Run `npm run test:blog` for
synthetic configuration and validation tests; complete authenticated CRUD
smoke tests using a verified, recoverable backend before merging.
