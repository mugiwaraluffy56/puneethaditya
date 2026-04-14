import { useState, useEffect } from 'react';
import StartMenu from './StartMenu.jsx';

function Clock() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  return <div className="taskbar-clock">{t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>;
}

const META = {
  about:        { label: 'About Me',       icon: '/icons/about.png' },
  resume:       { label: 'Resume.pdf',     icon: '/icons/resume.png' },
  projects:     { label: 'Projects',       icon: '/icons/projects.png' },
  skills:       { label: 'Skills',         icon: '/icons/skills.png' },
  opensource:   { label: 'Open Source',    icon: '/icons/opensource.png' },
  blogs:        { label: 'Blog',           icon: '/icons/blogs.png' },
  terminal:     { label: 'Terminal',       icon: '/icons/terminal.png' },
  invaders:     { label: 'Space Invaders', icon: '/icons/invaders.png' },
};

export default function Taskbar({ windows, onWinClick, onOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && <StartMenu onOpen={(k) => { onOpen(k); setMenuOpen(false); }} onClose={() => setMenuOpen(false)} />}
      <div className="taskbar">
        <button className={`start-btn${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(v => !v)}>
          <img src="/icons/windows.png" width={16} height={16} style={{ imageRendering: 'pixelated' }} alt="" />
          Start
        </button>
        <div className="taskbar-sep" />
        {windows.map(w => {
          const m = META[w.key] ?? { label: w.key, icon: null };
          return (
            <button
              key={w.id}
              className={`taskbar-win-btn${!w.minimized ? ' active' : ''}`}
              onClick={() => onWinClick(w.id, w.minimized)}
            >
              {m.icon && <img src={m.icon} width={16} height={16} style={{ imageRendering: 'pixelated', flexShrink: 0 }} alt="" />}
              <span>{m.label}</span>
            </button>
          );
        })}
        <Clock />
      </div>
    </>
  );
}
