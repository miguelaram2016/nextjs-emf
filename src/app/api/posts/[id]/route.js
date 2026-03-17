import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = 'https://wkkpykugeeydbmufvrtl.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vBoLtbvnlnQ43N8KoPtnnw_We8uoS2C';

// DELETE /api/posts/[id] - Delete a post by slug
export async function DELETE(request, { params }) {
  try {
    const slug = params.id;

    if (!slug) {
      return NextResponse.json(
        { error: 'Post slug is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/posts?slug=eq.${slug}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `Post ${slug} deleted` });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
