import { useState, useEffect } from 'react';

const BIOS_LINES = [
  'Award Modular BIOS v4.51PG, An Energy Star Ally',
  'Copyright (C) 1984-97, Award Software, Inc.',
  '',
  'Portfolio BIOS v2.0  puneethaditya.vercel.app',
  '',
  'CPU: Rust 1.87 · React 19 · Vite 7',
  'Memory Test: 1048576K OK',
  '',
  'Detecting Primary Master... SSD 512GB',
  'Detecting Primary Slave... None',
  '',
  'Press DEL to enter Setup, F8 for Boot Menu',
  '',
  'Loading Windows 95...',
];

// ~200ms per line * 14 lines = ~2.8s total
const INTERVAL = 180;

export default function BootScreen({ onDone }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setShown(prev => {
        const next = prev + 1;
        if (next >= BIOS_LINES.length) {
          clearInterval(id);
          setTimeout(onDone, 400);
        }
        return next;
      });
    }, INTERVAL);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#000000', color: '#aaaaaa',
      fontFamily: '"Courier New", Courier, monospace',
      fontSize: 14, padding: 20, lineHeight: 1.7,
    }}>
      {BIOS_LINES.slice(0, shown).map((line, i) => (
        <div key={i} style={{
          color: line.startsWith('Portfolio') || line.startsWith('Loading') ? '#ffffff' : '#aaaaaa',
        }}>
          {line || '\u00A0'}
        </div>
      ))}
    </div>
  );
}
