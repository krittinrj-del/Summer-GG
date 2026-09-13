'use client';
import { useRef } from 'react';
const links = [['#overview','ภาพรวม'],['#programs','โปรแกรม Summer'],['#preparation','เตรียมตัว'],['#gallery','ภาพกิจกรรม'],['#contact','ติดต่อ']];
export function Navigation() {
  const menu = useRef<HTMLDetailsElement>(null);
  return <><nav className="desktop-nav" aria-label="เมนูหลัก">{links.map(([href,label]) => <a key={href} href={href}>{label}</a>)}<a className="button" href="#registration">สมัครเลย <span aria-hidden>↗</span></a></nav>
    <details className="mobile-nav" ref={menu} onKeyDown={(event) => { if (event.key === 'Escape' && menu.current) { menu.current.open = false; menu.current.querySelector('summary')?.focus(); } }}><summary>เมนู</summary><nav aria-label="เมนูมือถือ">{[...links,['#registration','สมัครเลย ↗']].map(([href,label]) => <a key={href} href={href} onClick={() => { if (menu.current) menu.current.open = false; }}>{label}</a>)}</nav></details></>;
}
