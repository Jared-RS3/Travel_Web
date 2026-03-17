import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef   = useRef<HTMLDivElement | null>(null);
  const waveRef      = useRef<SVGSVGElement | null>(null);
  const logoRef      = useRef<HTMLDivElement | null>(null);
  const taglineRef   = useRef<HTMLParagraphElement | null>(null);
  const barRef       = useRef<HTMLDivElement | null>(null);
  const barFillRef   = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const palmLRef     = useRef<HTMLDivElement | null>(null);
  const palmRRef     = useRef<HTMLDivElement | null>(null);
  const sunRef       = useRef<HTMLDivElement | null>(null);
  const islandRef    = useRef<HTMLDivElement | null>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    // Animate progress bar counter
    const obj = { v: 0 };
    tl.to(obj, {
      v: 100,
      duration: 2.6,
      ease: 'power1.inOut',
      onUpdate() {
        setPct(Math.round(obj.v));
        if (barFillRef.current) {
          barFillRef.current.style.transform = `scaleX(${obj.v / 100})`;
        }
      },
    }, 0);

    // Sun rises
    tl.fromTo(sunRef.current,
      { y: 80, opacity: 0, scale: 0.6 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
      0
    );

    // Island rises
    tl.fromTo(islandRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
      0.3
    );

    // Palms sway in
    tl.fromTo(palmLRef.current,
      { x: -40, opacity: 0, rotate: -18 },
      { x: 0, opacity: 1, rotate: 0, duration: 1.1, ease: 'back.out(1.4)' },
      0.5
    );
    tl.fromTo(palmRRef.current,
      { x: 40, opacity: 0, rotate: 18 },
      { x: 0, opacity: 1, rotate: 0, duration: 1.1, ease: 'back.out(1.4)' },
      0.5
    );

    // Logo and tagline
    tl.fromTo(logoRef.current,
      { y: 28, opacity: 0, letterSpacing: '0.6em' },
      { y: 0, opacity: 1, letterSpacing: '0.14em', duration: 1.0, ease: 'power3.out' },
      0.8
    );
    tl.fromTo(taglineRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      1.2
    );

    // Progress bar appears
    tl.fromTo(barRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.9
    );

    // Waves oscillate
    const wavePath = waveRef.current?.querySelector('path');
    if (wavePath) {
      gsap.to(wavePath, {
        attr: {
          d: 'M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 C1400,20 1600,100 1800,60 L1800,160 L0,160 Z',
        },
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

    // Particles
    const ptEls = particlesRef.current?.querySelectorAll<HTMLSpanElement>('.ls-particle');
    if (ptEls) {
      ptEls.forEach((p, i) => {
        gsap.fromTo(p,
          { y: 0, opacity: 0 },
          {
            y: gsap.utils.random(-60, -120),
            opacity: gsap.utils.random(0.4, 0.9),
            x: gsap.utils.random(-20, 20),
            duration: gsap.utils.random(1.5, 2.8),
            ease: 'power1.out',
            repeat: -1,
            delay: i * 0.18,
            yoyo: true,
          }
        );
      });
    }

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="ls-overlay" ref={overlayRef} aria-label="Loading The Azure resort" role="status">
      {/* Atmospheric background gradient */}
      <div className="ls-sky" />

      {/* Sun */}
      <div className="ls-sun" ref={sunRef} aria-hidden="true" />

      {/* Floating particles (sea spray / fireflies) */}
      <div className="ls-particles" ref={particlesRef} aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="ls-particle" style={{ left: `${6 + i * 6.5}%`, bottom: '38%' }} />
        ))}
      </div>

      {/* Island silhouette */}
      <div className="ls-island-scene" aria-hidden="true">
        <div className="ls-island" ref={islandRef}>
          {/* Left palm */}
          <div className="ls-palm ls-palm--left" ref={palmLRef}>
            <div className="ls-palm__trunk" />
            <div className="ls-palm__frond ls-palm__frond--1" />
            <div className="ls-palm__frond ls-palm__frond--2" />
            <div className="ls-palm__frond ls-palm__frond--3" />
          </div>
          {/* Right palm */}
          <div className="ls-palm ls-palm--right" ref={palmRRef}>
            <div className="ls-palm__trunk" />
            <div className="ls-palm__frond ls-palm__frond--1" />
            <div className="ls-palm__frond ls-palm__frond--2" />
            <div className="ls-palm__frond ls-palm__frond--3" />
          </div>
          <div className="ls-sand" />
        </div>
      </div>

      {/* Wave SVG */}
      <svg
        ref={waveRef}
        className="ls-wave"
        viewBox="0 0 1800 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 C1400,100 1600,20 1800,60 L1800,160 L0,160 Z"
          fill="rgba(14, 48, 88, 0.72)"
        />
        <path
          d="M0,80 C200,50 400,110 600,80 C800,50 1000,110 1200,80 C1400,50 1600,110 1800,80 L1800,160 L0,160 Z"
          fill="rgba(8, 28, 58, 0.55)"
        />
      </svg>

      {/* Branding */}
      <div className="ls-brand">
        <div className="ls-logo" ref={logoRef}>The Azure</div>
        <p className="ls-tagline" ref={taglineRef}>Palawan · Philippines</p>
      </div>

      {/* Progress */}
      <div className="ls-progress" ref={barRef}>
        <div className="ls-progress__bar">
          <div className="ls-progress__fill" ref={barFillRef} />
        </div>
        <span className="ls-progress__pct">{pct}%</span>
      </div>
    </div>
  );
}
