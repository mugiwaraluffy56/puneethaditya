import { useEffect, useRef } from 'react';

export default function ContextMenu({ x, y, onClose, onOpen }) {
  const ref = useRef(null);

  // close on any click outside
  useEffect(() => {
    const handler = () => onClose();
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [onClose]);

  // keep menu on screen
  const menuW = 180;
  const menuH = 220;
  const left = Math.min(x, window.innerWidth  - menuW - 4);
  const top  = Math.min(y, window.innerHeight - menuH - 36); // stay above taskbar

  const items = [
    { label: 'About Me',       key: 'about',      icon: '/icons/about.png' },
    { label: 'Resume.pdf',     key: 'resume',     icon: '/icons/resume.png' },
    { label: 'My Projects',    key: 'projects',   icon: '/icons/projects.png' },
    { label: 'Skills',         key: 'skills',     icon: '/icons/skills.png' },
    { label: 'Open Source',    key: 'opensource', icon: '/icons/opensource.png' },
    { label: 'Blog',           key: 'blogs',      icon: '/icons/blogs.png' },
    null, // divider
    { label: 'Terminal',       key: 'terminal',   icon: '/icons/terminal.png' },
    { label: 'Space Invaders', key: 'invaders',   icon: '/icons/invaders.png' },
    null,
    { label: 'Refresh',        key: '__refresh__', icon: '/icons/skills.png' },
  ];

  const handleClick = (e, item) => {
    e.stopPropagation();
    if (item.key === '__refresh__') {
      window.location.reload();
    } else {
      onOpen(item.key);
    }
    onClose();
  };

  return (
    <div
      ref={ref}
      onMouseDown={e => e.stopPropagation()}
      style={{
        position: 'fixed',
        left, top,
        width: menuW,
        background: '#c0c0c0',
        border: '2px solid',
        borderColor: '#ffffff #808080 #808080 #ffffff',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.4)',
        zIndex: 99000,
        fontFamily: '"MS Sans Serif", Arial, sans-serif',
        fontSize: 12,
        userSelect: 'none',
      }}
    >
      {items.map((item, i) =>
        item === null ? (
          <div key={`div-${i}`} style={{
            margin: '2px 4px',
            borderTop: '1px solid #808080',
            borderBottom: '1px solid #ffffff',
          }} />
        ) : (
          <div
            key={item.key}
            onClick={e => handleClick(e, item)}
            style={{
              padding: '4px 12px 4px 8px',
              display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#000080'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ''; }}
          >
            <img src={item.icon} width={16} height={16} style={{ imageRendering: 'pixelated', flexShrink: 0 }} alt="" />
            {item.label}
          </div>
        )
      )}
    </div>
  );
}
