import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const codeLines = [
  { indent: 0, type: 'keyword', text: 'class ', extra: { type: 'class', text: 'StrawHatDeveloper' }, end: ':' },
  { indent: 1, type: 'keyword', text: 'def ', extra: { type: 'fn', text: '__init__' }, end: '(self):' },
  { indent: 2, type: 'prop', text: 'self.name', value: '"Puneeth Aditya"' },
  { indent: 2, type: 'prop', text: 'self.role', value: '"AI/ML Student & Aspiring Code Pirate"' },
  { indent: 2, type: 'prop', text: 'self.location', value: '"India 🇮🇳"' },
  { indent: 2, type: 'prop', text: 'self.dream', value: '"Find the One Piece of Perfect Code!"' },
  { indent: 0, type: 'empty' },
  { indent: 1, type: 'keyword', text: 'def ', extra: { type: 'fn', text: 'current_voyage' }, end: '(self):' },
  { indent: 2, type: 'return', text: 'return', value: '"Navigating ML & Full Stack waters"' },
  { indent: 0, type: 'empty' },
  { indent: 1, type: 'keyword', text: 'def ', extra: { type: 'fn', text: 'motto' }, end: '(self):' },
  { indent: 2, type: 'return', text: 'return', value: '"A developer\'s dream NEVER dies!"' },
];

const stats = [
  { label: 'Languages', value: '5+' },
  { label: 'Frameworks', value: '8+' },
  { label: 'Projects', value: 'Growing' },
  { label: 'Cups of Coffee', value: '∞' },
];

export default function About() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const codeRef = useRef(null);
  const statsRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        }
      });

      tl.fromTo(labelRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(codeRef.current.querySelectorAll('.code-line'),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(statsRef.current.querySelectorAll('.stat-item'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderLine = (line, i) => {
    if (line.type === 'empty') return <div key={i} className="code-line" style={{ height: 12 }} />;

    const indent = '  '.repeat(line.indent);
    return (
      <div key={i} className="code-line" style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        lineHeight: 1.7,
        color: 'var(--text-secondary)',
      }}>
        <span style={{ color: 'var(--text-muted)', userSelect: 'none', marginRight: 20, minWidth: 20, display: 'inline-block', textAlign: 'right', fontSize: 11 }}>{i + 1}</span>
        <span style={{ whiteSpace: 'pre' }}>{indent}</span>
        {line.type === 'keyword' && <span style={{ color: '#569cd6' }}>{line.text}</span>}
        {line.extra && line.type === 'keyword' && (
          <span style={{ color: line.extra.type === 'class' ? '#4ec9b0' : '#dcdcaa' }}>{line.extra.text}</span>
        )}
        {line.end && <span style={{ color: 'var(--text-muted)' }}>{line.end}</span>}
        {line.type === 'prop' && (
          <>
            <span style={{ color: '#9cdcfe' }}>{line.text}</span>
            <span style={{ color: 'var(--text-muted)' }}> = </span>
            <span style={{ color: '#ce9178' }}>{line.value}</span>
          </>
        )}
        {line.type === 'return' && (
          <>
            <span style={{ color: '#c586c0' }}>{line.text} </span>
            <span style={{ color: '#ce9178' }}>{line.value}</span>
          </>
        )}
      </div>
    );
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: 'var(--section-pad) 0',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}>
          {/* Left */}
          <div>
            <div ref={labelRef} className="section-label">01 — About</div>
            <h2 ref={headingRef} style={{
              fontSize: 'clamp(36px, 4vw, 52px)',
              marginBottom: 24,
              fontWeight: 800,
            }}>
              Captain's<br />
              <span style={{ color: 'var(--red)' }}>Log</span>
            </h2>
            <div ref={textRef}>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: 15,
                lineHeight: 1.8,
                marginBottom: 16,
                maxWidth: 440,
              }}>
                I'm a B.Tech student charting my course through the vast seas of AI/ML and full-stack development.
                Currently at the Sabaody Archipelago of my journey — strong foundations built, greater adventures ahead.
              </p>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: 15,
                lineHeight: 1.8,
                maxWidth: 440,
                marginBottom: 40,
              }}>
                My dream isn't to build just software — it's to build things that outlive me.
                Code that solves real problems, shipped with the determination of a pirate king.
              </p>
            </div>

            {/* Stats grid */}
            <div ref={statsRef} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1,
              border: '1px solid var(--border)',
            }}>
              {stats.map((s, i) => (
                <div key={i} className="stat-item" style={{
                  padding: '24px 20px',
                  borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                  borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 32,
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    lineHeight: 1,
                    marginBottom: 6,
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Code block */}
          <div>
            <div ref={codeRef} style={{
              background: 'var(--bg-2)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              overflow: 'hidden',
            }}>
              {/* Window chrome */}
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--bg-3)',
              }}>
                {['#ff5f56','#ffbd2e','#27c93f'].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
                ))}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  marginLeft: 8,
                }}>captain_log.py</span>
              </div>
              {/* Code */}
              <div style={{ padding: '20px 16px 24px' }}>
                {codeLines.map(renderLine)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
