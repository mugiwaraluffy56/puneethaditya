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
  const [loading, setLoading] = useState(true);

  // Always start from the top on page load/reload
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = '';

    // Skip Lenis on touch devices — native scroll is better for mobile
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouch) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

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
      <main>
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
