import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { LayoutShell } from './components/LayoutShell';
import { ScrollSequenceHero } from './components/ScrollSequenceHero';
import { Sections } from './components/Sections';
import { LoadingScreen } from './components/LoadingScreen';
import { AboutSection, ExperiencesSection, RatesSection, FaqSection, LocationSection } from './components/ExtraSections';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 2.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.65,
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
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <LayoutShell>
          <ScrollSequenceHero
            frameCount={240}
            framePathBuilder={(index) =>
              `/ezgif-77f168bedd520226-jpg/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`
            }
          />
          <AboutSection />
          <ExperiencesSection />
          <Sections />
          <RatesSection />
          <FaqSection />
          <LocationSection />
        </LayoutShell>
      </div>
    </>
  );
}

export default App;