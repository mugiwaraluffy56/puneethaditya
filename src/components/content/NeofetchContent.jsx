import { useState, useRef, useEffect } from 'react';

/* ── filesystem tree ─────────────────────────────────────── */
const FS = {
  '~': {
    projects: {
      'gitdaemon':    { _file: 'Rust · Git server over TCP with full pack-file negotiation.' },
      'mofa':         { _file: 'Python · Multi-Agent Orchestration Framework (GSoC research).' },
      'portfolio':    { _file: 'React · This Win95 portfolio you are looking at right now.' },
      'webdevagency': { _file: 'React + GSAP · Full-stack marketing site with custom cursor.' },
    },
    skills: {
      'languages.txt': { _file: 'Python 92%  Rust 80%  JS/TS 85%  C/C++ 65%  Bash 75%' },
      'ml.txt':        { _file: 'PyTorch 88%  scikit-learn 82%  HuggingFace 78%  Dora 70%' },
      'tools.txt':     { _file: 'Git 90%  Docker 74%  Linux 85%  VSCode 88%' },
    },
    'about.txt':   { _file: 'Puneeth Aditya — builder, researcher, open-source contributor.' },
    'contact.txt': { _file: 'GitHub: github.com/mugiwaraluffy56  |  myakampuneeth@gmail.com' },
  },
};

function getNode(segs) {
  let n = FS;
  for (const s of segs) n = n?.[s];
  return n;
}
function fmtPath(segs) { return segs.join('/'); }
function resolvePath(cwd, parts) {
  const segments = [...cwd];
  for (const p of parts) {
    if (p === '~') { segments.splice(0, segments.length, '~'); continue; }
    if (p === '..') { if (segments.length > 1) segments.pop(); continue; }
    if (p === '.') continue;
    const cur = getNode(segments);
    if (cur?.[p] && !cur[p]._file) segments.push(p);
    else return null;
  }
  return { node: getNode(segments), segs: segments };
}

function runCmd(input, cwd) {
  const [cmd, ...args] = input.trim().split(/\s+/);
  switch (cmd) {
    case '': return { out: null, cwd };
    case 'pwd': return { out: fmtPath(cwd), cwd };
    case 'ls': {
      const node = args[0]
        ? resolvePath(cwd, [args[0]])?.node
        : getNode(cwd);
      if (!node) return { out: `ls: ${args[0]}: No such file or directory`, cwd };
      return {
        out: Object.keys(node).map(k => node[k]._file ? k : `\x1bdir:${k}`).join('  '),
        cwd,
      };
    }
    case 'cd': {
      if (!args[0] || args[0] === '~') return { out: null, cwd: ['~'] };
      const res = resolvePath(cwd, args[0].split('/').filter(Boolean));
      if (!res) return { out: `cd: ${args[0]}: No such file or directory`, cwd };
      return { out: null, cwd: res.segs };
    }
    case 'cat':
    case 'open': {
      if (!args[0]) return { out: `${cmd}: missing operand`, cwd };
      const target = getNode(cwd)?.[args[0]];
      if (!target) return { out: `${cmd}: ${args[0]}: No such file`, cwd };
      if (!target._file) return { out: `${cmd}: ${args[0]}: Is a directory`, cwd };
      return { out: target._file, cwd };
    }
    case 'help':
      return { out: 'ls  cd  pwd  cat  open  clear  help', cwd };
    case 'clear':
      return { out: '__clear__', cwd };
    default:
      return { out: `${cmd}: command not found`, cwd };
  }
}

/* ── neofetch data ───────────────────────────────────────── */
const INFO = [
  ['OS',        'Portfolio v2.0 x86_64'],
  ['Host',      'puneeth.dev'],
  ['Kernel',    'React 19.0 + Vite 7'],
  ['Uptime',    '3 years, always building'],
  ['Packages',  '10+ shipped projects'],
  ['Shell',     'zsh 5.9'],
  ['Resolution','1920x1080'],
  ['WM',        'Win95Desktop'],
  ['WM Theme',  'Classic Silver'],
  ['Theme',     'Win95 [Gray]'],
  ['Terminal',  'Win95Terminal'],
  ['CPU',       'Apple M-Series @ 3.2GHz'],
  ['GPU',       'Apple Integrated GPU'],
  ['Languages', 'Python · Rust · JS/TS · C++'],
  ['ML',        'PyTorch · HuggingFace · Dora'],
  ['GitHub',    'github.com/mugiwaraluffy56'],
  ['Email',     'myakampuneeth@gmail.com'],
  ['Memory',    '∞ MiB / ∞ MiB'],
];

const PALETTE  = ['#282828','#cc241d','#98971a','#d79921','#458588','#b16286','#689d6a','#a89984'];
const PALETTE2 = ['#928374','#fb4934','#b8bb26','#fabd2f','#83a598','#d3869b','#8ec07c','#ebdbb2'];

