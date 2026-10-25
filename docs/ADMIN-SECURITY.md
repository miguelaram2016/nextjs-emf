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
