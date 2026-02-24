import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com/mugiwaraluffy56',
        icon: '⚓',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/puneethaditya/',
        icon: '🧭',
    },
    {
        label: 'Email',
        href: 'mailto:myakampuneeth@gmail.com',
        icon: '📨',
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
                <div ref={labelRef} className="section-label">05 — Den Den Mushi</div>
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
                                gap: 12,
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
                            <span style={{ fontSize: 18 }}>{social.icon}</span>
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
