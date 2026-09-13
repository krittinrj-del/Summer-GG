'use client';
import Link from 'next/link';
import { useRef } from 'react';
const links = [['/#overview','ภาพรวม'],['/#programs','โปรแกรม Summer'],['/#preparation','เตรียมตัว'],['/#gallery','ภาพกิจกรรม'],['/#contact','ติดต่อ']];
export function Navigation() {
  const menu = useRef<HTMLDetailsElement>(null);
  return <><nav className="desktop-nav" aria-label="เมนูหลัก">{links.map(([href,label]) => <Link key={href} href={href}>{label}</Link>)}<Link className="button" href="/#registration">สมัครเลย <span aria-hidden>↗</span></Link></nav>
    <details className="mobile-nav" ref={menu} onKeyDown={(event) => { if (event.key === 'Escape' && menu.current) { menu.current.open = false; menu.current.querySelector('summary')?.focus(); } }}><summary>เมนู</summary><nav aria-label="เมนูมือถือ">{[...links,['/#registration','สมัครเลย ↗']].map(([href,label]) => <Link key={href} href={href} onClick={() => { if (menu.current) menu.current.open = false; }}>{label}</Link>)}</nav></details></>;
}
