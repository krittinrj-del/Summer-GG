'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
const links = [['/','ภาพรวม'],['/programs','โปรแกรม Summer'],['/preparation','เตรียมตัว'],['/gallery','ภาพกิจกรรม'],['/contact','ติดต่อ'],['/apply','สมัครเลย']];
export function Navigation() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const active = (href: string) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
  const entries = (mobile: boolean) => links.map(([href,label]) => <Link key={href} href={href} aria-current={active(href) ? 'page' : undefined} className={!mobile && href === '/apply' ? 'button' : undefined} onClick={() => { if (menu.current) menu.current.open = false; }}>{label}{href === '/apply' && <span aria-hidden="true"> ↗</span>}</Link>);
  return <><nav className="desktop-nav" aria-label="เมนูหลัก">{entries(false)}</nav><details className="mobile-nav" ref={menu} onKeyDown={event => { if (event.key === 'Escape' && menu.current) { menu.current.open = false; menu.current.querySelector('summary')?.focus(); } }}><summary>เมนู</summary><nav aria-label="เมนูมือถือ">{entries(true)}</nav></details></>;
}
