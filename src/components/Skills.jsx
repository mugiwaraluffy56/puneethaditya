import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    type: 'Logia-Type',
    label: 'Core Languages',
    description: 'Elemental mastery — the foundation of all power',
    color: '#dc143c',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'TypeScript', level: 72 },
      { name: 'Go', level: 55 },
      { name: 'Rust', level: 40 },
    ],
  },
  {
    type: 'Paramecia-Type',
    label: 'Web Development',
    description: 'Reality-altering abilities for building interfaces',
    color: '#c4a24d',
    skills: [
      { name: 'React', level: 82 },
      { name: 'Node.js', level: 75 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Vite', level: 78 },
      { name: 'HTML/CSS', level: 90 },
    ],
  },
  {
    type: 'Zoan-Type',
    label: 'Data & Infrastructure',
    description: 'Shape-shifting power over systems and data',
    color: '#4a9eff',
    skills: [
      { name: 'PostgreSQL', level: 68 },
      { name: 'Docker', level: 60 },
      { name: 'Linux/Bash', level: 75 },
      { name: 'MySQL', level: 65 },
      { name: 'Git/GitHub', level: 85 },
    ],
  },
  {
    type: 'Haki',
    label: 'AI/ML & Data Science',
    description: 'The highest form of power — mastering intelligence',
    color: '#9d4edd',
    skills: [
      { name: 'TensorFlow', level: 65 },
      { name: 'PyTorch', level: 60 },
      { name: 'scikit-learn', level: 72 },
      { name: 'NumPy / Pandas', level: 80 },
      { name: 'Matplotlib', level: 75 },
    ],
  },
];

function SkillBar({ name, level, color, index }) {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(barRef.current,
      { width: 0 },
      {
        width: `${level}%`,
        duration: 1.2,
        ease: 'power3.out',
        delay: index * 0.08,
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 85%',
          once: true,
        }
      }
    );
  }, [level, index]);

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 6,
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}>{name}</span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--text-muted)',
        }}>{level}%</span>
      </div>
      <div style={{
        height: 2,
        background: 'var(--bg-3)',
        borderRadius: 1,
        overflow: 'hidden',
      }}>
        <div ref={barRef} style={{
          height: '100%',
          background: color,
          borderRadius: 1,
          width: 0,
          boxShadow: `0 0 8px ${color}40`,
        }} />
      </div>
    </div>
  );
}

function CategoryCard({ cat, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          once: true,
        }
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{
        background: 'var(--bg-1)',
        border: '1px solid var(--border)',
        padding: '32px 28px',
        transition: 'border-color 0.3s, transform 0.3s',
        borderRadius: 2,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${cat.color}40`;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: cat.color,
          marginBottom: 8,
        }}>
          ◆ {cat.type}
        </div>
        <h3 style={{
          fontSize: 20,
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: 6,
        }}>{cat.label}</h3>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          fontStyle: 'italic',
        }}>{cat.description}</p>
      </div>

      {/* Skills */}
      <div>
        {cat.skills.map((skill, i) => (
          <SkillBar key={skill.name} {...skill} color={cat.color} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([labelRef.current, headingRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: 'var(--section-pad) 0',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <div ref={labelRef} className="section-label">02 — Devil Fruit Powers</div>
        <h2 ref={headingRef} style={{
          fontSize: 'clamp(36px, 4vw, 52px)',
          fontWeight: 800,
          marginBottom: 60,
        }}>
          Tech <span style={{ color: 'var(--red)' }}>Arsenal</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {categories.map((cat, i) => (
            <CategoryCard key={cat.type} cat={cat} index={i} />
          ))}
        </div>

        {/* Tools strip */}
        <div style={{
          marginTop: 48,
          padding: '24px 28px',
          background: 'var(--bg-1)',
          border: '1px solid var(--border)',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
          }}>⚔️ Weapons</span>
          <div style={{ width: 1, height: 16, background: 'var(--border)' }} />
          {['VSCode', 'Vim', 'Neovim', 'Git', 'GitHub', 'Figma', 'Docker'].map((tool) => (
            <span key={tool} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--text-secondary)',
              padding: '4px 10px',
              border: '1px solid var(--border)',
              borderRadius: 2,
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(220,20,60,0.3)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            >{tool}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
