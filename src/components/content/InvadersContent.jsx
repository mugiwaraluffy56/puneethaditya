import { useRef } from 'react';

export default function InvadersContent() {
  const frameRef = useRef(null);

  return (
    <div
      style={{ margin: '-6px', height: 'calc(100% + 12px)', overflow: 'hidden', background: '#000', cursor: 'crosshair' }}
      onClick={() => frameRef.current?.focus()}
    >
      <iframe
        ref={frameRef}
        src="/invaders.html"
        title="Space Invaders"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        sandbox="allow-scripts allow-same-origin"
        tabIndex={0}
      />
    </div>
  );
}
