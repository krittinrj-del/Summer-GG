'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { GalleryItem } from '@/lib/content/public';
export function GalleryExplorer({ items }: { items: GalleryItem[] }) {
  const [city, setCity] = useState('all');
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const visible = city === 'all' ? items : items.filter(item => item.city === city);
  function close() { dialog.current?.close(); }
  return <><div className="public-filter"><label htmlFor="gallery-city">เลือกเมือง</label><select id="gallery-city" value={city} onChange={event => setCity(event.target.value)}><option value="all">ทุกเมือง</option>{[...new Set(items.map(item => item.city))].map(value => <option key={value}>{value}</option>)}</select><span role="status">{visible.length} ภาพ</span></div><div className="public-gallery-grid">{visible.map(item => <figure key={item.id}><button className="gallery-open" aria-haspopup="dialog" aria-label={`เปิดภาพ ${item.caption}`} onClick={event => { opener.current = event.currentTarget; setSelected(item); dialog.current?.showModal(); }}><span className="public-gallery-art"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectPosition: item.position }} /></span><span className="gallery-open-label">เปิดดูภาพ ↗</span></button><figcaption><h2>{item.caption}</h2><p>{item.city} · {item.isIllustration ? 'ภาพประกอบแนวคิด' : item.year}</p></figcaption></figure>)}</div>{!visible.length && <p>ยังไม่มีภาพในหมวดนี้ ลองเลือกเมืองอื่นเพื่อสำรวจเรื่องราว</p>}<dialog className="gallery-dialog" ref={dialog} aria-labelledby="gallery-dialog-title" onClose={() => opener.current?.focus()} onClick={event => { if (event.target === event.currentTarget) close(); }}><div className="gallery-dialog-body"><button className="gallery-close" onClick={close} autoFocus aria-label="ปิดภาพ">ปิด ×</button>{selected && <><h2 id="gallery-dialog-title">{selected.caption}</h2><div className="gallery-dialog-image"><Image src={selected.src} alt={selected.alt} fill sizes="90vw" style={{ objectFit: 'contain' }} /></div><p>{selected.isIllustration ? 'ภาพประกอบแนวคิด ไม่ใช่ภาพนักเรียนจากโปรแกรมจริง' : selected.city}</p></>}</div></dialog></>;
}
