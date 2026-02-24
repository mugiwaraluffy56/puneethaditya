import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
    const overlayRef = useRef(null);
    const nameRef = useRef(null);
    const taglineRef = useRef(null);
    const lineRef = useRef(null);
    const counterRef = useRef(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Count up animation
        const counter = { val: 0 };
        gsap.to(counter, {
            val: 100,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => setCount(Math.floor(counter.val)),
        });

        const tl = gsap.timeline({
            onComplete: () => {
                // Wipe the overlay away
                gsap.to(overlayRef.current, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'power4.inOut',
                    delay: 0.2,
                    onComplete,
                });
            },
        });

        // Line expand
        tl.fromTo(lineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }
        )
            // Name reveal
            .fromTo(nameRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
                '-=0.8'
            )
            // Tagline reveal
            .fromTo(taglineRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
                '-=0.3'
            )
            // Hold for a beat
            .to({}, { duration: 0.4 })
            // Fade content before wipe
            .to([nameRef.current, taglineRef.current, lineRef.current, counterRef.current], {
                opacity: 0,
                y: -20,
                duration: 0.3,
                stagger: 0.05,
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
                gap: 16,
            }}
        >
            {/* Counter */}
            <div
                ref={counterRef}
                style={{
                    position: 'absolute',
                    bottom: 40,
                    right: 48,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em',
                }}
            >
                {String(count).padStart(3, '0')}
            </div>

            {/* Line */}
            <div
                ref={lineRef}
                style={{
                    width: 60,
                    height: 1,
                    background: 'var(--red)',
                    transformOrigin: 'center',
                    marginBottom: 20,
                }}
            />

            {/* Name */}
            <div
                ref={nameRef}
                style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    opacity: 0,
                }}
            >
                Puneeth Aditya
            </div>

            {/* Tagline */}
            <div
                ref={taglineRef}
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    opacity: 0,
                }}
            >
                Code Pirate — ML/DL Explorer
            </div>
        </div>
    );
}
