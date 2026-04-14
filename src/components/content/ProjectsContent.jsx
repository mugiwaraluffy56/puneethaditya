const projects = [
  {
    name: 'GitDaemon',
    desc: 'A lightweight Git server written in Rust. Handles push/pull over a custom TCP protocol with full pack-file negotiation.',
    tags: ['Rust', 'Git', 'Networking', 'TCP'],
    url: 'https://github.com/puneeth-aditya/gitdaemon',
    status: 'Active',
  },
  {
    name: 'MOFA',
    desc: 'Multi-Agent Orchestration Framework for composing AI workflows. Built during GSoC research.',
    tags: ['Python', 'AI Agents', 'LLM', 'Dora'],
    url: '#',
    status: 'Research',
  },
  {
    name: 'Portfolio v2',
    desc: 'This very portfolio — a Windows 98-style desktop experience built with React and React95.',
    tags: ['React', 'React95', 'styled-components'],
    url: '#',
    status: 'Live',
  },
  {
    name: 'Web Dev Agency',
    desc: 'Full-stack marketing site for a creative web agency with GSAP animations and custom cursor.',
    tags: ['React', 'GSAP', 'Vite', 'CSS'],
    url: '#',
    status: 'Complete',
  },
];

const statusColor = {
  Active: '#008000',
  Research: '#808000',
  Live: '#000080',
  Complete: '#808080',
};

export default function ProjectsContent() {
  return (
    <div style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif', fontSize: 11 }}>
      {/* Column headers — Explorer style */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '160px 1fr 120px 70px',
          background: '#c0c0c0',
          borderBottom: '1px solid #808080',
          padding: '2px 4px',
          fontWeight: 'bold',
          marginBottom: 4,
        }}
      >
        <span>Name</span>
        <span>Description</span>
        <span>Tags</span>
        <span>Status</span>
      </div>

      {projects.map((p, i) => (
        <div
          key={p.name}
          style={{
            display: 'grid',
            gridTemplateColumns: '160px 1fr 120px 70px',
            padding: '4px 4px',
            background: i % 2 === 0 ? '#ffffff' : '#f0f0f0',
            borderBottom: '1px solid #e0e0e0',
            alignItems: 'start',
            gap: 4,
            cursor: 'default',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#000080'; e.currentTarget.style.color = '#ffffff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 0 ? '#ffffff' : '#f0f0f0'; e.currentTarget.style.color = '#000000'; }}
        >
          <span style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 4 }}>
            📁 {p.name}
          </span>
          <span style={{ fontSize: 10, lineHeight: 1.4 }}>{p.desc}</span>
          <span style={{ fontSize: 9 }}>{p.tags.join(', ')}</span>
          <span style={{ fontSize: 10, fontWeight: 'bold', color: statusColor[p.status] }}>
            {p.status}
          </span>
        </div>
      ))}

      <div style={{ marginTop: 12, padding: '4px 4px', fontSize: 10, color: '#808080' }}>
        {projects.length} object(s)
      </div>
    </div>
  );
}
