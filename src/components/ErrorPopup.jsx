import { useState, useEffect, useCallback, useRef } from 'react';

const ERRORS = [
  { title: 'Portfolio.exe',     msg: 'This program has performed an illegal operation\nand will be shut down.\n\nIf the problem persists, contact your recruiter.' },
  { title: 'Kernel32.dll',      msg: 'A fatal exception 0E has occurred at 0028:C0011E36.\nThe current application will be terminated.\n\nPress any key to hire Puneeth.' },
  { title: 'Minesweeper',       msg: 'BOOM. You lose.\n\nBut have you seen his Rust code?' },
  { title: 'Internet Explorer', msg: 'Cannot find server or DNS Error.\n\nTry github.com/mugiwaraluffy56 instead.' },
  { title: 'OutOfMemory.exe',   msg: 'Insufficient memory to continue.\n\nClose all tabs except this portfolio.' },
  { title: 'Clippy',            msg: "It looks like you're trying to hire a developer.\nWould you like help with that?" },
  { title: 'caffeine.exe',      msg: 'Stack overflow in thread "main".\n\nCause: 3 AM coding session detected.' },
  { title: 'Resume Viewer',     msg: 'This resume is too impressive for your system.\nPlease upgrade your expectations.' },
];

export default function ErrorPopup() {
  const [visible, setVisible] = useState(false);
  const [err, setErr]         = useState(null);
  const [pos, setPos]         = useState({ x: 200, y: 200 });
  const dragging   = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const spawn = useCallback(() => {
    const e = ERRORS[Math.floor(Math.random() * ERRORS.length)];
    const x = Math.round(window.innerWidth  * 0.25 + Math.random() * window.innerWidth  * 0.3);
    const y = Math.round(window.innerHeight * 0.2  + Math.random() * window.innerHeight * 0.3);
    setErr(e);
    setPos({ x, y });
    setVisible(true);
  }, []);

  // first popup after 18s, then every 50-100s
  useEffect(() => {
    let t;
    const schedule = (delay) => {
      t = setTimeout(() => { spawn(); schedule(50000 + Math.random() * 50000); }, delay);
    };
    schedule(18000);
    return () => clearTimeout(t);
  }, [spawn]);

  // drag support
  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return;
      setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    };
    const up = () => { dragging.current = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, []);

  if (!visible || !err) return null;

  const onTitleDown = (e) => {
    if (e.target.closest('.win-btn')) return;
    dragging.current = true;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  };

  return (
    <div style={{
      position: 'fixed', left: pos.x, top: pos.y, width: 340,
      background: '#c0c0c0',
      border: '2px solid', borderColor: '#ffffff #404040 #404040 #ffffff',
      boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      zIndex: 99998,
      fontFamily: '"MS Sans Serif", Arial, sans-serif', fontSize: 12,
    }}>
      <div
        style={{
          background: '#000080', color: '#ffffff',
          padding: '3px 4px 3px 6px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'move', userSelect: 'none', gap: 4,
        }}
        onMouseDown={onTitleDown}
      >
        <div style={{ fontSize: 11, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 14, height: 14, background: '#ff0000',
            border: '1px solid #800000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 'bold', fontSize: 11, lineHeight: 1,
          }}>!</div>
          {err.title}
        </div>
        <button className="win-btn" onClick={(e) => { e.stopPropagation(); setVisible(false); }}>✕</button>
      </div>

      <div style={{ padding: '16px 14px 10px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div style={{
          width: 32, height: 32, flexShrink: 0,
          background: '#ff0000', border: '2px solid #800000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#ffffff', fontWeight: 'bold', fontSize: 20,
        }}>!</div>
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: 12 }}>{err.msg}</div>
      </div>

      <div style={{ padding: '6px 14px 12px', display: 'flex', gap: 6, justifyContent: 'center' }}>
        {['OK', 'Cancel', 'Ignore'].map(label => (
          <button key={label} onClick={() => setVisible(false)} style={{
            width: 72, height: 23,
            background: '#c0c0c0',
            border: '2px solid', borderColor: '#ffffff #404040 #404040 #ffffff',
            boxShadow: 'inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080',
            fontFamily: 'inherit', fontSize: 11, cursor: 'pointer',
          }}>{label}</button>
        ))}
      </div>
    </div>
  );
}
