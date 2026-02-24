import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
    const overlayRef = useRef(null);
    const barFillRef = useRef(null);
    const labelRef = useRef(null);
    const quoteRef = useRef(null);
    const authorRef = useRef(null);
    const barTrackRef = useRef(null);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const counter = { val: 0 };

        const tl = gsap.timeline({
            onComplete: () => {
                // The loading bar expands to become a full-width line
                gsap.to(barTrackRef.current, {
                    width: '100vw',
                    duration: 0.4,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        // Then the overlay slides up, with the line as the bottom edge
                        gsap.to(overlayRef.current, {
                            yPercent: -100,
                            duration: 0.5,
                            ease: 'power2.inOut',
                            onComplete,
                        });
                    },
                });
            },
        });

        // Label fades in
        tl.fromTo(labelRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        )
            // Bar fills + counter
            .to(counter, {
                val: 100,
                duration: 2,
                ease: 'power2.inOut',
                onUpdate: () => {
                    const v = Math.floor(counter.val);
                    setPercent(v);
                    if (barFillRef.current) {
                        barFillRef.current.style.width = `${v}%`;
                    }
                },
            }, '-=0.2')
            // Quote appears mid-load
            .fromTo(quoteRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
                '-=1.2'
            )
            .fromTo(authorRef.current,
                { opacity: 0 },
                { opacity: 0.5, duration: 0.3, ease: 'power2.out' },
                '-=0.8'
            )
            // Hold
            .to({}, { duration: 0.3 })
            // Fade content before reveal
            .to([labelRef.current, quoteRef.current, authorRef.current], {
                opacity: 0,
                duration: 0.25,
                ease: 'power2.in',
            });
    }, [onComplete]);

    return (
        <div
            ref={overlayRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'var(--bg-0)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Quote + author */}
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <div
                    ref={quoteRef}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(18px, 2.5vw, 26px)',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        lineHeight: 1.4,
                        maxWidth: 420,
                        letterSpacing: '-0.01em',
                        opacity: 0,
                    }}
                >
                    "I'm gonna be the King of the Pirates!"
                </div>
                <div
                    ref={authorRef}
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        marginTop: 12,
                        opacity: 0,
                    }}
                >
                    — Monkey D. Luffy
                </div>
            </div>

            {/* Loading bar */}
            <div
                ref={barTrackRef}
                style={{
                    width: 'min(320px, 60vw)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                }}
            >
                <div
                    ref={labelRef}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        opacity: 0,
                    }}
                >
                    <span>Setting Sail</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
                        {String(percent).padStart(3, '0')}%
                    </span>
                </div>

                <div style={{
                    width: '100%',
                    height: 2,
                    background: 'var(--border)',
                    borderRadius: 1,
                    overflow: 'hidden',
                }}>
                    <div
                        ref={barFillRef}
                        style={{
                            width: '0%',
                            height: '100%',
                            background: 'var(--red)',
                            borderRadius: 1,
                            transition: 'none',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
