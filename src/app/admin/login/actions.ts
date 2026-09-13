'use server';

import { z } from 'zod';
import { createServerSupabase } from '@/lib/supabase/server';
import { siteOrigin } from '@/lib/config';

export type LoginState = { message: string; ok: boolean };
export async function requestLogin(_previous: LoginState, form: FormData): Promise<LoginState> {
  const email = z.email().max(254).safeParse(form.get('email'));
  if (!email.success) return { ok: false, message: 'กรุณากรอกอีเมลให้ถูกต้อง' };
  const db = await createServerSupabase();
  const origin = siteOrigin();
  if (!db || !origin) return { ok: false, message: 'ระบบเข้าสู่ระบบยังไม่พร้อม กรุณาติดต่อผู้ดูแลเว็บไซต์' };
  try {
    // Supabase enforces OTP resend cooldown and project-wide email rate limits.
    // No public signup; unknown emails receive the same response as known users.
    await db.auth.signInWithOtp({ email: email.data, options: {
      shouldCreateUser: false, emailRedirectTo: `${origin}/auth/callback`,
    } });
    return { ok: true, message: 'หากอีเมลนี้มีสิทธิ์ใช้งาน คุณจะได้รับลิงก์เข้าสู่ระบบ กรุณาตรวจกล่องจดหมายและรอสักครู่ก่อนส่งใหม่' };
  } catch {
    return { ok: false, message: 'ยังส่งคำขอไม่ได้ กรุณาลองอีกครั้งภายหลัง' };
  }
}