/* ── component ───────────────────────────────────────────── */
export default function NeofetchContent() {
  const [cwd, setCwd] = useState(['~']);
  const [shellLines, setShellLines] = useState([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const shellEndRef = useRef(null);

  useEffect(() => { shellEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [shellLines]);

  const submit = () => {
    const cmd = input.trim();
    const { out, cwd: nextCwd } = runCmd(input, cwd);
    if (out === '__clear__') {
      setShellLines([]);
      setCwd(nextCwd); setInput(''); setHistIdx(-1);
      return;
    }
    const lines = [`\x1bprompt:${fmtPath(cwd)}❯${cmd}`];
    if (out) lines.push(`\x1bout:${out}`);
    setShellLines(h => [...h, ...lines]);
    setCwd(nextCwd);
    if (cmd) setCmdHistory(h => [cmd, ...h]);
    setInput(''); setHistIdx(-1);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') { submit(); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(idx); setInput(cmdHistory[idx] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx); setInput(idx === -1 ? '' : cmdHistory[idx]);
    }
  };

  return (
    <div
      style={{
        background: '#1e1e2e', color: '#cdd6f4',
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: '13px', lineHeight: '1.6',
        padding: '16px 20px', height: '100%', margin: '-6px',
        boxSizing: 'border-box', overflowY: 'auto',
        display: 'flex', gap: 28, alignItems: 'flex-start',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* ── left: avatar + swatches ── */}
      <div style={{ flexShrink: 0 }}>
        <img src="/avatar.png" alt="puneeth"
          style={{ width: 200, height: 200, display: 'block', border: '2px solid #313244', borderRadius: 4 }} />
        <div style={{ display: 'flex', marginTop: 10 }}>
          {PALETTE.map(c => <div key={c} style={{ width: 20, height: 12, background: c }} />)}
        </div>
        <div style={{ display: 'flex' }}>
          {PALETTE2.map(c => <div key={c} style={{ width: 20, height: 12, background: c }} />)}
        </div>
      </div>

      {/* ── right: info + shell ── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* username */}
        <div style={{ marginBottom: 2 }}>
          <span style={{ color: '#89dceb', fontWeight: 'bold' }}>puneeth</span>
          <span style={{ color: '#6c7086' }}>@</span>
          <span style={{ color: '#89dceb', fontWeight: 'bold' }}>portfolio</span>
        </div>
        <div style={{ color: '#6c7086', marginBottom: 8 }}>{'─'.repeat(22)}</div>

        {/* info rows */}
        {INFO.map(([key, val]) => (
          <div key={key} style={{ marginBottom: 1 }}>
            <span style={{ color: '#89b4fa', fontWeight: 'bold' }}>{key}:</span>
            {key === 'GitHub'
              ? <a href={`https://${val}`} target="_blank" rel="noreferrer"
                  style={{ color: '#a6e3a1', textDecoration: 'underline', marginLeft: 4 }}>{val}</a>
              : <span style={{ color: '#cdd6f4' }}> {val}</span>}
          </div>
        ))}

        {/* shell history */}
        <div style={{ marginTop: 8 }}>
          {shellLines.map((line, i) => {
            if (line.startsWith('\x1bprompt:')) {
              const rest = line.slice(8);
              const sep = rest.indexOf('❯');
              const path = rest.slice(0, sep);
              const cmd = rest.slice(sep + 1);
              return (
                <div key={i}>
                  <span style={{ color: '#a6e3a1' }}>puneeth</span>
                  <span style={{ color: '#6c7086' }}>@portfolio:</span>
                  <span style={{ color: '#89b4fa' }}>{path}</span>
                  <span style={{ color: '#cba6f7' }}> ❯ </span>
                  <span style={{ color: '#cdd6f4' }}>{cmd}</span>
                </div>
              );
            }
            if (line.startsWith('\x1bout:')) {
              const text = line.slice(5);
              const parts = text.split('  ');
              const isLs = parts.some(p => p.startsWith('\x1bdir:'));
              if (isLs) return (
                <div key={i} style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
                  {parts.map((p, j) =>
                    p.startsWith('\x1bdir:')
                      ? <span key={j} style={{ color: '#89b4fa', fontWeight: 'bold' }}>{p.slice(5)}/</span>
                      : <span key={j} style={{ color: '#cdd6f4' }}>{p}</span>
                  )}
                </div>
              );
              return <div key={i} style={{ color: '#cdd6f4', whiteSpace: 'pre-wrap' }}>{text}</div>;
            }
            return null;
          })}
          <div ref={shellEndRef} />
        </div>

        {/* prompt input */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 4, paddingLeft: 8, gap: 4 }}>
          <span style={{ color: '#a6e3a1', whiteSpace: 'nowrap' }}>puneeth</span>
          <span style={{ color: '#6c7086' }}>@portfolio:</span>
          <span style={{ color: '#89b4fa' }}>{fmtPath(cwd)}</span>
          <span style={{ color: '#cba6f7' }}> ❯ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
            spellCheck={false}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#cdd6f4', fontFamily: 'inherit', fontSize: 'inherit',
              caretColor: '#cdd6f4', caretShape: 'block',
            }}
          />
        </div>
      </div>
    </div>
  );
}
