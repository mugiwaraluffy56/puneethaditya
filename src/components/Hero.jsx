import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollHintRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(gridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: 'power2.out' }
    )
    .fromTo(subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=1.5'
    )
    .fromTo(headingRef.current.querySelectorAll('.word'),
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.9, ease: 'power4.out', stagger: 0.07 },
      '-=0.4'
    )
    .fromTo(descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(ctaRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      '-=0.2'
    );

    // Subtle parallax on scroll
    gsap.to(headingRef.current, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Scroll hint bounce
    gsap.to(scrollHintRef.current.querySelector('.arrow'), {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'power1.inOut',
    });
  }, []);

  const words = ["Code", "Pirate.", "AI/ML", "Explorer."];

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div ref={gridRef} style={{
        position: 'absolute',
        inset: 0,
        opacity: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Red glow blob */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(220,20,60,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 120, paddingBottom: 80 }}>
        {/* Eyebrow */}
        <div ref={subRef} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{
            display: 'inline-block',
            width: 8, height: 8,
            background: 'var(--red)',
            borderRadius: '50%',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          Puneeth Aditya — mugiwaraluffy56
        </div>

        {/* Main heading */}
        <h1
          ref={headingRef}
          style={{
            fontSize: 'clamp(52px, 9vw, 120px)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            marginBottom: 32,
            overflow: 'hidden',
          }}
        >
          {words.map((word, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
              <span
                className="word"
                style={{
                  display: 'inline-block',
                  color: i % 2 === 1 ? 'var(--red)' : 'var(--text-primary)',
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          style={{
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            color: 'var(--text-secondary)',
            maxWidth: 520,
            lineHeight: 1.7,
            marginBottom: 48,
            fontWeight: 300,
          }}
        >
          Navigating the treacherous waters of Machine Learning & Full Stack Development.
          Building things that matter, one commit at a time.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 28px',
              background: 'var(--red)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 500,
              transition: 'transform 0.2s, box-shadow 0.2s',
              borderRadius: 2,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(220,20,60,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            View Projects
          </a>
          <a
            href="https://github.com/mugiwaraluffy56"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '11px 28px',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'border-color 0.2s, color 0.2s',
              borderRadius: 2,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(220,20,60,0.4)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            GitHub ↗
          </a>
        </div>

        {/* Quote */}
        <p style={{
          marginTop: 64,
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          borderLeft: '2px solid var(--red)',
          paddingLeft: 16,
        }}>
          "I don't care what the world thinks. I'm gonna become the King of the Pirates!"
        </p>
      </div>

      {/* Scroll hint */}
      <div ref={scrollHintRef} style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity: 0,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}>
          scroll
        </span>
        <div className="arrow" style={{
          width: 1,
          height: 40,
          background: 'linear-gradient(to bottom, var(--red), transparent)',
        }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
