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
        {/* <svg width="40" height="40" viewBox="0 0 40 40">
    
          <path d="M20 3 L37 35 L3 35 Z" fill="#F4A460" stroke="#8B4513" strokeWidth="2"/>
    
          <path d="M20 8 L33 33 L7 33 Z" fill="#FFD700"/>
      
          <circle cx="15" cy="24" r="3" fill="#CC2200"/>
          <circle cx="23" cy="21" r="2.5" fill="#CC2200"/>
          <circle cx="20" cy="29" r="2.5" fill="#CC2200"/>
         
          <ellipse cx="18" cy="27" rx="2" ry="1" fill="#228B22" transform="rotate(-20 18 27)"/>
        
          <path d="M20 3 L37 35 L3 35 Z" fill="none" stroke="#C68642" strokeWidth="1" strokeDasharray="3,3"/>
        </svg> */}
      </div>
    </>
  );
}