import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { LayoutShell } from './components/LayoutShell';
import { ScrollSequenceHero } from './components/ScrollSequenceHero';
import { Sections } from './components/Sections';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 2.1,                                          // longer glide
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      wheelMultiplier: 0.65,   // smaller = each notch moves less = smoother feel
      touchMultiplier: 0.85,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return (
    <LayoutShell>
      <ScrollSequenceHero
        frameCount={240}
        framePathBuilder={(index) =>
          `/ezgif-77f168bedd520226-jpg/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`
        }
      />
      <Sections />
    </LayoutShell>
  );
}

export default App;