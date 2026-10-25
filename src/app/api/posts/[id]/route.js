import { NextResponse } from 'next/server';
import { hasAdminSession } from '@/lib/admin-auth';
import { getBlogConfig, isValidPostSlug } from '@/lib/blog-supabase.mjs';

export const dynamic = 'force-dynamic';

// DELETE /api/posts/[id] - Delete a post by slug.
export async function DELETE(request, { params }) {
  if (!hasAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const slug = params.id;
  if (!isValidPostSlug(slug)) {
    return NextResponse.json({ error: 'Invalid post slug' }, { status: 400 });
  }
  const config = getBlogConfig('write');
  if (!config) {
    return NextResponse.json({ error: 'Blog publishing is not configured' }, { status: 503 });
  }
  try {
    const response = await fetch(config.url + '/rest/v1/posts?slug=eq.' + encodeURIComponent(slug), {
      method: 'DELETE',
      headers: { ...config.headers, Prefer: 'return=representation' },
      cache: 'no-store',
      signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) {
      console.error('Blog delete upstream HTTP status:', response.status);
      return NextResponse.json({ error: 'Failed to delete post' }, { status: 502 });
    }
    const deleted = await response.json();
    if (!Array.isArray(deleted)) {
      console.error('Blog delete returned an unexpected response shape');
      return NextResponse.json({ error: 'Unable to verify post deletion' }, { status: 502 });
    }
    if (deleted.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    console.error('Blog delete connection failure:', error instanceof Error ? error.name : 'unknown');
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 502 });
  }
}
