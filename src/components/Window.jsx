import { useState, useRef, useEffect } from 'react';

export default function Window({ id, title, icon, children, initialX, initialY, width, height, zIndex, onClose, onMinimize, onFocus }) {
  const [pos, setPos]           = useState({ x: initialX, y: initialY });
  const [maximized, setMaximized] = useState(false);
  const dragging = useRef(false);
  const offset   = useRef({ x: 0, y: 0 });

  const onTitleDown = (e) => {
    if (e.target.closest('.win-btn')) return;
    if (maximized) return; // can't drag when maximized
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    onFocus(id);
    e.preventDefault();
  };

  const toggleMax = (e) => {
    e.stopPropagation();
    onFocus(id);
    setMaximized(v => !v);
  };

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return;
      setPos({ x: Math.max(0, e.clientX - offset.current.x), y: Math.max(0, e.clientY - offset.current.y) });
    };
    const up = () => { dragging.current = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, []);

  const style = maximized
    ? { left: 0, top: 0, right: 0, bottom: 32, width: 'auto', height: 'auto', zIndex }
    : { left: pos.x, top: pos.y, width, height, zIndex };

  return (
    <div className="win" style={style} onMouseDown={() => onFocus(id)}>
      <div className="win-titlebar" onMouseDown={onTitleDown} onDoubleClick={toggleMax}>
        <div className="win-title">{icon && <span>{icon}</span>}{title}</div>
        <div className="win-btns">
          <button className="win-btn" onClick={(e) => { e.stopPropagation(); onMinimize(id); }}>_</button>
          <button className="win-btn" onClick={toggleMax} style={{ fontSize: 8 }}>{maximized ? '❐' : '□'}</button>
          <button className="win-btn" onClick={(e) => { e.stopPropagation(); onClose(id); }}>✕</button>
        </div>
      </div>
      <div className="win-body">{children}</div>
    </div>
  );
}
