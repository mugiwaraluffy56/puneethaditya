const posts = [
  {
    title: 'Building mohu-org: NumPy in Pure Rust',
    date: '2025-03-15',
    tags: ['Rust', 'PyO3', 'SIMD', 'Linear Algebra'],
    desc: 'Why I started building a NumPy replacement natively in Rust instead of wrapping it. Arrow-native storage, SIMD compute kernels, and zero-copy Python bindings via PyO3.',
    status: 'draft',
  },
  {
    title: '21 PRs into mofa-org: What I Learned About AI Agent Frameworks',
    date: '2025-02-20',
    tags: ['Rust', 'AI Agents', 'RAG', 'Open Source'],
    desc: 'A recap of contributing kernel traits, AgentBuilder, RAG pipeline, and a Cognitive Gateway prototype to the mofa-org Rust AI framework. What went well, what was hard.',
    status: 'draft',
  },
  {
    title: 'LLVM Internals: Writing Compiler Passes from Scratch',
    date: '2025-01-10',
    tags: ['LLVM', 'Compilers', 'C++', 'IR'],
    desc: '11 merged PRs into LLVM taught me more about compilers than any course. This is a walkthrough of the IR tooling and TableGen work, and how to actually navigate the LLVM codebase.',
    status: 'draft',
  },
  {
    title: 'Klyna.io: Building API Monitoring That Actually Works',
    date: '2025-04-01',
    tags: ['Rust', 'PostgreSQL', 'Redis', 'Startups'],
    desc: 'Why my co-founder and I started Klyna. API monitoring tools were either too heavy or told you nothing useful. So we built the backend in Rust with PostgreSQL and Redis from scratch.',
    status: 'draft',
  },
];

const statusStyle = {
  draft:     { background: '#808080', color: '#ffffff' },
  published: { background: '#006400', color: '#ffffff' },
};

const ROW_HOVER = '#f0f0ff';

export default function BlogsContent() {
  return (
    <div style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif', fontSize: 13 }}>
      <div style={{
        background: '#ffffc0',
        border: '1px solid #808080',
        padding: '6px 10px',
        marginBottom: 10,
        fontSize: 12,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>Drafts in progress. Full posts published on the blog.</span>
        <a
          href="https://puneethblog.vercel.app"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#000080', fontWeight: 'bold', fontSize: 12, textDecoration: 'underline', whiteSpace: 'nowrap', marginLeft: 12 }}
        >
          Check out more blogs »
        </a>
      </div>

      {posts.map((post, i) => (
        <a
          key={i}
          href="https://puneethblog.vercel.app"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              background: '#ffffff',
              border: '1px solid',
              borderColor: '#808080 #e0e0e0 #e0e0e0 #808080',
              padding: '8px 10px',
              marginBottom: 8,
              cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.background = ROW_HOVER}
            onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <span style={{ fontWeight: 'bold', fontSize: 13, flex: 1 }}>{post.title}</span>
              <span style={{
                ...statusStyle[post.status],
                padding: '1px 6px', fontSize: 10, marginLeft: 10,
                whiteSpace: 'nowrap', flexShrink: 0,
              }}>
                {post.status.toUpperCase()}
              </span>
            </div>

            <div style={{ fontSize: 11, color: '#808080', marginBottom: 5 }}>{post.date}</div>

            <p style={{ fontSize: 12, lineHeight: 1.6, color: '#222', marginBottom: 7 }}>
              {post.desc}
            </p>

            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  background: '#c0c0c0', border: '1px solid #808080',
                  padding: '0 5px', fontSize: 10,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </a>
      ))}

      <div style={{ padding: '4px 2px', fontSize: 11, color: '#808080' }}>
        {posts.length} posts click any to read on puneethblog.vercel.app
      </div>
    </div>
  );
}
