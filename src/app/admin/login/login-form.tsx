'use client';
import { useActionState } from 'react';
import { requestLogin } from './actions';
export function LoginForm({ enabled }: { enabled: boolean }) {
  const [state, action, pending] = useActionState(requestLogin, { ok: false, message: '' });
  return <form action={action}>
    <div className="field"><label htmlFor="email">อีเมลของทีมงาน</label><input type="email" id="email" name="email" autoComplete="email" required maxLength={254} disabled={!enabled || pending} aria-describedby="login-help login-result" /></div>
    <p id="login-help" className="muted text-sm">ใช้ลิงก์เข้าสู่ระบบที่ส่งทางอีเมล เฉพาะบัญชีที่ผู้ดูแลเพิ่มไว้แล้ว</p>
    <button className="button w-full" disabled={!enabled || pending}>{pending ? 'กำลังส่งคำขอ…' : 'รับลิงก์เข้าสู่ระบบ →'}</button>
    <p id="login-result" aria-live="polite" className={state.ok ? 'mt-4 text-sm' : 'error-message mt-4 text-sm'}>{state.message}</p>
  </form>;
}
