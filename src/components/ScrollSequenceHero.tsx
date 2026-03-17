import { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type ChapterMeta = {
  label: string;
  range: [number, number];
};

type ScrollSequenceHeroProps = {
  framePath?: string;
  frameExtension?: string;
  frameCount?: number;
  framePadding?: number;
  frameStart?: number;
  framePathBuilder?: (index: number) => string;
};

const CHAPTERS: ChapterMeta[] = [
  { label: 'Arrival',    range: [0.05, 0.22] },
  { label: 'About',      range: [0.25, 0.45] },
  { label: 'Amenities',  range: [0.48, 0.70] },
  { label: 'Guests',     range: [0.73, 0.95] },
];

const SERVICES = [
  { icon: '✦', title: 'Beachfront Suites', text: 'Wake to unobstructed sea views from your private terrace or pool villa on the Philippine shore.' },
  { icon: '◈', title: 'Azure Spa',         text: 'Traditional Filipino hilot massage, herbal rituals, and holistic wellness by the water.' },
  { icon: '◉', title: 'Island Dining',     text: 'Ocean-fresh Filipino cuisine served on the shore, cliff terrace, or open-air Horizon Restaurant.' },
  { icon: '⬡', title: 'Sea Experiences',  text: 'Island hopping, coral diving, snorkelling, and private sunset cruises through the archipelago.' },
];

const TESTIMONIALS = [
  { quote: 'The Azure is unlike anything I have experienced — the sea, the silence, the warmth of the Philippine islands.', author: 'Sofia M.', location: 'Madrid' },
  { quote: 'Mornings on our private terrace with the ocean stretching to the horizon. Simply perfect.',                      author: 'James K.', location: 'Singapore' },
  { quote: 'The spa, the food, the people — The Azure gave us the most beautiful week of our lives.',                        author: 'Priya T.', location: 'Mumbai' },
];

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

const smoothstep = (e0: number, e1: number, v: number) => {
  const x = clamp((v - e0) / (e1 - e0), 0, 1);
  return x * x * (3 - 2 * x);
};

const chapterVisibility = (progress: number, [start, end]: [number, number]) => {
  if (progress < start || progress > end) return 0;
  const n = (progress - start) / (end - start);
  return clamp(Math.min(smoothstep(0, 0.18, n), 1 - smoothstep(0.8, 1, n)), 0, 1);
};

/** Draw a single image cover-cropped into the canvas. Does NOT clear beforehand. */
const drawCover = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  tw: number,
  th: number
) => {
  const { naturalWidth: iw, naturalHeight: ih } = img;
  if (!iw || !ih) return;
  const s = Math.max(tw / iw, th / ih);
  ctx.drawImage(img, (tw - iw * s) / 2, (th - ih * s) / 2, iw * s, ih * s);
};

/**
 * Blend two consecutive frames with sub-frame alpha compositing.
 * Eliminates the hard pixel-snap between integer frame indices so the
 * sequence looks continuous / video-smooth at any scroll velocity.
 */
const blendFrames = (
  ctx: CanvasRenderingContext2D,
  imgs: HTMLImageElement[],
  fi: number,          // fractional frame index, e.g. 47.63
  tw: number,
  th: number,
  count: number
) => {
  const lo   = Math.floor(fi);
  const hi   = Math.min(lo + 1, count - 1);
  const frac = fi - lo;
  const imgLo = imgs[clamp(lo, 0, count - 1)];
  const imgHi = imgs[clamp(hi, 0, count - 1)];

  if (!imgLo?.complete || !imgLo.naturalWidth) return;

  // Always clear once then draw base frame
  ctx.clearRect(0, 0, tw, th);
  ctx.globalAlpha = 1;
  drawCover(ctx, imgLo, tw, th);

  // Only composite the next frame when meaningfully different (>5% blend)
  // Lower values cause a ghosting/haze effect on slow or stopped scrolls.
  if (frac > 0.05 && imgHi?.complete && imgHi.naturalWidth && hi !== lo) {
    ctx.globalAlpha = frac;
    drawCover(ctx, imgHi, tw, th);
    ctx.globalAlpha = 1;
  }
};

