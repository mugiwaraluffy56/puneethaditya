import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './App.css';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Klyna from './components/Klyna';
import Projects from './components/Projects';
import OpenSource from './components/OpenSource';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef(null);
  const mainRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
    // Refresh ScrollTrigger after preloader is gone
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, []);

  useEffect(() => {
    // Lock scroll during preloader
    if (loading) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = '';

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Section transition animations
    const sections = mainRef.current?.querySelectorAll('section');
    if (sections) {
      sections.forEach((section, i) => {
        // Skip hero — it's the first thing visible
        if (i === 0) return;

        gsap.fromTo(section,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 40%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />
      <Navbar />
      <main ref={mainRef}>
        <Hero />
        <About />
        <Skills />
        <Journey />
        <Klyna />
        <Projects />
        <OpenSource />
        <Contact />
      </main>
    </>
  );
}

export default App;
