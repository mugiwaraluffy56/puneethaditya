const contributions = [
  {
    org: 'mofa-org/mofa',
    role: 'Contributor',
    url: 'https://github.com/mofa-org/mofa/pulls/mugiwaraluffy56',
    desc: 'Agent runtime + gateway system work across auth, routing, RAG, memory, rate limiting, and infra primitives.',
    tags: ['Agents', 'Gateway', 'RAG', 'Infra'],
    year: '2025-26',
  },
  {
    org: 'LLVM',
    role: 'Contributor',
    url: 'https://github.com/llvm/llvm-project/pulls?q=is%3Apr+author%3Amugiwaraluffy56+is%3Aclosed',
    desc: 'Compiler fixes across Clang, MLIR, LLDB, and backend crash fixes.',
    tags: ['C++', 'Compilers', 'MLIR', 'LLDB'],
    year: '2024-26',
  },
  {
    org: 'inspektor-gadget',
    role: 'Contributor',
    url: 'https://github.com/inspektor-gadget/inspektor-gadget/pulls/mugiwaraluffy56',
    desc: 'Kubernetes networking fixes and Docker build improvements for eBPF observability tooling.',
    tags: ['Go', 'Kubernetes', 'eBPF', 'Docker'],
    year: '2024-26',
  },
  {
    org: 'microcks-cli',
    role: 'Contributor',
    url: 'https://github.com/microcks/microcks-cli/pulls/mugiwaraluffy56',
    desc: 'CLI fixes, error handling improvements, and Go code cleanup.',
    tags: ['Go', 'CLI', 'Testing'],
    year: '2025-26',
  },
  {
    org: 'kuadrant/mcp-gateway',
    role: 'Contributor',
    url: 'https://github.com/Kuadrant/mcp-gateway/pulls/mugiwaraluffy56',
    desc: 'MCP gateway extensions, tracing, OAuth config, and policy tooling.',
    tags: ['MCP', 'OAuth', 'Tracing', 'Policy'],
    year: '2025-26',
  },
  {
    org: 'litmuschaos/litmus',
    role: 'Contributor',
    url: 'https://github.com/litmuschaos/litmus/pulls/mugiwaraluffy56',
    desc: 'Chaos engineering fixes for reliability and experiment execution safety.',
    tags: ['Chaos', 'Reliability', 'Kubernetes'],
    year: '2025-26',
  },
];

const maintainedOrgs = [
  { name: 'mohu-org', url: 'https://github.com/mohu-org', desc: 'Numerical computing ecosystem in Rust' },
  { name: 'nova-editor', url: 'https://github.com/nova-editor', desc: 'Rust based editor ecosystem' },
  { name: 'aathoos', url: 'https://github.com/aathoos', desc: 'Productivity + student OS tooling ecosystem' },
];

const ROW_HOVER = '#dde8ff';

export default function OpenSourceContent() {
  return (
    <div style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif', fontSize: 13 }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '190px 1fr 132px',
        background: '#c0c0c0', borderBottom: '2px solid #808080',
        padding: '3px 6px', fontWeight: 'bold', fontSize: 12,
      }}>
        <span>Project</span><span>Contributions</span><span>Focus</span>
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
              display: 'grid', gridTemplateColumns: '190px 1fr 132px',
              padding: '8px 6px', alignItems: 'start', gap: 6,
              background: i % 2 === 0 ? '#ffffff' : '#f5f5f5',
              borderBottom: '1px solid #e0e0e0',
            }}
            onMouseEnter={e => e.currentTarget.style.background = ROW_HOVER}
            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#ffffff' : '#f5f5f5'}
          >
            <div>
              <div style={{ fontWeight: 'bold', fontSize: 13 }}>{c.org}</div>
              <div style={{ fontSize: 10, color: '#808080', marginTop: 2 }}>{c.role} · {c.year}</div>
            </div>
            <span style={{ fontSize: 11, lineHeight: 1.6, color: '#222' }}>{c.desc}</span>
            <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {c.tags.map(t => (
                <span key={t} style={{ background: '#c0c0c0', border: '1px solid #808080', padding: '0 4px', fontSize: 9 }}>{t}</span>
              ))}
            </div>
          </div>
        </a>
      ))}

      <div style={{
        background: '#c0c0c0',
        borderTop: '2px solid #ffffff',
        borderBottom: '2px solid #808080',
        padding: '5px 6px',
        fontWeight: 'bold',
        fontSize: 12,
      }}>
        Orgs I Maintain
      </div>

      {maintainedOrgs.map((org, i) => (
        <a
          key={org.name}
          href={org.url}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              display: 'grid', gridTemplateColumns: '190px 1fr',
              padding: '7px 6px', gap: 6,
              background: i % 2 === 0 ? '#ffffff' : '#f5f5f5',
              borderBottom: '1px solid #e0e0e0',
            }}
            onMouseEnter={e => e.currentTarget.style.background = ROW_HOVER}
            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#ffffff' : '#f5f5f5'}
          >
            <span style={{ fontWeight: 'bold', fontSize: 13 }}>{org.name}</span>
            <span style={{ fontSize: 11, lineHeight: 1.5 }}>{org.desc}</span>
          </div>
        </a>
      ))}

      <div style={{ padding: '6px 6px', fontSize: 11, color: '#808080', borderTop: '1px solid #ccc' }}>
        Contribution links open filtered PR views on GitHub
      </div>
    </div>
  );
}
