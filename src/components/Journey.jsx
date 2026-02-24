import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    {
        year: '2021',
        island: 'Dawn Island',
        title: 'The Beginning',
        description: 'Started my voyage into the world of programming. First lines of Python, first "Hello World" — the dream was born.',
        side: 'left',
        color: 'var(--red)',
    },
    {
        year: '2022',
        island: 'Shells Town',
        title: 'B.Tech — Computer Science',
        description: 'Enrolled in B.Tech CS. Learned data structures, algorithms, and OOP — assembling the crew of fundamentals.',
        side: 'right',
        color: 'var(--gold)',
    },
    {
        year: '2023',
        island: 'Baratie',
        title: 'Full Stack Awakening',
        description: 'Built my first full-stack projects with React & Node.js. Deployed to the cloud. Tasted the thrill of shipping real products.',
        side: 'left',
        color: '#4a9eff',
    },
    {
        year: '2024',
        island: 'Water 7',
        title: 'AI/ML Deep Dive',
        description: 'Dove into Machine Learning, TensorFlow, PyTorch. Built ML-assisted systems and intelligent applications. The Grand Line gets real.',
        side: 'right',
        color: '#9d4edd',
    },
    {
        year: '2025',
        island: 'Sabaody Archipelago',
        title: 'Current Position',
        description: 'Open source contributions, advanced projects, building a portfolio that slaps. Preparing for the New World of professional development.',
        side: 'left',
        color: 'var(--red)',
    },
    {
        year: '20XX',
        island: 'Laugh Tale',
        title: 'The Dream — One Piece',
        description: 'Become a world-class engineer. Build products that change lives. Find the One Piece of perfect code. The adventure never ends.',
        side: 'right',
        color: 'var(--gold)',
    },
];

function MilestoneCard({ milestone, index }) {
    const cardRef = useRef(null);
    const isLeft = milestone.side === 'left';

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { x: isLeft ? -60 : 60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 82%',
                    once: true,
                },
            }
        );
    }, [isLeft]);

    return (
        <div
            ref={cardRef}
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: 0,
                alignItems: 'center',
                marginBottom: 0,
                opacity: 0,
            }}
        >
            {/* Left content */}
            <div style={{
                padding: '32px 28px',
                textAlign: isLeft ? 'right' : 'left',
            }}>
                {isLeft && (
                    <CardContent milestone={milestone} align="right" />
                )}
            </div>

            {/* Center line + dot */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
            }}>
                <div style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: 'var(--bg-0)',
                    border: `2px solid ${milestone.color}`,
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: `0 0 12px ${milestone.color}40`,
                }} />
            </div>

            {/* Right content */}
            <div style={{
                padding: '32px 28px',
                textAlign: isLeft ? 'left' : 'left',
            }}>
                {!isLeft && (
                    <CardContent milestone={milestone} align="left" />
                )}
            </div>
        </div>
    );
}

function CardContent({ milestone, align }) {
    return (
        <div style={{ maxWidth: 380, marginLeft: align === 'right' ? 'auto' : 0 }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 12,
                justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
            }}>
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: milestone.color,
                }}>
                    {milestone.year}
                </span>
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em',
                }}>
                    — {milestone.island}
                </span>
            </div>
            <h3 style={{
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 8,
                textAlign: align,
            }}>{milestone.title}</h3>
            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                textAlign: align,
            }}>{milestone.description}</p>
        </div>
    );
}

export default function Journey() {
    const sectionRef = useRef(null);
    const labelRef = useRef(null);
    const headingRef = useRef(null);
    const lineRef = useRef(null);

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

            // Animate the vertical line growing down
            gsap.fromTo(lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: lineRef.current,
                        start: 'top 80%',
                        once: true,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="journey"
            ref={sectionRef}
            style={{
                padding: 'var(--section-pad) 0',
                borderTop: '1px solid var(--border)',
            }}
        >
            <div className="container">
                <div ref={labelRef} className="section-label">03 — Grand Line</div>
                <h2 ref={headingRef} style={{
                    fontSize: 'clamp(36px, 4vw, 52px)',
                    fontWeight: 800,
                    marginBottom: 60,
                }}>
                    The <span style={{ color: 'var(--red)' }}>Voyage</span>
                </h2>

                {/* Timeline */}
                <div style={{ position: 'relative' }}>
                    {/* Vertical line */}
                    <div
                        ref={lineRef}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            bottom: 0,
                            width: 1,
                            background: 'linear-gradient(to bottom, var(--red), var(--gold), transparent)',
                            transform: 'translateX(-50%)',
                            transformOrigin: 'top',
                        }}
                    />

                    {milestones.map((m, i) => (
                        <MilestoneCard key={i} milestone={m} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
