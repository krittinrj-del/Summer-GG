'use client';
export default function ErrorPage({ reset }: { reset: () => void }) { return <main id="main" className="panel"><h1>ยังแสดงหน้านี้ไม่ได้</h1><p>กรุณาลองอีกครั้ง หากยังมีปัญหา โปรดกลับมาใหม่ภายหลัง</p><button className="button" onClick={reset}>ลองอีกครั้ง</button></main>; }
