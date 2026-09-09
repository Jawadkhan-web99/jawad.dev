import React, { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const orbRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Guards: Touch devices & reduced motion
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = -200;
    let mouseY = -200;
    let orbX = -200;
    let orbY = -200;
    let dotX = -200;
    let dotY = -200;

    let idleTimer = null;
    let isMoving = false;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isMoving) {
        isMoving = true;
        if (orbRef.current) orbRef.current.style.opacity = '0.15';
        if (dotRef.current) dotRef.current.style.opacity = '0.6';
      }

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isMoving = false;
        if (orbRef.current) orbRef.current.style.opacity = '0';
        if (dotRef.current) dotRef.current.style.opacity = '0';
      }, 800);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const loop = () => {
      orbX += (mouseX - orbX) * 0.1;
      orbY += (mouseY - orbY) * 0.1;
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${orbX - 14}px, ${orbY - 14}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 2.5}px, ${dotY - 2.5}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <>
      <div
        ref={orbRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: '#6c63ff',
          boxShadow: '0 0 14px 4px rgba(108, 99, 255, 0.4)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 9999,
          willChange: 'transform, opacity',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: '#8b5cf6',
          boxShadow: '0 0 6px rgba(139, 92, 246, 0.8)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          zIndex: 9999,
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
}
