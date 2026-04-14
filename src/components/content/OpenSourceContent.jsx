const contributions = [
  {
    org: 'mofa-org/mofa',
    role: 'Collaborator',
    prs: 21,
    url: 'https://github.com/mofa-org/mofa',
    desc: 'Kernel traits (GatewayRoute, AuthProvider, StructuredOutput, VectorStore), foundation implementations (AgentBuilder, RAG pipeline, rate limiter, built-in tools), 10 gateway phases, working prototype on demo/gateway-live-demo.',
    tags: ['Rust', 'AI Agents', 'RAG', 'LLM'],
    year: '2025',
  },
  {
    org: 'LLVM',
    role: 'Contributor',
    prs: 11,
    url: 'https://github.com/llvm/llvm-project',
    desc: 'Compiler passes and IR tooling across the LLVM core codebase. TableGen improvements and MLIR work.',
    tags: ['C++', 'Compilers', 'IR', 'MLIR'],
    year: '2024-25',
  },
  {
    org: 'CNCF Inspektor Gadget',
    role: 'Contributor',
    prs: 3,
    url: 'https://github.com/inspektor-gadget/inspektor-gadget',
    desc: 'eBPF-based observability tooling. First CNCF contribution.',
    tags: ['Go', 'eBPF', 'Observability', 'CNCF'],
    year: '2024',
  },
  {
    org: 'erof-utils',
    role: 'Contributor',
    prs: 1,
    url: 'https://github.com/erof-utils',
    desc: 'Utility library patch.',
    tags: ['Rust'],
    year: '2024',
  },
];

const prBadge = (n) => {
  if (n >= 10) return { bg: '#000080', fg: '#fff' };
  if (n >= 3)  return { bg: '#006400', fg: '#fff' };
  return { bg: '#808080', fg: '#fff' };
};

const ROW_HOVER = '#dde8ff';

export default function OpenSourceContent() {
  return (
    <div style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif', fontSize: 13 }}>
      {/* header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '180px 1fr 80px',
        background: '#c0c0c0', borderBottom: '2px solid #808080',
        padding: '3px 6px', fontWeight: 'bold', fontSize: 12,
      }}>
        <span>Organisation</span><span>Contributions</span><span style={{ textAlign: 'center' }}>PRs</span>
      </div>

      {contributions.map((c, i) => (
        <a
          key={c.org}
          href={c.url}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              display: 'grid', gridTemplateColumns: '180px 1fr 80px',
              padding: '8px 6px', alignItems: 'start', gap: 4,
              background: i % 2 === 0 ? '#ffffff' : '#f5f5f5',
              borderBottom: '1px solid #e0e0e0',
            }}
            onMouseEnter={e => e.currentTarget.style.background = ROW_HOVER}
            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#ffffff' : '#f5f5f5'}
          >
            <div>
              <div style={{ fontWeight: 'bold', fontSize: 13 }}>{c.org}</div>
              <div style={{ fontSize: 10, color: '#808080', marginTop: 2 }}>{c.role} · {c.year}</div>
              <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginTop: 4 }}>
                {c.tags.map(t => (
                  <span key={t} style={{ background: '#c0c0c0', border: '1px solid #808080', padding: '0 4px', fontSize: 9 }}>{t}</span>
                ))}
              </div>
            </div>
            <span style={{ fontSize: 11, lineHeight: 1.6, color: '#222' }}>{c.desc}</span>
            <div style={{ textAlign: 'center' }}>
              <span style={{
                ...prBadge(c.prs),
                background: prBadge(c.prs).bg, color: prBadge(c.prs).fg,
                padding: '2px 8px', fontWeight: 'bold', fontSize: 12,
                display: 'inline-block',
              }}>{c.prs} merged</span>
            </div>
          </div>
        </a>
      ))}

      <div style={{ padding: '6px 6px', fontSize: 11, color: '#808080', borderTop: '1px solid #ccc' }}>
        {contributions.reduce((s, c) => s + c.prs, 0)} total merged PRs click any row to open on GitHub
      </div>
    </div>
  );
}
