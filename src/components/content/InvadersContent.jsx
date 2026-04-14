import { useRef } from 'react';

export default function InvadersContent() {
  const frameRef = useRef(null);

  const onLoad = () => {
    const fw = frameRef.current?.contentWindow;
    if (!fw) return;
    requestAnimationFrame(() => {
      fw.dispatchEvent(new fw.Event('resize'));
      frameRef.current?.focus();
    });
  };

  return (
    <div
      style={{ margin: '-6px', height: 'calc(100% + 12px)', overflow: 'hidden', background: '#000' }}
      onClick={() => frameRef.current?.focus()}
    >
      <iframe
        ref={frameRef}
        src="/invaders.html"
        title="Space Invaders"
        onLoad={onLoad}
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        sandbox="allow-scripts allow-same-origin"
        tabIndex={0}
      />
    </div>
  );
}
