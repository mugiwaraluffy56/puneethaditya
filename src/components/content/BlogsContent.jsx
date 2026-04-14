const posts = [
  {
    title: 'Building a Git Server in Rust from Scratch',
    date: '2024-12-10',
    tags: ['Rust', 'Git', 'Protocols'],
    desc: 'A deep dive into the Git pack-file protocol — how push and pull actually work at the wire level, and how I implemented it in pure Rust.',
    status: 'draft',
  },
  {
    title: 'GSoC 2024: What I Learned Contributing to Mermaid.js',
    date: '2024-09-01',
    tags: ['GSoC', 'Open Source', 'JavaScript'],
    desc: 'Recap of my Google Summer of Code journey — navigating a large JS codebase, communicating with maintainers, and shipping real features.',
    status: 'draft',
  },
  {
    title: 'Why I Switched My ML Workflows to Dora',
    date: '2025-01-20',
    tags: ['AI', 'Rust', 'Python', 'Agents'],
    desc: 'Dora-rs is a Rust-based data-flow runtime for robotics and AI pipelines. Here is why it changed how I think about agent orchestration.',
    status: 'draft',
  },
];

const statusStyle = {
  draft: { background: '#808080', color: '#ffffff' },
  published: { background: '#008000', color: '#ffffff' },
};

export default function BlogsContent() {
  return (
    <div style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif', fontSize: 11 }}>
      <div
        style={{
          background: '#ffffc0',
          border: '1px solid #808080',
          padding: '6px 8px',
          marginBottom: 10,
          fontSize: 11,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>Blog posts are coming soon — drafts in progress!</span>
        <a
          href="https://puneethblog.vercel.app"
          target="_blank"
          rel="noreferrer"
          style={{
            color: '#000080',
            fontWeight: 'bold',
            fontSize: 11,
            textDecoration: 'underline',
            whiteSpace: 'nowrap',
            marginLeft: 12,
          }}
        >
          Check out more blogs »
        </a>
      </div>

      {posts.map((post, i) => (
        <div
          key={i}
          style={{
            background: '#ffffff',
            border: '1px solid',
            borderColor: '#808080 #ffffff #ffffff #808080',
            padding: 8,
            marginBottom: 8,
            cursor: 'default',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f0ff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <span style={{ fontWeight: 'bold', fontSize: 12, flex: 1 }}>{post.title}</span>
            <span
              style={{
                ...statusStyle[post.status],
                padding: '1px 6px',
                fontSize: 9,
                marginLeft: 8,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {post.status.toUpperCase()}
            </span>
          </div>

          <div style={{ fontSize: 10, color: '#808080', marginBottom: 4 }}>{post.date}</div>

          <p style={{ fontSize: 10, lineHeight: 1.5, color: '#000000', marginBottom: 6 }}>
            {post.desc}
          </p>

          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: '#c0c0c0',
                  border: '1px solid #808080',
                  padding: '0 4px',
                  fontSize: 9,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
