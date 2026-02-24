import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const details = [
  { key: 'Name', value: 'Puneeth Aditya' },
  { key: 'Focus', value: 'ML / Deep Learning' },
  { key: 'Stack', value: 'Python · Go · React · Node.js' },
  { key: 'Location', value: 'India 🇮🇳' },
  { key: 'Building', value: 'Klyna.io' },
  { key: 'Dream', value: 'Find the One Piece of Perfect Code' },
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
  const cardRef = useRef(null);
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
        .fromTo(cardRef.current.querySelectorAll('.detail-row'),
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' },
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
                I'm a B.Tech student charting my course through the vast seas of Machine Learning, Deep Learning, and full-stack development.
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

          {/* Right — Info Panel */}
          <div>
            <div ref={cardRef} style={{
              border: '1px solid var(--border)',
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              {details.map((d, i) => (
                <div
                  key={d.key}
                  className="detail-row"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    borderBottom: i < details.length - 1 ? '1px solid var(--border)' : 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-2)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    flexShrink: 0,
                  }}>{d.key}</span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'var(--text-primary)',
                    textAlign: 'right',
                    fontWeight: 400,
                  }}>{d.value}</span>
                </div>
              ))}
            </div>

            {/* Motto */}
            <div style={{
              marginTop: 24,
              padding: '20px 24px',
              borderLeft: '2px solid var(--red)',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                lineHeight: 1.6,
              }}>
                "A developer's dream NEVER dies!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
