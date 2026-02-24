import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'ML License Detection System',
        description: 'Full-stack ML-assisted license detection system with multi-stage processing pipeline — TF-IDF, BERT, regex scanning, and a hybrid decision engine. Frontend + Backend.',
        tags: ['Python', 'TensorFlow', 'React', 'Node.js'],
        github: 'https://github.com/mugiwaraluffy56',
        live: null,
        featured: true,
    },
    {
        title: 'Vision-Language Infrastructure Inspector',
        description: 'AI-powered infrastructure inspection using Vision-Language models. Beautiful Three.js frontend with Lenis scrolling and GSAP animations.',
        tags: ['Python', 'Three.js', 'React', 'AI/ML'],
        github: 'https://github.com/mugiwaraluffy56',
        live: null,
        featured: true,
    },
    {
        title: 'Portfolio — Code Pirate',
        description: 'This very site! One Piece themed developer portfolio built with React, GSAP, and Lenis smooth scroll. Pure vibes.',
        tags: ['React', 'GSAP', 'Lenis', 'Vite'],
        github: 'https://github.com/mugiwaraluffy56',
        live: '#hero',
        featured: false,
    },
    {
        title: 'AI Chatbot Engine',
        description: 'Conversational AI engine with context retention and multi-turn dialogue capabilities. Built with modern NLP techniques.',
        tags: ['Python', 'NLP', 'FastAPI', 'React'],
        github: 'https://github.com/mugiwaraluffy56',
        live: null,
        featured: false,
    },
    {
        title: 'Real-Time Data Dashboard',
        description: 'Live data visualization dashboard with WebSocket streaming, interactive charts, and responsive dark-mode UI.',
        tags: ['React', 'WebSocket', 'D3.js', 'Node.js'],
        github: 'https://github.com/mugiwaraluffy56',
        live: null,
        featured: false,
    },
    {
        title: 'CLI Task Manager — Nakama',
        description: 'Minimal, blazing-fast command-line task manager with priority queuing, tags, and deadline tracking. Inspired by the crew.',
        tags: ['Python', 'Click', 'SQLite'],
        github: 'https://github.com/mugiwaraluffy56',
        live: null,
        featured: false,
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
                <div ref={labelRef} className="section-label">04 — Bounty Board</div>
                <h2 ref={headingRef} style={{
                    fontSize: 'clamp(36px, 4vw, 52px)',
                    fontWeight: 800,
                    marginBottom: 60,
                }}>
                    Featured <span style={{ color: 'var(--red)' }}>Projects</span>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 20,
                }}>
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </div>

                {/* GitHub CTA */}
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