export function ScrollSequenceHero({
  framePath = '/frames/frame_',
  frameExtension = 'jpg',
  frameCount = 90,
  framePadding = 4,
  frameStart = 1,
  framePathBuilder,
}: ScrollSequenceHeroProps) {
  const sectionRef      = useRef<HTMLElement | null>(null);
  const pinRef          = useRef<HTMLDivElement | null>(null);
  const canvasRef       = useRef<HTMLCanvasElement | null>(null);
  const chapterRefs     = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs         = useRef<Array<HTMLDivElement | null>>([]);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const framesRef           = useRef<HTMLImageElement[]>([]);
  const videoRef             = useRef<HTMLVideoElement | null>(null);
  const scrollTargetRef      = useRef(0);
  const renderedProgressRef  = useRef(0);
  const renderedFiRef        = useRef(-1);   // fractional frame index
  const rafRef               = useRef<number>(0);
  const inViewRef            = useRef(true);
  const reducedMotionRef     = useRef(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [loadedFrames, setLoadedFrames]       = useState(0);

  const frameUrls = useMemo(() => {
    return Array.from({ length: frameCount }, (_, i) => {
      if (framePathBuilder) return framePathBuilder(i);
      return `${framePath}${String(i + frameStart).padStart(framePadding, '0')}.${frameExtension}`;
    });
  }, [frameCount, frameExtension, framePadding, framePath, framePathBuilder, frameStart]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    setIsReducedMotion(mq.matches);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images = new Array<HTMLImageElement>(frameCount);
    framesRef.current = images;
    let disposed = false;

    /** Resize canvas if needed and blend two consecutive frames. */
    const renderAt = (fi: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const w   = canvas.clientWidth;
      const h   = canvas.clientHeight;
      if (!w || !h) return;
      const dw = Math.floor(w * dpr);
      const dh = Math.floor(h * dpr);
      if (canvas.width !== dw || canvas.height !== dh) {
        canvas.width  = dw;
        canvas.height = dh;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      blendFrames(ctx, framesRef.current, fi, w, h, frameCount);
      renderedFiRef.current = fi;
    };

    const updateOverlay = (progress: number) => {
      const fill = progressFillRef.current;
      if (fill) {
        fill.style.transform = reducedMotionRef.current ? 'scaleY(1)' : `scaleY(${progress})`;
      }
      CHAPTERS.forEach((ch, i) => {
        const el  = chapterRefs.current[i];
        const dot = dotRefs.current[i];
        if (!el || !dot) return;
        if (reducedMotionRef.current) {
          el.style.opacity   = '1';
          el.style.transform = 'translateY(0)';
          dot.dataset.active = 'true';
          return;
        }
        const vis = chapterVisibility(progress, ch.range);
        el.style.opacity   = String(vis);
        el.style.transform = `translateY(${(1 - vis) * 28}px)`;
        dot.dataset.active = String(progress >= (ch.range[0] + ch.range[1]) / 2);
      });
    };

    // How far into the scroll the video→canvas crossfade completes (0–1 progress)
    const FADE_END = 0.09;

    const loop = () => {
      if (inViewRef.current || reducedMotionRef.current) {
        const cur  = renderedProgressRef.current;
        const tgt  = scrollTargetRef.current;
        const isSettled = Math.abs(cur - tgt) < 0.001;
        const next = isSettled ? tgt : cur + (tgt - cur) * 0.09;
        renderedProgressRef.current = next;

        // ── Video ↔ Canvas crossfade ──────────────────────────────────────
        // videoAlpha = 1 at rest, fades to 0 over first FADE_END of scroll
        const videoAlpha = clamp(1 - next / FADE_END, 0, 1);
        const vid = videoRef.current;
        if (vid) {
          const smoothAlpha = videoAlpha * videoAlpha * (3 - 2 * videoAlpha); // smoothstep
          vid.style.opacity = String(smoothAlpha);
          // Pause the video once fully hidden to save GPU
          if (smoothAlpha < 0.01 && !vid.paused) vid.pause();
          if (smoothAlpha > 0.01 && vid.paused)  vid.play().catch(() => {});
        }

        // Fractional frame index — blendFrames interpolates between lo and hi frames
        // When scroll is settled, snap to the nearest integer frame so the image
        // is rendered from a single clean source with no alpha-compositing blur.
        const fi = next * (frameCount - 1);
        const fiDisplay = isSettled ? Math.round(fi) : fi;
        if (Math.abs(fiDisplay - renderedFiRef.current) > 0.005) renderAt(fiDisplay);
        updateOverlay(next);
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    frameUrls.forEach((url, i) => {
      const img     = new Image();
      img.decoding  = 'async';
      img.loading   = 'eager';
      img.src       = url;
      img.onload = () => {
        if (disposed) return;
        framesRef.current[i] = img;
        setLoadedFrames(v => Math.min(v + 1, frameCount));
        if (i === 0 || renderedFiRef.current < 0) renderAt(0);
      };
      img.onerror = () => {
        if (disposed) return;
        setLoadedFrames(v => Math.min(v + 1, frameCount));
      };
    });

    const io = new IntersectionObserver(
      es => { inViewRef.current = es.some(e => e.isIntersecting); },
      { rootMargin: '120px 0px 120px 0px', threshold: 0.01 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        renderAt(renderedFiRef.current < 0 ? 0 : renderedFiRef.current);
        ScrollTrigger.refresh();
      }, 120);
    };
    window.addEventListener('resize', onResize, { passive: true });

    const onMqChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      setIsReducedMotion(e.matches);
    };
    mq.addEventListener('change', onMqChange);

    let trigger: ScrollTrigger | null = null;
    if (!reducedMotionRef.current && sectionRef.current && pinRef.current) {
      trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${innerHeight * 2}`,
        scrub: 0.3,          // higher = GSAP progress trails scroll more smoothly
        pin: pinRef.current,
        anticipatePin: 1,
        onUpdate: self => { scrollTargetRef.current = self.progress; },
      });
    } else {
      scrollTargetRef.current    = 0.5;
      renderedProgressRef.current = 0.5;
      updateOverlay(0.5);
      renderAt((frameCount - 1) * 0.5);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      mq.removeEventListener('change', onMqChange);
      clearTimeout(resizeTimer);
      io.disconnect();
      trigger?.kill();
    };
  }, [frameCount, frameUrls]);

  const preloadProgress = loadedFrames / frameCount;
  const isPreloading    = loadedFrames < frameCount;

  return (
    <section
      ref={sectionRef}
      className={`hero-section${isReducedMotion ? ' hero-section-reduced' : ''}`}
      aria-label="Cinematic destination showcase"
    >
      <div ref={pinRef} className="hero-pin-wrap">
        <div className="hero-window">
          {/* ─── Idle video — plays on load, fades out as scroll begins ── */}
          <video
            ref={videoRef}
            className="hero-video"
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />

          <canvas ref={canvasRef} className="hero-canvas" aria-label="Travel sequence" />

          {/* ─── Chapter 1 · Arrival — palm canopy ─────────────────────────── */}
          <div
            className="hc hc--arrival"
            ref={el => { chapterRefs.current[0] = el; }}
          >
            <div className="hc-arrival__scroll-hint">
              <span className="hc-scroll-line" />
              <span>Scroll</span>
            </div>
            <div className="hc-arrival__body">
              <p className="hc-eyebrow">01 Arrival</p>
              <h2 className="hc-arrival__headline">
                <em>Azure</em>
                <span>waters</span>
                <span>await.</span>
              </h2>
              <p className="hc-arrival__sub">A private retreat in the Philippine islands.</p>
            </div>
          </div>

          {/* ─── Chapter 2 · About — villa emerges ──────────────────────────── */}
          <div
            className="hc hc--about"
            ref={el => { chapterRefs.current[1] = el; }}
            aria-label="About The Azure"
          >
            <div className="hc-about__stamp">
              <span>EST.</span>
              <span>2018</span>
            </div>
            <div className="hc-about__headline-wrap">
              <p className="hc-eyebrow">Who we are</p>
              <h2 className="hc-about__headline">
                Where<br />island<br />life<br />slows.
              </h2>
            </div>
            <div className="hc-about__card">
              <p className="hc-about__body">
                The Azure is a private beachfront resort nestled in the heart of the
                Philippines. Designed with the rhythm of the sea in mind — every suite,
                spa, and table frames the ocean in a different, breathtaking way.
              </p>
              <ul className="hc-about__tags" aria-label="Our focus areas">
                <li>Beachfront Suites</li>
                <li>Private Island Access</li>
                <li>Award-Winning Hospitality</li>
              </ul>
            </div>
            <div className="hc-about__vertical-brand" aria-hidden="true">The Azure</div>
          </div>

          {/* ─── Chapter 3 · Services — interior glow ───────────────────────── */}
          <div
            className="hc hc--services"
            ref={el => { chapterRefs.current[2] = el; }}
            aria-label="Our amenities"
          >
            <div className="hc-services__header">
              <p className="hc-eyebrow">Our amenities</p>
              <div className="hc-services__rule" aria-hidden="true" />
            </div>
            <ul className="hc-services__grid">
              {SERVICES.map((s, i) => (
                <li key={s.title} className={`hc-svc hc-svc--${i}`}>
                  <span className="hc-svc__icon" aria-hidden="true">{s.icon}</span>
                  <strong className="hc-svc__title">{s.title}</strong>
                  <p className="hc-svc__text">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Chapter 4 · Testimonials — ocean / pier ────────────────────── */}
          <div
            className="hc hc--testimonials"
            ref={el => { chapterRefs.current[3] = el; }}
            aria-label="Guest testimonials"
          >
            <div className="hc-testi__bg-quote" aria-hidden="true">❝</div>
            {TESTIMONIALS.map((t, i) => (
              <figure key={t.author} className={`hc-testi hc-testi--${i}`}>
                <blockquote className="hc-testi__quote">{t.quote}</blockquote>
                <figcaption className="hc-testi__author">
                  {t.author},&nbsp;
                  <span className="hc-testi__loc">{t.location}</span>
                </figcaption>
              </figure>
            ))}
            <div className="hc-testi__horizon" aria-hidden="true" />
          </div>

          {/* ─── Progress rail ──────────────────────────────────────────────── */}
          <div className="hero-progress-rail" aria-hidden="true">
            <div className="progress-track">
              <div ref={progressFillRef} className="progress-fill" />
            </div>
            <div className="progress-dots">
              {CHAPTERS.map((ch, i) => (
                <div
                  key={ch.label}
                  className="progress-dot"
                  ref={el => { dotRefs.current[i] = el; }}
                  data-active="false"
                />
              ))}
            </div>
          </div>

          {/* ─── Preload ────────────────────────────────────────────────────── */}
          <div
            className="preload-status"
            data-hidden={!isPreloading}
            role="status"
            aria-live="polite"
          >
            <span>Loading visuals</span>
            <span>{Math.round(preloadProgress * 100)}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
