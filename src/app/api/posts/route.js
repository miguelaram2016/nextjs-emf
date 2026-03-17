import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = 'https://wkkpykugeeydbmufvrtl.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vBoLtbvnlnQ43N8KoPtnnw_We8uoS2C';

// GET all posts
export async function GET() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/posts?order=date.desc`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      }
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }

    const posts = await response.json();
    return NextResponse.json(posts || []);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST new post
export async function POST(request) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
