import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com/mugiwaraluffy56',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/puneethaditya/',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'Email',
        href: 'mailto:myakampuneeth@gmail.com',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
            </svg>
        ),
    },
];

export default function Contact() {
    const sectionRef = useRef(null);
    const labelRef = useRef(null);
    const headingRef = useRef(null);
    const subRef = useRef(null);
    const linksRef = useRef(null);
    const quoteRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    once: true,
                },
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
                .fromTo(subRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
                    '-=0.3'
                )
                .fromTo(linksRef.current.querySelectorAll('.social-link'),
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
                    '-=0.2'
                )
                .fromTo(quoteRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 1, ease: 'power2.out' },
                    '-=0.2'
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{
                padding: 'var(--section-pad) 0',
                borderTop: '1px solid var(--border)',
                paddingBottom: 80,
            }}
        >
            <div className="container">
                <div ref={labelRef} className="section-label">07 — Den Den Mushi</div>
                <h2 ref={headingRef} style={{
                    fontSize: 'clamp(36px, 5vw, 64px)',
                    fontWeight: 800,
                    marginBottom: 20,
                    maxWidth: 700,
                }}>
                    Let's <span style={{ color: 'var(--red)' }}>Connect</span>
                </h2>

                <p ref={subRef} style={{
                    fontSize: 'clamp(15px, 1.5vw, 18px)',
                    color: 'var(--text-secondary)',
                    maxWidth: 520,
                    lineHeight: 1.7,
                    fontWeight: 300,
                    marginBottom: 48,
                }}>
                    Looking for a crewmate? Got a project idea? Want to talk about One Piece?
                    Drop a message through any of these channels — I don't bite (much).
                </p>

                {/* Social links */}
                <div ref={linksRef} style={{
                    display: 'flex',
                    gap: 16,
                    flexWrap: 'wrap',
                    marginBottom: 80,
                }}>
                    {socials.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target={social.href.startsWith('mailto') ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            className="social-link"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 14,
                                padding: '16px 28px',
                                background: 'var(--bg-1)',
                                border: '1px solid var(--border)',
                                borderRadius: 2,
                                transition: 'border-color 0.3s, transform 0.2s, background 0.3s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(220,20,60,0.4)';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.background = 'var(--bg-2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.background = 'var(--bg-1)';
                            }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', opacity: 0.85 }}>{social.icon}</span>
                            <div>
                                <div style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: 'var(--text-primary)',
                                    lineHeight: 1.2,
                                    marginBottom: 2,
                                }}>{social.label}</div>
                                <div style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: 11,
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.05em',
                                }}>↗ open</div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Closing quote */}
                <div ref={quoteRef} style={{
                    borderLeft: '2px solid var(--red)',
                    paddingLeft: 20,
                    maxWidth: 500,
                    marginBottom: 60,
                }}>
                    <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 14,
                        color: 'var(--text-muted)',
                        fontStyle: 'italic',
                        lineHeight: 1.7,
                    }}>
                        "When do you think people die? When a bullet pierces his heart? No.
                        A man dies when he is forgotten."
                    </p>
                    <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--text-muted)',
                        marginTop: 8,
                        letterSpacing: '0.1em',
                    }}>
                        — Dr. Hiluluk
                    </p>
                </div>

                {/* Footer */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 32,
                    borderTop: '1px solid var(--border)',
                    flexWrap: 'wrap',
                    gap: 16,
                }}>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        color: 'var(--text-muted)',
                    }}>
                        © {new Date().getFullYear()} Puneeth Aditya
                    </span>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        color: 'var(--text-muted)',
                    }}>
                        Built with ⚔️ and determination
                    </span>
                    <a
                        href="#hero"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 12,
                            color: 'var(--text-secondary)',
                            transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--red)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        ↑ Back to top
                    </a>
                </div>
            </div>
        </section>
    );
}
