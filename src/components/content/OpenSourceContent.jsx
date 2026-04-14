const contributions = [
  {
    org: 'Google Summer of Code 2024',
    project: 'Mermaid.js',
    role: 'Contributor',
    desc: 'Implemented new diagram rendering features and improved existing chart types. Contributed layout engine improvements for complex graphs.',
    link: 'https://summerofcode.withgoogle.com',
    tags: ['JavaScript', 'Diagrams', 'Open Source'],
    year: '2024',
  },
  {
    org: 'Dora-RS',
    project: 'MOFA Framework',
    role: 'Contributor',
    desc: 'Built multi-agent orchestration tooling on top of the Dora robotics/AI framework for composing agent workflows.',
    link: 'https://github.com/dora-rs/dora',
    tags: ['Rust', 'Python', 'AI', 'Robotics'],
    year: '2024',
  },
  {
    org: 'Personal Projects',
    project: 'GitDaemon',
    role: 'Author',
    desc: 'Open-source lightweight Git server in Rust. Full pack-file protocol implementation for push/pull operations.',
    link: 'https://github.com/puneeth-aditya/gitdaemon',
    tags: ['Rust', 'Git Protocol', 'Networking'],
    year: '2024',
  },
];

export default function OpenSourceContent() {
  return (
    <div style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif', fontSize: 11 }}>
      <div style={{ marginBottom: 8, fontSize: 10, color: '#808080' }}>
        Open source contributions and projects
      </div>

      {contributions.map((c, i) => (
        <div
          key={i}
          style={{
            background: '#ffffff',
            border: '1px solid',
            borderColor: '#808080 #ffffff #ffffff #808080',
            padding: 8,
            marginBottom: 8,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <div>
              <span style={{ fontWeight: 'bold', fontSize: 12 }}>{c.project}</span>
              <span style={{ color: '#808080', marginLeft: 6, fontSize: 10 }}>— {c.org}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span
                style={{
                  background: '#000080',
                  color: '#ffffff',
                  padding: '1px 6px',
                  fontSize: 10,
                }}
              >
                {c.role}
              </span>
              <span style={{ color: '#808080', fontSize: 10 }}>{c.year}</span>
            </div>
          </div>

          <p style={{ fontSize: 10, lineHeight: 1.5, marginBottom: 6, color: '#000000' }}>
            {c.desc}
          </p>

          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {c.tags.map((tag) => (
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
