import { NextResponse, type NextRequest } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { siteOrigin } from '@/lib/config';
export async function GET(request: NextRequest) {
  const origin = siteOrigin();
  if (!origin) return new NextResponse('Authentication is not configured', { status: 503 });
  const code = request.nextUrl.searchParams.get('code');
  const db = await createServerSupabase();
  if (code && db) {
    const { error } = await db.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}/admin`);
  }
  // Fixed destination: never honor caller-provided redirect URLs.
  return NextResponse.redirect(`${origin}/admin/login?state=invalid`);
}
