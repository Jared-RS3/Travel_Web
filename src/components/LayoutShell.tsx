import type { PropsWithChildren } from 'react';

const BUBBLES = [
  // ── Left-side cluster (rail + near-left content) ──────────
  { left: '1.5%', bottom: '-22px', size: 4,  dur: 12, delay: 5.5, drift:  10 },
  { left: '3%',   bottom: '-48px', size: 9,  dur: 23, delay: 7.8, drift:  18 },
  { left: '5%',   bottom: '-34px', size: 7,  dur: 18, delay: 9.2, drift:  14 },
  { left: '7%',   bottom: '-12px', size: 3,  dur: 9,  delay: 4.1, drift:   7 },
  { left: '8%',   bottom: '-16px', size: 5,  dur: 11, delay: 13.5,drift:   8 },
  { left: '12%',  bottom: '-40px', size: 11, dur: 21, delay: 1.8, drift:  -7 },
  { left: '14%',  bottom: '-30px', size: 8,  dur: 16, delay: 21,  drift:  -9 },
  { left: '17%',  bottom: '-26px', size: 6,  dur: 15, delay: 17,  drift:  13 },
  // ── Spread across the rest ────────────────────────────────
  { left: '4%',  bottom: '-20px', size: 5,  dur: 13, delay: 0,   drift:  18 },
  { left: '11%', bottom: '-35px', size: 9,  dur: 19, delay: 3.5, drift: -14 },
  { left: '20%', bottom: '-10px', size: 4,  dur: 10, delay: 7.2, drift:  22 },
  { left: '30%', bottom: '-28px', size: 13, dur: 22, delay: 1.1, drift: -10 },
  { left: '41%', bottom: '-15px', size: 5,  dur: 9,  delay: 11,  drift:  16 },
  { left: '48%', bottom: '-32px', size: 7,  dur: 16, delay: 5.8, drift: -20 },
  { left: '57%', bottom: '-22px', size: 11, dur: 20, delay: 8.4, drift:  11 },
  { left: '64%', bottom: '-18px', size: 6,  dur: 12, delay: 2.2, drift: -17 },
  { left: '71%', bottom: '-40px', size: 17, dur: 25, delay: 14,  drift:   8 },
  { left: '78%', bottom: '-12px', size: 5,  dur: 11, delay: 6.5, drift: -26 },
  { left: '84%', bottom: '-26px', size: 8,  dur: 17, delay: 9.9, drift:  19 },
  { left: '90%', bottom: '-8px',  size: 6,  dur: 14, delay: 4.3, drift: -11 },
  { left: '95%', bottom: '-30px', size: 10, dur: 21, delay: 12,  drift:  14 },
  { left: '16%', bottom: '-44px', size: 15, dur: 23, delay: 16,  drift: -19 },
];

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        const id = href.replace('#', '');
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          smoothScrollTo(id);
        }
      }}
    >
      {children}
    </a>
  );
}

export function LayoutShell({ children }: PropsWithChildren) {
  return (
    <div className="site-shell">
      <div className="bg-accent bg-accent-a" aria-hidden="true" />
      <div className="bg-accent bg-accent-b" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      {/* ── Subtle ocean bubbles ─────────────────────────────── */}
      <div className="ocean-bubbles-layer" aria-hidden="true">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              left: b.left,
              bottom: b.bottom,
              width: b.size,
              height: b.size,
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
              '--drift': `${b.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <aside className="left-rail" aria-label="Brand rail">
        <div className="rail-inner">
          <p className="rail-kicker">The Azure · Philippines</p>
          <h1 className="rail-word">AZURE</h1>
        </div>
      </aside>

      <div className="content-pane">
        <header className="top-nav">
          <a className="brand" href="#top" aria-label="The Azure home">
            The Azure
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#gallery">Gallery</NavLink>
            <NavLink href="#experiences">Experiences</NavLink>
            <NavLink href="#rates">Rates</NavLink>
            <NavLink href="#location">Location</NavLink>
            <NavLink href="#contact">Book</NavLink>
          </nav>
          <button
            type="button"
            className="nav-cta"
            onClick={() => smoothScrollTo('contact')}
          >
            Reserve
          </button>
        </header>

        <main id="top">{children}</main>
      </div>
    </div>
  );
}