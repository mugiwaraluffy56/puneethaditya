const projects = [
  {
    name: 'mohu',
    stack: ['Rust', 'Python', 'PyO3'],
    status: 'Active',
    url: 'https://github.com/mohu-org',
    desc: 'Rust based NumPy replacement for Python.',
  },
  {
    name: 'vcex',
    stack: ['Rust', 'Elixir', 'Video'],
    status: 'Active',
    url: 'https://github.com/mugiwaraluffy56/vcex',
    desc: 'Rust native, Elixir based video call app built to be insanely RAM efficient.',
  },
  {
    name: 'clawdesk',
    stack: ['OpenClaw', 'Agents'],
    status: 'Active',
    url: 'https://github.com/mugiwaraluffy56/clawdesk',
    desc: 'Personal OpenClaw mission control.',
  },
  {
    name: 'wert',
    stack: ['Terminal', 'Collab'],
    status: 'Active',
    url: 'https://github.com/mugiwaraluffy56/wert',
    desc: 'Terminal native team collaboration for chat, tasks, and tracking.',
  },
  {
    name: 'nova',
    stack: ['Rust', 'Editor'],
    status: 'Active',
    url: 'https://github.com/nova-editor',
    desc: 'Rust based editor built because most editors feel too heavy or wrong.',
  },
  {
    name: 'vl-jepa',
    stack: ['ML', 'Vision-Language'],
    status: 'Research',
    url: 'https://github.com/mugiwaraluffy56/vl-jepa',
    desc: 'Self supervised vision language learning without reconstruction.',
  },
  {
    name: 'License-Detection',
    stack: ['Python', 'BERT', 'TF-IDF'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/OJT',
    desc: 'ML powered license detection across 100+ SPDX license classes.',
  },
  {
    name: 'Vision-Language Infra Inspection',
    stack: ['YOLOv8', 'BLIP-2', 'ML'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/vision-language-infrastructure-inspection',
    desc: 'YOLOv8 + BLIP-2 system for automated infrastructure inspection.',
  },
  {
    name: 'gitdaemon',
    stack: ['Git', 'Automation'],
    status: 'Active',
    url: 'https://github.com/mugiwaraluffy56/gitdaemon',
    desc: 'Background Git sync engine with intelligent auto-commits.',
  },
  {
    name: 'oss-skills',
    stack: ['Claude', 'Codex', 'OSS'],
    status: 'Active',
    url: 'https://github.com/mugiwaraluffy56/oss-skills',
    desc: 'Skills and workflows for OSS contributions with Claude and Codex agents.',
  },
  {
    name: 'rsh',
    stack: ['Rust', 'Shell'],
    status: 'Complete',
    url: 'https://github.com/aathoos/rsh',
    desc: 'Rust based shell from scratch.',
  },
  {
    name: 'aathoos',
    stack: ['Productivity', 'Student OS'],
    status: 'Active',
    url: 'https://github.com/aathoos/aathoos',
    desc: 'Student OS for managing tasks, notes, and study plans.',
  },
  {
    name: 'aathu-lang',
    stack: ['Language', 'Automation'],
    status: 'Active',
    url: 'https://github.com/mugiwaraluffy56/aathu-lang',
    desc: 'Minimal automation language for modern workflows.',
  },
  {
    name: 'http-in-asm',
    stack: ['Assembly', 'HTTP'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/http-in-asm',
    desc: 'HTTP server written in raw assembly.',
  },
  {
    name: 'ept',
    stack: ['Rust', 'CLI'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/expense-tracker-rust-cli',
    desc: 'Simple CLI for tracking expenses.',
  },
  {
    name: 'yume',
    stack: ['Tauri', 'Productivity'],
    status: 'Active',
    url: '',
    desc: 'Tauri app for task and habit tracking.',
  },
  {
    name: 'btc-predictor',
    stack: ['ML', 'Crypto'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/btc-predictor',
    desc: 'Crypto price prediction experiments.',
  },
  {
    name: 'go-bank',
    stack: ['Go', 'Backend'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/go-bank',
    desc: 'Banking backend in Go.',
  },
  {
    name: 'go-git',
    stack: ['Go', 'Git'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/go-git',
    desc: 'Git from scratch in Go.',
  },
  {
    name: 'MNIST-model',
    stack: ['Deep Learning'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/MNIST-model',
    desc: 'Classic deep learning baseline for digit classification.',
  },
  {
    name: 'pythonizejs',
    stack: ['JavaScript'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/pythonizejs',
    desc: 'Python style utilities for JavaScript developers.',
  },
  {
    name: 'binrs',
    stack: ['Rust', 'CLI'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/binrs',
    desc: 'Binary inspection and encoding CLI tool.',
  },
  {
    name: 'fastapi-app',
    stack: ['Python', 'FastAPI'],
    status: 'Complete',
    url: 'https://github.com/mugiwaraluffy56/fastapi-app',
    desc: 'Minimal backend experimentation with FastAPI.',
  },
  {
    name: 'stella',
    stack: ['Codex', 'Harness'],
    status: 'Fork',
    url: 'https://github.com/mugiwaraluffy56/stella',
    desc: 'Codex harness tweaks to fix token explosion and control context.',
  },
  {
    name: 'nolip',
    stack: ['Visual Search', 'AI'],
    status: 'Future',
    url: 'https://github.com/mugiwaraluffy56/nolip',
    desc: 'Conversational visual search engine.',
  },
  {
    name: 'manu',
    stack: ['AGI', 'Research'],
    status: 'Future',
    url: '',
    desc: 'Experiment in growing artificial general intelligence from scratch.',
  },
];

const statusColor = {
  Active: { bg: '#000080', fg: '#ffffff' },
  Complete: { bg: '#006400', fg: '#ffffff' },
  Research: { bg: '#808000', fg: '#ffffff' },
  Fork: { bg: '#800080', fg: '#ffffff' },
  Future: { bg: '#404040', fg: '#ffffff' },
};

const ROW_HOVER = '#dde8ff';

export default function ProjectsContent() {
  return (
    <div style={{ fontFamily: '"MS Sans Serif", Arial, sans-serif', fontSize: 13 }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '170px 160px 1fr 68px',
        background: '#c0c0c0', borderBottom: '2px solid #808080',
        padding: '3px 6px', fontWeight: 'bold', fontSize: 12,
      }}>
        <span>Name</span><span>Stack</span><span>Description</span><span>Status</span>
      </div>

      {projects.map((p, i) => {
        const row = (
          <div
            style={{
              display: 'grid', gridTemplateColumns: '170px 160px 1fr 68px',
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
        );

        if (!p.url) return <div key={p.name}>{row}</div>;
        return (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {row}
          </a>
        );
      })}

      <div style={{ padding: '6px 6px', fontSize: 11, color: '#808080', borderTop: '1px solid #ccc' }}>
        {projects.length} projects from the current README profile
      </div>
    </div>
  );
}
