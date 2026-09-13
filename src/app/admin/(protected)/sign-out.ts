'use server';
import { redirect } from 'next/navigation';
import { requirePermission } from '@/lib/auth/require-role';
export async function signOut() {
  const { db } = await requirePermission('read');
  await db.auth.signOut();
  redirect('/admin/login');
}
