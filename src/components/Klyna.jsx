import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Klyna() {
    const sectionRef = useRef(null);
    const labelRef = useRef(null);
    const headingRef = useRef(null);
    const descRef = useRef(null);
    const featuresRef = useRef(null);
    const ctaRef = useRef(null);

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
                .fromTo(descRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
                    '-=0.3'
                )
                .fromTo(featuresRef.current.querySelectorAll('.feature-card'),
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
                    '-=0.2'
                )
                .fromTo(ctaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
                    '-=0.2'
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="klyna"
            ref={sectionRef}
            style={{
                padding: 'var(--section-pad) 0',
                borderTop: '1px solid var(--border)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Subtle red glow */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(220,20,60,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
                borderRadius: '50%',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div ref={labelRef} className="section-label">
                    <span style={{ color: 'var(--red)' }}>◆</span> Founder
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'clamp(40px, 6vw, 80px)',
                    alignItems: 'start',
                    marginBottom: 60,
                }}>
                    {/* Left — Hero text */}
                    <div>
                        <h2 ref={headingRef} style={{
                            fontSize: 'clamp(40px, 5vw, 64px)',
                            fontWeight: 800,
                            marginBottom: 24,
                            lineHeight: 1.05,
                        }}>
                            <span style={{ color: 'var(--red)' }}>klyna</span><span style={{ color: 'var(--text-muted)' }}>.io</span>
                        </h2>

                        <div ref={descRef}>
                            <p style={{
                                fontSize: 'clamp(15px, 1.5vw, 17px)',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.8,
                                marginBottom: 20,
                                maxWidth: 480,
                                fontWeight: 300,
                            }}>
                                We're building an API monitoring platform that helps B2B SaaS and online businesses
                                track, analyze, and optimize their API performance in real time.
                            </p>
                            <p style={{
                                fontSize: 14,
                                color: 'var(--text-secondary)',
                                lineHeight: 1.8,
                                marginBottom: 32,
                                maxWidth: 480,
                            }}>
                                Instead of just measuring uptime, we provide deep visibility into latency, error rates,
                                usage patterns, and reliability metrics — so teams can detect issues early and prevent
                                failures before customers are affected.
                            </p>

                            {/* Mission */}
                            <div style={{
                                borderLeft: '2px solid var(--red)',
                                paddingLeft: 16,
                                marginBottom: 32,
                            }}>
                                <p style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: 13,
                                    color: 'var(--text-muted)',
                                    fontStyle: 'italic',
                                    lineHeight: 1.6,
                                }}>
                                    Our mission: turn complex API activity into clear, actionable insights that
                                    improve performance, strengthen reliability, and protect revenue.
                                </p>
                            </div>

                            {/* CTAs */}
                            <div ref={ctaRef} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                                <a
                                    href="https://klyna.io"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '12px 24px',
                                        background: 'var(--red)',
                                        color: '#fff',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: 12,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        transition: 'transform 0.2s, box-shadow 0.2s',
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
                                    Visit klyna.io ↗
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/klyna-io"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '11px 24px',
                                        border: '1px solid rgba(220,20,60,0.3)',
                                        color: 'var(--text-secondary)',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: 12,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        borderRadius: 2,
                                        transition: 'border-color 0.2s, color 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--red)';
                                        e.currentTarget.style.color = 'var(--text-primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(220,20,60,0.3)';
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                    }}
                                >
                                    LinkedIn ↗
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right — What klyna does */}
                    <div ref={featuresRef}>
                        <div style={{
                            border: '1px solid var(--border)',
                            borderRadius: 2,
                            overflow: 'hidden',
                        }}>
                            {[
                                { label: 'Real-Time Monitoring', desc: 'Track latency, error rates, and usage patterns as they happen.' },
                                { label: 'Deep API Visibility', desc: 'Go beyond uptime — understand reliability metrics and response patterns.' },
                                { label: 'Early Issue Detection', desc: 'Detect issues before customers are affected. Prevent failures, protect revenue.' },
                                { label: 'Actionable Insights', desc: 'Turn complex API activity into clear dashboards your team can act on.' },
                            ].map((item, i) => (
                                <div
                                    key={item.label}
                                    className="feature-card"
                                    style={{
                                        padding: '20px 24px',
                                        borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                                        transition: 'background 0.2s',
                                        display: 'grid',
                                        gridTemplateColumns: '32px 1fr',
                                        gap: 16,
                                        alignItems: 'start',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-2)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <span style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: 11,
                                        color: 'var(--red)',
                                        letterSpacing: '0.1em',
                                        paddingTop: 2,
                                    }}>0{i + 1}</span>
                                    <div>
                                        <div style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            color: 'var(--text-primary)',
                                            marginBottom: 4,
                                        }}>{item.label}</div>
                                        <div style={{
                                            fontSize: 13,
                                            color: 'var(--text-muted)',
                                            lineHeight: 1.5,
                                        }}>{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
