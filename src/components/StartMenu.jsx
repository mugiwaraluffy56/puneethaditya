import { useEffect, useRef } from 'react';

const ITEMS = [
  { key: 'about',      label: 'About Me',       img: '/icons/projects.png' },
  { key: 'projects',   label: 'Projects',       img: '/icons/projects.png' },
  { key: 'skills',     label: 'Skills',         img: '/icons/skills.png' },
  { key: 'opensource', label: 'Open Source',    img: '/icons/opensource.png' },
  { key: 'blogs',      label: 'Blog',           img: '/icons/blogs.png' },
  { key: 'terminal',   label: 'Terminal',       img: '/icons/terminal.png' },
  { key: 'invaders',   label: 'Space Invaders', img: '/icons/invaders.png' },
];

export default function StartMenu({ onOpen, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);

  return (
    <div ref={ref} className="start-menu">
      <div className="start-menu-strip"><span>Windows 95</span></div>
      <div className="start-menu-items">
        <div className="start-menu-header">Puneeth Aditya</div>
        {ITEMS.map(it => (
          <div key={it.key} className="start-menu-item" onClick={() => onOpen(it.key)}>
            <img src={it.img} alt="" width={16} height={16} style={{ imageRendering: 'pixelated' }} />
            {it.label}
          </div>
        ))}
        <div className="start-menu-divider" />
        <div className="start-menu-item" onClick={onClose}>
          <img src="/icons/shutdown.png" alt="" width={16} height={16} style={{ imageRendering: 'pixelated' }} />
          Shut Down...
        </div>
      </div>
    </div>
  );
}
