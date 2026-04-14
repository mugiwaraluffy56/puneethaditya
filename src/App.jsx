import { useState, useCallback, useRef } from 'react';
import Desktop from './components/Desktop.jsx';
import Taskbar from './components/Taskbar.jsx';
import Window from './components/Window.jsx';
import ProjectsContent from './components/content/ProjectsContent.jsx';
import SkillsContent from './components/content/SkillsContent.jsx';
import OpenSourceContent from './components/content/OpenSourceContent.jsx';
import BlogsContent from './components/content/BlogsContent.jsx';
import NeofetchContent from './components/content/NeofetchContent.jsx';
import InvadersContent from './components/content/InvadersContent.jsx';

const CONFIGS = {
  projects:   { title: 'My Projects',    icon: '/icons/projects.png',   Component: ProjectsContent,   width: 700, height: 460 },
  skills:     { title: 'Skills & Tools', icon: '/icons/skills.png',     Component: SkillsContent,     width: 540, height: 440 },
  opensource: { title: 'Open Source',    icon: '/icons/opensource.png', Component: OpenSourceContent, width: 640, height: 460 },
  blogs:      { title: 'Blog',           icon: '/icons/blogs.png',      Component: BlogsContent,      width: 580, height: 440 },
  terminal:   { title: 'Terminal',       icon: '/icons/terminal.png',   Component: NeofetchContent,   width: 700, height: 460 },
  invaders:   { title: 'Space Invaders', icon: '/icons/invaders.png',   Component: InvadersContent,   width: 800, height: 660 },
};

let uid = 0;

export default function App() {
  const zRef = useRef(100);

  const [wins, setWins] = useState(() => {
    const cfg = CONFIGS.terminal;
    const x = Math.max(0, Math.round((window.innerWidth  - cfg.width)  / 2));
    const y = Math.max(0, Math.round((window.innerHeight - 32 - cfg.height) / 2) - 60);
    return [{ id: ++uid, key: 'terminal', x, y, minimized: false, zIndex: zRef.current }];
  });

  const open = useCallback((key) => {
    setWins(prev => {
      const existing = prev.find(w => w.key === key);
      if (existing) {
        const nz = ++zRef.current;
        return prev.map(w => w.id === existing.id ? { ...w, minimized: false, zIndex: nz } : w);
      }
      const id = ++uid;
      const nz = ++zRef.current;
      const offset = (id % 6) * 28;
      return [...prev, { id, key, x: 60 + offset, y: 40 + offset, minimized: false, zIndex: nz }];
    });
  }, []);

  const close    = useCallback((id) => setWins(ws => ws.filter(w => w.id !== id)), []);
  const minimize = useCallback((id) => setWins(ws => ws.map(w => w.id === id ? { ...w, minimized: true } : w)), []);

  const focus = useCallback((id) => {
    setWins(ws => {
      const nz = ++zRef.current;
      return ws.map(w => w.id === id ? { ...w, zIndex: nz } : w);
    });
  }, []);

  const taskbarClick = useCallback((id) => {
    setWins(ws => {
      const nz = ++zRef.current;
      return ws.map(w => w.id === id ? { ...w, minimized: false, zIndex: nz } : w);
    });
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <Desktop onOpen={open}>
        {wins.map(win => {
          if (win.minimized) return null;
          const { Component, title, icon, width, height } = CONFIGS[win.key] ?? {};
          if (!Component) return null;
          return (
            <Window key={win.id} id={win.id} title={title}
              icon={<img src={icon} width={16} height={16} style={{ imageRendering: 'pixelated' }} alt="" />}
              initialX={win.x} initialY={win.y} width={width} height={height}
              zIndex={win.zIndex} onClose={close} onMinimize={minimize} onFocus={focus}>
              <Component />
            </Window>
          );
        })}
      </Desktop>
      <Taskbar windows={wins} onWinClick={taskbarClick} onOpen={open} />
    </div>
  );
}
