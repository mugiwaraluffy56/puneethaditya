import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'klyna', href: '#klyna' },
  { label: 'Projects', href: '#projects' },
  { label: 'OSS', href: '#opensource' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const progressRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate mobile menu overlay
  useEffect(() => {
    if (!overlayRef.current) return;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      );
      gsap.fromTo(overlayRef.current.querySelectorAll('.mobile-nav-link'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '20px 0',
        transition: 'background 0.4s, backdrop-filter 0.4s, padding 0.4s',
        background: scrolled ? 'rgba(6,6,6,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}>
        {/* Progress bar */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0,
          height: '1px',
          background: 'var(--red)',
          width: '0%',
          transition: 'width 0.1s linear',
        }} ref={progressRef} />

        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <a href="#hero" onClick={(e) => handleClick(e, '#hero')} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <img
              src="https://avatars.githubusercontent.com/u/202161831?s=400&u=642e402b01d285085356f8e58cf5103be4049180&v=4"
              alt="Puneeth Aditya"
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: '1px solid rgba(220,20,60,0.4)',
              }}
            />
          </a>

          {/* Desktop nav links */}
          <ul className="desktop-nav" style={{
            display: 'flex',
            gap: 36,
            listStyle: 'none',
            alignItems: 'center',
          }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: '0.08em',
                    color: 'var(--text-secondary)',
                    transition: 'color 0.2s',
                    textTransform: 'lowercase',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              background: 'none',
              border: 'none',
              padding: 8,
              zIndex: 1002,
            }}
          >
            <span style={{
              display: 'block',
              width: 22,
              height: 1.5,
              background: menuOpen ? 'var(--red)' : 'var(--text-secondary)',
              transition: 'transform 0.3s, background 0.3s',
              transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              transformOrigin: 'center',
            }} />
            <span style={{
              display: 'block',
              width: 22,
              height: 1.5,
              background: menuOpen ? 'transparent' : 'var(--text-secondary)',
              transition: 'opacity 0.2s',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block',
              width: 22,
              height: 1.5,
              background: menuOpen ? 'var(--red)' : 'var(--text-secondary)',
              transition: 'transform 0.3s, background 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              transformOrigin: 'center',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(6,6,6,0.97)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={(e) => handleClick(e, link.href)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                padding: '12px 20px',
                transition: 'color 0.2s',
                textTransform: 'lowercase',
                letterSpacing: '-0.01em',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{
            marginTop: 32,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.2em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
          }}>
            ⚓ Navigate
          </div>
        </div>
      )}
    </>
  );
}
