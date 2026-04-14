# puneethaditya.vercel.app

Windows 95-style portfolio built in React 19 + Vite 7. No UI libraries — pure CSS Win95 aesthetics.

## Features

- **Boot screen** — Win95 startup animation with progress bar before the desktop loads
- **Draggable windows** — title-bar drag, z-index focus management, minimize/close
- **Taskbar** — live window buttons, Start menu with all apps
- **Right-click context menu** — Refresh, About Me, and quick-launch shortcuts on the desktop
- **Win95 cursors** — custom `.cur` cursor pack across all states (default, pointer, text, move)
- **Win98 icon pack** — pixel-perfect PNG icons throughout

## Windows / Apps

| Window | Description |
|---|---|
| Terminal | neofetch profile + interactive shell (`ls`, `cd`, `cat`, `pwd`, `clear`, `help`) |
| My Projects | 7 real projects with stack, status, GitHub links |
| Skills & Tools | Languages, Systems, ML/AI, Infra grouped with proficiency |
| Open Source | mofa-org (21 PRs), LLVM (11 PRs), CNCF, erof-utils — PR count color-coded |
| Blog | 4 draft posts linking to puneethblog.vercel.app |
| About Me | Bio, education, Klyna.io co-founder blurb, hire CTA |
| Space Invaders | Keyboard-controlled game, letterboxed to fill window |

## Stack

- React 19, Vite 7
- Zero external UI libraries
- CSS Win95 double-border trick (`border-color: #fff #404040 #404040 #fff`)
- Virtual filesystem in NeofetchContent for interactive terminal

## Run locally

```bash
npm install
npm run dev
```
