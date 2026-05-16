'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PizzaCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`* { cursor: none !important; }`}</style>

      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: '30px',
          height: '40px',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Image src="/pizza.png" alt="cursor" width={60} height={60} className='w-full h-full object-contain -rotate-115' />
      </div>
    </>
  );
}