import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const orgs = [
    {
        name: 'Aathoos',
        role: 'Maintainer',
        href: 'https://github.com/aathoos',
        color: 'var(--red)',
    },
    {
        name: 'MOFA-org',
        role: 'Contributor',
        href: 'https://github.com/mofa-org',
        color: 'var(--gold)',
    },
    {
        name: 'LLVM',
        role: 'Contributor',
        href: 'https://github.com/llvm',
        color: '#4a9eff',
    },
    {
        name: 'Inspektor Gadget',
        role: 'Contributor',
        href: 'https://github.com/inspektor-gadget',
        color: '#9d4edd',
    },
];

const latestPRs = [
    {
        repo: 'llvm/llvm-project',
        title: 'Fix handling of edge cases in IR pass',
        number: '#',
        status: 'merged',
        href: 'https://github.com/llvm',
    },
    {
        repo: 'inspektor-gadget/inspektor-gadget',
        title: 'Improve eBPF tracing output format',
        number: '#',
        status: 'open',
        href: 'https://github.com/inspektor-gadget',
    },
    {
        repo: 'mofa-org/mofa',
        title: 'Add new module support and docs',
        number: '#',
        status: 'merged',
        href: 'https://github.com/mofa-org',
    },
    {
        repo: 'aathoos/core',
        title: 'Refactor auth middleware and tests',
        number: '#',
        status: 'merged',
        href: 'https://github.com/aathoos',
    },
];

function StatusDot({ status }) {
    const color = status === 'merged' ? '#9d4edd' : '#27c93f';
    const label = status === 'merged' ? 'Merged' : 'Open';
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: color,
        }}>
            <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: color,
                display: 'inline-block',
            }} />
            {label}
        </span>
    );
}

export default function OpenSource() {
    const sectionRef = useRef(null);
    const labelRef = useRef(null);
    const headingRef = useRef(null);
    const orgsRef = useRef(null);
    const prsRef = useRef(null);

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
                .fromTo(orgsRef.current.querySelectorAll('.org-card'),
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
                    '-=0.3'
                )
                .fromTo(prsRef.current.querySelectorAll('.pr-row'),
                    { x: 30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out' },
                    '-=0.2'
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="opensource"
            ref={sectionRef}
            style={{
                padding: 'var(--section-pad) 0',
                borderTop: '1px solid var(--border)',
            }}
        >
            <div className="container">
                <div ref={labelRef} className="section-label">06 — Open Source</div>
                <h2 ref={headingRef} style={{
                    fontSize: 'clamp(36px, 4vw, 52px)',
                    fontWeight: 800,
                    marginBottom: 48,
                }}>
                    Contributing to the <span style={{ color: 'var(--red)' }}>Fleet</span>
                </h2>

                {/* Org cards */}
                <div ref={orgsRef} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: 16,
                    marginBottom: 48,
                }}>
                    {orgs.map((org) => (
                        <a
                            key={org.name}
                            href={org.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="org-card"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '20px 24px',
                                border: '1px solid var(--border)',
                                borderRadius: 2,
                                transition: 'border-color 0.3s, transform 0.2s, background 0.2s',
                                textDecoration: 'none',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = `${org.color}50`;
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.background = 'var(--bg-2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <div>
                                <div style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 17,
                                    fontWeight: 600,
                                    color: 'var(--text-primary)',
                                    marginBottom: 4,
                                }}>{org.name}</div>
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: 10,
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    color: org.color,
                                }}>{org.role}</span>
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: 12,
                                color: 'var(--text-muted)',
                            }}>↗</span>
                        </a>
                    ))}
                </div>

                {/* Latest PRs */}
                <div style={{ marginBottom: 8 }}>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        marginBottom: 20,
                    }}>⚔️ Latest Pull Requests</div>
                </div>

                <div ref={prsRef} style={{
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}>
                    {latestPRs.map((pr, i) => (
                        <a
                            key={i}
                            href={pr.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pr-row"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '180px 1fr auto',
                                gap: 20,
                                alignItems: 'center',
                                padding: '18px 24px',
                                borderBottom: i < latestPRs.length - 1 ? '1px solid var(--border)' : 'none',
                                transition: 'background 0.2s',
                                textDecoration: 'none',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-2)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: 11,
                                color: 'var(--text-muted)',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>{pr.repo}</span>
                            <span style={{
                                fontSize: 14,
                                color: 'var(--text-primary)',
                                fontWeight: 400,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>{pr.title}</span>
                            <StatusDot status={pr.status} />
                        </a>
                    ))}
                </div>

                {/* GitHub profile link */}
                <div style={{
                    marginTop: 32,
                    textAlign: 'center',
                }}>
                    <a
                        href="https://github.com/mugiwaraluffy56"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '12px 32px',
                            border: '1px solid var(--border)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: 12,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--text-secondary)',
                            transition: 'border-color 0.3s, color 0.3s, transform 0.2s',
                            borderRadius: 2,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(220,20,60,0.4)';
                            e.currentTarget.style.color = 'var(--text-primary)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border)';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        View GitHub Profile ↗
                    </a>
                </div>
            </div>
        </section>
    );
}
