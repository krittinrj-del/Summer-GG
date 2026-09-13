import 'server-only';
import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { can, isRole, type Permission } from './roles';

// Call inside EVERY protected page and mutation, not just its parent layout.
export async function requirePermission(permission: Permission = 'read') {
  const db = await createServerSupabase();
  if (!db) redirect('/admin/login?state=setup');
  const { data: { user }, error } = await db.auth.getUser();
  if (error || !user) redirect('/admin/login?state=session');
  const { data: profile } = await db.from('profiles').select('role,active,archived_at').eq('id', user.id).maybeSingle();
  if (!profile?.active || profile.archived_at || !isRole(profile.role) || !can(profile.role, permission)) {
    redirect('/admin/login?state=denied');
  }
  return { db, userId: user.id, role: profile.role };
}
