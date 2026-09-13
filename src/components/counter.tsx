'use client';
import { useEffect, useRef, useState } from 'react';
export function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => { const progress = Math.min((now - start) / 1000, 1); setShown(Math.round(value * (1 - (1 - progress) ** 3))); if (progress < 1) frame = requestAnimationFrame(tick); };
      frame = requestAnimationFrame(tick);
    });
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={ref}><span aria-hidden="true">{shown.toLocaleString('th-TH')}</span><span className="sr-only">{value.toLocaleString('th-TH')}</span></span>;
}
