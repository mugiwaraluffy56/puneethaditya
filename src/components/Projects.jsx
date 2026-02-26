import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'PythonizeJS',
        description: 'A tool that bridges the gap between Python and JavaScript — bringing Python-style syntax sugar and utilities to the JS ecosystem.',
        tags: ['JavaScript', 'Python', 'Node.js'],
        github: 'https://github.com/mugiwaraluffy56/pythonizejs',
        live: null,
        featured: true,
    },
    {
        title: 'Go-Git',
        description: 'A Git implementation written in Go — low-level version control operations built from scratch. Understanding the plumbing behind the porcelain.',
        tags: ['Go', 'Git', 'CLI'],
        github: 'https://github.com/mugiwaraluffy56/go-git',
        live: null,
        featured: true,
    },
    {
        title: 'Go-Bank',
        description: 'A backend banking service built in Go with RESTful APIs, JWT auth, database transactions, and clean architecture patterns.',
        tags: ['Go', 'PostgreSQL', 'REST', 'Docker'],
        github: 'https://github.com/mugiwaraluffy56/go-bank',
        live: null,
        featured: true,
    },
    {
        title: 'Shell in Rust',
        description: 'A Unix shell implemented from scratch in Rust — supports command execution, piping, redirection, and built-in commands. Systems programming at its rawest.',
        tags: ['Rust', 'Systems', 'CLI', 'Unix'],
        github: 'https://github.com/mugiwaraluffy56/shell-in-rust',
        live: null,
        featured: true,
    },
];

// Extract "owner/repo" from a GitHub URL
function repoSlug(url) {
    return url.replace('https://github.com/', '');
}

function useGitHubStats(githubUrl) {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (!githubUrl) return;
        const slug = repoSlug(githubUrl);
        fetch(`https://api.github.com/repos/${slug}`)
            .then((r) => r.json())
            .then((data) => {
                if (!data.message) {
                    setStats({
                        stars: data.stargazers_count,
                        forks: data.forks_count,
                        issues: data.open_issues_count,
                        language: data.language,
                        updatedAt: data.pushed_at,
                    });
                }
            })
            .catch(() => { /* silently fail — static data still shows */ });
    }, [githubUrl]);

    return stats;
}

function timeAgo(iso) {
    if (!iso) return null;
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'today';
    if (days === 1) return '1d ago';
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    return `${Math.floor(months / 12)}y ago`;
}

const langColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Go: '#00ADD8',
    Rust: '#dea584',
    C: '#555599',
    'C++': '#f34b7d',
    Shell: '#89e051',
    HTML: '#e34c26',
    CSS: '#563d7c',
};

function ProjectCard({ project, index }) {
    const cardRef = useRef(null);
    const stats = useGitHubStats(project.github);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                delay: index * 0.08,
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 85%',
                    once: true,
                },
            }
        );
    }, [index]);

    return (
        <div
            ref={cardRef}
            style={{
                background: 'var(--bg-1)',
                border: `1px solid ${project.featured ? 'rgba(220,20,60,0.15)' : 'var(--border)'}`,
                padding: '32px 28px',
                borderRadius: 2,
                transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                opacity: 0,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(220,20,60,0.4)';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(220,20,60,0.08)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = project.featured ? 'rgba(220,20,60,0.15)' : 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Featured badge */}
            {project.featured && (
                <div style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--red)',
                    padding: '3px 8px',
                    border: '1px solid rgba(220,20,60,0.3)',
                    borderRadius: 2,
                }}>
                    ★ Featured
                </div>
            )}

            {/* Header */}
            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: 12,
            }}>
                ◆ Project #{String(index + 1).padStart(2, '0')}
            </div>

            <h3 style={{
                fontSize: 22,
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 12,
                lineHeight: 1.2,
            }}>{project.title}</h3>

            <p style={{
                fontSize: 14,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: 20,
                flex: 1,
            }}>{project.description}</p>

            {/* Tags */}
            <div style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                marginBottom: 20,
            }}>
                {project.tags.map((tag) => (
                    <span key={tag} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--gold)',
                        padding: '3px 10px',
                        border: '1px solid var(--gold-dim)',
                        borderRadius: 2,
                    }}>{tag}</span>
                ))}
            </div>

            {/* Live GitHub stats */}
            {stats && (
                <div style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                    marginBottom: 16,
                    flexWrap: 'wrap',
                }}>
                    {/* Language */}
                    {stats.language && (
                        <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                            fontFamily: 'var(--font-mono)',
                            fontSize: 11,
                            color: 'var(--text-muted)',
                        }}>
                            <span style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: langColors[stats.language] || '#888',
                                flexShrink: 0,
                            }} />
                            {stats.language}
                        </span>
                    )}

                    {/* Stars */}
                    <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--text-muted)',
                    }}>
                        ★ {stats.stars}
                    </span>

                    {/* Forks */}
                    <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--text-muted)',
                    }}>
                        ⑂ {stats.forks}
                    </span>

                    {/* Issues */}
                    {stats.issues > 0 && (
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 11,
                            color: 'var(--text-muted)',
                        }}>
                            ◎ {stats.issues} open
                        </span>
                    )}

                    {/* Last push */}
                    {stats.updatedAt && (
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 11,
                            color: 'var(--text-muted)',
                            marginLeft: 'auto',
                        }}>
                            {timeAgo(stats.updatedAt)}
                        </span>
                    )}
                </div>
            )}

            {/* Skeleton while loading */}
            {!stats && (
                <div style={{
                    display: 'flex',
                    gap: 12,
                    marginBottom: 16,
                }}>
                    {[40, 28, 28].map((w, i) => (
                        <div key={i} style={{
                            height: 10,
                            width: w,
                            background: 'var(--bg-3)',
                            borderRadius: 2,
                            animation: 'shimmer 1.5s ease-in-out infinite',
                        }} />
                    ))}
                </div>
            )}

            {/* Links */}
            <div style={{
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                paddingTop: 16,
                borderTop: '1px solid var(--border)',
            }}>
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 12,
                            color: 'var(--text-secondary)',
                            transition: 'color 0.2s',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        GitHub ↗
                    </a>
                )}
                {project.live && (
                    <a
                        href={project.live}
                        target={project.live.startsWith('#') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 12,
                            color: 'var(--red)',
                            transition: 'opacity 0.2s',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        Live Demo →
                    </a>
                )}
            </div>
        </div>
    );
}

export default function Projects() {
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
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            style={{
                padding: 'var(--section-pad) 0',
                borderTop: '1px solid var(--border)',
            }}
        >
            <div className="container">
                <div ref={labelRef} className="section-label">05 — Bounty Board</div>
                <h2 ref={headingRef} style={{
                    fontSize: 'clamp(36px, 4vw, 52px)',
                    fontWeight: 800,
                    marginBottom: 60,
                }}>
                    Featured <span style={{ color: 'var(--red)' }}>Projects</span>
                </h2>

                <div className="projects-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 20,
                }}>
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </div>

                <div style={{ marginTop: 48, textAlign: 'center' }}>
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
                        View All on GitHub ↗
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes shimmer {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.7; }
                }
            `}</style>
        </section>
    );
}
