import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GITHUB_USERNAME = 'mugiwaraluffy56';

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
        name: 'Inspektor Gadget',
        role: 'Contributor',
        href: 'https://github.com/inspektor-gadget',
        color: '#9d4edd',
    },
    {
        name: 'LLVM',
        role: 'Contributor',
        href: 'https://github.com/llvm',
        color: '#4a9eff',
    },
];

function StatusDot({ status }) {
    const colorMap = {
        merged: '#9d4edd',
        open: '#27c93f',
        closed: 'var(--red)',
    };
    const color = colorMap[status] || 'var(--text-muted)';
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
            flexShrink: 0,
        }}>
            <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: color,
                display: 'inline-block',
            }} />
            {status}
        </span>
    );
}

function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
}

export default function OpenSource() {
    const sectionRef = useRef(null);
    const labelRef = useRef(null);
    const headingRef = useRef(null);
    const orgsRef = useRef(null);
    const prsRef = useRef(null);
    const [prs, setPrs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Fetch latest PRs from GitHub
    useEffect(() => {
        async function fetchPRs() {
            try {
                const res = await fetch(
                    `https://api.github.com/search/issues?q=type:pr+author:${GITHUB_USERNAME}&sort=updated&order=desc&per_page=6`,
                    { headers: { 'Accept': 'application/vnd.github.v3+json' } }
                );
                if (!res.ok) throw new Error('GitHub API error');
                const data = await res.json();
                const mapped = (data.items || []).map((item) => {
                    // Extract repo from URL: https://api.github.com/repos/owner/repo/...
                    const repoMatch = item.repository_url?.match(/repos\/(.+)$/);
                    const repo = repoMatch ? repoMatch[1] : 'unknown';
                    let status = 'open';
                    if (item.pull_request?.merged_at) status = 'merged';
                    else if (item.state === 'closed') status = 'closed';
                    return {
                        repo,
                        title: item.title,
                        number: `#${item.number}`,
                        status,
                        href: item.html_url,
                        updatedAt: item.updated_at,
                    };
                });
                setPrs(mapped);
            } catch (e) {
                console.error('Failed to fetch PRs:', e);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchPRs();
    }, []);

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
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animate PR rows after loading
    useEffect(() => {
        if (!loading && prs.length > 0 && prsRef.current) {
            gsap.fromTo(prsRef.current.querySelectorAll('.pr-row'),
                { x: 30, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out' }
            );
        }
    }, [loading, prs]);

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

                {/* Latest PRs — Live from GitHub */}
                <div style={{ marginBottom: 8 }}>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        marginBottom: 20,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                    }}>
                        Latest Pull Requests
                        <span style={{
                            display: 'inline-block',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: loading ? 'var(--text-muted)' : '#27c93f',
                            animation: loading ? 'none' : undefined,
                        }} />
                        <span style={{
                            fontSize: 9,
                            color: 'var(--text-muted)',
                            textTransform: 'lowercase',
                            letterSpacing: '0.05em',
                        }}>
                            {loading ? 'fetching...' : 'live from github'}
                        </span>
                    </div>
                </div>

                <div ref={prsRef} style={{
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}>
                    {loading ? (
                        // Loading skeleton
                        [...Array(4)].map((_, i) => (
                            <div key={i} style={{
                                padding: '18px 24px',
                                borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                                display: 'flex',
                                gap: 20,
                                alignItems: 'center',
                            }}>
                                <div style={{ width: 140, height: 12, background: 'var(--bg-2)', borderRadius: 2 }} />
                                <div style={{ flex: 1, height: 12, background: 'var(--bg-2)', borderRadius: 2 }} />
                                <div style={{ width: 60, height: 12, background: 'var(--bg-2)', borderRadius: 2 }} />
                            </div>
                        ))
                    ) : error ? (
                        <div style={{
                            padding: '32px 24px',
                            textAlign: 'center',
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: 12,
                        }}>
                            failed to load — check out my{' '}
                            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--red)' }}>
                                GitHub
                            </a>{' '}
                            directly
                        </div>
                    ) : prs.length === 0 ? (
                        <div style={{
                            padding: '32px 24px',
                            textAlign: 'center',
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: 12,
                        }}>
                            no public PRs found
                        </div>
                    ) : (
                        prs.map((pr, i) => (
                            <a
                                key={pr.href}
                                href={pr.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pr-row"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '160px 1fr auto auto',
                                    gap: 16,
                                    alignItems: 'center',
                                    padding: '16px 24px',
                                    borderBottom: i < prs.length - 1 ? '1px solid var(--border)' : 'none',
                                    transition: 'background 0.2s',
                                    textDecoration: 'none',
                                    opacity: 0,
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
                                    fontSize: 13,
                                    color: 'var(--text-primary)',
                                    fontWeight: 400,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}>
                                    <span style={{ color: 'var(--text-muted)', marginRight: 6 }}>{pr.number}</span>
                                    {pr.title}
                                </span>
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: 10,
                                    color: 'var(--text-muted)',
                                    flexShrink: 0,
                                }}>{timeAgo(pr.updatedAt)}</span>
                                <StatusDot status={pr.status} />
                            </a>
                        ))
                    )}
                </div>

                {/* GitHub profile link */}
                <div style={{
                    marginTop: 32,
                    textAlign: 'center',
                }}>
                    <a
                        href={`https://github.com/${GITHUB_USERNAME}`}
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
