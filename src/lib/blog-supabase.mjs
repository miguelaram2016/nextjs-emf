// Server-side blog database configuration. Never use browser keys for writes.
export function getBlogConfig(mode, env = process.env) {
  const rawUrl = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const publicKey = env.SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const key = mode === 'write'
    ? (env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY)
    : publicKey;

  if (!rawUrl || !key || (mode === 'write' && (key === publicKey || key.startsWith('sb_publishable_')))) {
    return null;
  }

  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password ||
        parsed.search || parsed.hash || parsed.pathname !== '/') return null;

    const headers = { apikey: key, 'Content-Type': 'application/json' };
    // Legacy service_role/anon keys are JWTs. New sb_* keys are opaque
    // and must NOT be placed in the Authorization bearer header.
    if (key.split('.').length === 3) headers.Authorization = 'Bearer ' + key;
    return { url: parsed.origin, headers };
  } catch {
    return null;
  }
}

export function isValidPostSlug(value) {
  return typeof value === 'string' && value.length <= 150 &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function validateBlogPost(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  if (!isValidPostSlug(body.slug)) return null;
  const maxLengths = { title: 160, excerpt: 500, category: 80, content: 50000 };
  for (const [field, max] of Object.entries(maxLengths)) {
    if (typeof body[field] !== 'string' || !body[field].trim() ||
        body[field].length > max) return null;
  }
  if (typeof body.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(body.date) ||
      Number.isNaN(Date.parse(body.date + 'T00:00:00Z'))) return null;
  return {
    slug: body.slug,
    title: body.title.trim(),
    excerpt: body.excerpt.trim(),
    category: body.category.trim(),
    date: body.date,
    content: body.content
  };
}
