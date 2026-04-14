const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'Rust',       level: 92 },
      { name: 'Go',         level: 88 },
      { name: 'Python',     level: 85 },
      { name: 'C / C++',   level: 78 },
      { name: 'TypeScript', level: 80 },
    ],
  },
  {
    category: 'Systems & Low-level',
    skills: [
      { name: 'LLVM / IR / TableGen',    level: 75 },
      { name: 'SIMD / WebAssembly',      level: 72 },
      { name: 'Async Rust (Tokio/Axum)', level: 88 },
      { name: 'Microkernel design',      level: 68 },
      { name: 'Plugin architectures',    level: 74 },
    ],
  },
  {
    category: 'ML / AI',
    skills: [
      { name: 'PyTorch / TensorFlow', level: 82 },
      { name: 'RAG / LLM APIs',       level: 78 },
      { name: 'scikit-learn / pandas', level: 84 },
      { name: 'Qdrant (vector DB)',    level: 70 },
      { name: 'NumPy / SIMD compute', level: 85 },
    ],
  },
  {
    category: 'Infra & Web',
    skills: [
      { name: 'PostgreSQL / Redis',   level: 82 },
      { name: 'Docker / Kubernetes',  level: 74 },
      { name: 'GitHub Actions / CI',  level: 80 },
      { name: 'React / Vite / REST',  level: 78 },
      { name: 'Linux',                level: 88 },
    ],
  },
];

function SkillBar({ name, level }) {
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, fontSize: 12 }}>
        <span>{name}</span>
        <span style={{ color: '#808080' }}>{level}%</span>
      </div>
      <div className="skill-bar-bg">
        <div className="skill-bar-fill" style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}

export default function SkillsContent() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      {skillGroups.map((group) => (
        <div key={group.category} className="w-field" style={{ padding: 10, background: '#c0c0c0' }}>
          <div style={{ fontWeight: 'bold', marginBottom: 10, borderBottom: '1px solid #808080', paddingBottom: 4, fontSize: 13 }}>
            {group.category}
          </div>
          {group.skills.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} />)}
        </div>
      ))}
    </div>
  );
}
