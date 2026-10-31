import { hasAdminSession } from '@/lib/admin-auth';
import { getBlogConfig, validateBlogPost } from '@/lib/blog-supabase.mjs';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function unavailable(message) {
  return NextResponse.json({ error: message }, { status: 503 });
}

// Public blog reads use a publishable/anon key subject to Supabase RLS.
export async function GET() {
  const config = getBlogConfig('read');
  if (!config) return unavailable('Blog storage is not configured');
  try {
    const response = await fetch(config.url + '/rest/v1/posts?order=date.desc', {
      headers: config.headers,
      cache: 'no-store',
      signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) {
      console.error('Blog read upstream HTTP status:', response.status);
      return NextResponse.json({ error: 'Blog posts are temporarily unavailable' }, { status: 502 });
    }
    const posts = await response.json();
    if (!Array.isArray(posts)) {
      console.error('Blog read returned an unexpected response shape');
      return NextResponse.json({ error: 'Blog posts are temporarily unavailable' }, { status: 502 });
    }
    return NextResponse.json(posts, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Blog read connection failure:', error instanceof Error ? error.name : 'unknown');
    return NextResponse.json({ error: 'Blog posts are temporarily unavailable' }, { status: 502 });
  }
}

// All writes require a valid admin session and a server-only Supabase key.
export async function POST(request) {
  if (!hasAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const config = getBlogConfig('write');
  if (!config) return unavailable('Blog publishing is not configured');

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const post = validateBlogPost(body);
  if (!post) return NextResponse.json({ error: 'Invalid post fields' }, { status: 400 });

  try {
    const response = await fetch(config.url + '/rest/v1/posts', {
      method: 'POST',
      headers: { ...config.headers, Prefer: 'return=representation' },
      body: JSON.stringify(post),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000)
    });
    if (response.status === 409) {
      return NextResponse.json({ error: 'Post slug already exists' }, { status: 409 });
    }
    if (!response.ok) {
      console.error('Blog publish upstream HTTP status:', response.status);
      return NextResponse.json({ error: 'Failed to publish post' }, { status: 502 });
    }
    const created = await response.json();
    if (!Array.isArray(created) || !created[0]) {
      console.error('Blog publish returned no created record');
      return NextResponse.json({ error: 'Unable to verify published post' }, { status: 502 });
    }
    return NextResponse.json(created[0], { status: 201 });
  } catch (error) {
    console.error('Blog publish connection failure:', error instanceof Error ? error.name : 'unknown');
    return NextResponse.json({ error: 'Failed to publish post' }, { status: 502 });
  }
}
