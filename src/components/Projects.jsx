import { useEffect, useRef } from 'react';
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
];

function ProjectCard({ project, index }) {
    const cardRef = useRef(null);

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
                <div style={{
                    marginTop: 48,
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
                        View All on GitHub ↗
                    </a>
                </div>
            </div>
        </section>
    );
}
