import { useState, useRef, useEffect } from 'react';

/* ── filesystem tree ─────────────────────────────────────── */
const FS = {
  '~': {
    projects: {
      'mohu':         { _file: 'Rust + Python · NumPy replacement for Python.' },
      'vcex':         { _file: 'Rust + Elixir · RAM efficient video call app.' },
      'clawdesk':     { _file: 'OpenClaw · Personal mission control.' },
      'wert':         { _file: 'Terminal native team collaboration.' },
      'nova':         { _file: 'Rust · Editor ecosystem.' },
      'vl-jepa':      { _file: 'Self supervised vision language learning without reconstruction.' },
      'gitdaemon':    { _file: 'Background Git sync engine with intelligent auto-commits.' },
      'portfolio':    { _file: 'React · This Win95 portfolio you are looking at right now.' },
    },
    orgs: {
      'mohu-org':     { _file: 'Numerical computing ecosystem in Rust.' },
      'nova-editor': { _file: 'Rust based editor ecosystem.' },
      'aathoos':     { _file: 'Productivity + student OS tooling ecosystem.' },
    },
    oss: {
      'mofa':              { _file: 'Agent runtime + gateway system: auth, routing, RAG, memory, rate limiting.' },
      'llvm':              { _file: 'Compiler fixes across Clang, MLIR, LLDB, and backend crash fixes.' },
      'inspektor-gadget':  { _file: 'Kubernetes networking fixes + Docker build improvements.' },
      'microcks':          { _file: 'CLI fixes, error handling, and Go cleanup.' },
      'kuadrant':          { _file: 'MCP gateway extensions, tracing, OAuth config, and policy tooling.' },
      'litmuschaos':       { _file: 'Chaos engineering reliability and experiment safety fixes.' },
    },
    skills: {
      'languages.txt': { _file: 'Rust 92%  Go 88%  Python 85%  C/C++ 78%  TypeScript 80%' },
      'systems.txt':   { _file: 'LLVM 75%  eBPF 72%  Async Rust 88%  Git internals 82%' },
      'ml-infra.txt':  { _file: 'Vision-language 78%  RAG 78%  self-supervised learning 72%' },
      'cloud.txt':     { _file: 'Kubernetes 78%  API observability 82%  PostgreSQL/Redis 82%' },
    },
    'about.txt':   { _file: 'Puneeth Aditya. Deep in learning mode. Systems-first engineer and OSS contributor.' },
    'doing.txt':   { _file: 'Building Klyna, cloud-native systems, compilers, eBPF, Rust infra, and ML + infra systems.' },
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
    case 'whoami':
      return { out: 'puneeth — systems engineer, open source contributor, co-founder of Klyna.io\nGitHub: github.com/mugiwaraluffy56  |  Email: myakampuneeth@gmail.com', cwd };
    case 'help':
      return { out: 'ls  cd  pwd  cat  open  clear  whoami  help', cwd };
    case 'clear':
      return { out: '__clear__', cwd };
    default:
      return { out: `${cmd}: command not found`, cwd };
  }
}

/* ── neofetch data ───────────────────────────────────────── */
const INFO = [
  ['OS',        'Portfolio v2.0 x86_64'],
  ['Host',      'puneethaditya.vercel.app'],
  ['Kernel',    'React 19.0 + Vite 7'],
  ['Uptime',    'Deep in learning mode'],
  ['Focus',     'Cloud-native systems · Systems-first engineering · Rust everywhere'],
  ['Shell',     'zsh 5.9'],
  ['Languages', 'Rust · Go · C++ · Python · TS'],
  ['Systems',   'LLVM · eBPF · Compilers · Performance internals'],
  ['ML',        'Vision-language · Self-supervised learning · RAG'],
  ['Infra',     'Kubernetes · Service meshes · Distributed infra'],
  ['Building',  'Klyna'],
  ['Maintains', 'mohu-org · nova-editor · aathoos'],
  ['GitHub',    'github.com/mugiwaraluffy56'],
  ['LinkedIn',  'linkedin.com/in/puneethaditya'],
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
    setTimeout(() => inputRef.current?.focus(), 0);
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
        margin: '-6px', height: 'calc(100% + 12px)',
        boxSizing: 'border-box', overflow: 'hidden',
        display: 'flex', gap: 0,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* ── left: avatar + swatches ── */}
      <div style={{ flexShrink: 0, padding: '16px 0 16px 20px', overflowY: 'auto' }}>
        <img src="/avatar.png" alt="puneeth"
          style={{ width: 200, height: 200, display: 'block', border: '2px solid #313244', borderRadius: 4 }} />
        <div style={{ display: 'flex', marginTop: 10 }}>
          {PALETTE.map(c => <div key={c} style={{ width: 20, height: 12, background: c }} />)}
        </div>
        <div style={{ display: 'flex' }}>
          {PALETTE2.map(c => <div key={c} style={{ width: 20, height: 12, background: c }} />)}
        </div>
      </div>

      {/* right: info + shell - scrolls independently */}
      <div style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '16px 20px 16px 28px', height: '100%', boxSizing: 'border-box' }}>
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
                  <span style={{ color: '#cba6f7', margin: '0 6px' }}>❯</span>
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
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
          <span style={{ color: '#a6e3a1', whiteSpace: 'nowrap' }}>puneeth</span>
          <span style={{ color: '#6c7086', whiteSpace: 'nowrap' }}>@portfolio:</span>
          <span style={{ color: '#89b4fa', whiteSpace: 'nowrap' }}>{fmtPath(cwd)}</span>
          <span style={{ color: '#cba6f7', whiteSpace: 'nowrap', marginLeft: 4, marginRight: 6 }}>❯</span>
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
