const projects = [
  {
    name: 'mohu-org',
    stack: ['Rust', 'PyO3', 'SIMD'],
    status: 'Active',
    url: 'https://github.com/mugiwaraluffy56/mohu-org',
    desc: 'NumPy replacement built in pure Rust. Arrow-native storage, SIMD compute kernels, linear algebra primitives (matmul, LU, QR, SVD, Cholesky), and zero-copy Python bindings via PyO3.',
  },
  {
    name: 'Klyna.io',
    stack: ['Rust', 'PostgreSQL', 'Redis', 'React'],
    status: 'Active',
    url: 'https://klyna.io',
    desc: 'Co-founded with a friend. API monitoring that actually tells you something useful ingestion pipeline, alerting engine, and REST API on the backend. Built the React dashboard together.',
  },
  {
    name: 'Go Git',
    stack: ['Go'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/go-git',
    desc: 'Complete Git implementation in Go. Covers the full object model, pack files, refs, and commit graph traversal. Built it to understand how Git actually works internally.',
  },
  {
    name: 'Shell in Rust',
    stack: ['Rust'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/shell-rs',
    desc: 'Unix shell written in Rust job control, piping, signal handling, and built-in command resolution. Wanted to understand the internals rather than just use the thing.',
  },
  {
    name: 'binrs',
    stack: ['Rust'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/binrs',
    desc: 'CLI for working with binary data across different encodings binary, hex, octal, BCD, Gray code, Base64, and run-length encoded bitstreams.',
  },
  {
    name: 'Go Bank',
    stack: ['Go', 'PostgreSQL'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/go-bank',
    desc: 'Double-entry banking system in Go. Every transaction has a matching debit and credit, and the audit ledger lets you reconstruct account state at any point.',
  },
  {
    name: 'License Detector',
    stack: ['Python', 'ML'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/license-detector',
    desc: 'ML-based tool for spotting open source license violations across large codebases. Useful for teams pulling in third-party code who need to stay clean on licensing.',
  },
];

const statusColor = {
  Active:   { bg: '#000080', fg: '#ffffff' },
  Complete: { bg: '#006400', fg: '#ffffff' },
  Research: { bg: '#808000', fg: '#ffffff' },
};

const ROW_HOVER = '#dde8ff';

export default function ProjectsContent() {
  return (
    <div style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif', fontSize: 13 }}>
      {/* column headers */}
      <div style={{
        display: 'grid', gridTemplateColumns: '140px 160px 1fr 64px',
        background: '#c0c0c0', borderBottom: '2px solid #808080',
        padding: '3px 6px', fontWeight: 'bold', fontSize: 12,
      }}>
        <span>Name</span><span>Stack</span><span>Description</span><span>Status</span>
      </div>

      {projects.map((p, i) => (
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              display: 'grid', gridTemplateColumns: '140px 160px 1fr 64px',
              padding: '6px 6px', alignItems: 'start', gap: 4,
              background: i % 2 === 0 ? '#ffffff' : '#f5f5f5',
              borderBottom: '1px solid #e0e0e0',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = ROW_HOVER}
            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#ffffff' : '#f5f5f5'}
          >
            <span style={{ fontWeight: 'bold', fontSize: 13 }}>{p.name}</span>
            <span style={{ fontSize: 11, color: '#444', lineHeight: 1.5 }}>{p.stack.join(', ')}</span>
            <span style={{ fontSize: 11, lineHeight: 1.5, color: '#222' }}>{p.desc}</span>
            <span style={{
              fontSize: 10, fontWeight: 'bold',
              background: statusColor[p.status].bg,
              color: statusColor[p.status].fg,
              padding: '1px 5px', alignSelf: 'start', whiteSpace: 'nowrap',
            }}>{p.status}</span>
          </div>
        </a>
      ))}

      <div style={{ padding: '6px 6px', fontSize: 11, color: '#808080', borderTop: '1px solid #ccc' }}>
        {projects.length} projects click any row to open on GitHub
      </div>
    </div>
  );
}
