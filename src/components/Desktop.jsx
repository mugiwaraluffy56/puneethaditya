import { useState, useCallback } from 'react';
import ContextMenu from './ContextMenu.jsx';

const ICONS = [
  { key: 'about',      label: 'About Me',       img: '/icons/about.png' },
  { key: 'resume',     label: 'Resume.pdf',     img: '/icons/resume.png' },
  { key: 'projects',   label: 'Projects',       img: '/icons/projects.png' },
  { key: 'skills',     label: 'Skills',         img: '/icons/skills.png' },
  { key: 'opensource', label: 'Open Source',    img: '/icons/opensource.png' },
  { key: 'blogs',      label: 'Blog',           img: '/icons/blogs.png' },
  { key: 'terminal',   label: 'Terminal',       img: '/icons/terminal.png' },
  { key: 'invaders',   label: 'Space Invaders', img: '/icons/invaders.png' },
];

export default function Desktop({ onOpen, children }) {
  const [selected, setSelected] = useState(null);
  const [ctxMenu, setCtxMenu] = useState(null); // { x, y }

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeCtx = useCallback(() => setCtxMenu(null), []);

  return (
    <div
      style={{ position: 'absolute', inset: 0, bottom: 32, background: '#008080' }}
      onClick={() => { setSelected(null); setCtxMenu(null); }}
      onContextMenu={handleContextMenu}
    >
      <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ICONS.map((ic) => (
          <div
            key={ic.key}
            className={`desktop-icon${selected === ic.key ? ' selected' : ''}`}
            onClick={(e) => { e.stopPropagation(); setSelected(ic.key); onOpen(ic.key); }}
            onContextMenu={(e) => { e.stopPropagation(); e.preventDefault(); setSelected(ic.key); setCtxMenu({ x: e.clientX, y: e.clientY }); }}
          >
            <img src={ic.img} alt={ic.label} style={{ width: 32, height: 32, imageRendering: 'pixelated' }} />
            <span className="icon-label">{ic.label}</span>
          </div>
        ))}
      </div>

      {children}

      {ctxMenu && (
        <ContextMenu x={ctxMenu.x} y={ctxMenu.y} onClose={closeCtx} onOpen={onOpen} />
      )}
    </div>
  );
}
