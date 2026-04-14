const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'Rust', level: 80 },
      { name: 'JavaScript / TypeScript', level: 85 },
      { name: 'C / C++', level: 65 },
      { name: 'Bash / Shell', level: 75 },
    ],
  },
  {
    category: 'ML / AI',
    skills: [
      { name: 'PyTorch', level: 88 },
      { name: 'scikit-learn', level: 82 },
      { name: 'Hugging Face', level: 78 },
      { name: 'LangChain / Dora', level: 70 },
      { name: 'OpenCV', level: 72 },
    ],
  },
  {
    category: 'Web & Frontend',
    skills: [
      { name: 'React', level: 84 },
      { name: 'Vite / Node.js', level: 80 },
      { name: 'HTML / CSS', level: 86 },
      { name: 'GSAP / Framer Motion', level: 72 },
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Docker', level: 74 },
      { name: 'Linux', level: 85 },
      { name: 'VS Code / Vim', level: 88 },
    ],
  },
];

function SkillBar({ name, level }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
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
        <div key={group.category} className="w-field" style={{ padding: 8, background: '#c0c0c0' }}>
          <div style={{ fontWeight: 'bold', marginBottom: 8, borderBottom: '1px solid #808080', paddingBottom: 4 }}>
            {group.category}
          </div>
          {group.skills.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} />)}
        </div>
      ))}
    </div>
  );
}
