import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    const dot = dotRef.current;
    const ringEl = ringRef.current;

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
    };

    const lerp = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      gsap.set(ringEl, { x: ring.current.x, y: ring.current.y });
      requestAnimationFrame(lerp);
    };
    lerp();

    const onEnterLink = () => {
      gsap.to(ringEl, { scale: 1.8, borderColor: 'var(--red)', duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLeaveLink = () => {
      gsap.to(ringEl, { scale: 1, borderColor: 'rgba(220,20,60,0.6)', duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const onMouseDown = () => {
      gsap.to(ringEl, { scale: 0.85, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(ringEl, { scale: 1, duration: 0.15 });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="pointer"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed',
        top: 0, left: 0,
        width: 6, height: 6,
        background: 'var(--red)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99999,
        mixBlendMode: 'normal',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed',
        top: 0, left: 0,
        width: 36, height: 36,
        border: '1px solid rgba(220,20,60,0.6)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99998,
      }} />
    </>
  );
}
