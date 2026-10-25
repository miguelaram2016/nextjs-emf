import { NextResponse } from 'next/server';
import { hasAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const response = NextResponse.json({ authenticated: hasAdminSession(request) });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
